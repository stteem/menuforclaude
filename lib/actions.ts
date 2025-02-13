"use server";

import { getSession } from "@/lib/auth";
import {
  addDomainToVercel,
  removeDomainFromVercelProject,
  validDomainRegex,
} from "@/lib/domains";
import { getBlurDataURL } from "@/lib/utils";
import { put, del } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import { revalidateTag } from "next/cache";
import { withMenuAuth, withSiteAuth, withMenuItemAuth } from "./auth";
import db from "./db";
import { SelectRestaurant, SelectMenu, SelectMenuItem, menus, menuItems, users, restaurants } from "./schema";
import { NextResponse } from "next/server";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export const createSite = async (formData: FormData) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const subdomain = formData.get("subdomain") as string;

  try {
    const [response] = await db
      .insert(restaurants)
      .values({
        name,
        description,
        subdomain,
        userId: session.user.id,
      })
      .returning();

    revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This subdomain is already taken`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const updateRestaurantMetadata = withSiteAuth(
  async (formData: FormData, restaurant: SelectRestaurant, key: string) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    const value = formData.get(key) as string;

    try {
      let response;

      if (key === "customDomain") {
        if (value.includes("kpaly.com")) {
          return {
            error: "Cannot use kpaly.com subdomain as your custom domain",
          };

          // if the custom domain is valid, we need to add it to Vercel
        } else if (validDomainRegex.test(value)) {
          response = await db
            .update(restaurants)
            .set({
              customDomain: value,
            })
            .where(eq(restaurants.id, restaurant.id))
            .returning()
            .then((res) => res[0]);

          await Promise.all([
            addDomainToVercel(value),
            // Optional: add www subdomain as well and redirect to apex domain
            // addDomainToVercel(`www.${value}`),
          ]);

          // empty value means the user wants to remove the custom domain
        } else if (value === "") {
          response = await db
            .update(restaurants)
            .set({
              customDomain: null,
            })
            .where(eq(restaurants.id, restaurant.id))
            .returning()
            .then((res) => res[0]);
        }

        // if the site had a different customDomain before, we need to remove it from Vercel
        if (restaurant.customDomain && restaurant.customDomain !== value) {
          response = await removeDomainFromVercelProject(restaurant.customDomain);

          // //Optional: remove domain from Vercel team 

          // // first, we need to check if the apex domain is being used by other sites
          // const apexDomain = getApexDomain(`https://${restaurant.customDomain}`);
          // const domainCount = await db.select({ count: count() }).from(restaurants).where(or(eq(sites.customDomain, apexDomain), ilike(sites.customDomain, `%.${apexDomain}`))).then((res) => res[0].count);


          // // if the apex domain is being used by other sites
          // // we should only remove it from our Vercel project
          // if (domainCount >= 1) {
          //   await removeDomainFromVercelProject(restaurant.customDomain);
          // } else {
          //   // this is the only site using this apex domain
          //   // so we can remove it entirely from our Vercel team
          //   await removeDomainFromVercelTeam(
          //     restaurant.customDomain
          //   );
          // }
          
          
        }
      } else if (key === "image" || key === "logo") {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return {
            error:
              "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
          };
        }

        const file = formData.get(key) as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = key === "image" ? await getBlurDataURL(url) : null;

        response = await db
          .update(restaurants)
          .set({
            [key]: url,
            ...(blurhash && { imageBlurhash: blurhash }),
          })
          .where(eq(restaurants.id, restaurant.id))
          .returning()
          .then((res) => res[0]);
      } else {
        response = await db
          .update(restaurants)
          .set({
            [key]: value,
          })
          .where(eq(restaurants.id, restaurant.id))
          .returning()
          .then((res) => res[0]);
      }

      // console.log(
      //   "Updated site data! Revalidating tags: ",
      //   `${restaurant.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      //   `${restaurant.customDomain}-metadata`,
      // );
      revalidateTag(
        `${restaurant.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      );
      restaurant.customDomain && revalidateTag(`${restaurant.customDomain}-metadata`);

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This ${key} is already taken`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const deleteSite = withSiteAuth(
  async (_: FormData, restaurant: SelectRestaurant) => {
    try {
      const [response] = await db
        .delete(restaurants)
        .where(eq(restaurants.id, restaurant.id))
        .returning();

      revalidateTag(
        `${restaurant.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      );
      response.customDomain && revalidateTag(`${restaurant.customDomain}-metadata`);
      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);

export const getSiteFromMenuId = async (menuId: string) => {
  const menu = await db.query.menus.findFirst({
    where: eq(menus.id, menuId),
    columns: {
      restaurantId: true,
    },
  });

  return menu?.restaurantId;
};

export const createMenuItem = withMenuAuth(
  async (_: FormData, menu: SelectMenu & { restaurant : SelectRestaurant}) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    try {

      const [response] = await db
        .insert(menuItems)
        .values({
          menuId: menu.id,
          restaurantId: menu.restaurantId,
          userId: session.user.id,
        })
        .returning();

      // Fetch restaurant details for subdomain revalidation
      // const restaurant = await db.query.restaurants.findFirst({
      //   where: (restaurants, { eq }) => eq(restaurants.id, menu.restaurantId),
      // });

      // if (!restaurant) {
      //   return {
      //     error: "Restaurant not found",
      //   };
      // }

      revalidateTag(
        `${menu.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-menuItems`,
      );
      menu.restaurant?.customDomain && revalidateTag(`${menu.restaurant?.customDomain}-menuItems`);

      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);

export const updateMenuItem = async (data: SelectMenuItem) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    try {
      const [response] = await db
        .update(menuItems)
        .set({
          name: data.name,
          description: data.description,
          promo: data.promo,
          imageUrl: data.imageUrl,
          price: data.price,
        })
        .where(eq(menuItems.id, data.id)) 
        .returning();
        
        // console.log({response})
         // Fetch restaurant details using restaurantId from the menuItem
        const restaurant = await db.query.restaurants.findFirst({
          where: (restaurants, { eq }) => eq(restaurants.id, response.restaurantId),
        });

        if (!restaurant) {
          return {
            error: "Restaurant not found",
          };
        }

      revalidateTag(
        `${restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-menuItems`,
      );
      restaurant?.customDomain && revalidateTag(`${restaurant?.customDomain}-menuItems`);

      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  };


//Create menu
// lib/actions.ts
export const createMenu = withSiteAuth(
  async (_: FormData, restaurant: SelectRestaurant) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    try {
      const [response] = await db
        .insert(menus)
        .values({
          // title,
          // description,
          // slug,
          restaurantId: restaurant.id,
          userId: session.user.id,
        })
        .returning();

      revalidateTag(
        `${restaurant.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-menus`,
      );
      restaurant.customDomain && revalidateTag(`${restaurant.customDomain}-menus`);

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This slug is already taken`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

// creating a separate function for this because we're not using FormData
export const updateMenu = async (data: SelectMenu) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  // console.log({data})
  const menu = await db.query.menus.findFirst({
    where: eq(menus.id, data.id),
    with: {
      restaurant: true,
    },
  });

  if (!menu || menu.userId !== session.user.id) {
    return {
      error: "Menu not found",
    };
  }

  try {
    const [response] = await db
      .update(menus)
      .set({
        title: data.title,
        description: data.description,
      })
      .where(eq(menus.id, data.id))
      .returning();

    revalidateTag(
      `${menu.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-menus`,
    );
    revalidateTag(
      `${menu.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${menu.id}`,
    );

    // if the restaurant has a custom domain, we need to revalidate those tags too
    menu.restaurant?.customDomain &&
      (revalidateTag(`${menu.restaurant?.customDomain}-menus`),
      revalidateTag(`${menu.restaurant?.customDomain}-${menu.id}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateMenuMetadata = withMenuAuth(
  async (
    formData: FormData,
    menu: SelectMenu & {
      restaurant: SelectRestaurant;
    },
    key: string,
  ) => {
    const value = formData.get(key) as string;
    try {
      let response;
      if (key === "image") {
        const file = formData.get("image") as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;
        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = await getBlurDataURL(url);
        response = await db
          .update(menus)
          .set({
            image: url,
            imageBlurhash: blurhash,
          })
          .where(eq(menus.id, menu.id))
          .returning()
          .then((res) => res[0]);
      } else {
        response = await db
          .update(menus)
          .set({
            [key]: key === "published" ? value === "true" : value,
          })
          .where(eq(menus.id, menu.id))
          .returning()
          .then((res) => res[0]);
      }

      revalidateTag(
        `${menu.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-menus`,
      );
      revalidateTag(
        `${menu.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${menu.slug}`,
      );

      // if the restaurant has a custom domain, we need to revalidate those tags too
      menu.restaurant?.customDomain &&
        (revalidateTag(`${menu.restaurant?.customDomain}-menus`),
        revalidateTag(`${menu.restaurant?.customDomain}-${menu.slug}`));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This ${key} is already in use`,
        };
      } 
      if (error instanceof Error && error.message.includes('Vercel Blob: Missing [x]-content-length header.')) {
        return { 
          error: 'No changes detected. Please upload an image and try again.' 
        };
      }
      else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const updateMenuItemMetadata = withMenuItemAuth(
  async (
    formData: FormData, 
    menuitem: SelectMenuItem & {
      restaurant: SelectRestaurant;
    }, 
    key: string 
  ) => {

    const value = formData.get(key) as string;

    try {
      let response;

      if (key === "image") {
        const file = formData.get("image") as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = await getBlurDataURL(url);
        response = await db
          .update(menuItems)
          .set({
            imageUrl: url,
            imageBlurhash: blurhash,
          })
          .where(eq(menuItems.id, menuitem.id))
          .returning()
          .then((res) => res[0]);
      } 
      else {
        response = await db
          .update(menuItems)
          .set({
            [key]: key === "published" ? value === "true" : value,
          })
          .where(eq(menuItems.id, menuitem.id))
          .returning()
          .then((res) => res[0]);
      } 
      
      

      revalidateTag(
        `${menuitem.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-menuItems`,
      );
      revalidateTag(
        `${menuitem.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${menuitem.slug}`,
      );

      // if the restaurant has a custom domain, we need to revalidate those tags too
      menuitem.restaurant?.customDomain &&
        (revalidateTag(`${menuitem.restaurant?.customDomain}-menuItems`),
        revalidateTag(`${menuitem.restaurant?.customDomain}-${menuitem.slug}`));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This ${key} is already in use`,
        };
      } 
      if (error instanceof Error && error.message.includes('Vercel Blob: Missing [x]-content-length header.')) {
        return { 
          error: 'No changes detected. Please upload an image and try again.' 
        };
      }
      else {
        return {
          error: error.message,
        };
      }
    }
  });

export const deleteRestaurant = withSiteAuth(
  async (_: FormData, restaurant: SelectRestaurant) => {
    try {
      const [response] = await db
        .delete(restaurants)
        .where(eq(restaurants.id, restaurant.id))
        .returning({
          userId: restaurants.userId,
        });

      revalidateTag(
        `${restaurant.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      );
      restaurant.customDomain && revalidateTag(`${restaurant.customDomain}-metadata`);
      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);

export const deleteMenuItem = withMenuItemAuth(
  async ( 
    formData: FormData, 
    menuitem: SelectMenuItem  & {
      restaurant: SelectRestaurant;
    }, 
    key: string
  ) => {
    try {

      if (menuitem.imageUrl) { // Check if url is not null
          await del(menuitem.imageUrl);
      }

      const [response] = await db
        .delete(menuItems)
        .where(eq(menuItems.id, menuitem.id))
        .returning({
          id: menuItems.id
        });

      revalidateTag(
        `${menuitem.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-menuItems`,
      );
      revalidateTag(
        `${menuitem.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${menuitem.slug}`,
      );

      // if the restaurant has a custom domain, we need to revalidate those tags too
      menuitem.restaurant?.customDomain &&
        (revalidateTag(`${menuitem.restaurant?.customDomain}-menuItems`),
        revalidateTag(`${menuitem.restaurant?.customDomain}-${menuitem.slug}`));

      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);

export const deleteMenu = withMenuAuth(
  async ( 
    _: FormData, 
    menu: SelectMenu & { restaurant : SelectRestaurant},
    key: string
  ) => {

    try {
      
      if (menu.image) { // Check if url is not null
          await del(menu.image);
      }
      
      const [response] = await db
        .delete(menus)
        .where(eq(menus.id, menu.id))
        .returning({
          id: menus.id
        });

      revalidateTag(
        `${menu.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-menus`,
      );
      revalidateTag(
        `${menu.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${menu.slug}`,
      );

      // if the restaurant has a custom domain, we need to revalidate those tags too
      menu.restaurant?.customDomain &&
        (revalidateTag(`${menu.restaurant?.customDomain}-menus`),
        revalidateTag(`${menu.restaurant?.customDomain}-${menu.slug}`));

      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);

export const editUser = async (
  formData: FormData,
  _id: unknown,
  key: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const value = formData.get(key) as string;

  try {
    const [response] = await db
      .update(users)
      .set({
        [key]: value,
      })
      .where(eq(users.id, session.user.id))
      .returning();

    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This ${key} is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

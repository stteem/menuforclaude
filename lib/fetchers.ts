import { unstable_cache } from "next/cache";
import db from "./db";
import { and, desc, eq, not } from "drizzle-orm";
import { restaurants, menus, menuItems, users } from "./schema";
import { serialize } from "next-mdx-remote/serialize";
import { replaceExamples, replaceTweets } from "@/lib/remark-plugins";

export async function getRestaurantData(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      const restaurant = await db.query.restaurants.findFirst({
        where: subdomain
          ? eq(restaurants.subdomain, subdomain)
          : eq(restaurants.customDomain, domain),

        with: {
          menus: {
            where: (menus, { eq }) => eq(menus.published, true), // Filter items by published status
          },
          // user: true,
        },
      });

      if (!restaurant) {
        return null;
      }

      return restaurant;
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}


export async function getMenuData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {

      const data = await db.query.menus.findFirst({
        where: (menus, { eq }) => eq(menus.slug, slug),
        with: {
          items: {
            where: (items, { eq }) => eq(items.published, true),
            orderBy: (items, { asc }) => [asc(items.promo)],
          },
        },
      });

      if (!data) return null;

      const adjacentMenus = await db
        .select({
          slug: menus.slug,
          title: menus.title,
          createdAt: menus.createdAt,
          description: menus.description,
          image: menus.image,
          imageBlurhash: menus.imageBlurhash,
          published: menus.published,
          subdomain: restaurants.subdomain,
        })
        .from(menus)
        .leftJoin(restaurants, eq(restaurants.id, menus.restaurantId))
        .where(
          and(
            not(eq(menus.id, data.id)),
            subdomain
              ? eq(restaurants.subdomain, subdomain)
              : eq(restaurants.customDomain, domain),
              eq(menus.published, true)
          ),
        );

      return {
        ...data,
        adjacentMenus,
      };
    },
    [`${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`${domain}-${slug}`],
    },
  )();
}


// lib/fetchers.ts
export async function getMenusForSitemap(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return await db
        .select({
          slug: menus.slug,
          createdAt: menus.createdAt, // Assuming this is the last modified date
        })
        .from(menus)
        .leftJoin(restaurants, eq(restaurants.id, menus.restaurantId))
        .where(
          and(
            subdomain
              ? eq(restaurants.subdomain, subdomain)
              : eq(restaurants.customDomain, domain),
          ),
        )
        .orderBy(desc(menus.createdAt));
    },
    [`${domain}-sitemap-menus`],
    {
      revalidate: 900,
      tags: [`${domain}-sitemap-menus`],
    },
  )();
}



// async function getMdxSource(postContents: string) {
//   // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
//   // https://mdxjs.com/docs/what-is-mdx/#markdown
//   const content =
//     postContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";
//   // Serialize the content string into MDX
//   const mdxSource = await serialize(content, {
//     mdxOptions: {
//       remarkPlugins: [replaceTweets, () => replaceExamples(db)],
//     },
//   });

//   return mdxSource;
// }

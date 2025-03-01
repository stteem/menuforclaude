import { notFound } from "next/navigation";
import { getMenuData, getRestaurantData } from "@/lib/fetchers";
import MenuCard from "@/components/menu-card";
import BlurImage from "@/components/blur-image";
// import MDX from "@/components/mdx";
import { placeholderBlurhash, toDateString } from "@/lib/utils";
import db from "@/lib/db";
import { menus, restaurants, menuItems } from "@/lib/schema";
import { eq } from "drizzle-orm";
import MenuItems from "./(domain)/components/menuitems";


export async function generateMetadata(
  props: {
    params: Promise<{ domain: string; slug: string }>;
  }
) {
  const params = await props.params;
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const [data, siteData] = await Promise.all([
    getMenuData(domain, slug),
    getRestaurantData(domain),
  ]);
  if (!data || !siteData) {
    return null;
  }
  const { title, description } = data;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vercel",
    },
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   siteData.customDomain && {
    //     alternates: {
    //       canonical: `https://${siteData.customDomain}/${params.slug}`,
    //     },
    //   }),
  };
}

export async function generateStaticParams() {
  const allMenus = await db
    .select({
      slug: menus.slug,
      restaurant: {
        subdomain: restaurants.subdomain,
        customDomain: restaurants.customDomain,
      },
    })
    .from(menus)
    .leftJoin(restaurants, eq(menus.restaurantId, restaurants.id))
    // .where(eq(restaurants.subdomain, "ueats")); // feel free to remove this filter if you want to generate paths for all menus

  const allPaths = allMenus
    .flatMap(({ restaurant, slug }) => [
      restaurant?.subdomain && {
        domain: `${restaurant.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        slug,
      },
      restaurant?.customDomain && {
        domain: restaurant.customDomain,
        slug,
      },
    ])
    .filter(Boolean);

    // console.log({allPaths})

  return allPaths;
}

export default async function SiteMenuPage(
  props: {
    params: Promise<{ domain: string; slug: string }>;
  }
) {
  const params = await props.params;
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const data = await getMenuData(domain, slug);

  if (!data) {
    notFound();
  }
  // console.log({ data });
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center justify-center mb-5">
        <div className="m-auto w-full text-center md:w-7/12">
          
          <h1 className="mb-2 font-title text-3xl font-bold text-stone-800 md:text-6xl dark:text-white">
            {data.title}
          </h1>
          <p className="text-md m-auto w-10/12 text-stone-600 md:text-lg dark:text-stone-400">
            {data.description}
          </p>
        </div>
      
      </div>
      {
        data.image && <div className="flex flex-col justify-center items-center w-full h-52 overflow-hidden rounded-2xl">
          <BlurImage
            alt={data.title ?? "Menu image"}
            width={1200}
            height={630}
            className="h-full w-[98%] md:w-[85%] object-cover rounded-2xl"
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
            src={data.image ?? "/empty-state.png"}
          />
        </div>
      }
      <div className="flex">
        <MenuItems items={data.items} />
      </div>
      {/* <MDX source={data.mdxSource} /> */}

      {data.adjacentMenus.length > 0 && (
        <div className="relative mb-20 mt-10 sm:mt-20">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-stone-300 dark:border-stone-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-stone-500 dark:bg-black dark:text-stone-400">
              {data.adjacentMenus.length > 1 ? 'More Menus': 'More Menu'}
            </span>
          </div>
        </div>
      )}
      {data.adjacentMenus && (
        <div className="w-full px-5 md:px10 mb-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.adjacentMenus.map((data: any, index: number) => (
            // console.log({data} ),
            <MenuCard key={index} data={data} source={"user"}/>
          ))}
        </div>
      )}
    </div>
  );
}
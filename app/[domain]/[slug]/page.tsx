import { notFound } from "next/navigation";
import { getMenuData, getRestaurantData } from "@/lib/fetchers";
import MenuCard from "@/components/menu-card";
import BlurImage from "@/components/blur-image";
// import MDX from "@/components/mdx";
import { placeholderBlurhash, toDateString } from "@/lib/utils";
import db from "@/lib/db";
import { menus, restaurants } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; slug: string };
}) {
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
    // .where(eq(restaurants.subdomain, "demo")); // feel free to remove this filter if you want to generate paths for all menus

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

  return allPaths;
}

export default async function SiteMenuPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const data = await getMenuData(domain, slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="m-auto w-full text-center md:w-7/12">
          <p className="m-auto my-5 w-10/12 text-sm font-light text-stone-500 md:text-base dark:text-stone-400">
            {toDateString(data.createdAt)}
          </p>
          <h1 className="mb-10 font-title text-3xl font-bold text-stone-800 md:text-6xl dark:text-white">
            {data.title}
          </h1>
          <p className="text-md m-auto w-10/12 text-stone-600 md:text-lg dark:text-stone-400">
            {data.description}
          </p>
        </div>
        <a
          // if you are using Github OAuth, you can get rid of the Twitter option
          href={`https://github.com/${data.restaurant?.user?.gh_username}`}
          rel="noreferrer"
          target="_blank"
        >
          <div className="my-8">
            <div className="relative inline-block h-8 w-8 overflow-hidden rounded-full align-middle md:h-12 md:w-12">
              {data.restaurant?.user?.image ? (
                <BlurImage
                  alt={data.restaurant?.user?.name ?? "User Avatar"}
                  height={80}
                  src={data.restaurant.user.image}
                  width={80}
                />
              ) : (
                <div className="absolute flex h-full w-full select-none items-center justify-center bg-stone-100 text-4xl text-stone-500">
                  ?
                </div>
              )}
            </div>
            <div className="text-md ml-3 inline-block align-middle md:text-lg dark:text-white">
              by <span className="font-semibold">{data.restaurant?.user?.name}</span>
            </div>
          </div>
        </a>
      </div>
      <div className="relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:mb-20 md:h-150 md:w-5/6 md:rounded-2xl lg:w-2/3">
        <BlurImage
          alt={data.title ?? "Menu image"}
          width={1200}
          height={630}
          className="h-full w-full object-cover"
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          src={data.image ?? "/placeholder.png"}
        />
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
              Continue Reading
            </span>
          </div>
        </div>
      )}
      {data.adjacentMenus && (
        <div className="mx-5 mb-20 grid max-w-screen-xl grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3">
          {data.adjacentMenus.map((data: any, index: number) => (
            <MenuCard key={index} data={data} />
          ))}
        </div>
      )}
    </>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, toDateString } from "@/lib/utils";
import MenuCard from "@/components/menu-card";
import { getRestaurantData } from "@/lib/fetchers";
import db from "@/lib/db";
import MenuItemCard from "@/components/menuitem-card";
import Image from "next/image";

export async function generateStaticParams() {
  const allRestaurants = await db.query.restaurants.findMany({
    // feel free to remove this filter if you want to generate paths for all sites
    // where: (restaurants, { eq }) => eq(restaurants.subdomain, "demo"),
    columns: {
      subdomain: true,
      customDomain: true,
    },
  });

  const allPaths = allRestaurants
    .flatMap(({ subdomain, customDomain }) => [
      subdomain && {
        domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
      customDomain && {
        domain: customDomain,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function RestaurantHomePage(
  props: {
    params: Promise<{ domain: string }>;
  }
) {
  const params = await props.params;
  const domain = decodeURIComponent(params.domain);
  const restaurant = await getRestaurantData(domain);

  console.log({restaurant})
  if (!restaurant) {
    notFound();
  }

  return restaurant.menus.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 px-5 md:px-20">
      {restaurant.menus.map((menu) => (
        <MenuCard key={menu.id} data={{...menu, subdomain: restaurant.subdomain}} source="user"/>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Menus Yet</h1>
      <Image
        alt="missing post"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any menus yet. Create one to get started.
      </p>
    </div>
  ); 
}

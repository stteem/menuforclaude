import Link from "next/link";
import { notFound } from "next/navigation";
import BlurImage from "@/components/blur-image";
import { placeholderBlurhash, toDateString } from "@/lib/utils";
import BlogCard from "@/components/blog-card";
import { getRestaurantData } from "@/lib/fetchers";
import db from "@/lib/db";

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

export default async function RestaurantHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const restaurant = await getRestaurantData(domain);

  console.log({restaurant})
  if (!restaurant) {
    notFound();
  }

  return (
    <>
      <h1>{restaurant.name}</h1>
      <h2>Menus</h2>
      <ul>
        {restaurant.menus.map((menu) => (
          <li key={menu.id}>
            <h3>{menu.title}</h3>
            <ul>
              {menu.items.map((item) => (
                <li key={item.id}>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  {item.imageUrl ? (
                    <BlurImage
                      src={item.imageUrl}
                      alt={item.name}
                      width={200}
                      height={200}
                      placeholder="blur"
                      blurDataURL={placeholderBlurhash}
                    />
                    ) : (
                    <BlurImage
                      src={placeholderBlurhash}
                      alt="Placeholder"
                      width={200}
                      height={200}
                      placeholder="blur"
                      blurDataURL={placeholderBlurhash}
                    />
                  )}
                  <p>${item.price}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>       
    </>
  );
}

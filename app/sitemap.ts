import { headers } from "next/headers";
import { getMenusForSitemap } from "@/lib/fetchers";

export default async function Sitemap() {
  const headersList = await headers();
  const domain =
    headersList
      .get("host")
      ?.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) ??
    "kpaly.com";

  const menus = await getMenusForSitemap(domain);

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    ...menus.map(({ slug, createdAt }) => ({
      url: `https://${domain}/menu/${slug}`,
      lastModified: new Date(createdAt),
    })),
  ];
}

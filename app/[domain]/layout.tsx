import Image from "next/image";
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import CTA from "@/components/cta";
// import ReportAbuse from "@/components/report-abuse";
import { notFound, redirect } from "next/navigation";
import { getRestaurantData } from "@/lib/fetchers";
import { fontMapper } from "@/styles/fonts";
import { Metadata } from "next";
import Profile from "@/components/profile";
// import UserNav from "./[slug]/(domain)/components/user-nav";
import Nav from "@/components/nav";
import { ThemeToggle } from "@/components/theme-toggle";
// import { getSession } from "@/lib/auth"

export async function generateMetadata(
  props: {
    params: Promise<{ domain: string }>;
  }
): Promise<Metadata | null> {
  const params = await props.params;
  const domain = decodeURIComponent(params.domain);
  const data = await getRestaurantData(domain);
  if (!data) {
    return null;
  }
  const {
    name: title,
    description,
    image,
    logo,
  } = data as {
    name: string;
    description: string;
    image: string;
    logo: string;
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@vercel",
    },
    icons: [logo],
    metadataBase: new URL(`https://${domain}`),
    // Optional: Set canonical URL to custom domain if it exists
    // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    //   data.customDomain && {
    //     alternates: {
    //       canonical: `https://${data.customDomain}`,
    //     },
    //   }),
  };
}

export default async function SiteLayout(
  props: {
    params: Promise<{ domain: string }>;
    children: ReactNode;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  // const session = await getSession();
  // if (!session?.user) {
  //   redirect("/login");
  // }

  const domain = decodeURIComponent(params.domain);
  const data = await getRestaurantData(domain);
  // console.log({data})
  if (!data) {
    notFound();
  }

  // Optional: Redirect to custom domain if it exists
  if (
    domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    data.customDomain &&
    process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
  ) {
    return redirect(`https://${data.customDomain}`);
  }

  return (
    <div className={`${fontMapper[data.font]} min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950 transition-colors duration-300`}>
      <header className="h-16 py-2 sticky top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md dark:bg-zinc-900/80 shadow-sm transition-all duration-300 dark:text-white border-b border-gray-100 dark:border-zinc-800">
        <div className="mx-auto flex max-h-12 max-w-screen-xl items-center justify-between px-6 sm:px-10">
          <Link href="/" className="flex items-center gap-3 group transition-all duration-300">
            {data.logo && 
              <div className="overflow-hidden rounded-lg shadow-sm group-hover:shadow transition-all duration-300">
                <Image
                  alt={data.name || "restaurant logo"}
                  height={40}
                  src={data?.logo}
                  width={40}
                  className="h-[60px] w-[60px] object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            }
            {/* <span className="text-lg font-title font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
              {data.name}
            </span> */}
          </Link>
          
          <div className="flex items-center gap-3">
            {/* <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Theme</span> */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-screen-xl px-6 sm:px-10 py-8">{children}</main>

      {/* {domain == `demo.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
      domain == `platformize.co` ? (
        <CTA />
      ) : null
      // (<ReportAbuse />)
      } */}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import CTA from "@/components/cta";
import ReportAbuse from "@/components/report-abuse";
import { notFound, redirect } from "next/navigation";
import { getRestaurantData } from "@/lib/fetchers";
import { fontMapper } from "@/styles/fonts";
import { Metadata } from "next";
import { getSession } from "@/lib/auth"

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
    <div className={fontMapper[data.font]}>
      <div className="ease left-0 right-0 top-0 z-30 flex h-40 bg-white transition-all duration-150 dark:bg-black dark:text-white">
        <div className="mx-auto flex flex-col h-full max-w-screen-xl items-center justify-center space-x-5 px-10 sm:px-20">
          <Link href="/" className="flex flex-col items-center justify-center gap-1">
            {/* <div className="inline-block h-auto w-auto overflow-hidden rounded-full align-middle"> */}
            { data.logo && 
              <Image
                alt={data.name || "restaurant logo"}
                height={80}
                src={data?.logo}
                width={80}
                className="h-full w-full object-contain rounded-lg"
              />
            }
            {/* </div> */}
            <span className="ml-3 inline-block font-title font-medium">
              {data.name}
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-5">{children}</div>

      {domain == `demo.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
      domain == `platformize.co` ? (
        <CTA />
      ) : (
        <ReportAbuse />
      )}
    </div>
  );
}

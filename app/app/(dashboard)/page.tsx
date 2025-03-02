import { Suspense } from "react";
import Sites from "@/components/sites";
import OverviewStats from "@/components/overview-stats";
import Menus from "@/components/menus";
import Link from "next/link";
import PlaceholderCard from "@/components/placeholder-card";
import OverviewSitesCTA from "@/components/overview-sites-cta";
import LoadingDots from "@/components/icons/loading-dots";


export default function Overview() {
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      {/* <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Overview
        </h1>
        <OverviewStats />
      </div> */}

      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Top Sites
          </h1>
          <Suspense fallback={null}>
            <OverviewSitesCTA />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <LoadingDots />
            // <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            //   {Array.from({ length: 3 }).map((_, i) => (
            //     <PlaceholderCard key={i} />
            //   ))}
            // </div>
          }
        >
          <Sites limit={4} />
        </Suspense>
      </div>

      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Recent Menus
        </h1>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <Menus limit={8} />
        </Suspense>
      </div>
    </div>
  );
}

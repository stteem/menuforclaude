import { getSession } from "@/lib/auth";
import CreateSiteButton from "./create-site-button";
import CreateSiteModal from "./modal/create-site";
import Link from "next/link";
import db from "@/lib/db";
import { restaurants } from "@/lib/schema";
import { count, eq } from "drizzle-orm";

export default async function OverviewSitesCTA() {
  const session = await getSession();
  if (!session) {
    return 0;
  }

  try{

    const [ sitesResult ] = await db
      .select({ count: count() })
      .from(restaurants)
      .where(eq(restaurants.userId, session.user.id));
      console.log({sitesResult})
      if (!sitesResult) {
        throw new Error("Server problem, try again");
      }

      return sitesResult.count > 0 ? (
        <Link
          href="/sites"
          className="rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:active:bg-zinc-700"
        >
          View All Sites
        </Link>
      ) : (
        <CreateSiteButton>
          <CreateSiteModal />
        </CreateSiteButton>
      );
  }
  catch(error) {
    console.error({error})
  }

}

'use client'
import { useState } from "react";
import BlurImage from "@/components/blur-image";
import type { SelectMenu, SelectRestaurant } from "@/lib/schema";
import { placeholderBlurhash } from "@/lib/utils";
// import { BarChart, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { deleteMenu } from "@/lib/actions";
import DeleteDialog from "./delete-dialog";

export default function MenuCard({
  data, source
}: {
  data: SelectMenu & { restaurant?: SelectRestaurant | null; subdomain: string | null };
  source: string; // The source of the data (e.g., "admin", "user") | undefined;
}) {
  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`;
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

  return (
    <div 
      className={`relative w-full rounded-lg border border-stone-200 pb-2 bg-white transition-all duration-300 
        ${source === "admin" 
          ? "cursor-pointer shadow-md hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md" 
          : "shadow-md"
        } 
        dark:border-zinc-700 dark:hover:border-zinc-600 dark:bg-zinc-800`}
      onMouseEnter={() => source === "admin" ? setIsHovered(true) : null}
      onMouseLeave={() => source === "admin" ? setIsHovered(false) : null}
      onTouchStart={() => source === "admin" ? setIsHovered(true) : null} 
      onTouchEnd={() => setTimeout(() => source === "admin" ? setIsHovered(false) : null, 500)}
    >
      <Link
        // href={`/menu/${data.id}`}
        href={source === "user" ? `/${data.slug}` : `/menu/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <div className="relative h-44 overflow-hidden">
          {source === "admin" && (
            <>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent event from bubbling up
                  setIsDialogOpen(true);
                }} 
                aria-label="Delete menu"
                className="absolute bottom-2 left-2 z-10 flex h-9 w-9 items-center justify-center rounded-md border border-stone-200 bg-white text-sm font-medium text-stone-600 shadow-md transition-all hover:bg-stone-50 active:bg-stone-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <Trash2 width={20} height={20} />
              </button>
              
              <button 
                onClick={(e) => {
                  // Just let the link's click event naturally occur
                  // No need to prevent default or stop propagation
                }}
                aria-label="Edit menu"
                className="absolute bottom-2 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-md border border-stone-200 bg-white text-sm font-medium text-stone-600 shadow-md transition-all hover:bg-stone-50 active:bg-stone-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                </svg>
              </button>
            </>
          )}
          <div className={`relative overflow-hidden ${source === "admin" ? "group" : ""}`}>
            <BlurImage
              alt={data.title ?? "Card thumbnail"}
              width={500}
              height={400}
              className={`h-full w-full object-cover transition-transform duration-500 ${
                source === "admin" ? "group-hover:scale-105" : ""
              }`}
              src={data.image ?? "/empty-state.png"}
              placeholder="blur"
              blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
            />
            
            {/* No gradient overlay */}
          </div>
          {!data.published && source === "admin" && (
            <span className="absolute top-2 right-2 rounded-md border border-stone-200 bg-white/90 px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-300">
              Draft
            </span>
          )}
        </div>
      
        <div className="relative border-t border-stone-200 p-4 dark:border-zinc-700">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white">
            {data.title}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-zinc-400">
            {data.description}
          </p>
          {source === "admin" && <div className="h-8"></div>}
        </div>
      </Link>
      {
        source === "admin" && <div className="absolute bottom-4 flex w-full px-4">
          <a
            href={
              process.env.NEXT_PUBLIC_VERCEL_ENV
                ? `https://${url}`
                : `http://${data.restaurant?.subdomain}.localhost:3000/${data.slug}`
            }
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600 dark:active:bg-zinc-800 max-w-full mt-4 z-10"
          >
            {url} ↗
          </a>
        </div>
      }
      <DeleteDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        itemId={data.id}
        deleteFn={deleteMenu}
        title="Delete Menu"
        description={"Are you sure you want to delete this menu? This will delete the menu and the items in the menu."}
        name="Menu"
      />
    </div>
  );
}

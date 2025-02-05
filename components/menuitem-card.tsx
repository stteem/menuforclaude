'use client'
import BlurImage from "@/components/blur-image";
import type { SelectMenuItem, SelectRestaurant } from "@/lib/schema";
import { placeholderBlurhash, random } from "@/lib/utils";
import Link from "next/link";
import { InfoIcon, Info, Trash2 } from "lucide-react";
import { useState } from "react";

export default function MenuItemCard({data,}: {data: SelectMenuItem}) {
  // const url = `${data.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`;

  const [isHovered, setIsHovered] = useState(false); // State to track hover


  return (
    <div 
      className="relative w-full rounded-lg border border-stone-200 p-2 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white"
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)}   
    >
      <Link
        href={`/menuitem/${data.id}`}
        className="flex flex-col md:flex-row justify-between w-full overflow-hidden rounded-lg"
      >
        
        <div className="border-stone-200 p-4 dark:border-stone-700">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white">
            {data.name ?? "Name"}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.price ?? "$0"}
          </p>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description ?? " Description here (optional) lorem ipsum imer ipsum lore lora lakaka ratel."}
          </p>
          {isHovered && ( // Conditionally render the hover text
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
              <span className="text-white">Click to edit and publish</span>
            </div>
          )}
        </div>
        <div className="relative h-44 overflow-hidden">
          <BlurImage
            alt={data.name ?? "Item card thumbnail"}
            width={500}
            height={400}
            className="w-full md:ml-5 h-full object-cover rounded-md"
            src={data.imageUrl ?? "/placeholder.png"}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
          {!data.published && (
            <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
              Draft
            </span>
          )}
        </div>
      </Link>
      {/* <div className="absolute bottom-4 flex w-full px-4">
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${data.restaurant?.subdomain}.localhost:3000/${data.slug}`
          }
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
        >
          {url} ↗
        </a>
      </div> */}
    </div>
  );
}

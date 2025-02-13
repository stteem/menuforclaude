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
      className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white"
      onMouseEnter={() => source === "admin" ? setIsHovered(true) : null} // Set hover state to true
      onMouseLeave={() => source === "admin" ? setIsHovered(false) : null} 
    >
        <div className="relative h-44 overflow-hidden">
        {source === "admin" && (
            <button onClick={() => setIsDialogOpen(true)} className="absolute bottom-2 left-2 z-10 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
              <Trash2 width={18} />
            </button>
          )}
          <BlurImage
            alt={data.title ?? "Card thumbnail"}
            width={500}
            height={400}
            className="h-full w-full object-cover"
            src={data.image ?? "/placeholder.png"}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
          {!data.published && source === "admin" && (
            <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
              Draft
            </span>
          )}
        </div>
      <Link
        // href={`/menu/${data.id}`}
        href={source === "user" ? `/${data.slug}` : `/menu/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <div className="relative border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white">
            {data.title}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description}
          </p>
          {isHovered && ( // Conditionally render the hover text
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
              <span className="text-white">Click here to edit</span>
            </div>
          )} 
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
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
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
        // onConfirm={handleDelete} 
      />
    </div>
  );
}

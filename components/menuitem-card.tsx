'use client'
import BlurImage from "@/components/blur-image";
import type { SelectMenuItem } from "@/lib/schema";
import { placeholderBlurhash } from "@/lib/utils";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteMenuItem } from "@/lib/actions";
import DeleteDialog from "./delete-dialog";
import useWindowSize from "@/lib/hooks/use-window-size";
import Image from "next/image";

export default function MenuItemCard({data, source}: {
  data: SelectMenuItem, 
  source: string // The source of the data (e.g., "admin", "user") | undefined;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const { isMobile } = useWindowSize(); // Use the common hook instead of custom implementation

  return (
    <div className="flex flex-row justify-between overflow-hidden relative w-full rounded-xl border border-stone-200 p-0 xl:mb-4 shadow-sm transition-all hover:shadow-lg dark:border-zinc-700 dark:hover:border-zinc-600 bg-white dark:bg-zinc-800 group">
      {/* Edit button for desktop admin view */}
      {!isMobile && source === "admin" && (
        <Link
          href={`/menuitem/${data.id}`}
          className="absolute top-3 left-3 z-10 p-1.5 rounded-full bg-white/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
        >
          <Edit size={18}/>
        </Link>
      )}
      
      {/* Text content */}
      <div className="txt-div gap-3 flex flex-col justify-start w-full sm:w-[65%] p-5 dark:border-zinc-700 relative">
        <div className="flex flex-row justify-between items-start">
          <h3 className="w-auto my-0 text-sm md:text-lg font-semibold text-zinc-800 dark:text-white">
            {data.name ?? "Name"}
          </h3>
          <div className="flex gap-2 ml-2 text-right">
            {data.promo ? (
              <div className="flex flex-col items-end">
                <p className="text-sm line-through text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                  {data.price ?? "0"}
                </p>
                <p className="text-base font-medium text-emerald-600 dark:text-emerald-500 whitespace-nowrap">
                  {data.promo ?? "0"}
                </p>
              </div>
            ) : (
              <p className="text-base font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {data.price ?? "0"}
              </p>
            )}
          </div>
        </div>
        <div className={`${source === "admin" ? 'mb-6' : 'mb-0'}`}>
          <p className="text-sm font-normal line-clamp-2 md:line-clamp-3 text-zinc-500 dark:text-zinc-400">
            {data.description ?? ""}
          </p>
        </div>
        
        {/* Admin controls */}
        {source === "admin" && (
          <span className="absolute left-4 bottom-3 text-white">
            <button 
              onClick={() => setIsDialogOpen(true)} 
              className="p-1.5 rounded-full bg-white/90 dark:bg-zinc-800/90 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
            >
              <Trash2 size={18}/>
            </button>
          </span>
        )}
        
        {/* Edit button for mobile admin view */}
        {isMobile && source === "admin" && (
          <Link
            href={`/menuitem/${data.id}`}
            className="absolute dark:text-white z-10 text-black bottom-3 right-4 p-1.5 rounded-full bg-white/90 dark:bg-zinc-800/90 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
          >
            <Edit size={18}/>
          </Link>
        )}
      </div>
      
      {/* Image container */}
      <div className="image-div flex justify-center items-center relative w-[35%] h-auto min-h-[120px] md:h-44 overflow-hidden">
        {data.promo && (
          <span className="absolute z-10 top-3 right-3 rounded-full py-1 px-3 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-rose-500 shadow-md">
            Promo
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 dark:to-black/30 z-5"></div>
        {data.imageUrl ? (
          <BlurImage
            alt={data.name ?? "Item card thumbnail"}
            width={500}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={data.imageUrl}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
            onError={(e) => {
              // Fallback to placeholder on error
              (e.target as HTMLImageElement).src = "/empty-state.png";
            }}
          />
        ) : (
          <Image
            alt={data.name ?? "Item card thumbnail"}
            width={500}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="/empty-state.png"
          />
        )}
        {!data.published && (
          <span className="absolute bottom-3 right-3 rounded-full py-1 px-3 text-xs font-medium text-zinc-600 bg-white/90 shadow-sm backdrop-blur-sm">
            Draft
          </span>
        )}
      </div>
      
      {/* Delete dialog */}
      <DeleteDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        itemId={data.id}
        deleteFn={deleteMenuItem}
        title="Delete Menu Item"
        description={"Are you sure you want to delete this menu item?"}
        name="Menu Item"
      />
    </div>
  );
}
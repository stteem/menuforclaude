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

export default function MenuItemCard({data, source}: {
  data: SelectMenuItem, 
  source: string // The source of the data (e.g., "admin", "user") | undefined;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const { isMobile } = useWindowSize(); // Use the common hook instead of custom implementation

  return (
    <div className="flex flex-row justify-between overflow-hidden relative w-full rounded-none border-b border-stone-200 p-0 xl:mb-3 shadow-md transition-all hover:shadow-xl dark:border-zinc-700 dark:hover:border-zinc-600 bg-white dark:bg-zinc-800">
      {/* Edit button for desktop admin view */}
      {!isMobile && source === "admin" && (
        <Link
          href={`/menuitem/${data.id}`}
          className="dark:text-white text-black mx-2 my-2"
        >
          <Edit size={20}/>
        </Link>
      )}
      
      {/* Text content */}
      <div className="txt-div gap-2 flex flex-col justify-start border-stone-200 w-full sm:w-[70%] p-4 dark:border-zinc-700">
        <div className="flex flex-row sm:flex-col">
          <h3 className="w-full sm:w-auto my-0 text-sm md:text-lg font-bold dark:text-white truncate sm:whitespace-normal">
            {data.name ?? "Name"}
          </h3>
          <div className="flex gap-2 ml-auto sm:ml-0">
            <p
              style={{
                textDecoration: data.promo ? 'line-through' : 'none',
              }} 
              className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-zinc-400">
              {data.price ?? "0"}
            </p>
            {data.promo && 
              <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-zinc-400">
                {data.promo ?? "0"}
              </p>
            }
          </div>
        </div>
        <div className={`${source === "admin" ? 'mb-6' : 'mb-0'}`}>
          <p className="text-sm font-normal line-clamp-2 md:line-clamp-3 text-stone-500 dark:text-zinc-400">
            {data.description ?? ""}
          </p>
        </div>
        
        {/* Admin controls */}
        {source === "admin" && (
          <span className="absolute left-2 bottom-3 text-white">
            <button 
              onClick={() => setIsDialogOpen(true)} 
              className="flex w-5 h-5 rounded-full justify-center items-center dark:text-white text-black"
            >
              <Trash2 size={30}/>
            </button>
          </span>
        )}
        
        {/* Edit button for mobile admin view */}
        {isMobile && source === "admin" && (
          <Link
            href={`/menuitem/${data.id}`}
            className="absolute dark:text-white z-10 text-black bottom-2 right-2"
          >
            <Edit size={20}/>
          </Link>
        )}
      </div>
      
      {/* Image container */}
      <div className="image-div flex justify-center items-center relative w-[30%] h-auto min-h-[100px] md:h-44 overflow-hidden">
        {data.promo && (
          <span className="absolute z-10 top-2 right-2 rounded-md border border-stone-200 bg-red-600 px-2 py-0.5 text-xs sm:text-sm font-medium text-white shadow-md">
            Promo
          </span>
        )}
        {data.imageUrl && (
          <BlurImage
            alt={data.name ?? "Item card thumbnail"}
            width={500}
            height={400}
            className="w-full h-full object-cover rounded-lg md:rounded-md"
            src={data.imageUrl ?? "/empty-state.png"}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
        )}
        {!data.published && (
          <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-white px-2 py-0.5 text-xs sm:text-sm font-medium text-stone-600 shadow-md">
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
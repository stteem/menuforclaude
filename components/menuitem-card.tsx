'use client'
import BlurImage from "@/components/blur-image";
import type { SelectMenuItem } from "@/lib/schema";
import { placeholderBlurhash } from "@/lib/utils";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteMenuItem } from "@/lib/actions";
import DeleteDialog from "./delete-dialog";


export default function MenuItemCard({data, source}: {
  data: SelectMenuItem, 
  source: string // The source of the data (e.g., "admin", "user") | undefined;
}) {

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

  return (
    <div className="flex flex-row justify-between overflow-hidden relative w-full rounded-lg border border-stone-200 p-2 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white"  
    >
      { 
        source === "admin" && <Link
          href={`/menuitem/${data.id}`}
          className="dark:text-white text-black"
        >
          <Edit size={18}/>
        </Link>
      }
        <div className="border-stone-200 w-[60%] md:w-[70%] p-4 dark:border-stone-700">
          <h3 className="my-0 font-cal text-lg md:text-xl font-bold tracking-wide dark:text-white">
            {data.name ?? "Name"}
          </h3>
          <div className="flex gap-3">
            <p 
              style={{
                textDecoration: data.promo ? 'line-through' : 'none',
              }} 
              className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
              {data.price ?? "0"}
            </p>
            {data.promo && 
              <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
                {data.promo ?? "0"}
              </p>
            }
          </div>
          <div>
            <p className="mt-2 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
              {data.description ?? ""}
            </p>
            {/* {data.description &&  <Tooltip side="top" showArrow={false} content={data.description}>
                <span className="rounded-md bg-gray-100 p-2 text-sm font-medium text-gray-700 dark:border dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
                  <LucideInfo width={28} />
                </span>
              </Tooltip>} */}
          </div>
          { 
            source === "admin" && <span className="absolute left-2 bottom-3 text-white">
              <button onClick={() => setIsDialogOpen(true)} className="flex w-5 h-5 rounded-full justify-center items-center dark:text-white text-black"><Trash2 size={18}/></button>
            </span>
          }

        </div>
        <div className="flex justify-center items-center relative w-[40%] md:w-[30%] h-auto md:h-44 overflow-hidden">
          <div className="flex justify-center items-center w-auto h-auto object-cover rounded-lg">
          {data.promo && (
            <span className="absolute z-10 top-2 right-2 rounded-md border border-stone-200 bg-red-600 px-3 py-0.5 text-sm font-medium text-white shadow-md">
              Promo
            </span>
          )}
          <BlurImage
            alt={data.name ?? "Item card thumbnail"}
            width={500}
            height={400}
            className="w-[90%] h-[90%] object-contain rounded-lg md:rounded-md"
            src={data.imageUrl ?? "/empty-state.png"}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
          {!data.published && (
            <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
              Draft
            </span>
          )}
          </div>
        </div>
      
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
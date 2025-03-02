'use client'
import BlurImage from "@/components/blur-image";
import type { SelectMenuItem } from "@/lib/schema";
import { placeholderBlurhash } from "@/lib/utils";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { deleteMenuItem } from "@/lib/actions";
import DeleteDialog from "./delete-dialog";


export default function MenuItemCard({data, source}: {
  data: SelectMenuItem, 
  source: string // The source of the data (e.g., "admin", "user") | undefined;
}) {

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const [isMobile, setIsMobile] = useState(false); // State to manage mobile view

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 550); // Mobile view for widths less than 768px
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Add event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, []);

  return (
    <div className={`flex ${isMobile ? 'flex-row' : 'flex-row'} justify-between overflow-hidden relative w-full rounded-none border-b border-stone-200 p-0 xl:mb-3 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white`}  
    >
      { !isMobile && source === "admin" && <Link
        href={`/menuitem/${data.id}`}
        className="dark:text-white text-black mx-2 my-2"
      >
        <Edit size={20}/>
      </Link>
      }

        
      {
        // This block originally displays the image only on mobile view.

        // isMobile && <div className="image-div flex justify-center items-center relative w-full h-auto md:h-44 overflow-hidden">
        //   {/* <div className="flex justify-center items-center w-auto h-auto object-cover rounded-lg"> */}
        //     {data.promo && (
        //       <span className="absolute z-10 top-2 right-2 rounded-md border border-stone-200 bg-red-600 px-3 py-0.5 text-sm font-medium text-white shadow-md">
        //         Promo
        //       </span>
        //     )}
        //     { data.imageUrl &&
        //       <BlurImage
        //         alt={data.name ?? "Item card thumbnail"}
        //         width={500}
        //         height={400}
        //         className="w-full h-48 object-cover rounded-t-lg md:rounded-md"
        //         src={data.imageUrl ?? "/empty-state.png"}
        //         placeholder="blur"
        //         blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        //       />
        //     }
        //     {!data.published && (
        //       <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
        //         Draft
        //       </span>
        //     )}
        //   {/* </div> */}
        // </div>
      }
        <div className={`txt-div gap-2 flex flex-col justify-start border-stone-200 ${ isMobile ? 'w-full' : 'w-[70%]' } md:w-[70%] p-4 dark:border-stone-700`}>
          <div className={`flex ${isMobile ? 'flex-row' : 'flex-col'}`}>
            <h3 className={`${isMobile && 'w-[60%]'} my-0 text-sm md:text-lg font-bold dark:text-white`}>
              {data.name ?? "Name"}
            </h3>
            <div className={`flex gap-2 ${isMobile && 'w-[40%] justify-end'}`}>
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
          </div>
          <div className={`${source === "admin" ? 'mb-6' : 'mb-0'}`}>
            <p className="text-sm font-normal line-clamp-2 md:line-clamp-3 text-stone-500 dark:text-stone-400">
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
              <button onClick={() => setIsDialogOpen(true)} className="flex w-5 h-5 rounded-full justify-center items-center dark:text-white text-black"><Trash2 size={30}/></button>
            </span>
          }
          { isMobile &&
            source === "admin" && <Link
              href={`/menuitem/${data.id}`}
              className="absolute dark:text-white z-10 text-black bottom-2 right-2"
            >
              <Edit size={20}/>
            </Link>
          }

        </div>
        {
          // This block originally displays the image only from tablet view and above, but currently displays the image on all views
          // since the mobile only view above has been commented out.
          <div className="image-div flex justify-center items-center relative w-[40%] md:w-[30%] h-auto md:h-44 overflow-hidden">
              {data.promo && (
                <span className="absolute z-10 top-2 right-2 rounded-md border border-stone-200 bg-red-600 px-3 py-0.5 text-sm font-medium text-white shadow-md">
                  Promo
                </span>
              )}
              { data.imageUrl && <BlurImage
                alt={data.name ?? "Item card thumbnail"}
                width={500}
                height={400}
                className="w-[90%] h-[90%] object-cover rounded-lg md:rounded-md"
                src={data.imageUrl ?? "/empty-state.png"}
                placeholder="blur"
                blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
              />}
              {!data.published && (
                <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
                  Draft
                </span>
              )}
          </div>
        }
      
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
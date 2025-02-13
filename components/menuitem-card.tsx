'use client'
import BlurImage from "@/components/blur-image";
import type { SelectMenuItem } from "@/lib/schema";
import { placeholderBlurhash } from "@/lib/utils";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteMenuItem } from "@/lib/actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { cn } from "@/lib/utils";
import { useTransition } from "react";
import LoadingDots from "@/components/icons/loading-dots";
import va from "@vercel/analytics";
import { useToast } from "@/lib/hooks/use-toast";

export default function MenuItemCard({data, source}: {
  data: SelectMenuItem, 
  source: string // The source of the data (e.g., "admin", "user") | undefined;
}) {

  // const [isHovered, setIsHovered] = useState(false); // State to track hover
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

  return (
    <div 
      className="flex flex-row justify-between overflow-hidden relative w-full rounded-lg border border-stone-200 p-2 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white"
      // onMouseEnter={() => source === "admin" ? setIsHovered(true) : null} // Set hover state to true
      // onMouseLeave={() => source === "admin" ? setIsHovered(false) : null}   
    >
      { 
        source === "admin" && <Link
          href={`/menuitem/${data.id}`}
          className="text-white"
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
          <p className="mt-2 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description ?? " Description is optional. It does help if you have something nice to add."}
          </p>
          { 
            source === "admin" && <span className="absolute left-2 bottom-3 text-white">
              <button onClick={() => setIsDialogOpen(true)} className="flex w-5 h-5 rounded-full justify-center items-center"><Trash2 size={18}/></button>
            </span>
          }

          {/* {isHovered && ( // Conditionally render the hover text
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
              <span className="text-white">Click to edit and publish</span>
            </div>
          )} */}
        </div>
        <div className="flex justify-center items-center relative w-[40%] md:w-[30%] h-auto md:h-44 overflow-hidden">
          {/* <div className="flex justify-center items-center w-[95%] h-[95%] bg-red-800"> */}
          {data.promo && (
            <span className="absolute z-10 top-2 right-2 rounded-md border border-stone-200 bg-red-600 px-3 py-0.5 text-sm font-medium text-white shadow-md">
              Promo
            </span>
          )}
          <BlurImage
            alt={data.name ?? "Item card thumbnail"}
            width={500}
            height={400}
            className="w-[90%] h-[90%] object-cover md:object-contain rounded-lg md:rounded-md"
            src={data.imageUrl ?? "/placeholder.png"}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
          {!data.published && (
            <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
              Draft
            </span>
          )}
          {/* </div> */}
        </div>
      
        <DeleteDialog 
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)} 
          itemId={data.id}
          // onConfirm={handleDelete} 
        />
    </div>
  );
}


interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string; // The ID of the item to delete
  // onConfirm: () => Promise<void>;
}


export const DeleteDialog: React.FC<DeleteDialogProps> = ({ isOpen, onClose, itemId }) => {

  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <button style={{ display: 'none' }}>Open Dialog</button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Delete Menu Item</DialogTitle>
          <DialogDescription className="mt-1 text-sm leading-6">
            Are you sure you want to delete this item?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <button 
              className="flex h-8 w-full px-5 items-center justify-center sm:w-fit space-x-2 rounded-lg border text-sm transition-all focus:outline-none sm:h-9 
               border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800" 
              // onClick={onClose}
            >
              Cancel
            </button>
          </DialogClose>
          {/* <DialogClose asChild> */}
            {/* <button className="w-full sm:w-fit text-white border px-2 rounded-md" onClick={onConfirm}>
              Ok
            </button> */}
            <button
              onClick={() =>
                startTransition(async () => {
                  await deleteMenuItem(null, itemId, null).then(() => {
                    showToast("Item deleted successfully", "success");
                    va.track("Deleted Menu item");
                    onClose();
                  })
                  .catch ((error) => {
                    console.error(error);
                    showToast("Failed to delete item", "error");
                    return
                  })
                 
                })
              }
              className={cn(
                "flex h-8 w-full px-5 items-center justify-center sm:w-fit space-x-2 rounded-lg border text-sm transition-all focus:outline-none sm:h-9",
                isPending
                  ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                  : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
              )}
              disabled={isPending}
            >
              {isPending ? <LoadingDots color="#808080" /> : <p>Delete</p>}
            </button>
          {/* </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
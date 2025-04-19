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
import { useTransition } from "react";
import { useToast } from "@/lib/hooks/use-toast";
import va from "@vercel/analytics";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";


  
interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    itemId: string; // The ID of the item to delete
    deleteFn: (formData: any, id: any, key: string | null) => Promise<void>;
    title: string; // The title of the dialog
    description: string;
    name: string; // The component
   
}
  
  
  export default function DeleteDialog({ isOpen, onClose, itemId, deleteFn, title, description, name }: DeleteDialogProps) {
  
    const { showToast } = useToast();
    const [isPending, startTransition] = useTransition();
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        {/* <DialogTrigger asChild>
          <button style={{ display: 'none' }}>Open Dialog</button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-6">
              {description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row mt-6 gap-3 md:gap-0">
            <DialogClose asChild>
              <button 
                className="flex h-8 w-full px-5 items-center justify-center sm:w-fit space-x-2 rounded-lg border text-sm transition-all focus:outline-none sm:h-9 
                 border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:active:bg-zinc-700" 
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
                    await deleteFn(null, itemId, null).then(() => {
                      showToast(`${name} deleted successfully`, "success");
                      va.track(`Deleted ${name}`);
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
                    ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:active:bg-zinc-700",
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
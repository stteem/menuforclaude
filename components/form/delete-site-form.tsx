"use client";
import { useState, useEffect } from "react";
import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
// import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { deleteSite } from "@/lib/actions";
import va from "@vercel/analytics";
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


export default function DeleteSiteForm({ siteName }: { siteName: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isPending, startTransition] = useTransition();
  const { id } = useParams() as { id: string };
  const router = useRouter();


  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get("confirm") !== siteName) { 
      toast.error("Please type in the name of your site to confirm deletion.");
      return; 
    }
    setFormData(data);
    setIsDialogOpen(true); // Open the DeleteDialogHero instead of confirming
  };

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteSite(formData, id, "delete");
      if (res.error) {
        toast.error(res.error);
      } else {
        va.track("Deleted Site");
        router.refresh();
        router.push(`/sites`);
        toast.success(`Successfully deleted site!`);
      }
      setIsDialogOpen(false); // Close the dialog after deletion
    })
  };
  
  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        // action={async (data: FormData) =>
        //   window.confirm("Are you sure you want to delete your site?") &&
        //   deleteSite(data, id, "delete")
        //     .then(async (res) => {
        //       if (res.error) {
        //         toast.error(res.error);
        //       } else {
        //         va.track("Deleted Site");
        //         router.refresh();
        //         router.push("/sites");
        //         toast.success(`Successfully deleted site!`);
        //       }
        //     })
        //     .catch((err: Error) => toast.error(err.message))
        // }
        className="rounded-lg border border-red-600 bg-white dark:bg-zinc-900"
      >
        <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
          <h2 className="font-cal text-xl dark:text-white">Delete Site</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Deletes your site and all posts associated with it. Type in the name
            of your site <b>{siteName}</b> to confirm.
          </p>

          <input
            name="confirm"
            type="text"
            // required
            // pattern={siteName}
            placeholder={siteName}
            className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600"
          />
        </div>

        <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-center text-sm text-stone-500 dark:text-zinc-400">
            This action is irreversible. Please proceed with caution.
          </p>
          <div className="w-32">
            <FormButton pending={isPending}/>
          </div>
        </div>
      </form>
      <SiteDeleteDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onConfirm={handleDelete} 
      />
    </>
  );
}

interface FormButtonProps {
  pending: boolean; // Define the type for the pending prop
}

function FormButton({ pending }: FormButtonProps) {
  // const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
          : "border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 dark:hover:bg-zinc-900",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Confirm Delete</p>}
    </button>
  );
}

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; 
  // onConfirm: () => Promise<void>;
}

export const SiteDeleteDialog = ({isOpen, onClose, onConfirm}: DeleteDialogProps) => (
  <div className="flex justify-center">
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg dark:bg-zinc-900 dark:border-zinc-700">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Delete Site</DialogTitle>
          <DialogDescription className="mt-1 text-sm leading-6 dark:text-zinc-400">
            Are you sure you want to delete your site and menus? This action is irreversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row mt-6 gap-3 md:gap-0">
          <DialogClose asChild>
            <button
               className="flex h-8 w-full px-5 items-center justify-center sm:w-fit space-x-2 rounded-lg border text-sm transition-all focus:outline-none sm:h-9 
               border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:active:bg-zinc-700" 
              // onClick={onClose}
            >
              Go back
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button 
              className="flex h-8 w-full px-5 items-center justify-center sm:w-fit space-x-2 rounded-lg border text-sm transition-all focus:outline-none sm:h-9 
               border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:active:bg-zinc-700" 
              onClick={() => {
                onConfirm()
              }}
            >
              Delete
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
);

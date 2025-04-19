'use client';

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";


export default function FormButton() {
    const { pending } = useFormStatus();
    return (
      <button
        className={cn(
          "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
          pending
            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:active:bg-zinc-700",
        )}
        disabled={pending}
      >
        {pending ? <LoadingDots color="#808080" /> : <p>Save Changes</p>}
      </button>
    );
  }
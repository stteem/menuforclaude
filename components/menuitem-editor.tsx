"use client";

import { useEffect, useState, useTransition } from "react";
import { updateMenuItem, updateMenuItemMetadata } from "@/lib/actions";
// import { Editor as NovelEditor } from "novel";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import LoadingDots from "./icons/loading-dots";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import type { SelectMenu, SelectMenuItem } from "@/lib/schema";
import Form from "./form";
import FormButton from "./form/form-button";

// type MenuItemWithMenu = SelectMenuItem & { menu: { restaurantId: string | null } | null };

export default function MenuItemEditor({ menuitem }: { menuitem: SelectMenuItem }) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<SelectMenuItem>(menuitem);

  useEffect(() => {
    setData(menuitem);
  }, [menuitem]);
//   const [hydrated, setHydrated] = useState(false);

//   const url = process.env.NEXT_PUBLIC_VERCEL_ENV
//     ? `https://${data.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.id}`
//     : `http://${data.restaurant?.subdomain}.localhost:3000/${data.id}`;

  // listen to CMD + S and override the default behavior
//   useEffect(() => {
//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.metaKey && e.key === "s") {
//         e.preventDefault();
//         startTransitionSaving(async () => {
//           await updateMenuItems(data);
//         });
//       }
//     };
//     document.addEventListener("keydown", onKeyDown);
//     return () => {
//       document.removeEventListener("keydown", onKeyDown);
//     };
//   }, [data, startTransitionSaving]);

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg dark:border-stone-700">
      <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
        {/* {data.published && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )} */}
        <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500">
          {isPendingSaving ? "Saving..." : "Saved"}
        </div>
        <button
          onClick={() => {
            if(!data.name?.length){
              toast.error("Item name is required.");
              return;
            }
            if(!data.price){
              toast.error("Item price is required.");
              return;
            }
            const formData = new FormData();
            formData.append("published", String(!data.published));
            startTransitionPublishing(async () => {
              await updateMenuItemMetadata(formData, menuitem.id, "published").then(
                () => {
                  toast.success(
                    `Successfully ${
                      data.published ? "unpublished" : "published"
                    } your menu.`,
                  );
                  setData((prev) => ({ ...prev, published: !prev.published }));
                },
              );
            });
          }}
          className={cn(
            "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none",
            isPendingPublishing
              ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
              : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
          )}
          disabled={isPendingPublishing}
        >
          {isPendingPublishing ? (
            <LoadingDots />
          ) : (
            <p>{data.published ? "Unpublish" : "Publish"}</p>
          )}
        </button>
      </div>
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
        <form action={() => {
          startTransitionSaving(async () => {
            if(!data.name?.length) {
              toast.error("Item name is required.");
              return;
            }
            if(data.name === menuitem.name && 
                data.description === menuitem.description &&
                data.price === menuitem.price) {
              toast.error("No changes detected.");
              return;
            }
            await updateMenuItem(data);
            toast.success("Menu item updated successfully.");
          });
        }}
        className="flex flex-col gap-5"
        >
          <input
            type="text"
            placeholder="Name (required)"
            defaultValue={menuitem?.name || ""}
            autoFocus
            required
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="dark:placeholder-text-600 border-none px-0 text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
          />
          <input
            type="text"
            placeholder="$0"
            defaultValue={menuitem?.price || ""}
            autoFocus
            required
            onChange={(e) => setData({ ...data, price: e.target.value })}
            className="dark:placeholder-text-600 border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
          />
          <TextareaAutosize
            placeholder="Description (optional)"
            defaultValue={menuitem?.description || ""}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
          />
          <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-stone-700 dark:bg-stone-800">
            <p className="text-sm text-stone-500 dark:text-stone-400">Add menu name and description!</p>
            <FormButton />
          </div>
        </form>
        <Form
          title="Banner image (optional)"
          description="The thumbnail image for your site. Accepted formats: .png, .jpg, .jpeg"
          helpText="Max file size 50MB. Recommended size 1200x630."
          inputAttrs={{
            name: "image",
            type: "file",
            defaultValue: data?.imageUrl!,
          }}
          handleSubmit={updateMenuItemMetadata}
        />

      </div>
    </div>
  );
}
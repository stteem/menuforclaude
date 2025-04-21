"use client";

import { useEffect, useState, useTransition } from "react";
import { updateMenuItem, updateMenuItemMetadata } from "@/lib/actions";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import LoadingDots from "./icons/loading-dots";
// import { toast } from "sonner";
import type { SelectMenuItem } from "@/lib/schema";
import Form from "./form";
import FormButton from "./form/form-button";
import { useToast } from '@/lib/hooks/use-toast';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function MenuItemEditor({ menuitem }: { menuitem: SelectMenuItem }) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<SelectMenuItem>(menuitem);
  const { showToast } = useToast();
  const [checkSwitch, setCheckSwitch] = useState(false);

  useEffect(() => {
    if(data.promo === null) {
      setCheckSwitch(false);
    }
    else {
      setCheckSwitch(true);
    }
  }, [data]);

  useEffect(() => {
    // console.log({checkSwitch})
    if(!checkSwitch) {
      setData((prev) => ({ ...prev, promo: null }))
    }
  },[checkSwitch])

  useEffect(() => {
    setData(menuitem);
  }, [menuitem]);

  const handleSave = () => {
    startTransitionSaving(async () => {
      if(!data.name?.length) {
        showToast("Item name is required.", "error");
        return;
      }

      if(data.name === menuitem.name && 
          data.description === menuitem.description &&
          data.price === menuitem.price && 
          data.promo === menuitem.promo) {
            showToast("No changes detected.", "error");
        return;
      }

      const response = await updateMenuItem(data);

      if ('error' in response) {
        showToast("Failed to update menu item.", "error");
        return;
      }
      setData(response)
      showToast("Menu item updated successfully.", "success");
    });
  }

  const handlePublish = () => {
    if(!data.name?.length){
      showToast("Item name is required.", "error");
      return;
    }
    if(!data.price){
      showToast("Item price is required.", "error");
      return;
    }
    const formData = new FormData();
    formData.append("published", String(!data.published));
    startTransitionPublishing(async () => {
      await updateMenuItemMetadata(formData, menuitem.id, "published").then(
        () => {
          showToast(`Successfully ${
              data.published ? "unpublished" : "published"
            } your menu.`, "success");
          setData((prev) => ({ ...prev, published: !prev.published }));
        },
      )
      .catch((error) => {
        showToast(`Failed to ${data.published ? "unpublish" : "publish"} menu item: Server error`, "error");
      });
    });
  }

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
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
        <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-zinc-800 dark:text-zinc-400">
          {isPendingSaving ? "Saving..." : "Saved"}
        </div>
        <button
          onClick={handlePublish}
          className={cn(
            "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none",
            isPendingPublishing
              ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              : data.published 
                ? "border border-stone-200 bg-stone-100 text-stone-600 hover:bg-white hover:text-stone-800 active:bg-stone-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:hover:text-zinc-200 dark:active:bg-zinc-800"
                : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-zinc-700 dark:hover:border-zinc-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-zinc-800",
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
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
          className="flex flex-col gap-5 dark:text-white"
        >
          <input
            type="text"
            placeholder="Name (required)"
            defaultValue={menuitem.name || ""}
            autoFocus
            required
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full max-w-md border-none px-0 text-3xl placeholder:text-stone-400 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-600 dark:focus:ring-zinc-500"
          />
          <input
            type="text"
            placeholder="$0"
            defaultValue={menuitem.price || ""}
            autoFocus
            required
            onChange={(e) => setData({ ...data, price: e.target.value })}
            className="w-full max-w-md border-none px-0 placeholder:text-stone-400 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-600 dark:focus:ring-zinc-500"
          />
          <div className="flex items-center gap-3">
            <Label htmlFor="promo" className="text-base text-stone-600 dark:text-stone-300">{checkSwitch ? "Added promo" : "Add promo"}</Label>
            <Switch 
                id="promo" 
                checked={checkSwitch} 
                onCheckedChange={setCheckSwitch} 
            />
            {checkSwitch  &&
              <input
                type="text"
                placeholder="$0"
                defaultValue={menuitem.promo || ""}
                autoFocus
                required
                onChange={(e) => setData({ ...data, promo: e.target.value })}
                className="w-full max-w-md border-none px-0 placeholder:text-stone-400 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-600 dark:focus:ring-zinc-500"
              />
            }
        </div>
          
          <TextareaAutosize
            placeholder="Description (optional)"
            defaultValue={menuitem.description || ""}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full resize-none border-none px-0 placeholder:text-stone-400 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-600 dark:focus:ring-zinc-500"
          />
          <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-zinc-700 dark:bg-zinc-800">
            <p className="text-sm text-stone-500 dark:text-zinc-400">Add menu name and description!</p>
            <FormButton />
          </div>
        </form>
        <Form
          title="Item image (optional)"
          description="The thumbnail image for your menu item. Accepted formats: .png, .jpg, .jpeg"
          helpText="Max file size 5MB. Recommended size 1200x630."
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
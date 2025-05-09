"use client";

import { useEffect, useState, useTransition } from "react";
import { updateMenu, updateMenuMetadata } from "@/lib/actions";
// import { Editor as NovelEditor } from "novel";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import LoadingDots from "./icons/loading-dots";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import type { SelectMenu } from "@/lib/schema";
import Form from "./form";
import FormButton from "./form/form-button";

type MenuWithRestaurant = SelectMenu & { restaurant: { subdomain: string | null } | null };

export default function MenuEditor({ menu }: { menu: MenuWithRestaurant }) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<MenuWithRestaurant>(menu);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(menu);
  }, [menu]);

  const url = process.env.NEXT_PUBLIC_VERCEL_ENV
    ? `https://${data.restaurant?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.id}`
    : `http://${data.restaurant?.subdomain}.localhost:3000/${data.id}`;

  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "s") {
        e.preventDefault();
        startTransitionSaving(async () => {
          await updateMenu(data);
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [data, startTransitionSaving]);

  return (
    <div className="relative top-14 md:top-0 min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
        {data.published && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-zinc-800 dark:text-zinc-400">
          {isPendingSaving ? "Saving..." : "Saved"}
        </div>
        <button
          onClick={() => {
            if(!data.title?.length){
              toast.error("Menu name is required.");
              return;
            }
            const formData = new FormData();
            formData.append("published", String(!data.published));
            startTransitionPublishing(async () => {
              await updateMenuMetadata(formData, menu.id, "published").then(
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
              ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:active:bg-zinc-700",
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
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-zinc-700">
        <form action={() => {
          startTransitionSaving(async () => {
            if(!data.title?.length) {
              toast.error("Menu name is required.");
              return;
            }
            if(data.title === menu.title && data.description === menu.description) {
              toast.error("No changes detected.");
              return;
            }
            await updateMenu(data);
            toast.success("Menu updated successfully.");
          });
        }}>
          <input
            type="text"
            placeholder="Menu Name (Required)"
            defaultValue={menu?.title || ""}
            autoFocus
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="dark:placeholder-text-600 border-none px-0 font-cal text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-zinc-900 dark:text-white"
          />
          <TextareaAutosize
            placeholder="Description (Optional)"
            defaultValue={menu?.description || ""}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-zinc-900 dark:text-white"
          />
          <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-zinc-700 dark:bg-zinc-800">
            <p className="text-sm text-stone-500 dark:text-zinc-400">Add menu name and description!</p>
            <FormButton />
          </div>
        </form>
        <Form
          title="Banner image"
          description="The banner and thumbnail image for your menu. Accepted formats: .png, .jpg, .jpeg"
          helpText="Max file size 5MB. Recommended size 1200x630."
          inputAttrs={{
            name: "image",
            type: "file",
            defaultValue: data?.image!,
          }}
          handleSubmit={updateMenuMetadata}
        />

      </div>
    </div>
  );
}
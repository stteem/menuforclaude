"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import DomainStatus from "./domain-status";
import DomainConfiguration from "./domain-configuration";
import Uploader from "./uploader";
import va from "@vercel/analytics";
import FormButton from "./form-button";

export default function Form({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
}: {
  title: string;
  description: string;
  helpText: string;
  inputAttrs: {
    name: string;
    type: string;
    defaultValue: string;
    placeholder?: string;
    maxLength?: number;
    pattern?: string;
  };
  handleSubmit?: any;
}) {
  const { id } = useParams() as { id?: string };
  const router = useRouter();

  const { update } = useSession();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (
      inputAttrs.name === "customDomain" &&
      inputAttrs.defaultValue &&
      formData.get("customDomain") !== inputAttrs.defaultValue &&
      !confirm("Are you sure you want to change your custom domain?")
    ) {
      return;
    }

    if(inputAttrs.name === "image") {
      const formDataEntries = Array.from(formData.entries());
      const blobParts = formDataEntries.map(([key, value]) => {
          if (value instanceof Blob) {
              return value; // If it's already a Blob, return it
          }
          return new Blob([value.toString()]); // Convert other types to Blob
      });

      const sizeInBytes = new Blob(blobParts).size; // Calculate the size of the FormData
      const sizeInMB = sizeInBytes / (1024 * 1024); // Convert to MB
    
      if(sizeInMB > 5) {
        toast.error("File size exceeds 5MB.");
        return;
      }
    }

    handleSubmit(formData, id, inputAttrs.name).then(async (res: any) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        va.track(`Updated ${inputAttrs.name}`, id ? { id } : {});
        if (id) {
          router.refresh();
        } else {
          await update();
          router.refresh();
        }
        toast.success(`Successfully updated ${inputAttrs.name}!`);
      }
    });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="rounded-lg border border-stone-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="font-cal text-xl dark:text-white">{title}</h2>
        <p className="text-sm text-stone-500 dark:text-zinc-400">
          {description}
        </p>
        {inputAttrs.name === "image" || inputAttrs.name === "logo" ? (
          <Uploader
            defaultValue={inputAttrs.defaultValue}
            name={inputAttrs.name}
          />
        ) : inputAttrs.name === "font" ? (
          <div className="flex max-w-sm items-center overflow-hidden rounded-lg border border-stone-600">
            <select
              name="font"
              defaultValue={inputAttrs.defaultValue}
              className="w-full rounded-none border-none bg-white px-4 py-2 text-sm font-medium text-stone-700 focus:outline-none focus:ring-black dark:bg-zinc-900 dark:text-zinc-200 dark:focus:ring-white"
            >
              <option value="font-cal">Cal Sans</option>
              <option value="font-lora">Lora</option>
              <option value="font-work">Work Sans</option>
            </select>
          </div>
        ) : inputAttrs.name === "subdomain" ? (
          <div className="flex w-full max-w-md">
            <input
              {...inputAttrs}
              required
              className="z-10 flex-1 rounded-l-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-700"
            />
            <div className="flex items-center rounded-r-md border border-l-0 border-stone-300 bg-stone-100 px-3 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {process.env.NEXT_PUBLIC_ROOT_DOMAIN}
            </div>
          </div>
        ) : inputAttrs.name === "customDomain" ? (
          <div className="relative flex w-full max-w-md">
            <input
              {...inputAttrs}
              className="z-10 flex-1 rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-700"
            />
            {inputAttrs.defaultValue && (
              <div className="absolute right-3 z-10 flex h-full items-center">
                <DomainStatus domain={inputAttrs.defaultValue} />
              </div>
            )}
          </div>
        ) : inputAttrs.name === "description" ? (
          <textarea
            {...inputAttrs}
            rows={3}
            required
            className="w-full max-w-xl rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-700"
          />
        ) : (
          <input
            {...inputAttrs}
            required
            className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-700"
          />
        )}
      </div>
      {inputAttrs.name === "customDomain" && inputAttrs.defaultValue && (
        <DomainConfiguration domain={inputAttrs.defaultValue} />
      )}
      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-sm text-stone-500 dark:text-zinc-400">{helpText}</p>
        <FormButton />
      </div>
    </form>
  );
}



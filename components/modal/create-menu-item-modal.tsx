"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createMenuItem } from "@/lib/actions";
import { useModal } from "./provider";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import LoadingDots from "@/components/icons/loading-dots";
import va from "@vercel/analytics";
// import Form from "../form";
// import { SelectMenuItem } from "@/lib/schema";
import Uploader from "../form/uploader";

export default function CreateMenuItemModal() {
  const modal = useModal();
  const [data, setData] = useState<{
    title: string;
    description: string;
    price: string;
    image: File | null;
  }>({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  
  const [isPending, startTransition] = useTransition();

  const { id } = useParams() as { id: string };
  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
        
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        if (data.image) {
          formData.append("image", data.image);
        }
       
        const response = await createMenuItem(formData, id, null);
    
        if (response.error) {
          toast.error(response.error);
          return
        } else {
            va.track("Created Menu item");
            toast.success("Menu item created successfully!");
          if (modal) { // Check if modal is defined
            modal.hide();
          }
        }
    })

  };

  return (
    <div 
      className="w-full rounded-md overflow-auto bg-white md:max-w-md md:border md:border-stone-200 md:shadow dark:bg-black dark:md:border-stone-700"
    >
      <form onSubmit={handleSubmit} 
        className="relative flex flex-col space-y-4 p-5 md:p-10"
      >
        <h2 className="font-cal text-2xl dark:text-white">Create Menu Item</h2>
        <div className="flex flex-col space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            required
            className="border rounded-md p-2"
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="border rounded-md p-2"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
            required
            className="border rounded-md p-2"
          />
          {/* <input
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null; // Use optional chaining and default to null
              setData({ ...data, image: file });
            }}
            className="border rounded-md p-2"
          /> */}
        </div>
        <Uploader
            defaultValue={data.image ? URL.createObjectURL(data.image) : ""}
            name="image"
        />
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className={`flex items-center justify-center rounded-md border text-sm transition-all ${isPending ? "cursor-not-allowed" : "bg-black text-white hover:bg-white hover:text-black"}`}
            disabled={isPending}
          >
            {isPending ? <LoadingDots color="#808080" /> : "Create Menu Item"}
          </button>
        </div>
      </form>
    </div>
  );
} 
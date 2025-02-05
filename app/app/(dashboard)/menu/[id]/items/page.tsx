import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
// import Form from "@/components/form";
// import { updateRestaurantMetadata, updateMenuItemMetadata } from "@/lib/actions";
// import DeleteRestaurantForm from "@/components/form/delete-post-form";
import db from "@/lib/db";
import Image from "next/image";
import CreateMenuItemButton from "@/components/create-menuitem-button";
import BlurImage from "@/components/blur-image";
import { placeholderBlurhash } from "@/lib/utils";
import { Edit3 } from "lucide-react";
import Link from "next/link";
import MenuItemCard from "@/components/menuitem-card";
import { InfoIcon } from "lucide-react";



export default async function MenuItems( 
    props: {
        params: Promise<{ id: string }>;
    }
)   {
    const param = await props.params;
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }

    const data = await db.query.menuItems.findMany({
        where: (menuItems, { eq }) => eq(menuItems.menuId, decodeURIComponent(param.id)),
    });
    // console.log({data, id})
    if (!data.length) {
        return(
            <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
                <div className="flex flex-col justify-center items-center w-full space-y-6">
                    {/* <h1 className="font-cal text-3xl font-bold dark:text-white">Menu items not found</h1> */}
                    <p className="dark:text-white">You have not added menu items yet, add a menu item.</p>
                    <Image
                        alt="missing site"
                        src="https://illustrations.popsy.co/gray/falling.svg"
                        width={400}
                        height={400}
                    />
                    <CreateMenuItemButton />
                </div>
            </div>
        )
    }

    return (
        <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
            <div className="flex justify-end items-center w-full">
                <CreateMenuItemButton />
            </div>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-row items-center gap-2">
                    <h1 className="font-cal text-3xl font-bold dark:text-white">Menu Items</h1>
                    <span className="bottom-4 text-white">
                        <InfoIcon color="white" size={18}/>
                    </span>
                </div>
                {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1"></div> */}
                <div className="grid grid-cols-1 gap-4">
                    {data.map((item, index) => (
                        <MenuItemCard key={index} data={item}/>
                        // <div key={item.id} className="bg-white dark:bg-stone-800 rounded-lg shadow-md p-4">
                        //     <h2 className="font-cal text-xl font-bold dark:text-white">{item.name}</h2>
                        //     <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
                        //     <p className="font-bold dark:text-white">${item.price}</p>
                        //     {/* <Image 
                        //         src={item.imageUrl ? item.imageUrl : "/placeholder.png"} 
                        //         alt={item.name ? item.name : ""} 
                        //         className="w-full h-48 object-cover rounded-md" 
                        //         width={500}
                        //         height={200}
                        //     /> */}
                        //     <BlurImage
                        //         alt={item.name ?? "Item thumbnail"}
                        //         width={500}
                        //         height={200}
                        //         className="w-full h-48 object-cover rounded-md"
                        //         src={item.imageUrl ?? "/placeholder.png"}
                        //         placeholder="blur"
                        //         blurDataURL={item.imageBlurhash ?? placeholderBlurhash}
                        //     />
                        //     <div className="flex justify-between items-center">
                        //         <Link className="dark:text-gray-400" href={`/menuitem/${item.id}`}><Edit3 width={18} /></Link>
                        //         {/* <button>Edit</button> */}
                        //         <button>Delete</button>
                        //     </div>
                        // </div>
                    ))}
                </div>
            </div>
        </div>
    )

//   return (
//     <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
//       <div className="flex flex-col space-y-6">
//         <h1 className="font-cal text-3xl font-bold dark:text-white">
//           Restaurant Settings
//         </h1>
//         <Form
//           title="Item Name"
//           description="The name of your menu item."
//           helpText="Please use a name that is unique to this restaurant."
//           inputAttrs={{
//             name: "name",
//             type: "text",
//             defaultValue: '',
//             placeholder: "Item Name",
//           }}
//           handleSubmit={updateMenuItemMetadata}
//         />

//         <Form
//           title="Description"
//           description="The description for your menu item."
//           helpText="Please use a description that is unique to this item."
//           inputAttrs={{
//             name: "description",
//             type: "text",
//             defaultValue: '',
//             placeholder: "Description (Optional)",
//           }}
//           handleSubmit={updateMenuItemMetadata}
//         />

//         <Form
//           title="Price"
//           description="The price for your menu item."
//           helpText="Please use a price that is unique to this item."
//           inputAttrs={{
//             name: "price",
//             type: "text",
//             defaultValue: '',
//             placeholder: "Price (Required)",
//           }}
//           handleSubmit={updateMenuItemMetadata}
//         />

//         <Form
//           title="Thumbnail Image"
//           description="The thumbnail image for your restaurant. Accepted formats: .png, .jpg, .jpeg"
//           helpText="Max file size 50MB. Recommended size 1200x630."
//           inputAttrs={{
//             name: "image",
//             type: "file",
//             defaultValue: '',
//           }}
//           handleSubmit={updateMenuItemMetadata}
//         />

//         {/* <DeleteRestaurantForm restaurantName={data?.name!} /> */}
//       </div>
//     </div>
//   );
}
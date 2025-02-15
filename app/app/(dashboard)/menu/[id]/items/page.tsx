import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
// import Form from "@/components/form";
// import { updateRestaurantMetadata, updateMenuItemMetadata } from "@/lib/actions";
// import DeleteRestaurantForm from "@/components/form/delete-post-form";
import db from "@/lib/db";
import Image from "next/image";
import CreateMenuItemButton from "@/components/create-menuitem-button";
import { placeholderBlurhash } from "@/lib/utils";
import Link from "next/link";
import MenuItemCard from "@/components/menuitem-card";



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
        <div className="flex absolute top-16 md:relative md:top-0 max-w-screen-xl flex-col space-y-12 p-6">
            {/* <div className="flex justify-end items-center w-full">
                <CreateMenuItemButton />
            </div> */}
            <div className="flex flex-col space-y-6">
                <div className="flex flex-row justify-between items-center gap-2">
                    <h1 className="font-cal text-3xl font-bold dark:text-white">Menu Items</h1>
                    <CreateMenuItemButton />
                </div>
                {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1"></div> */}
                <div className="grid grid-cols-1 gap-4">
                    {data.map((item, index) => (
                        <MenuItemCard key={index} data={item} source="admin" />
                    ))}
                </div>
            </div>
        </div>
    )
}
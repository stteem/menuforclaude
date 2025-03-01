// 'use client'
import React from 'react';
import { redirect } from "next/navigation";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import MenuItemCard from "@/components/menuitem-card";
import { SelectMenuItem } from '@/lib/schema';
// import { InfoIcon } from "lucide-react";


interface MenuItemsProps {
    items: SelectMenuItem[];
}

const MenuItems: React.FC<MenuItemsProps> = async ({ items }) => {
    // const data = await db.query.menuItems.findMany({
    //     where: (menuItems, { eq }) => eq(menuItems.menuId, menuId) && eq(menuItems.published, true),
    //     orderBy: (menuItems, { asc }) => [asc(menuItems.promo)],
    // });
    // console.log({data, id})
    if (!items.length) {
        return(
            <div className="flex w-full max-w-screen-xl flex-col space-y-12 p-6">
                <div className="flex flex-col justify-center items-center w-full space-y-6">
                    {/* <h1 className="font-cal text-3xl font-bold dark:text-white">Menu items not found</h1> */}
                    <p className="dark:text-white">There are no items in this menu.</p>
                    <Image
                        alt="missing site"
                        src="https://illustrations.popsy.co/gray/falling.svg"
                        width={400}
                        height={400}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="flex max-w-screen-xl flex-col gap-10 space-y-12 p-2">
            <div className="flex flex-col justify-center items-center space-y-6">
                {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1"></div> */}
                <div className="grid w-full md:w-[80%] grid-cols-1 gap-4">
                    {items.map((item, index) => (
                        <MenuItemCard key={index} data={item} source="domain"/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MenuItems;
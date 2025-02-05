import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import MenuItemEditor from "@/components/menuitem-editor";
import db from "@/lib/db";

export default async function MenuItemsPage(props: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const { id } = await props.params;
  const menuitem = await db.query.menuItems.findFirst({
    where: (menuItems, { eq }) => eq(menuItems.id, decodeURIComponent(id)),
    // with: {
    //   menu: {
    //     columns: {
    //       // id: true,
    //       // restaurantId: true,
    //       userId: true,
    //     },
    //   },
    // },
  });
  const user = session?.user.id
  // console.log({menuitem, user})

  if (!menuitem || menuitem?.userId !== session?.user.id) {
    notFound();
  }

  return <MenuItemEditor menuitem={menuitem} />;
}

import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Editor from "@/components/editor";
import db from "@/lib/db";

export default async function MenuPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const { id } = await params;
  const menu = await db.query.menus.findFirst({
    where: (menus, { eq }) => eq(menus.id, decodeURIComponent(id)),
    with: {
      restaurant: {
        columns: {
          subdomain: true,
          userId: true,
        },
      },
    },
  });

  if (!menu || menu.restaurant.userId !== session.user.id) {
    notFound();
  }

  return <Editor menu={menu} />;
}

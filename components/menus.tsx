import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import MenuCard from "./menu-card";

export default async function Menus({
  restaurantId,
  limit,
}: {
  restaurantId?: string;
  limit?: number;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  const menus = await db.query.menus.findMany({
    where: (menus, { and, eq }) =>
      and(
        eq(menus.userId, session.user.id),
        restaurantId ? eq(menus.restaurantId, restaurantId) : undefined,
      ),
    with: {
      restaurant: true,
    },
    orderBy: (menus, { desc }) => desc(menus.updatedAt),
    ...(limit ? { limit } : {}),
  });

  return menus.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {menus.map((menu) => (
        <MenuCard key={menu.id} data={{...menu, subdomain: menu.restaurant.subdomain}} source="admin"/>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Menus Yet</h1>
      <Image
        alt="missing post"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any menus yet. Create one to get started.
      </p>
    </div>
  );
}

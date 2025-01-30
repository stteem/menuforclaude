import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Form from "@/components/form";
import { updateRestaurantMetadata } from "@/lib/actions";
import DeleteRestaurantForm from "@/components/form/delete-post-form";
import db from "@/lib/db";

export default async function RestaurantSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await db.query.restaurants.findFirst({
    where: (restaurants, { eq }) => eq(restaurants.id, decodeURIComponent(params.id)),
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Restaurant Settings
        </h1>
        <Form
          title="Restaurant Name"
          description="The name of your restaurant."
          helpText="Please use a name that is unique to this restaurant."
          inputAttrs={{
            name: "name",
            type: "text",
            defaultValue: data?.name!,
            placeholder: "Restaurant Name",
          }}
          handleSubmit={updateRestaurantMetadata}
        />

        <Form
          title="Subdomain"
          description="The subdomain for your restaurant."
          helpText="Please use a subdomain that is unique to this restaurant."
          inputAttrs={{
            name: "subdomain",
            type: "text",
            defaultValue: data?.subdomain!,
            placeholder: "subdomain",
          }}
          handleSubmit={updateRestaurantMetadata}
        />

        <Form
          title="Thumbnail Image"
          description="The thumbnail image for your restaurant. Accepted formats: .png, .jpg, .jpeg"
          helpText="Max file size 50MB. Recommended size 1200x630."
          inputAttrs={{
            name: "image",
            type: "file",
            defaultValue: data?.image!,
          }}
          handleSubmit={updateRestaurantMetadata}
        />

        <DeleteRestaurantForm restaurantName={data?.name!} />
      </div>
    </div>
  );
}
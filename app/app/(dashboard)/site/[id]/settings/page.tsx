import Form from "@/components/form";
import { updateRestaurantMetadata } from "@/lib/actions";
import DeleteSiteForm from "@/components/form/delete-site-form";
import db from "@/lib/db";

export default async function SiteSettingsIndex(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const data = await db.query.restaurants.findFirst({
    where: (restaurants, { eq }) => eq(restaurants.id, decodeURIComponent(params.id)),
  });

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Name"
        description="The name of your restaurant/site. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.name!,
          placeholder: "My Awesome Site",
          maxLength: 32,
        }}
        handleSubmit={updateRestaurantMetadata}
      />

      <Form
        title="Description"
        description="The description of your site. This will be used as the meta description on Google as well."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder: "A blog about really interesting things.",
        }}
        handleSubmit={updateRestaurantMetadata}
      />

      <DeleteSiteForm siteName={data?.name!} />
    </div>
  );
}

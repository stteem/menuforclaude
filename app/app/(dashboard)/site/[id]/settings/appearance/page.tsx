import Form from "@/components/form";
import { updateRestaurantMetadata } from "@/lib/actions";
import db from "@/lib/db";

export default async function SiteSettingsAppearance(
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
        title="Thumbnail image"
        description="The Banner and thumbnail image for your site. Accepted formats: .png, .jpg, .jpeg"
        helpText="Max file size 50MB. Recommended size 1200x630."
        inputAttrs={{
          name: "image",
          type: "file",
          defaultValue: data?.image!,
        }}
        handleSubmit={updateRestaurantMetadata}
      />
      <Form
        title="Logo"
        description="The logo for your site. Accepted formats: .png, .jpg, .jpeg"
        helpText="Max file size 50MB. Recommended size 400x400."
        inputAttrs={{
          name: "logo",
          type: "file",
          defaultValue: data?.logo!,
        }}
        handleSubmit={updateRestaurantMetadata}
      />
      <Form
        title="Font"
        description="The font for the heading text your site."
        helpText="Please select a font."
        inputAttrs={{
          name: "font",
          type: "select",
          defaultValue: data?.font!,
        }}
        handleSubmit={updateRestaurantMetadata}
      />
      <Form
        title="404 Page Message"
        description="Message to be displayed on the 404 page."
        helpText="Please use 240 characters maximum."
        inputAttrs={{
          name: "message404",
          type: "text",
          defaultValue: data?.message404!,
          placeholder: "Blimey! You've found a page that doesn't exist.",
          maxLength: 240,
        }}
        handleSubmit={updateRestaurantMetadata}
      />
    </div>
  );
}

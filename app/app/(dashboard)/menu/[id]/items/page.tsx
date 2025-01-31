// import { getSession } from "@/lib/auth";
// import { notFound, redirect } from "next/navigation";
// import Form from "@/components/form";
// import { updateRestaurantMetadata, updateMenuItemMetadata } from "@/lib/actions";
// import DeleteRestaurantForm from "@/components/form/delete-post-form";
// import db from "@/lib/db";

// export default async function MenuItems({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const session = await getSession();
//   if (!session) {
//     redirect("/login");
//   }

// //   const data = await db.query.menuItems.findFirst({
// //     where: (menuItems, { eq }) => eq(menuItems.menuId, decodeURIComponent(params.id)),
// //   });
// //   console.log(data, params.id)
// //   if (!data || data.menuId !== params.id) {
// //     notFound();
// //   }

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
// }
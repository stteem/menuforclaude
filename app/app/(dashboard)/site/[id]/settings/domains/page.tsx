import Form from "@/components/form";
import { updateRestaurantMetadata } from "@/lib/actions";
import db from "@/lib/db";

export default async function SiteSettingsDomains(
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
        title="Subdomain"
        description="The subdomain for your site."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "subdomain",
          type: "text",
          defaultValue: data?.subdomain!,
          placeholder: "subdomain",
          maxLength: 32,
        }}
        handleSubmit={updateRestaurantMetadata}
      />
      <h1 className="text-xl font-bold dark:text-white text-black">Follow The Steps Below To Add a Custom Domain</h1>
      <Form
        title="1. Custom Domain"
        description="Add the custom domain for your site."
        helpText="Please enter a valid domain."
        inputAttrs={{
          name: "customDomain",
          type: "text",
          defaultValue: data?.customDomain!,
          placeholder: "yourdomain.com",
          maxLength: 64,
          pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateRestaurantMetadata}
      />
      <div className="flex flex-col border mb-96 gap-5 space-y-4 p-5 sm:p-10 rounded-lg bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700">
        
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold dark:text-white text-black">2. A Record</h2>
          <p className="text-sm dark:text-stone-400 text-black">
            Add an A record for your custom domain to the settings of your DNS provider. It usually takes from 1 hour to 48 hours for newly added DNS records to propagate globally.
          </p>
          <div className="h-auto px-2 py-2 rounded-md w-full md:w-56 text-sm dark:bg-stone-800 dark:text-white text-black">
            Host/name: @
          </div>
          <div className="h-auto px-2 py-2 rounded-md w-full md:w-56 text-sm dark:bg-stone-800 dark:text-white text-black">
            Type: A
          </div>
          <div className="h-auto px-2 py-2 rounded-md w-full md:w-56 text-sm dark:bg-stone-800 dark:text-white text-black">
            Value: 76.76.21.21
          </div>
        </div>
        
        {/* <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold dark:text-white text-black">CNAME Record (Optional)</h2>
          <p className="text-sm dark:text-stone-400 text-black">
            Add a CNAME record for your custom domain to the settings of your DNS provider.
          </p>
          <div className="h-auto px-2 py-2 rounded-md w-full md:w-auto text-sm dark:bg-stone-800 dark:text-white text-black">
            Host/name: Subdomain you want to connect to (e.g. "help", if you want to pick help.yourdomain.com)
          </div>
          <div className="h-auto px-2 py-2 rounded-md w-full md:w-56 text-sm dark:bg-stone-800 dark:text-white text-black">
            Type: CNAME
          </div>
          <div className="h-auto px-2 py-2 rounded-md w-full md:w-56 text-sm dark:bg-stone-800 dark:text-white text-black">
            Value: {data?.subdomain}.vercel-dns.com.
          </div>
        </div> */}
      </div>
    </div>
  );
}

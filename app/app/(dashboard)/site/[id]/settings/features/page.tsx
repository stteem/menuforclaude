import Form from "@/components/form";
import { updateRestaurantMetadata } from "@/lib/actions";
import db from "@/lib/db";
import ReservationSwitch from "./reservation-switch";


export default async function TableReservation(
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
    
      {data && <ReservationSwitch restaurant={data} />}
    </div>
  );
}

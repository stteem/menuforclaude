'use client'

import { useEffect, useState, useTransition } from "react";
import { updateRestaurantMetadata } from "@/lib/actions";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import type { SelectRestaurant } from "@/lib/schema";
import Form from "@/components/form";
import FormButton from "@/components/form/form-button";
import { useToast } from '@/lib/hooks/use-toast';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ReservationSwitch({ restaurant }: { restaurant: SelectRestaurant }) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  const [data, setData] = useState<SelectRestaurant>(restaurant);
  const { showToast } = useToast();
  const [checkSwitch, setCheckSwitch] = useState(false);

  useEffect(() => {
    if(!data.reservation) {
      setCheckSwitch(false);
    }
    else {
      setCheckSwitch(true);
    }
  }, [data]);

  useEffect(() => {
    // console.log({checkSwitch})
    if(!checkSwitch) {
      setData((prev) => ({ ...prev, reservation_deposite: "" }))
    }
  },[checkSwitch])

  useEffect(() => {
    setData(restaurant);
  }, [restaurant]);

  const handleSave = () => {
    startTransitionSaving(async () => {
      if(!data.reservation_deposite?.length) {
        showToast("Deposite amount is required.", "error");
        return;
      }

      if(data.reservation === restaurant.reservation && 
          data.reservation_deposite === restaurant.reservation_deposite ) {
            showToast("No changes detected.", "error");
        return;
      }

    //   const response = await updateRestaurantMetadata(null, restaurant.id, null);

      const response = { reservation: false}

      if ('error' in response) {
        showToast("Failed to update menu item.", "error");
        return;
      }
    //   setData(response);
      setCheckSwitch(response.reservation);
      showToast("Restaurant updated successfully.", "success");
    });
  }

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg dark:border-stone-700">
      <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
        <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500">
          {isPendingSaving ? "Saving..." : "Saved"}
        </div>
       
      </div>
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
          className="flex flex-col gap-5"
        >
          
          <div className="flex flex-col items-start text-white gap-3">
            <Label htmlFor="reservation" className="text-base">{checkSwitch ? `Disable table reservation for ${restaurant.name} ` : `Enable table reservation for ${restaurant.name}`}</Label>
            <Switch 
                id="reservation" 
                style={{ backgroundColor: checkSwitch ? 'gray' : 'transparent' }}
                checked={checkSwitch} 
                // onCheckedChange={setCheckSwitch} 
                onCheckedChange={(checked) => {
                  setCheckSwitch(checked);
                  setData((prev) => ({ ...prev, reservation: checked }));
                }} 
            />

            <Label htmlFor="deposite" className="text-base">Deposit amount (optional)</Label>
                <input
                    id="deposite"
                    type="number"
                    placeholder="Deposit amount"
                    defaultValue={data.reservation_deposite || ""}
                    disabled={!checkSwitch}
                    autoFocus
                    required
                    onChange={(e) => setData({ ...data, reservation_deposite: e.target.value })}
                    className="dark:placeholder-text-600 border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
                />
            
        </div>
          
          <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-stone-700 dark:bg-stone-800">
            <p className="text-sm text-stone-500 dark:text-stone-400">Enable reservation and deposite amount!</p>
            <FormButton />
          </div>
        </form>
      </div>
    </div>
  );
}
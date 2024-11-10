import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, Card, Checkbox, cn, Input } from "@nextui-org/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";

interface Props {
  next: () => void;
  prev: () => void;
  className?: string;
}

const Feature = ({ next, prev, className }: Props) => {
  const handlePrev = () => prev();
  const handleNext = async () => {
    if (
      await trigger([
        "propertFeature.area",
        "propertFeature.bathrooms",
        "propertFeature.bedrooms",
        "propertFeature.parkingSpots",
      ])
    ) {
      next();
    }
  };

  const {
    register,
    formState: { errors },
    control,
    trigger,
    getValues,
  } = useFormContext<AddPropertyInputType>();

  return (
    <Card
      className={cn("p-2 grid grid-cols-1 md:grid-cols-2 gap-3", className)}
    >
      <Input
        {...register("propertFeature.bedrooms")}
        errorMessage={errors.propertFeature?.bedrooms?.message}
        isInvalid={!!errors.propertFeature?.bedrooms}
        label="Bedrooms"
        defaultValue={getValues().propertFeature?.bedrooms.toString()}
      />
      <Input
        {...register("propertFeature.bathrooms")}
        errorMessage={errors.propertFeature?.bathrooms?.message}
        isInvalid={!!errors.propertFeature?.bathrooms}
        label="Bathrooms"
        defaultValue={getValues().propertFeature?.bathrooms.toString()}
      />
      <Input
        {...register("propertFeature.parkingSpots")}
        errorMessage={errors.propertFeature?.parkingSpots?.message}
        isInvalid={!!errors.propertFeature?.parkingSpots}
        label="Parking Spots"
        defaultValue={getValues().propertFeature?.parkingSpots.toString()}
      />
      <Input
        {...register("propertFeature.area")}
        errorMessage={errors.propertFeature?.area?.message}
        isInvalid={!!errors.propertFeature?.area}
        label="Area"
        defaultValue={getValues().propertFeature?.area.toString()}
      />
      <div className="flex items-center justify-between ">
        <Controller
          control={control}
          name="propertFeature.hasSwimmingPool"
          render={({ field }) => (
            <Checkbox
              onChange={field.onChange}
              onBlur={field.onBlur}
              defaultValue={
                getValues().propertFeature?.hasSwimmingPool ? "true" : "false"
              }
            >
              Has Swmimming Pool
            </Checkbox>
          )}
        />
        <Controller
          control={control}
          name="propertFeature.hasGardenYard"
          render={({ field }) => (
            <Checkbox
              defaultValue={
                getValues().propertFeature?.hasGardenYard ? "true" : "false"
              }
              onChange={field.onChange}
              onBlur={field.onBlur}
            >
              Has Grave/Yard
            </Checkbox>
          )}
        />
        <Controller
          control={control}
          name="propertFeature.hasBalcony"
          render={({ field }) => (
            <Checkbox
              defaultValue={
                getValues().propertFeature?.hasBalcony ? "true" : "false"
              }
              onChange={field.onChange}
              onBlur={field.onBlur}
            >
              Has Balcony/Patio
            </Checkbox>
          )}
        />
      </div>
      <div className="flex justify-center col-span-2 gap-3">
        <Button
          onClick={handlePrev}
          startContent={<ChevronLeftIcon className="w-6" />}
          className="w-36"
          color="primary"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          endContent={<ChevronRightIcon className="w-6" />}
          className="w-36"
          color="primary"
        >
          Next
        </Button>
      </div>
    </Card>
  );
};

export default Feature;

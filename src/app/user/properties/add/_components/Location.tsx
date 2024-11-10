import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, Card, cn, Input, Textarea } from "@nextui-org/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";

interface Props {
  next: () => void;
  prev: () => void;
  className?: string;
}
const Location = ({ next, prev, className }: Props) => {
  const handleNext = async () => {
    if (
      await trigger([
        "location.city",
        "location.zip",
        "location.region",
        "location.state",
        "location.streetAddress",
      ])
    ) {
      next();
    }
  };
  const handlePrev = () => prev();
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<AddPropertyInputType>();

  return (
    <Card
      className={cn("p-2 grid grid-cols-1 md:grid-cols-2 gap-3", className)}
    >
      <Input
        {...register("location.streetAddress")}
        errorMessage={errors.location?.streetAddress?.message}
        isInvalid={!!errors.location?.streetAddress}
        label="Street Address"
        defaultValue={getValues().location?.streetAddress}
      />
      <Input
        {...register("location.zip")}
        errorMessage={errors.location?.zip?.message}
        isInvalid={!!errors.location?.zip}
        label="Zip/Postal Code"
        defaultValue={getValues().location?.zip}
      />
      <Input
        {...register("location.city")}
        errorMessage={errors.location?.city?.message}
        isInvalid={!!errors.location?.city}
        label="City"
        defaultValue={getValues().location?.city}
      />
      <Input
        {...register("location.state")}
        errorMessage={errors.location?.state?.message}
        isInvalid={!!errors.location?.state}
        label="State"
        defaultValue={getValues().location?.state}
      />
      <Input
        {...register("location.region")}
        errorMessage={errors.location?.region?.message}
        isInvalid={!!errors.location?.region}
        label="Region/Neighborhood"
        className="col-span-2 "
        defaultValue={getValues().location?.region}
      />
      <Textarea
        {...register("location.landmark")}
        errorMessage={errors.location?.landmark?.message}
        isInvalid={!!errors.location?.landmark}
        label="Landmarks"
        className="col-span-2"
        defaultValue={getValues().location?.landmark}
      />
      <div className="flex justify-center col-span-3 gap-3">
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

export default Location;

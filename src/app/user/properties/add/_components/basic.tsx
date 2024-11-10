import React from "react";

import { PropertyStatus, PropertyType } from "@prisma/client";
import {
  Button,
  Card,
  Input,
  Select,
  SelectItem,
  Textarea,
  cn,
} from "@nextui-org/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";

interface props {
  clasName?: string;
  type: PropertyType[];
  status: PropertyStatus[];
  next: () => void;
}
const Basic = ({ clasName, type, status, next }: props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<AddPropertyInputType>();

  const handleNext = async () => {
    if (await trigger(["name", "description", "typeId", "statusId", "price"])) {
      next();
    }
  };

  return (
    <Card className={cn("gap-3 p-2 grid grid-cols-1 md:grid-cols-3", clasName)}>
      <Input
        {...register("name")}
        errorMessage={errors?.name?.message}
        isInvalid={!!errors.name}
        label="name"
        className="md:col-span-3"
        defaultValue={getValues().name}
      />
      <Textarea
        {...register("description")}
        errorMessage={errors?.description?.message}
        isInvalid={!!errors.description}
        label="Description"
        className="md:col-span-3"
        defaultValue={getValues().description}
      />
      <Select
        {...register("typeId")}
        errorMessage={errors?.typeId?.message}
        isInvalid={!!errors.typeId}
        label="Type"
        selectionMode="single"
        defaultSelectedKeys={[getValues().typeId]}
      >
        {type.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.value}
          </SelectItem>
        ))}
      </Select>
      <Select
        {...register("statusId")}
        errorMessage={errors?.statusId?.message}
        isInvalid={!!errors.statusId}
        label="Status"
        selectionMode="single"
        defaultSelectedKeys={[getValues().statusId]}
      >
        {status.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.value}
          </SelectItem>
        ))}
      </Select>
      <Input
        {...register("price")}
        errorMessage={errors?.price?.message}
        isInvalid={!!errors.price}
        label="price"
        defaultValue={getValues("price")}
      />
      <div className="flex justify-center col-span-3 gap-3">
        <Button
          isDisabled
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

export default Basic;

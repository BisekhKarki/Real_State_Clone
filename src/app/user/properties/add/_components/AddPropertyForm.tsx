"use client";
import React, { useState } from "react";
import Stepper from "./Stepper";
import Basic from "./basic";
import {
  Prisma,
  Property,
  PropertyImage,
  PropertyStatus,
  PropertyType,
} from "@prisma/client";
import { cn } from "@nextui-org/react";
import Location from "./Location";
import Feature from "./Feature";
import Pictures from "./Pictures";
import Contact from "./Contact";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AddPropertyFormSchema } from "../../../../../lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImages } from "@/lib/upload";
import { editProperty, saveProperty } from "@/lib/action/property";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const steps = [
  {
    label: "Basic",
  },
  {
    label: "location",
  },
  {
    label: "Features",
  },
  {
    label: "Pictures",
  },
  {
    label: "Contact",
  },
];

interface props {
  types: PropertyType[];
  status: PropertyStatus[];
  property?: Prisma.PropertyGetPayload<{
    include: {
      feature: true;
      location: true;
      contact: true;
      images: true;
    };
  }>;
  isEdit?: boolean;
}

export type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>;

const AddPropertyForm = ({
  types,
  status,
  isEdit = false,
  property,
}: props) => {
  const [step, setStep] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [savedImageUrl, setSavedImageUrl] = useState<PropertyImage[]>(
    property?.images ?? []
  );
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const methods = useForm<AddPropertyInputType>({
    resolver: zodResolver(AddPropertyFormSchema),
    defaultValues: {
      contact: property?.contact ?? undefined,
      location: property?.location ?? undefined,
      propertFeature: property?.feature ?? undefined,
      name: property?.name ?? undefined,
      description: property?.description ?? undefined,
      price: property?.price ?? undefined,
      typeId: property?.typeId ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<AddPropertyInputType> = async (data) => {
    const imagesUrl = await uploadImages(images);
    console.log(data);
    try {
      if (isEdit && property) {
        const deletedImageIds = property?.images
          .filter((item) => !savedImageUrl.includes(item))
          .map((item) => item.id);

        await editProperty(property?.id, data, imagesUrl, deletedImageIds);
        toast.success("Property Updated");
      } else {
        await saveProperty(data, imagesUrl, user?.id!);
        toast.success("Property Added");
      }
    } catch (error) {
      toast.error("Property not Added");
      console.log({ error });
    } finally {
      router.push("/user/properties");
    }
  };

  return (
    <div>
      <Stepper items={steps} activeItem={step} setActiveItem={setStep} />
      <FormProvider {...methods}>
        <form
          className="mt-3 p-2"
          onSubmit={methods.handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}
        >
          <Basic
            clasName={cn({ hidden: step !== 0 })}
            next={() => setStep((prev) => prev + 1)}
            type={types}
            status={status}
          />
          <Location
            next={() => setStep((prev) => prev + 1)}
            prev={() => setStep((prev) => prev - 1)}
            className={cn({ hidden: step !== 1 })}
          />
          <Feature
            next={() => setStep((prev) => prev + 1)}
            prev={() => setStep((prev) => prev - 1)}
            className={cn({ hidden: step !== 2 })}
          />
          <Pictures
            next={() => setStep((prev) => prev + 1)}
            prev={() => setStep((prev) => prev - 1)}
            className={cn({ hidden: step !== 3 })}
            images={images}
            setImages={setImages}
            {...(property!! && {
              savedImagesUrl: savedImageUrl,
              setSavedImagesUrl: setSavedImageUrl,
            })}
          />
          <Contact
            prev={() => setStep((prev) => prev - 1)}
            className={cn({ hidden: step !== 4 })}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default AddPropertyForm;

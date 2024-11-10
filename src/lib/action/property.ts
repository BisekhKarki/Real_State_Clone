"use server";
import { AddPropertyInputType } from "@/app/user/properties/add/_components/AddPropertyForm";
import prisma from "../prisma";
import { Property } from "@prisma/client";

export async function saveProperty(
  propertyData: AddPropertyInputType,
  imagesUrls: string[],
  userId: string
) {
  const basic: Omit<Property, "id"> = {
    name: propertyData.name,
    description: propertyData.description,
    price: propertyData.price,
    statusId: propertyData.statusId,
    typeId: propertyData.typeId,
    userId,
  };

  const result = await prisma.property.create({
    data: {
      ...basic,
      location: {
        create: propertyData.location,
      },
      feature: {
        create: propertyData.propertFeature,
      },
      contact: {
        create: propertyData.contact,
      },
      images: {
        create: imagesUrls.map((img) => ({
          url: img,
        })),
      },
    },
  });
  return result;
}

export async function editProperty(
  propertyData: AddPropertyInputType,
  newImagesUrls: string[],
  deletedImagesIds: number[],
  propertyId: number
) {
  const result = await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      name: propertyData.name,
      price: propertyData.price,
      statusId: propertyData.statusId,
      typeId: propertyData.typeId,
      description: propertyData.description,
      contact: {
        update: {
          ...propertyData.contact,
        },
      },
      feature: {
        update: {
          ...propertyData.propertFeature,
        },
      },
      location: {
        update: {
          ...propertyData.location,
        },
      },
      images: {
        create: newImagesUrls.map((img) => ({
          url: img,
        })),
        deleteMany: {
          id: { in: deletedImagesIds },
        },
      },
    },
  });
  return result;
}

export async function deleteProperty(id: number) {
  const result = await prisma.property.delete({
    where: {
      id,
    },
  });
  return result;
}

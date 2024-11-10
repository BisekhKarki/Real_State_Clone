import prisma from "@/lib/prisma";
import React from "react";
import AddPropertyForm from "../../add/_components/AddPropertyForm";
import { notFound, redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface Props {
  params: {
    id: string;
  };
}

const EditPropertyPage = async ({ params }: Props) => {
  const [propertyType, propertyStatus, property] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
    prisma.property.findUnique({
      where: {
        id: +params.id,
      },
      include: {
        location: true,
        feature: true,
        contact: true,
        images: true,
      },
    }),
  ]);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!property) {
    return notFound();
  }

  if (!user || property.userId !== user.id) redirect("/unauthorized");

  return (
    <AddPropertyForm
      types={propertyType}
      status={propertyStatus}
      property={property}
      isEdit={true}
    />
  );
};

export default EditPropertyPage;

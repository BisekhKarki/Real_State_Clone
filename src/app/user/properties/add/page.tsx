import React from "react";
import AddPropertyForm from "./_components/AddPropertyForm";
import prisma from "@/lib/prisma";

const AddPropertyPage = async () => {
  const [propertyType, propertyStatuses] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
  ]);
  return <AddPropertyForm types={propertyType} status={propertyStatuses} />;
};

export default AddPropertyPage;

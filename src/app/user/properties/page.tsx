import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import PropertiesTable from "./_components/PropertiesTable";

const PAGE_SIZE = 12;

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PropertyPage = async ({ searchParams }: Props) => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  const pagenum = searchParams.pagenum ?? 0;
  const propertiesPromise = prisma.property.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      type: true,
      status: true,
    },
    skip: +pagenum * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalPropertiesPromise = prisma.property.count({
    where: {
      userId: user.id,
    },
  });

  const [properties, totalProperties] = await Promise.all([
    propertiesPromise,
    totalPropertiesPromise,
  ]);
  console.log(properties);
  const totalPages = Math.floor(totalProperties / PAGE_SIZE);

  return (
    <PropertiesTable
      properties={properties}
      totalPages={totalPages}
      currentPage={+pagenum}
    />
  );
};

export default PropertyPage;

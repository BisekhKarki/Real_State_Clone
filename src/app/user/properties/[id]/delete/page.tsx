import SubmitButton from "@/app/Components/SubmitButton";
import { deleteProperty } from "@/lib/action/property";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";

interface props {
  params: { id: string };
}

const DeletePropertyPage = async ({ params }: props) => {
  const { getUser } = getKindeServerSession();
  const propertyPromise = prisma.property.findUnique({
    where: {
      id: +params.id,
    },
  });

  const [property, user] = await Promise.all([propertyPromise, getUser()]);
  if (!property) return notFound();
  if (!user || property.userId !== user.id) redirect("/unauthorized");

  const deleteAction = async () => {
    "use server";
    try {
      await deleteProperty(+params.id);
      redirect("/user/properties");
    } catch (error) {
      throw error;
    }
  };

  return (
    <form
      action={deleteAction}
      className="mt-9 flex flex-col items-center justify-center gap-3"
    >
      <p>Are you sure to delete this property?</p>
      <p>
        <span className="text-slate-400">Name: </span>
        <span className="text-slate-700">{property.name}</span>
      </p>
      <div className="flex justify-center gap-3">
        <Link href={"/user/properties"}>
          <Button>Cancel</Button>
        </Link>
        <SubmitButton type="submit" color="danger" variant="light">
          Delete
        </SubmitButton>
      </div>
    </form>
  );
};

export default DeletePropertyPage;

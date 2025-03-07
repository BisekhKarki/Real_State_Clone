"use client";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { Prisma, Property } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  properties: Prisma.PropertyGetPayload<{
    include: {
      type: true;
      status: true;
    };
  }>[];
  totalPages: number;
  currentPage: number;
};

const PropertiesTable = ({ properties, currentPage, totalPages }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-4 ">
      <Table>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {properties.map((item, index) => (
            <TableRow>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.type.value}</TableCell>
              <TableCell>{item.status.value}</TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Tooltip content="Details">
                    <Link href={`/property/${item.id}`}>
                      <EyeIcon className="w-5  text-slate-500" />
                    </Link>
                  </Tooltip>
                  <Tooltip content="Edit Property" color="warning">
                    <Link href={`/user/properties/${item.id}/edit`}>
                      <PencilIcon className="w-5  text-yellow-500" />
                    </Link>
                  </Tooltip>
                  <Tooltip content="Delete Property" color="danger">
                    <Link href={`/user/properties/${item.id}/delete`}>
                      <TrashIcon className="w-5  text-red-500" />
                    </Link>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        total={totalPages}
        initialPage={1}
        page={currentPage}
        onChange={(page) => router.push(`/user/properties?pagenum=${page}`)}
      />
    </div>
  );
};

export default PropertiesTable;

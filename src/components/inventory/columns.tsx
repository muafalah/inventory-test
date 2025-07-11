"use client";

import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { config } from "@/lib/config";

import { ActionsButton } from "./actions-button";

export type TInventoryList = {
  id: string;
  code: string;
  name: string;
  description: string;
  stockQuantity: number;
  image: string;
};
export const columns = (
  pageIndex: number,
  pageSize: number
): ColumnDef<TInventoryList>[] => [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => (pageIndex - 1) * pageSize + row.index + 1,
  },
  {
    accessorKey: "code",
    header: "Code",
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-[400px] truncate text-ellipsis overflow-hidden">
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "stockQuantity",
    header: "Stock",
    enableSorting: true,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const imageUrl = `${config.IMAGE_BASE_URL}/${image}`;

      if (!image) return "-";

      return (
        <Link href={imageUrl} target="_blank" rel="noopener noreferrer">
          <div className="relative h-12 w-12">
            <Image
              src={imageUrl}
              alt="Image"
              fill
              className="rounded-md object-cover"
            />
          </div>
        </Link>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id as string;

      return <ActionsButton id={id} />;
    },
  },
];

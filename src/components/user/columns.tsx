"use client";

import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { config } from "@/lib/config";

import { ActionsButton } from "./actions-button";

export type TUserList = {
  id: string;
  name: string;
  email: string;
  isImmutable: number;
  image: string;
};

export const columns = (
  pageIndex: number,
  pageSize: number
): ColumnDef<TUserList>[] => [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => (pageIndex - 1) * pageSize + row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
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
              loading="lazy"
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
      const isImmutable = row.original.isImmutable as unknown as boolean;

      return <ActionsButton id={id} isImmutable={isImmutable} />;
    },
  },
];

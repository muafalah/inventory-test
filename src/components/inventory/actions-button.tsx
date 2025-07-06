import React from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Settings, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ActionsButton = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <span className="sr-only">Open menu</span>
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(`/inventory/${id}`)}
        >
          <Eye className="size-4 mr-1" />
          <span>Detail</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(`/inventory/${id}/edit`)}
        >
          <Pencil className="size-4 mr-1" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
          <Trash2 className="text-red-500 size-4 mr-1" />
          <span className="text-red-500">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

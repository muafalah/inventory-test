import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Lock, Pencil, Settings, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

import { userService } from "@/lib/services/user-service";
import { apiClient, TErrorResponse } from "@/lib/api-client";
import { ChangePasswordDialog } from "./change-password-dialog";

export const ActionsButton = ({
  id,
  isImmutable,
}: {
  id: string;
  isImmutable: boolean;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState<boolean>(false);

  const { mutate: mutateDelete, isPending: isDeleting } = useMutation({
    mutationKey: [userService.keys.deleteById],
    mutationFn: () => apiClient.delete(userService.endpoints.deleteById(id)),
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: userService.keys.list });
    },
    onError: (err: AxiosError<TErrorResponse>) => {
      toast.error(err.response?.data?.message);
    },
    onSettled: () => {
      setShowDialog(false);
    },
  });

  return (
    <>
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
            onClick={() => router.push(`/user/${id}`)}
          >
            <Eye className="size-4 mr-1" />
            <span>Detail</span>
          </DropdownMenuItem>
          {!isImmutable && (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push(`/user/${id}/edit`)}
              >
                <Pencil className="size-4 mr-1" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setShowChangePasswordDialog(true)}
              >
                <Lock className="size-4 mr-1" />
                <span>Change Password</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setShowDialog(true)}
              >
                <Trash2 className="text-red-500 size-4 mr-1" />
                <span className="text-red-500">Delete</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {showDialog && (
        <ConfirmDialog
          isOpen={showDialog}
          setOpen={setShowDialog}
          isLoading={isDeleting}
          title="Are you sure you want to delete it?"
          description="This action cannot be undone. This will permanently delete user and remove your data from our servers."
          confirmBtnLabel="Delete"
          confirmBtnClassName={buttonVariants({ variant: "destructive" })}
          onConfirm={() => mutateDelete()}
        />
      )}
      {showChangePasswordDialog && (
        <ChangePasswordDialog
          id={id}
          isOpen={showChangePasswordDialog}
          setOpen={setShowChangePasswordDialog}
        />
      )}
    </>
  );
};

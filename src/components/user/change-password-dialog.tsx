"use client";

import React, { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  changePasswordSchema,
  TChangePasswordSchema,
} from "@/lib/schemas/user-schema";
import { userService } from "@/lib/services/user-service";
import { apiClient, TErrorResponse } from "@/lib/api-client";

export const ChangePasswordDialog = ({
  id,
  isOpen,
  setOpen,
}: {
  id: string;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [...userService.keys.changePassword, id],
    mutationFn: (values: TChangePasswordSchema) =>
      apiClient.post(userService.endpoints.changePassword(id), {
        password: values.password,
      }),
    onSuccess: ({ data }) => {
      toast.success(data.message);
      setOpen(false);
    },
    onError: (err: AxiosError<TErrorResponse>) => {
      toast.error(err.response?.data?.message);
    },
  });

  const onSubmit = (values: TChangePasswordSchema) => {
    mutate(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Change user password</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-[110px] mt-1 cursor-pointer"
                  onClick={() => {
                    form.reset();
                    setOpen(false);
                  }}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-[110px] mt-1 cursor-pointer"
                  disabled={isPending}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

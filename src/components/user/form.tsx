"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import { TUserSchema, userSchema } from "@/lib/schemas/user-schema";
import { userService } from "@/lib/services/user-service";
import { apiClient, TErrorResponse } from "@/lib/api-client";

export const FormUser = ({
  id,
  disabled,
}: {
  id?: string;
  disabled?: boolean;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const isEdit = !!id;

  const form = useForm<TUserSchema>({
    resolver: zodResolver(userSchema(isEdit)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [...userService.keys.detailById, id],
    queryFn: () => apiClient.get(userService.endpoints.detailById(id || "")),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data?.data?.result?.name,
        email: data?.data?.result?.email,
        image: undefined,
      });
      if (data?.data?.result?.image) {
        setImagePreview(data?.data?.result?.image);
      }
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: [...userService.keys.createUpdate, id],
    mutationFn: async (values: TUserSchema) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      if (!isEdit || (values.password && values.password.length > 0)) {
        formData.append("password", values.password as string);
      }
      if (values.image instanceof File) {
        formData.append("image", values.image);
      } else {
        formData.append("image", "");
      }

      return apiClient.post(
        userService.endpoints.createUpdate(id || ""),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: userService.keys.list });
      router.push("/user");
    },
    onError: (err: AxiosError<TErrorResponse>) => {
      toast.error(err.response?.data?.message);
    },
  });

  const onSubmit = (values: TUserSchema) => {
    mutate(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {!id ? "Create " : disabled ? "Detail " : "Edit "}
          User
        </CardTitle>
        <CardDescription>
          {!id
            ? "Create a new "
            : disabled
            ? "Detail existing "
            : "Edit existing "}
          user
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        {isLoading ? (
          <Spinner className="my-6" />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        disabled={isPending || disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="johndoe@mail.com"
                        disabled={isPending || disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* password */}
              {!isEdit && (
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
                          disabled={isPending || disabled}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* image */}
              {!disabled && (
                <div className="flex gap-2 justify-between items-end">
                  <FormField
                    control={form.control}
                    name="image"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem className="w-full">
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            {...fieldProps}
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (file) {
                                onChange(file);
                                const previewUrl = URL.createObjectURL(file);
                                setImagePreview(previewUrl);
                              }
                            }}
                            disabled={isPending || disabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {imagePreview && !disabled && (
                    <Button
                      className="cursor-pointer"
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        setImagePreview(null);
                        form.setValue("image", null);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
              )}

              {imagePreview && (
                <div className="mt-2">
                  <Label className="mb-2">Preview</Label>
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={200}
                    unoptimized
                    className="rounded-md border object-contain"
                  />
                </div>
              )}

              {/* buttons */}
              {!disabled && (
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-[110px] mt-1 cursor-pointer"
                    onClick={() => {
                      form.reset();
                      router.push("/user");
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
              )}
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

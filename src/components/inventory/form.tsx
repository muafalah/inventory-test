"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import {
  inventorySchema,
  TInventorySchema,
} from "@/lib/schemas/inventory-schema";
import { inventoryService } from "@/lib/services/inventory-service";
import { apiClient } from "@/lib/api-client";

export const FormInventory = ({
  id,
  disabled,
}: {
  id?: string;
  disabled?: boolean;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<TInventorySchema>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      stockQuantity: 0,
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [...inventoryService.keys.detailById, id],
    queryFn: () =>
      apiClient.get(inventoryService.endpoints.detailById(id || "")),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        code: data?.data?.result?.code,
        name: data?.data?.result?.name,
        description: data?.data?.result?.description,
        stockQuantity: data?.data?.result?.stockQuantity,
        image: undefined, // cannot set file input
      });
      if (data?.data?.result?.image) {
        setImagePreview(data?.data?.result?.image);
      }
    }
  }, [data, form]);

  const { mutate, isPending: isCreating } = useMutation({
    mutationKey: [inventoryService.endpoints.create],
    mutationFn: async (values: TInventorySchema) => {
      const formData = new FormData();
      formData.append("code", values.code);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("stockQuantity", values.stockQuantity.toString());
      if (values.image) formData.append("image", values.image);

      return apiClient.post(inventoryService.endpoints.create, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });

  const onSubmit = (values: TInventorySchema) => {
    mutate(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {!id
            ? "Crate Inventory"
            : disabled
            ? "Detail Inventory"
            : "Edit Inventory"}
        </CardTitle>
        <CardDescription>
          {!id
            ? "Create a new inventory"
            : disabled
            ? "Detail existing inventory"
            : "Edit existing inventory"}
        </CardDescription>
      </CardHeader>
      <Separator />
      {isLoading ? (
        <CardContent>
          <Spinner className="my-6" />
        </CardContent>
      ) : (
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* code */}
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g. INV-001"
                        disabled={isCreating || disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        placeholder="e.g. Inventory 1"
                        disabled={isCreating || disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-12"
                        placeholder="Enter your inventory description here"
                        disabled={isCreating || disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* stockQuantity */}
              <FormField
                control={form.control}
                name="stockQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 10"
                        value={field.value}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? "" : Number(val));
                        }}
                        disabled={isCreating || disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                            disabled={isCreating || disabled}
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
                        form.setValue("image", undefined);
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
                    onClick={() => form.reset()}
                    disabled={isCreating}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-[110px] mt-1 cursor-pointer"
                    disabled={isCreating}
                  >
                    {isCreating ? "Loading..." : "Save"}
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      )}
    </Card>
  );
};

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginSchema, TLoginSchema } from "@/lib/schemas/auth-schema";
import { authService } from "@/lib/services/auth-service";
import { apiClient, TErrorResponse } from "@/lib/api-client";
import { setCookie } from "@/lib/utils";

const FormLogin = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: authService.keys.login,
    mutationFn: (values: TLoginSchema) =>
      apiClient.post(authService.endpoints.login, values),
    onSuccess: ({ data }) => {
      setCookie("access_token", data.result.token.accessToken);
      setCookie("refresh_token", data.result.token.refreshToken);
      toast.success(data.message);
      router.push("/inventory");
    },
    onError: (err: AxiosError<TErrorResponse>) => {
      toast.error(err.response?.data?.message);
    },
  });

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: TLoginSchema) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>Enter your account below to login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <Button
                type="submit"
                className="w-full mt-1 cursor-pointer"
                disabled={isPending}
              >
                {isPending ? "Loading..." : "Login"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormLogin;

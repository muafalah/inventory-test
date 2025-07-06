import { z } from "zod";

export const userSchema = (isEdit?: boolean) =>
  z
    .object({
      name: z
        .string({ required_error: "Name is required" })
        .min(1, { message: "Name cannot be empty" }),
      email: z
        .string({ required_error: "Email is required" })
        .min(1, { message: "Email cannot be empty" })
        .email({ message: "Invalid email format" }),
      password: z.string().optional(),
      image: z
        .union([
          z.instanceof(File).refine((file) => file.size < 2000000, {
            message: "Your image must be less than 2MB.",
          }),
          z.undefined(),
        ])
        .optional()
        .nullable(),
    })
    .superRefine((data, ctx) => {
      if (!isEdit && (!data.password || data.password.length < 6)) {
        ctx.addIssue({
          path: ["password"],
          code: "custom",
          message: "Password must be at least 6 characters long",
        });
      }
    });

export type TUserSchema = z.infer<ReturnType<typeof userSchema>>;

export const changePasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password is too long" }),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;

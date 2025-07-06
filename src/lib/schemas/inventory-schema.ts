import { z } from "zod";

export const inventorySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name cannot be empty" }),
  code: z
    .string({ required_error: "Code is required" })
    .min(1, { message: "Code cannot be empty" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description cannot be empty" }),
  stockQuantity: z
    .number({
      message: "Stock must be a number",
    })
    .min(0, { message: "Stock cannot be minus" }),
  image: z
    .union([
      z.instanceof(File).refine((file) => file.size < 2000000, {
        message: "Your image must be less than 2MB.",
      }),
      z.undefined(),
    ])
    .optional()
    .nullable(),
});

export type TInventorySchema = z.infer<typeof inventorySchema>;

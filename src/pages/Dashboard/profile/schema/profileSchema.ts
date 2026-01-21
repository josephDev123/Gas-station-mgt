import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  address: z
    .string()
    .min(2, "Address is required")
    .or(z.literal(""))
    .optional(),
  role: z.string().min(2, "Role is required").or(z.literal("")).optional(),
  phone_no: z
    .string()
    .regex(/^0[0-9]{10}$/, "Phone number must be a valid Nigerian number")
    .or(z.literal(""))
    .optional(),
  avatar: z
    .any()
    .optional()
    .refine((file) => !file || file?.length === 1, "Please upload one image"),
});

export type IProfileSchema = z.infer<typeof profileSchema>;

import { z } from "zod";

export const CreateRequestSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),

  email: z.string().email("Invalid email address"),

  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(150, "Company name is too long"),

  message: z.string().max(1000, "Message is too long").optional(),

  phoneNumber: z
    .string()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long"),
});

export type ICreateRequestSchema = z.infer<typeof CreateRequestSchema>;

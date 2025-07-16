import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password must be at most 8 characters"),
});

export type ILoginSchemaSchema = z.infer<typeof loginSchema>;

import z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(8, { message: "Password must be at most 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // This targets the confirmPassword field for the message
    message: "Passwords do not match",
  });

export type IRegisterSchema = z.infer<typeof RegisterSchema>;

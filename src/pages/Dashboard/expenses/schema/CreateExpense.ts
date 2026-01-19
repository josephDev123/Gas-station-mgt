import { z } from "zod";

export const expenseSchema = z.object({
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(255, "Description is too long"),

  category: z.string().min(1, "Category is required"),

  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than zero"),

  //   file: z
  //     .instanceof(Buffer)
  //     .optional(),
});

export type IExpenseFormSchema = z.infer<typeof expenseSchema>;

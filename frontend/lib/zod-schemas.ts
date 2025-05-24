import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^[A-Za-z0-9]+$/, "No special characters allowed")
    .regex(/[A-Z]/, "Must include at least one uppercase letter"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^[A-Za-z0-9]*$/, "No special characters allowed")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const addNewNote = z.object({
  title: z.string().min(1, "Title is rquired").max(200),
  content: z.string().min(1, "Title is rquired"),
  category: z.enum(["PERSONAL", "IMPORTANT", "BUSINESS"], {
    required_error: "Category is required",
    invalid_type_error: "Invalid category selected",
  }),
});

export type addNewNoteType = z.infer<typeof addNewNote>;

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export type SignInSchemaType = z.infer<typeof signInSchema>;

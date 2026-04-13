import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 character"),
  phone: z.string().min(1, "Phone is required"),
  role: z.enum(["customer", "seller"], {
    message: "Role must be customer or seller",
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

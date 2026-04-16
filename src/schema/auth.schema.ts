import { z } from "zod";

export const loginUserSchema = z.object({
  email: z
    .string()
    .max(254, "Email must not exceed 254 characters")
    .check(z.email("Invalid email address")),
  password: z
    .string()
    .min(6, "Password must be atleast 6 character")
    .max(72, "Password must not exceed 72 characters"),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;

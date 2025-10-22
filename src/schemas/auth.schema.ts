import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(100, {
      message: "Password must be at most 100 characters long",
    })
    .trim(),
  email: z
    .email({
      message: "Invalid email address",
    })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
});

export const loginSchema = z.object({
  email: z.email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const verify2FASchema = z.object({
  email: z.email({
    message: "Invalid email address",
  }),
  code: z.string().length(6, {
    message: "Code must be 6 characters long",
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type Verify2FAInput = z.infer<typeof verify2FASchema>;

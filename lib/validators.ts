import { z } from "zod";
export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});
3;
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const productSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.number().nonnegative(),
  description: z.string().optional(),
  image: z.string().url().optional(),
});

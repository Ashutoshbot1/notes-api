import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    password: z.string().min(8),
  }),
});

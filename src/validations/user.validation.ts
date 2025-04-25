import { z } from "zod";

export const userValidationSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export const userTokenValidationSchema = z.object({
  refreshToken: z.string(),
});

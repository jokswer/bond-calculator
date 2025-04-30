import { z } from "zod";

export const bondValidationSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().positive().min(1),
  faceValue: z.number().positive().min(1),
  purchasePrice: z.number().positive().min(1),
  paymentsPerYear: z.number().positive().min(1),
  couponAmount: z.number().positive(),
  maturityDate: z.string(),
});

import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import ApiError from "../exceptions/api.exception.ts";

export function validateMiddleware(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        next(ApiError.BadRequest("Invalid data", errorMessages));
      } else {
        next(new Error());
      }
    }
  };
}

import type { NextFunction, Request, Response } from "express";

import ApiError from "../exceptions/api.exception.ts";

export function errorMiddleware(error, req: Request, res: Response, next) {
  console.error(error);

  if (error instanceof ApiError) {
    return res
      .status(error.status)
      .json({ message: error.message, errors: error.errors });
  }

  return res.status(500).json({ message: "Internal Server Error" });
}

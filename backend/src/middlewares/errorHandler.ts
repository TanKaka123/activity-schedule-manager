import { Request, Response } from "express";
import { ApiError } from "../utils/apiError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
) {
  const isApiError = err instanceof ApiError;
  const status = isApiError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  console.error(`[ERROR] ${req.method} ${req.url} - ${message}`);

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

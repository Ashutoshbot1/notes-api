import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app.error.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  return res
    .status(statusCode)
    .json({ message: err.message || "Internal server error" });
};

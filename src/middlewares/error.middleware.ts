import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  return res
    .status(500)
    .json({ message: err.message || "Interna; server error" });
};

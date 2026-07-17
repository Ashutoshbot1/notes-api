import { RequestHandler } from "express";

export const requestLogger: RequestHandler = (req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`,
    );
  });
  next();
};

import type { RequestHandler } from "express";

export const requestLogger: RequestHandler = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const { method, originalUrl } = req;
    const { statusCode } = res;
    const logMessage = `${method} ${originalUrl} ${statusCode} ${duration}ms`;
    if (statusCode >= 500) console.error(logMessage);
    else if (statusCode >= 400) console.warn(logMessage);
    else if (statusCode >= 300) console.info(logMessage);
    else console.log(logMessage);
  });
  next();
};

import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";

export const validateWithZod = (schema: any) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = result.error.issues.map((issue: any) => ({
        field: issue.path[issue.path.length - 1],
        message: issue.message,
      }));

      throw new AppError("Validation failed", 400, errors);
    }

    if (result.data.body) {
      req.body = result.data.body;
    }
    if (result.data.params) {
      req.params = result.data.params;
    }

    if (result.data.query) {
      req.query = result.data.query;
    }

    next();
  };
};

import type { RequestHandler } from "express";
import { BadRequestError } from "../errors/bad-request.error.js";

export const validateWithZod = (
  schema: any,
): RequestHandler<any, any, any, any> => {
  return (req, _res, next) => {
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

      throw new BadRequestError("Validation failed", errors);
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

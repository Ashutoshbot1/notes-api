import type { Request } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error.js";

export const getAuthenticatedUserId = (req: Request): number => {
  if (!req.user) {
    throw new UnauthorizedError("Authentication required");
  }

  return req.user.userId;
};

import type { RequestHandler } from "express";
import { BadRequestError } from "../errors/bad-request.error.js";
import jwt from "jsonwebtoken";
import type { AccessTokenPayload } from "../types/auth.types.js";
import { UnauthorizedError } from "../errors/unauthorized.error.js";

export const authenticate: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new BadRequestError("Authentication token missing");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new BadRequestError("Authentication token missing");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new BadRequestError("Authentication token missing");
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }

  try {
    const decoded = jwt.verify(token, secret) as AccessTokenPayload;

    res.locals.authUser = decoded;

    next();
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }
};

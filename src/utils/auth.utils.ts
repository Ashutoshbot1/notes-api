import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import type { AccessTokenPayload } from "../types/auth.types.js";

export const generateAccessToken = (payload: AccessTokenPayload): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }

  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, secret, options);
};

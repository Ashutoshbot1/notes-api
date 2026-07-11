import { signup } from "../services/auth.service.js";
import type { SignupBody } from "../types/auth.types.js";
import type { Request, Response } from "express";
import { sendSuccessResponse } from "../utils/response.js";

export const signupController = async (
  req: Request<any, any, SignupBody>,
  res: Response,
): Promise<void> => {
  const data = req.body;
  const user = await signup(data);
  sendSuccessResponse(res, 200, "User created successfully", user);
};

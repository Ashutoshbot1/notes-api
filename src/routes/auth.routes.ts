import { Router } from "express";
import { validateWithZod } from "../middlewares/validation.middleware.js";
import {
  loginSchema,
  refreshTokenSchema,
  signupSchema,
} from "../schemas/auth.schema.js";
import {
  loginController,
  logoutController,
  refreshTokenController,
  signupController,
} from "../controllers/auth.controller.js";
import { authRateLimiter } from "../middlewares/rate-limit.middleware.js";

const router = Router();
router.post(
  "/login",
  authRateLimiter,
  validateWithZod(loginSchema),
  loginController,
);
router.post(
  "/signup",
  authRateLimiter,
  validateWithZod(signupSchema),
  signupController,
);
router.post(
  "/refresh",
  validateWithZod(refreshTokenSchema),
  refreshTokenController,
);
router.post("/logout", validateWithZod(refreshTokenSchema), logoutController);

export default router;

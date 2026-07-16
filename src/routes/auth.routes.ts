import { Router } from "express";
import { validateWithZod } from "../middlewares/validation.middleware.js";
import {
  loginSchema,
  refreshTokenSchema,
  signupSchema,
} from "../schemas/auth.schema.js";
import {
  loginController,
  refreshTokenController,
  signupController,
} from "../controllers/auth.controller.js";

const router = Router();
router.post("/login", validateWithZod(loginSchema), loginController);
router.post("/signup", validateWithZod(signupSchema), signupController);
router.post(
  "/refresh",
  validateWithZod(refreshTokenSchema),
  refreshTokenController,
);

export default router;

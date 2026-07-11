import { Router } from "express";
import { validateWithZod } from "../middlewares/validation.middleware.js";
import { loginSchema, signupSchema } from "../schemas/auth.schema.js";
import {
  loginController,
  signupController,
} from "../controllers/auth.controller.js";

const router = Router();
router.post("/login", validateWithZod(loginSchema), loginController);
router.post("/signup", validateWithZod(signupSchema), signupController);

export default router;

import { Router } from "express";
import { validateWithZod } from "../middlewares/validation.middleware.js";
import { signupSchema } from "../schemas/auth.schema.js";
import { signupController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", validateWithZod(signupSchema), signupController);

export default router;

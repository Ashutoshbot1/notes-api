import { Router } from "express";
import { healthCheck } from "../controllers/health.controller.js";

const router = Router();

// Health check endpoint
router.get("/", healthCheck);

export default router;

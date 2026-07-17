import express from "express";
import healthRouter from "./routes/health.routes.js";
import noteRouter from "./routes/note.routes.js";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { generalRateLimiter } from "./middlewares/rate-limit.middleware.js";
import { requestLogger } from "./middlewares/request-logger.middleware.js";

const app = express();

// Middleware to parse JSON bodies
app.use(requestLogger);
app.use(express.json());
app.use(generalRateLimiter);

app.use("/health", healthRouter);
app.use("/notes", noteRouter);
app.use("/auth", authRouter);

// Error middleware
app.use(errorHandler);

export default app;

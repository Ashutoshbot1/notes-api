import express from "express";
import healthRouter from "./routes/health.routes.js";
import noteRouter from "./routes/note.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/health", healthRouter);
app.use("/notes", noteRouter);

// Error middleware
app.use(errorHandler);

export default app;

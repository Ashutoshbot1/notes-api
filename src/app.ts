import express from "express";
import healthRouter from "./routes/health.routes.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/health", healthRouter);

export default app;

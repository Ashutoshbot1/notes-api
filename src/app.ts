import express from "express";
import healthRouter from "./routes/health.routes.js";
import noteRouter from "./routes/note.routes.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/health", healthRouter);
app.use("/notes", noteRouter);

export default app;

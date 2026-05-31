import { Router } from "express";
import { createNote, getAllNotes } from "../controllers/note.controller.js";

const router = Router();

// GET
router.get("/", getAllNotes);

// POST
router.post("/", createNote);

export default router;

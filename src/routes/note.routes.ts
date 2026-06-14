import { Router } from "express";
import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateNoteById,
} from "../controllers/note.controller.js";
import {
  validateCreateNote,
  validateUpdateNote,
} from "../middlewares/validation.middleware.js";

const router = Router();

// GET
router.get("/", getAllNotes);
router.get("/:id", getNoteById);

// POST
router.post("/", validateCreateNote, createNote);

// PUT
router.patch("/:id", validateUpdateNote, updateNoteById);

// DELETE
router.delete("/:id", deleteNoteById);

export default router;

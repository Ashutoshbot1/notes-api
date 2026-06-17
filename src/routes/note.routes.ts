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
  validateNoteId,
  validateUpdateNote,
  validateWithZod,
} from "../middlewares/validation.middleware.js";
import { createNoteSchema } from "../schemas/note.schema.js";

const router = Router();

// GET
router.get("/", getAllNotes);
router.get("/:id", validateNoteId, getNoteById);

// POST
router.post("/", validateWithZod(createNoteSchema), createNote);

// PUT
router.patch("/:id", validateNoteId, validateUpdateNote, updateNoteById);

// DELETE
router.delete("/:id", validateNoteId, deleteNoteById);

export default router;

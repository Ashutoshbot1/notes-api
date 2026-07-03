import { Router } from "express";
import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateNoteById,
} from "../controllers/note.controller.js";
import { validateWithZod } from "../middlewares/validation.middleware.js";
import {
  createNoteSchema,
  getNotesQuerySchema,
  noteIdSchema,
  updateNoteSchema,
} from "../schemas/note.schema.js";
import type { GetNotesQuery } from "../types/note.types.js";

const router = Router();

// GET
router.get<any, any, any, GetNotesQuery>(
  "/",
  validateWithZod(getNotesQuerySchema),
  getAllNotes,
);
router.get("/:id", validateWithZod(noteIdSchema), getNoteById);

// POST
router.post("/", validateWithZod(createNoteSchema), createNote);

// PUT
router.patch(
  "/:id",
  validateWithZod(noteIdSchema),
  validateWithZod(updateNoteSchema),
  updateNoteById,
);

// DELETE
router.delete("/:id", validateWithZod(noteIdSchema), deleteNoteById);

export default router;

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
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = Router();

// GET
router.get(
  "/",
  authenticate,
  validateWithZod(getNotesQuerySchema),
  getAllNotes,
);
router.get("/:id", authenticate, validateWithZod(noteIdSchema), getNoteById);

// POST
router.post("/", authenticate, validateWithZod(createNoteSchema), createNote);

// PUT
router.patch(
  "/:id",
  authenticate,
  validateWithZod(noteIdSchema),
  validateWithZod(updateNoteSchema),
  updateNoteById,
);

// DELETE
router.delete(
  "/:id",
  authenticate,
  validateWithZod(noteIdSchema),
  deleteNoteById,
);

export default router;

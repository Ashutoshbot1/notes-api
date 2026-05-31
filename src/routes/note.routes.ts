import { Router } from "express";
import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateNoteById,
} from "../controllers/note.controller.js";

const router = Router();

// GET
router.get("/", getAllNotes);
router.get("/:id", getNoteById);

// POST
router.post("/", createNote);

// PUT
router.patch("/:id", updateNoteById);

// DELETE
router.delete("/:id", deleteNoteById);

export default router;

import type { Request, Response } from "express";
import { notes } from "../data/notes.data.js";
import type { CreateNoteBody, UpdateNoteBody } from "../types/note.types.js";
import {
  createNewNote,
  deleteNote,
  findNoteById,
  updatedNote,
} from "../services/note.service.js";

export const createNote = (
  req: Request<any, any, CreateNoteBody>,
  res: Response,
) => {
  const { title, content } = req.body;

  const newNote = createNewNote(title, content);
  res.status(201).json(newNote);
};

export const getAllNotes = (_req: Request, res: Response) => {
  res.status(200).json(notes);
};

export const getNoteById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid note ID" });
  }

  const note = findNoteById(id);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.status(200).json(note);
};

export const updateNoteById = (
  req: Request<any, any, UpdateNoteBody>,
  res: Response,
) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid note ID" });
  }

  const note = updatedNote(id, title, content);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res.status(200).json(note);
};

export const deleteNoteById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid note ID" });
  }

  const notes = deleteNote(id);
  if (!notes) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res
    .status(200)
    .json({ message: "Note deleted successfully", data: notes });
};

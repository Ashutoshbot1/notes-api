import type { Request, Response } from "express";
import { notes } from "../data/notes.data.js";
import type { CreateNoteBody, UpdateNoteBody } from "../types/note.types.js";
import {
  createNewNote,
  deleteNote,
  findNoteById,
  updatedNote,
} from "../services/note.service.js";
import { NotFoundError } from "../errors/not-found.error.js";

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

  const note = findNoteById(id);

  if (!note) {
    throw new NotFoundError("Note not found");
  }

  res.status(200).json(note);
};

export const updateNoteById = (
  req: Request<any, any, UpdateNoteBody>,
  res: Response,
) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  const note = updatedNote(id, title, content);

  if (!note) {
    throw new NotFoundError("Note not found");
  }

  return res.status(200).json(note);
};

export const deleteNoteById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const notes = deleteNote(id);
  if (!notes) {
    throw new NotFoundError("Note not found");
  }

  return res
    .status(200)
    .json({ message: "Note deleted successfully", data: notes });
};

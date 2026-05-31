import type { Request, Response } from "express";
import { notes } from "../data/notes.data.js";
import type { CreateNoteBody, Note } from "../types/note.types.js";

export const createNote = (
  req: Request<any, any, CreateNoteBody>,
  res: Response,
) => {
  const { title, content } = req.body;

  //   Validations
  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const newNote: Note = {
    id: notes.length + 1,
    title,
    content,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
};

export const getAllNotes = (_req: Request, res: Response) => {
  res.status(200).json(notes);
};

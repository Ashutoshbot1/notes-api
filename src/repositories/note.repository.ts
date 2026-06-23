import { pool } from "../config/db.js";
import { notes } from "../data/notes.data.js";
import type {
  CreateNoteBody,
  Note,
  UpdateNoteBody,
} from "../types/note.types.js";

export const findAllNotes = async () => {
  const result = await pool.query("SELECT * FROM notes ORDER BY id ASC");
  return result.rows;
};

export const findNoteById = (id: number) => {
  return notes.find((note) => note.id === id);
};

export const createNote = (data: CreateNoteBody) => {
  const newNote: Note = {
    id: notes.length + 1,
    title: data.title,
    content: data.content,
  };

  notes.push(newNote);
  return newNote;
};

export const updateNoteById = (id: number, data: UpdateNoteBody) => {
  const note = findNoteById(id);

  if (!note) {
    return null;
  }

  if (data.title?.trim()) {
    note.title = data.title;
  }

  if (data.content?.trim()) {
    note.content = data.content;
  }

  return note;
};

export const deleteNoteById = (id: number) => {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return null;
  }

  return notes.splice(noteIndex, 1)[0];
};

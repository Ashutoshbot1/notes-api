import { notes } from "../data/notes.data.js";
import { Note, UpdateNoteBody } from "../types/note.types.js";

export const findNoteById = (id: number) => {
  return notes.find((n) => n.id === id);
};

export const createNewNote = (title: string, content: string) => {
  const newNote: Note = {
    id: notes.length + 1,
    title,
    content,
  };
  notes.push(newNote);
  return newNote;
};

export const getAllNotes = () => {
  return notes;
};

export const updatedNote = (id: number, title?: string, content?: string) => {
  const note = findNoteById(id);

  if (!note) {
    return null;
  }

  if (title?.trim()) {
    note.title = title;
  }

  if (content?.trim()) {
    note.content = content;
  }

  return note;
};

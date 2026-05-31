import { notes } from "../data/notes.data.js";
import { Note } from "../types/note.types.js";

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

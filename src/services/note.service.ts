import {
  createNote as createNoteInRepository,
  deleteNoteById,
  findAllNotes,
  findNoteById as findNoteByIdFromRepository,
  updateNoteById,
} from "../repositories/note.repository.js";
import type { Note } from "../types/note.types.js";

export const findNoteById = async (id: number): Promise<Note | null> => {
  const result = await findNoteByIdFromRepository(id);
  return result;
};

export const createNewNote = async (
  title: string,
  content: string,
): Promise<Note> => {
  const result = await createNoteInRepository({ title, content });
  return result;
};

export const getAllNotes = async (
  page: number,
  limit: number,
): Promise<Note[]> => {
  return findAllNotes(page, limit);
};

export const updatedNote = async (
  id: number,
  title?: string,
  content?: string,
): Promise<Note | null> => {
  const result = await updateNoteById(id, { title, content });
  return result;
};

export const deleteNote = async (id: number): Promise<Note | null> => {
  const result = await deleteNoteById(id);
  return result;
};

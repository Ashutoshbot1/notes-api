import {
  createNote as createNoteInRepository,
  deleteNoteById,
  findAllNotes,
  findNoteById as findNoteByIdFromRepository,
  updateNoteById,
} from "../repositories/note.repository.js";

export const findNoteById = (id: number) => {
  return findNoteByIdFromRepository(id);
};

export const createNewNote = async (title: string, content: string) => {
  const result = await createNoteInRepository({ title, content });
  return result;
};

export const getAllNotes = async () => {
  return findAllNotes();
};

export const updatedNote = (id: number, title?: string, content?: string) => {
  return updateNoteById(id, { title, content });
};

export const deleteNote = (id: number) => {
  return deleteNoteById(id);
};

import {
  createNote as createNoteInRepository,
  deleteNoteById,
  findAllNotes,
  findNoteById as findNoteByIdFromRepository,
  updateNoteById,
} from "../repositories/note.repository.js";

export const findNoteById = async (id: number) => {
  const result = await findNoteByIdFromRepository(id);
  return result;
};

export const createNewNote = async (title: string, content: string) => {
  const result = await createNoteInRepository({ title, content });
  return result;
};

export const getAllNotes = async () => {
  return findAllNotes();
};

export const updatedNote = async (
  id: number,
  title?: string,
  content?: string,
) => {
  const result = await updateNoteById(id, { title, content });
  return result;
};

export const deleteNote = async (id: number) => {
  const result = await deleteNoteById(id);
  return result;
};

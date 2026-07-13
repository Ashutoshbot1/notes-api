import {
  createNote as createNoteInRepository,
  deleteNoteById,
  findAllNotes,
  findNoteById as findNoteByIdFromRepository,
  updateNoteById,
} from "../repositories/note.repository.js";
import type {
  GetNotesQuery,
  Note,
  PaginatedNotesResult,
} from "../types/note.types.js";
import type { PaginatedResponse } from "../types/pagination.types.js";

export const findNoteById = async (
  id: number,
  userId: number,
): Promise<Note | null> => {
  const result = await findNoteByIdFromRepository(id, userId);
  return result;
};

export const createNewNote = async (
  title: string,
  content: string,
  userId: number,
): Promise<Note> => {
  const result = await createNoteInRepository({
    title,
    content,
    userId,
  });
  return result;
};

export const getAllNotes = async (
  { page, limit, sortBy, order, search }: GetNotesQuery,
  userId: number,
): Promise<PaginatedResponse<Note>> => {
  const { items, totalItems }: PaginatedNotesResult = await findAllNotes(
    {
      page,
      limit,
      sortBy,
      order,
      search,
    },
    userId,
  );
  const totalPages = Math.ceil(totalItems / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  const result = {
    items,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  };

  return result;
};

export const updatedNote = async (
  id: number,
  userId: number,
  title?: string,
  content?: string,
): Promise<Note | null> => {
  const result = await updateNoteById(id, { title, content }, userId);
  return result;
};

export const deleteNote = async (
  id: number,
  userId: number,
): Promise<Note | null> => {
  const result = await deleteNoteById(id, userId);
  return result;
};

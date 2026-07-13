import type { Request, Response } from "express";
import type {
  CreateNoteBody,
  GetNotesQuery,
  UpdateNoteBody,
} from "../types/note.types.js";
import {
  createNewNote,
  deleteNote,
  findNoteById,
  updatedNote,
  getAllNotes as getAllNotesService,
} from "../services/note.service.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { sendSuccessResponse } from "../utils/response.js";
import { getAuthenticatedUserId } from "../utils/request.utils.js";

export const createNote = async (
  req: Request<any, any, CreateNoteBody>,
  res: Response,
): Promise<void> => {
  const { title, content } = req.body;
  const userId = getAuthenticatedUserId(req);

  const newNote = await createNewNote(title, content, userId);
  sendSuccessResponse(res, 201, "Note created successfully", newNote);
};

export const getAllNotes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const query = res.locals.validatedQuery as GetNotesQuery;
  const userId = getAuthenticatedUserId(req);
  const notes = await getAllNotesService(query, userId);
  sendSuccessResponse(res, 200, "Notes fetched successfully", notes);
};

export const getNoteById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = Number(req.params.id);
  const userId = getAuthenticatedUserId(req);

  const note = await findNoteById(id, userId);

  if (!note) {
    throw new NotFoundError("Note not found");
  }

  sendSuccessResponse(res, 200, "Note fetched successfully", note);
};

export const updateNoteById = async (
  req: Request<any, any, UpdateNoteBody>,
  res: Response,
): Promise<void> => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  const userId = getAuthenticatedUserId(req);

  const note = await updatedNote(id, userId, title, content);

  if (!note) {
    throw new NotFoundError("Note not found");
  }

  sendSuccessResponse(res, 200, "Note updated successfully", note);
};

export const deleteNoteById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = Number(req.params.id);
  const userId = getAuthenticatedUserId(req);

  const note = await deleteNote(id, userId);
  if (!note) {
    throw new NotFoundError("Note not found");
  }

  sendSuccessResponse(res, 200, "Note deleted successfully", note);
};

import { pool } from "../config/db.js";
import type {
  Note,
  CreateNoteBody,
  UpdateNoteBody,
} from "../types/note.types.js";

export const findAllNotes = async (
  page: number,
  limit: number,
): Promise<Note[]> => {
  const offset = (page - 1) * limit;
  const result = await pool.query<Note>(
    "SELECT * FROM notes ORDER BY id ASC LIMIT $1 OFFSET $2",
    [limit, offset],
  );
  return result.rows;
};

export const findNoteById = async (id: number): Promise<Note | null> => {
  const result = await pool.query<Note>("SELECT * FROM notes WHERE id=$1", [
    id,
  ]);
  return result.rows[0] ?? null;
};

export const createNote = async (data: CreateNoteBody): Promise<Note> => {
  const result = await pool.query<Note>(
    "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
    [data.title, data.content],
  );

  return result.rows[0];
};

export const updateNoteById = async (
  id: number,
  data: UpdateNoteBody,
): Promise<Note | null> => {
  const result = await pool.query<Note>(
    "UPDATE notes SET title=COALESCE($1, title ), content=COALESCE($2, content), updated_at=CURRENT_TIMESTAMP where id=$3 RETURNING *",
    [data.title, data.content, id],
  );

  return result.rows[0] ?? null;
};

export const deleteNoteById = async (id: number): Promise<Note | null> => {
  const result = await pool.query<Note>(
    "DELETE FROM notes WHERE id=$1 RETURNING *",
    [id],
  );
  return result.rows[0] ?? null;
};

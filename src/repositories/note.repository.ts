import { pool } from "../config/db.js";
import type { CreateNoteBody, UpdateNoteBody } from "../types/note.types.js";

export const findAllNotes = async () => {
  const result = await pool.query("SELECT * FROM notes ORDER BY id ASC");
  return result.rows;
};

export const findNoteById = async (id: number) => {
  const result = await pool.query("SELECT * FROM notes WHERE id=$1", [id]);
  return result.rows[0];
};

export const createNote = async (data: CreateNoteBody) => {
  const result = await pool.query(
    "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
    [data.title, data.content],
  );

  return result.rows[0];
};

export const updateNoteById = async (id: number, data: UpdateNoteBody) => {
  const result = await pool.query(
    "UPDATE notes SET title=COALESCE($1, title ), content=COALESCE($2, content), updated_at=CURRENT_TIMESTAMP where id=$3 RETURNING *",
    [data.title, data.content, id],
  );

  return result.rows[0] ?? null;
};

export const deleteNoteById = async (id: number) => {
  const result = await pool.query("DELETE FROM notes WHERE id=$1 RETURNING *", [
    id,
  ]);
  return result.rows[0] ?? null;
};

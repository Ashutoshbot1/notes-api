import { pool } from "../config/db.js";
import type {
  CountResult,
  CreateNoteData,
  GetNotesQuery,
  Note,
  PaginatedNotesResult,
  UpdateNoteBody,
} from "../types/note.types.js";

export const findAllNotes = async (
  { page, limit, sortBy, order, search }: GetNotesQuery,
  userId: number,
): Promise<PaginatedNotesResult> => {
  const offset = (page - 1) * limit;

  if (search) {
    const searchPattern = `%${search}%`;

    const result = await pool.query<Note>(
      `SELECT * FROM notes
     WHERE user_id = $1 AND (title ILIKE $2 OR content ILIKE $2)
     ORDER BY ${sortBy} ${order}
     LIMIT $3 OFFSET $4`,
      [userId, searchPattern, limit, offset],
    );

    const countResult = await pool.query<CountResult>(
      `SELECT COUNT(*) FROM notes
     WHERE user_id = $1 AND (title ILIKE $2 OR content ILIKE $2)`,
      [userId, searchPattern],
    );

    return {
      items: result.rows,
      totalItems: Number(countResult.rows[0].count),
    };
  }

  const result = await pool.query<Note>(
    `SELECT * FROM notes
   WHERE user_id = $1
   ORDER BY ${sortBy} ${order}
   LIMIT $2 OFFSET $3`,
    [userId, limit, offset],
  );

  const countResult = await pool.query<CountResult>(
    "SELECT COUNT(*) FROM notes WHERE user_id=$1",
    [userId],
  );

  return {
    items: result.rows,
    totalItems: Number(countResult.rows[0].count),
  };
};

export const findNoteById = async (
  id: number,
  userId: number,
): Promise<Note | null> => {
  const result = await pool.query<Note>(
    "SELECT * FROM notes WHERE id=$1 AND user_id=$2",
    [id, userId],
  );
  return result.rows[0] ?? null;
};

export const createNote = async (data: CreateNoteData): Promise<Note> => {
  const result = await pool.query<Note>(
    "INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
    [data.title, data.content, data.userId],
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

import { pool } from "../config/db.js";
import type { CreateRefreshTokenData } from "../types/auth.types.js";

export const CreateRefreshToken = async (
  data: CreateRefreshTokenData,
): Promise<void> => {
  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [data.userId, data.tokenHash, data.expiresAt],
  );
};

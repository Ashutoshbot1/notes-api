import { pool } from "../config/db.js";
import type {
  CreateRefreshTokenData,
  RefreshTokenRecord,
} from "../types/auth.types.js";

export const createRefreshToken = async (
  data: CreateRefreshTokenData,
): Promise<void> => {
  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [data.userId, data.tokenHash, data.expiresAt],
  );
};

export const findActiveRefreshTokens = async (): Promise<
  RefreshTokenRecord[]
> => {
  const result = await pool.query<RefreshTokenRecord>(
    `SELECT * FROM refresh_tokens
     WHERE revoked_at IS NULL
     AND expires_at > CURRENT_TIMESTAMP`,
  );

  return result.rows;
};

export const revokeRefreshToken = async (id: number): Promise<void> => {
  await pool.query(
    `UPDATE refresh_tokens
     SET revoked_at = CURRENT_TIMESTAMP
     WHERE id = $1`,
    [id],
  );
};

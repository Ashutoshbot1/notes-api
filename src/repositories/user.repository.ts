import { pool } from "../config/db.js";
import type { CreateUserData, User } from "../types/auth.types.js";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query<User>("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  return result.rows[0] ?? null;
};

export const createUser = async (data: CreateUserData): Promise<User> => {
  const result = await pool.query<User>(
    "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
    [data.name, data.email, data.password_hash],
  );

  return result.rows[0];
};

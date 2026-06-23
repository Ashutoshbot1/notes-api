import "./env.js";
import { pool } from "./db.js";

const result = await pool.query("SELECT NOW()");

console.log("Database connected successfully:", result.rows[0]);

await pool.end();

import { AppError } from "./app.error.js";

export class UnauthorizedError extends AppError {
  constructor(message = "") {
    super(message, 401);
  }
}

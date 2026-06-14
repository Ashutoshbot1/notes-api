import type { Request, Response, NextFunction } from "express";

export const validateCreateNote = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, content } = req.body;

  if (typeof title !== "string" || typeof content !== "string") {
    return res.status(400).json({
      error: "Titla and Content must be string",
    });
  }

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({
      error: "Title and Content are required",
    });
  }
  next();
};

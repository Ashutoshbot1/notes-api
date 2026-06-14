import type { Request, Response, NextFunction } from "express";

export const validateCreateNote = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, content } = req.body;

  if (typeof title !== "string" || typeof content !== "string") {
    return res.status(400).json({
      error: "Title and Content must be string",
    });
  }

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({
      error: "Title and Content are required",
    });
  }
  next();
};

export const validateUpdateNote = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, content } = req.body;
  const hasTitle = title !== undefined;
  const hasContent = content !== undefined;

  if (hasTitle) {
    if (typeof title !== "string") {
      return res.status(400).json({
        error: "Title must be string",
      });
    }
    if (!title?.trim()) {
      return res.status(400).json({
        error: "Title should have valid value",
      });
    }
  }

  if (hasContent) {
    if (typeof content !== "string") {
      return res.status(400).json({
        error: "Content must be string",
      });
    }
    if (!content?.trim()) {
      return res.status(400).json({
        error: "Content should have valid value",
      });
    }
  }

  if (!hasContent && !hasTitle) {
    return res.status(400).json({
      error: "At least one of title or content is required",
    });
  }

  next();
};

export const validateNoteId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id: number = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Invalid note ID type",
    });
  }
  next();
};

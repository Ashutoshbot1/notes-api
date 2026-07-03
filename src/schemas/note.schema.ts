import { z } from "zod";

export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1),
    content: z.string().trim().min(1),
  }),
});

export const updateNoteSchema = z.object({
  body: z
    .object({
      title: z.string().trim().min(1).optional(),
      content: z.string().trim().min(1).optional(),
    })
    .refine((data) => data.title !== undefined || data.content !== undefined, {
      message: "At least one of title or content is required",
    }),
});

export const noteIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

export const getNotesQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
  }),
});

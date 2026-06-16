// export const createNoteSchema = {
//   body: {
//     title: {
//       required: true,
//       type: "string",
//     },
//     content: {
//       required: true,
//       type: "string",
//     },
//   },
// };

import z from "zod";

export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1),
    content: z.string().trim().min(1),
  }),
});

export const updateNoteSchema = {
  body: {
    title: {
      required: false,
      type: "string",
    },
    content: {
      required: false,
      type: "string",
    },
  },
};

export const noteIdSchema = {
  params: {
    id: {
      required: true,
      type: "number",
    },
  },
};

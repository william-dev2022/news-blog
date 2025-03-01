// import { JSONContent } from "@tiptap/core";
import { z } from "zod";

// const JSONContentSchema: z.ZodType<JSONContent> = z.lazy(() =>
//   z.object({
//     type: z.string().optional(),
//     attrs: z.record(z.any()).optional(),
//     content: z.array(z.lazy(() => JSONContentSchema)).optional(),
//     marks: z
//       .array(
//         z.object({
//           type: z.string(),
//           attrs: z.record(z.any()).optional(),
//         })
//       )
//       .optional(),
//     text: z.string().optional(),
//   })
// );

export const createPostSchema = z.object({
  title: z.string().min(2, {
    message: "Post title must be at least 2 characters.",
  }),
  extract: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  category: z.string().array().min(1, {
    message: "category can't be empty.",
  }),
  tags: z.string().array().optional(),
  content: z.string().min(2, {
    message: "Post body must be at least 2 characters.",
  }),
  isPublished: z.boolean().default(false),
});

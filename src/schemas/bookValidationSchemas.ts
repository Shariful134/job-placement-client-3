import { z } from "zod";

export const bookSchemaValidation = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  price: z.number().min(0, "Price must be a positive number").optional(),
  category: z
    .enum(["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"])
    .optional(),
  description: z.string().optional(),
  quantity: z.number().optional(),
  publicationDate: z.string().optional(),
  publisher: z.string().optional(),
  imageURL: z.string().url("Invalid image URL").optional(),
});

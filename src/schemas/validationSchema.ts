import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  email: z.string({ required_error: "email is required" }),
  password: z.string({ required_error: "password is required" }),
});




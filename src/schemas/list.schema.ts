import { z } from "zod";

export const listSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export type ListSchema = z.infer<typeof listSchema>;

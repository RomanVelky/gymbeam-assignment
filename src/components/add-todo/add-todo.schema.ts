import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date().optional()
  ),
  tags: z.array(z.string()).optional(),
  completed: z.boolean(),
  estimatedTime: z.number().nonnegative("Must be a positive number").optional(),
  actualTimeSpent: z
    .number()
    .nonnegative("Must be a positive number")
    .optional(),
  listId: z.number(),
});

export type TodoFormData = z.infer<typeof todoSchema>;

//todo.schema.ts

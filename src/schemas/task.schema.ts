import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be at most 100 characters long" })
    .trim(),
  description: z
    .string()
    .max(500, { message: "Description must be at most 500 characters long" })
    .trim()
    .optional(),
  completed: z.boolean().optional().default(false),
  dueDate: z.coerce.date().nullable().optional(),
  priority: z
    .array(
      z.enum(["low", "medium", "high"], {
        message: "Invalid priority value",
      })
    )
    .optional()
    .default(["medium"]),
  subject: z.array(
    z
      .enum(
        [
          "general",
          "math",
          "physics",
          "chemistry",
          "biology",
          "science",
          "history",
          "language",
          "art",
          "music",
          "physical_education",
          "computer_science",
          "other",
        ],
        {
          message: "Invalid subject value",
        }
      )
      .optional()
      .default("general")
  ),
});

export const editTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be at most 100 characters long" })
    .trim()
    .optional(),
  description: z
    .string()
    .max(500, { message: "Description must be at most 500 characters long" })
    .trim()
    .optional(),
  completed: z.boolean().optional(),
  dueDate: z.coerce.date().nullable().optional(),
  priority: z
    .array(
      z.enum(["low", "medium", "high"], {
        message: "Invalid priority value",
      })
    )
    .optional(),
  subject: z.array(
    z
      .enum(
        [
          "general",
          "math",
          "physics",
          "chemistry",
          "biology",
          "science",
          "history",
          "language",
          "art",
          "music",
          "physical_education",
          "computer_science",
          "other",
        ],
        {
          message: "Invalid subject value",
        }
      )
      .optional()
  ),
});

export const TaskIdValidations = z.object({
  id: z
  .string()
  .trim()
  .min(1, { message: "Task ID is required" }),
});

export type TaskId = z.infer<typeof TaskIdValidations>;
export type Task = z.infer<typeof createTaskSchema>;
export type EditTask = z.infer<typeof editTaskSchema>;

// generate an example of a task in json format
export const exampleTask: Task = {
  title: "Example Task",
  description: "This is an example task",
  completed: true,
  dueDate: new Date(),
  priority: ["medium"],
  subject: ["general"],
};

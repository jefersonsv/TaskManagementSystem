import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "You must provide the task title",
  }),
  description: z.string().min(2, {
    message: "You must provide the task description",
  }),
  date: z.date().refine((date) => !!date, {
    message: "You must provide the task date",
  }),
  status: z.string().min(1, {
    message: "You must provide the task status",
  }),
  priority: z.string().min(1, {
    message: "You must provide the task priority",
  }),
});

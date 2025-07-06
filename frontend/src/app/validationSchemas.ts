import moment from 'moment';
import { z } from 'zod';

export const taskFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(255, { message: "Title must be less than 255 characters" }),
  description: z.string().min(1, { message: "Description is required" }),
  deadline: z.string().refine((val) => moment(val, "YYYY-MM-DD", true).isValid(), {
    message: "Deadline must be in YYYY-MM-DD format",
  }).or(z.string().nullish()),
  project_id: z.string().min(1, { message: "Project is required" })
});

export const projectFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(255, { message: "Title must be less than 255 characters" }),
  deadline: z.string().min(1, { message: "Deadline is required" }).refine((val) => moment(val, "YYYY-MM-DD", true).isValid(), {
    message: "Deadline must be in YYYY-MM-DD format",
  })
})
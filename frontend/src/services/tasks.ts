import { Task } from "@/types/task";
import api from "./api";
import { taskFormSchema } from "@/app/validationSchemas";
import { z } from "zod";

type TaskForm = z.infer<typeof taskFormSchema>;

export async function getTasks(): Promise<Task[]> {
  const response = await api.get("/tasks");
  return response.data;
}

export async function getTask(taskId: number): Promise<Task> {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
}

export async function createTask(taskData: TaskForm): Promise<Task> {
  const response = await api.post("/tasks", taskData);
  return response.data as Task;
}
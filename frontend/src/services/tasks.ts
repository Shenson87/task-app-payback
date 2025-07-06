import { Task } from "@/types/task";
import api from "./api";
import { taskFormSchema } from "@/app/validationSchemas";
import { z } from "zod";

type TaskForm = z.infer<typeof taskFormSchema>;

export async function getTasks(): Promise<Task[]> {
  const data = await api.get("/tasks").then((res) => res.data).catch((error) => console.error(error));
  return data;
}

export async function getTask(taskId: number): Promise<Task> {
  const data = await api.get(`/tasks/${taskId}`).then((res) => res.data).catch((error) => console.error(error));
  return data;
}

export async function createTask(taskData: TaskForm): Promise<Task> {
  const data = await api.post("/tasks", taskData).then((res) => res.data).catch((error) => console.error(error));
  return data as Task;
}

export async function putTask(taskId: number, taskData: TaskForm): Promise<Task> {
  const data = await api.put(`/tasks/${taskId}`, taskData).then((res) => res.data).catch((error) => console.error(error));
  return data as Task;
}

export async function deleteTask(taskId: number): Promise<void> {
  await api.delete(`/tasks/${taskId}`).catch((error) => console.error(error));
}
import { Task } from "@/types/task";
import api from "./api";

export async function getTasks(): Promise<Task[]> {
  const response = await api.get("/tasks");
  return response.data;
}

export async function createTask(taskData: Omit<Task, "id">): Promise<Task> {
  const response = await api.post("/tasks", taskData);
  return response.data as Task;
}
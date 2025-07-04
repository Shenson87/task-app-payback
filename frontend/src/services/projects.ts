import { Project } from "@/types/project";
import api from "./api";

export async function getProjects(): Promise<Project[]> {
  const response = await api.get("/projects");
  return response.data;
}

export async function createProject(projectData: Omit<Project, "id">): Promise<Project> {
  const response = await api.post("/projects", projectData);
  return response.data;
}
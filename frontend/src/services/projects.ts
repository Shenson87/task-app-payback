import { Project } from "@/types/project";
import api from "./api";

export async function getProjects(): Promise<Project[]> {
  const data = await api.get("/projects").then((res) => res.data).catch((error) => console.error(error));
  return data;
}

export async function createProject(projectData: Omit<Project, "id">): Promise<Project> {
  const data = await api.post("/projects", projectData).then((res) => res.data).catch((error) => console.error(error));
  return data;
}
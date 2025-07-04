import { getProjects } from "@/services/projects";
import { Project } from "@/types/project";
import { useQuery } from "@tanstack/react-query";

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
}
import { getTasks } from "@/services/tasks";
import { Task } from "@/types/task";
import { useQuery } from "@tanstack/react-query";

export function useTasks() {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
}

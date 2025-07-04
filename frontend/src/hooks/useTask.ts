import { useTasks } from "./useTasks";

const useTask = (id?: number) => {
  const { data: tasks } = useTasks();
  return tasks?.find(t => t.id === id)
}

export default useTask
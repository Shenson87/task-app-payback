import { getProjects } from "@/services/projects";
import TaskForm from "../_components/TaskForm";

const NewTaskPage = async () => {
  try {
    const projects = await getProjects();
    return <TaskForm projects={projects} />;
  } catch (error) {
    console.log(error);
  }
};

export default NewTaskPage;

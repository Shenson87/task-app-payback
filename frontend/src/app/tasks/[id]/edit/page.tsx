import { getProjects } from "@/services/projects";
import { getTask } from "@/services/tasks";
import { notFound } from "next/navigation";
import TaskForm from "../../_components/TaskForm";

interface Props {
  params: { id: string };
}

const EditTaskPage = async ({ params }: Props) => {
  try {
    const task = await getTask(parseInt(params.id));
    const projects = await getProjects();
    return <TaskForm task={task} projects={projects} />;
  } catch (error) {
    console.log(error);
    return notFound();
  }
};

export default EditTaskPage;

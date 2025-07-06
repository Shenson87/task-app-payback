import { getTask } from "@/services/tasks";
import { notFound } from "next/navigation";
import TaskForm from "../../_components/TaskForm";

const EditTaskPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  try {
    const { id } = await params;
    const task = await getTask(parseInt(id));
    return <TaskForm task={task} />;
  } catch (error) {
    console.log(error);
    return notFound();
  }
};

export default EditTaskPage;

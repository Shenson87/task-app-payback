import { getTask } from "@/services/tasks";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";

interface Props {
  params: { id: string };
}

const TaskDetailPage = async ({ params }: Props) => {
  try {
    const task = await getTask(parseInt(params.id));
    return (
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Box>
          <TaskDetails task={task} />
        </Box>
        <Box>
          <EditTaskButton taskId={task.id} />
        </Box>
      </Grid>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
};

export default TaskDetailPage;

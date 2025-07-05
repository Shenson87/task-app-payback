import { getTask } from "@/services/tasks";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";
import DeleteTaskButton from "./DeleteTaskButton";

interface Props {
  params: { id: string };
}

const TaskDetailPage = async ({ params }: Props) => {
  try {
    const task = await getTask(parseInt(params.id));
    return (
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          <TaskDetails task={task} />
        </Box>
        <Box>
          <Flex direction="column" gap="4" my="2">
          <EditTaskButton taskId={task.id} />
          <DeleteTaskButton taskId={task.id} />
          </Flex>
        </Box>
      </Grid>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
};

export default TaskDetailPage;

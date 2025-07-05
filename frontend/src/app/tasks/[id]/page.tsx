import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import { getTask } from "@/services/tasks";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import moment from "moment";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const TaskDetailPage = async ({ params }: Props) => {
  try {
    const task = await getTask(parseInt(params.id));
    return (
      <div>
        <Heading as="h1">{task.title}</Heading>
        <Flex gap="2" my="2">
          <TaskStatusBadge status={task.completed} />
          <Text>{moment(task.deadline).format("YYYY-MM-DD")}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{task.description}</ReactMarkdown>
        </Card>
      </div>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
};

export default TaskDetailPage;

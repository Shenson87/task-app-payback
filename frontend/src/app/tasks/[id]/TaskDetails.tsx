import { Task } from "@/types/task";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import TaskStatusBadge from "../_components/TaskStatusBadge";

const TaskDetails = ({ task }: { task: Task }) => {
  return (
    <>
      <Heading as="h1">{task.title}</Heading>
      <Flex gap="2" my="2">
        <TaskStatusBadge status={task.completed} />
        <Text>
          {(task.deadline && moment(task.deadline).format("YYYY-MM-DD")) ||
            "N/A"}
        </Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{task.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default TaskDetails;

import { Badge } from "@radix-ui/themes";

const TaskStatusBadge = ({ status }: { status: boolean }) => {
  return (
    <Badge color={status ? "green" : "violet"}>
      {status ? "Completed" : "In Progress"}
    </Badge>
  );
};

export default TaskStatusBadge;

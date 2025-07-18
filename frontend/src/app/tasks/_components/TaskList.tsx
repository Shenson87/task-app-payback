import { Link } from "@/app/components";
import { getTasks } from "@/services/tasks";
import { Table } from "@radix-ui/themes";
import moment from "moment";
import TaskStatusBadge from "./TaskStatusBadge";

const TaskList = async () => {
  const tasks = await getTasks();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Task Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Deadline
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tasks?.map((task) => (
          <Table.Row key={task.id}>
            <Table.Cell>
              <Link href={`/tasks/${task.id}`}>{task.title}</Link>
              <div className="block md:hidden">
                {task.completed ? "Completed" : "Not Completed"}
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {(task.deadline && moment(task.deadline).format("YYYY-MM-DD")) ||
                "N/A"}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <TaskStatusBadge status={task.completed} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TaskList;

import TaskList from "./_components/TaskList";
import TaskToolbar from "./TaskToolbar";

const TasksPage = () => {
  return (
    <div>
      <TaskToolbar />
      <TaskList />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default TasksPage;

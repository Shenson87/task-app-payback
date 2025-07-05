import TaskList from "../components/TaskList";
import TaskToolbar from "./TaskToolbar";

const TasksPage = () => {
  return (
    <div>
      <TaskToolbar />
      <TaskList />
    </div>
  );
};

export default TasksPage;

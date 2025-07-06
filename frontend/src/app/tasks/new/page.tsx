import TaskForm from "../_components/TaskForm";

const NewTaskPage = async () => {
  try {
    return <TaskForm />;
  } catch (error) {
    console.log(error);
  }
};

export default NewTaskPage;

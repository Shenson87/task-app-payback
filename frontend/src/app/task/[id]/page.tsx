import TaskForm from "@/app/components/TaskForm";

type Props = {
  params: { id: string };
};

export default async function TaskDetailsPage({ params }: Props) {
  const { id } = await params
  return (
    <div>
      <TaskForm id={id} />
    </div>
  );
}
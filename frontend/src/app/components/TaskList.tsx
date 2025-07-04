"use client";

import { useTasks } from "@/hooks/useTasks";
import moment from "moment";

const TaskList = () => {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Task Name
          </th>
          <th scope="col" className="px-6 py-3">
            Task Description
          </th>
          <th scope="col" className="px-6 py-3">
            Deadline
          </th>
          <th scope="col" className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((task) => (
          <tr
            key={task.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <td className="px-6 py-4">{task.title} </td>
            <td className="px-6 py-4">{task.description}</td>
            <td className="px-6 py-4">
              {moment(task.deadline).format("YYYY-MM-DD")}
            </td>
            <td className="px-6 py-4"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;

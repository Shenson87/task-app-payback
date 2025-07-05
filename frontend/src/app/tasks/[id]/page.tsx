import { getTask } from '@/services/tasks'
import moment from 'moment'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  params: { id: string }
}

const TaskDetailPage = async ({ params }: Props) => {
  try {
    const task = await getTask(parseInt(params.id))
    return (
    <div>
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>{moment(task.deadline).format("YYYY-MM-DD")}</p>
      <p>{task.completed ? "Completed" : "Not Completed"}</p>
    </div>
  )
  }
  catch (error) {
    console.log(error);
    return notFound()
  }
}

export default TaskDetailPage
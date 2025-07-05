import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import TaskList from '../components/TaskList'

const TasksPage = () => {
  return (
    <div>
      <Button><Link href="/tasks/new">New Task</Link></Button>
      <TaskList/>
    </div>
  )
}

export default TasksPage
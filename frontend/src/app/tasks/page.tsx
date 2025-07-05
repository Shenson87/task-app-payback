import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import TaskList from '../components/TaskList'

const TasksPage = () => {
  return (
    <div>
      <div className='mb-5'>
        <Button><Link href="/tasks/new">New Task</Link></Button>
      </div>
      <TaskList/>
    </div>
  )
}

export default TasksPage
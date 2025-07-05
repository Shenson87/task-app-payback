import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const TasksPage = () => {
  return (
    <div>
      <Button><Link href="/projects/new">New Project</Link></Button>
    </div>
  )
}

export default TasksPage
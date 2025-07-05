import { Table } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import TaskToolbar from './TaskToolbar'

const LoadingTasksPage = () => {
  const tasks = [1, 2, 3, 4, 5];
  return (
    <div>
      <TaskToolbar />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Task Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Deadline</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks?.map((task) => (
            <Table.Row key={task}>
              <Table.Cell>
                <Skeleton />
                <div className='block md:hidden'><Skeleton /></div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
              <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
            </Table.Row>
        ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default LoadingTasksPage
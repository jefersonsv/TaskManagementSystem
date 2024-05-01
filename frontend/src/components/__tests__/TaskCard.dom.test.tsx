import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskCard from '../TaskCard'
import { EPriority } from '../../types/EPriority'
import { EStatus } from '../../types/EStatus'
import { ITaskItem } from '../../types/ITaskItem'

test('Link changes the state when hovered', async () => {
  const taskItem = {
    id: 1,
    title: "title",
    description: "description",
    date: new Date(2024,0,1),
    priority: EPriority.Low,
    status: EStatus.Completed
  } as ITaskItem

  render(
    <TaskCard taskItem={taskItem} onDelete={() => {}} />
  )

  const link = screen.debug();

  console.info(link)
  expect(link).toBe(true)
})




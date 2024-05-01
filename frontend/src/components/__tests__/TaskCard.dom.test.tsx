import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskCard from '../TaskCard'
import { EPriority } from '../../types/EPriority'
import { EStatus } from '../../types/EStatus'
import { ITaskItem } from '../../types/ITaskItem'

test('Render task card', async () => {
  const taskItem = {
    id: 1,
    title: "my title",
    description: "my description",
    date: new Date(2024,0,1),
    priority: EPriority.Low,
    status: EStatus.Completed
  } as ITaskItem

  render(
    <TaskCard taskItem={taskItem} onDelete={() => {}} />
  )

  const title = screen.getByRole('heading', {
    name: /title/i
  })
  const description = screen.getByText(/description/i);
  const date = screen.getByText(/01\/01\/2024/i);
  const priority = screen.getByText(/low/i);
  const status = screen.getByText(/completed/i);

  expect(description).toBeVisible();
  expect(date).toBeVisible();
  expect(priority).toBeVisible();
  expect(status).toBeVisible();
  expect(title).toBeVisible();
})




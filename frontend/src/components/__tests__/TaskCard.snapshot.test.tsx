import TaskCard from "../TaskCard";
import { EPriority } from "../../types/EPriority";
import { EStatus } from "../../types/EStatus";
import { ITaskItem } from "../../types/ITaskItem";
import { expect, it } from 'vitest'

it('Render TaskCard component', () => {
  const taskItem = {
    id: 1,
    title: "title",
    description: "description",
    date: new Date(2024,0,1),
    priority: EPriority.Low,
    status: EStatus.Completed
  } as ITaskItem

  const result = <TaskCard taskItem={taskItem} onDelete={() => {}} />
  expect(result).toMatchInlineSnapshot(`
    <TaskCard
      onDelete={[Function]}
      taskItem={
        {
          "date": 2024-01-01T00:00:00.000Z,
          "description": "description",
          "id": 1,
          "priority": 1,
          "status": 3,
          "title": "title",
        }
      }
    />
  `)
})

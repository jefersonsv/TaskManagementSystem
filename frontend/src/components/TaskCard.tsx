import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { priorityToString, statusToString } from "@/lib/convert";
import { ITaskItem } from "@/types/ITaskItem";
import { TParamHandlerVoid } from "@/types/TParamHandlerVoid";
import { format } from "date-fns";
import { Button } from "./ui/button";

export default function TaskCard({
  taskItem,
  onDelete,
}: {
  taskItem: ITaskItem;
  onDelete: TParamHandlerVoid<ITaskItem>;
}) {
  return (
    <div key={taskItem.id} className="mb-2">
      <Card>
        <CardHeader>
          <CardTitle>{taskItem.title}</CardTitle>
          <CardDescription>{taskItem.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <div>Status:</div>
            <div>{statusToString(taskItem.status)}</div>
          </div>

          <div className="flex space-x-2">
            <div>Priority:</div>
            <div>{priorityToString(taskItem.priority)}</div>
          </div>

          <div className="flex space-x-2">
            <div>Date:</div>
            <div>{format(taskItem.date, "dd/MM/yyyy")}</div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="space-x-2">
            <Button
              onClick={() =>
                (window.location.href = `/edit-task/${taskItem.id}`)
              }
            >
              Edit
            </Button>
            <Button onClick={() => onDelete(taskItem)}>Delete</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { priorityToString, statusToString } from "@/lib/convert";
import { EPriority } from "@/types/EPriority";
import { EStatus } from "@/types/EStatus";
import { IDeleteTask } from "@/types/IDeleteTask";
import { ITaskItem } from "@/types/ITaskItem";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";
import PriorityDropdown from "./PriorityDropdown";
import Progress from "./Progress";
import StatusDropdown from "./StatusDropdown";
import { Button } from "./ui/button";

export default function ListTasks() {
  const [deleteTask, setDeleteTask] = useState<IDeleteTask | undefined>();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [data, setData] = useState<ITaskItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // https://localhost:7253
  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    if (hasMore) {
      axios
        .get(
          `/api/tasks?page=${page}&status=${EStatus[status as any]}&priority=${
            EPriority[priority as any]
          }`
        )
        .then((res) => {
          if (res.data.length) {
            setData([...data, ...res.data]);
            setPage(page + 1);
          } else {
            setHasMore(false);
          }
        });
    }
  };

  useEffect(() => {
    axios
      .get(
        `/api/tasks?page=1&status=${EStatus[status as any]}&priority=${
          EPriority[priority as any]
        }`
      )
      .then((res) => {
        setData([...res.data]);
        if (!res.data.length) {
          setHasMore(false);
        }
      });
  }, [status, priority]);

  function handleDelete(item: ITaskItem) {
    setDeleteTask({
      id: item.id,
      title: item.title,
      showConfirm: true,
    });
  }

  function performDelete(del: IDeleteTask) {
    axios.delete(`/api/tasks/${del.id}`).then((res) => {
      if (res.status === 204) {
        toast(`Task ${del.title} deleted`);
        const newData = data.filter((s) => s.id !== del.id);
        setData(newData);
      } else {
        toast.error("An error occurred while deleting the task");
      }

      setDeleteTask(undefined);
    });
  }

  function handleStatus(status: string) {
    setPage(1);
    setStatus(status);
    setHasMore(true);
  }

  function handlePriority(priority: string) {
    setPage(1);
    setPriority(priority);
    setHasMore(true);
  }

  return (
    <div>
      <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl mb-4">
        Task List
      </h2>

      <div>
        <Progress />
      </div>

      <div className="flex my-4 space-x-4">
        <div className="w-1/2 flex items-center space-x-2">
          <div>Status: </div>
          <StatusDropdown onChange={handleStatus} firstEmpty={true} />
        </div>
        <div className="w-1/2 flex items-center space-x-2">
          <div>Priority: </div>
          <PriorityDropdown onChange={handlePriority} />
        </div>
      </div>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading tasks...</h4>}
      >
        {data.map((s: ITaskItem) => (
          <div key={s.id} className="mb-2">
            <Card>
              <CardHeader>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>{s.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <div>Status:</div>
                  <div>{statusToString(s.status)}</div>
                </div>

                <div className="flex space-x-2">
                  <div>Priority:</div>
                  <div>{priorityToString(s.priority)}</div>
                </div>

                <div className="flex space-x-2">
                  <div>Date:</div>
                  <div>{format(s.date, "dd/MM/yyyy")}</div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="space-x-2">
                  <Button
                    onClick={() =>
                      (window.location.href = `/edit-task/${s.id}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(s)}>Delete</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </InfiniteScroll>

      <AlertDialog open={deleteTask?.showConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure to delete the task {deleteTask?.title}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteTask(undefined)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => performDelete(deleteTask!)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

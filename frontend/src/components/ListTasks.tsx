import { DeleteTask, GetTasks } from "@/lib/api";
import { IDeleteTask } from "@/types/IDeleteTask";
import { ITaskItem } from "@/types/ITaskItem";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";
import FilterPriority from "./FilterPriority";
import FilterStatus from "./FilterStatus";
import { PopupDeleteTask } from "./PopupDeleteTask";
import Progress from "./Progress";
import TaskCard from "./TaskCard";

export default function ListTasks() {
  const [deleteTask, setDeleteTask] = useState<IDeleteTask | undefined>();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [data, setData] = useState<ITaskItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMoreData();
  }, [status, priority]);

  const fetchMoreData = () => {
    GetTasks(page, status, priority).then((res) => {
      if (res.data.length) {
        setData([...data, ...res.data]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    });
  };

  function handleDelete(item: ITaskItem) {
    setDeleteTask({
      id: item.id,
      title: item.title,
      showConfirm: true,
    });
  }

  function performDelete(del: IDeleteTask) {
    DeleteTask(del.id).then((res) => {
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
    setData([]);
    setStatus(status);
  }

  function handlePriority(priority: string) {
    setPage(1);
    setData([]);
    setPriority(priority);
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
        <FilterStatus onChange={(status: string) => handleStatus(status)} />
        <FilterPriority
          onChange={(priority: string) => handlePriority(priority)}
        />
      </div>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading tasks...</h4>}
      >
        {data.map((s: ITaskItem) => (
          <TaskCard taskItem={s} onDelete={handleDelete} />
        ))}
      </InfiniteScroll>

      <PopupDeleteTask
        taskTitle={deleteTask?.title || ""}
        showConfirm={deleteTask?.showConfirm || false}
        onCancel={() => setDeleteTask(undefined)}
        onConfirm={() => performDelete(deleteTask!)}
      />
    </div>
  );
}

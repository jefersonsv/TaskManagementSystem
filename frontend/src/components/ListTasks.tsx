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
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Progress from "./Progress";

export default function ListTasks() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ITaskItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // https://localhost:7253
  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    if (hasMore) {
      axios.get(`http://localhost:5234/api/tasks?page=${page}`).then((res) => {
        if (res.data.length) {
          setData([...data, ...res.data]);
          setPage(page + 1);
        } else {
          setHasMore(false);
        }
      });
    }
  };

  return (
    <div>
      <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl mb-4">
        Task List
      </h2>

      <div>
        <Progress data={[1, 2]} />
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
              </CardContent>
              <CardFooter>
                <p>actions</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

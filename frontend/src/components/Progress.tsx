import { statusToString } from "@/lib/convert";
import { TaskProgress } from "@/types/ITaskProgress";
import axios, { AxiosError } from "axios";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import useSWR from "swr";

ChartJS.register(ArcElement, Tooltip, Legend);

const fetcher = (url: string) => axios.get<any>(url).then((res) => res.data);

export default function Progress() {
  const { data, error, isLoading } = useSWR<TaskProgress[], AxiosError>(
    `/api/tasks/progress`,
    fetcher
  );

  if (isLoading) return <div>Loading task progress chart</div>;
  if (error) return <div>Failed to load task progress chart</div>;

  if (data) {
    const chartData = {
      labels: data.map((s: TaskProgress) => statusToString(s.status)),
      datasets: [
        {
          label: "Progress in percent",
          data: data.map((s: TaskProgress) => s.percentage.toFixed(2)),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(65, 128, 36, 0.2)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="container w-1/3 my-4">
        <Pie data={chartData} />
      </div>
    );
  }
}

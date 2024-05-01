import { GetProgress } from "@/lib/api";
import { statusToString } from "@/lib/convert";
import { useAuthStore } from "@/stores/useAuthStore";
import { IAPIResponse } from "@/types/IAPIResponse";
import { ITaskProgress } from "@/types/ITaskProgress";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Progress() {
  const authState = useAuthStore.getState();
  const [data, setData] = useState<ITaskProgress[]>([]);
  const [error, setError] = useState<IAPIResponse>();

  useEffect(() => {
    (async () => {
      const res = await GetProgress(authState.token);

      if (res.success) {
        setData(res.data);
      } else {
        setError(res);
      }
    })();
  }, []);

  if (error) return <div>{error.message}</div>;

  if (data.length) {
    const chartData = {
      labels: data.map((s: ITaskProgress) => statusToString(s.status)),
      datasets: [
        {
          label: "Progress in percent",
          data: data.map((s: ITaskProgress) => s.percentage.toFixed(2)),
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
      <div className="container w-1/3 my-4 h-96">
        <Pie data={chartData} />
      </div>
    );
  }
}

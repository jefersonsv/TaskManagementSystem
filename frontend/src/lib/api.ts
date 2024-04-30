import { EPriority } from "@/types/EPriority";
import { EStatus } from "@/types/EStatus";
import axios from "axios";
import qs from "qs";

export async function GetTasks(
  page: number = 1,
  status: string = "",
  priority: string = ""
) {
  const params = {
    page,
    status: status ? EStatus[status as any] : undefined,
    priority: priority ? EPriority[priority as any] : undefined,
  };
  const querystring = qs.stringify(params);
  console.info(querystring);
  return await axios.get(`/api/tasks?${querystring}`);
}

export async function DeleteTask(id: number) {
  return await axios.delete(`/api/tasks/${id}`);
}

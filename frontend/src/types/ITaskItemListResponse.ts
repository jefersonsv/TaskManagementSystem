import { ITaskItem } from "./ITaskItem";

export interface ITaskItemListResponse {
  items: ITaskItem[];
  page: number;
  total: number;
  totalPages: number;
}

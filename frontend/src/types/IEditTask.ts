import { ITaskItem } from "./ITaskItem";

export interface IEditTask extends ITaskItem {
  showConfirm: boolean;
}

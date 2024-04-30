import { EPriority } from "./EPriority";
import { EStatus } from "./EStatus";

export interface ITaskItem {
  id: number;
  title: string;
  description: string;
  date: Date;
  priority: EPriority;
  status: EStatus;
}

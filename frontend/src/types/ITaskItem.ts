import { EPriority } from "./EPriority";
import { EStatus } from "./EStatus";

export interface ITaskItem {
  id: string;
  title: string;
  description: string;
  date: Date;
  priority: EPriority;
  status: EStatus;
}

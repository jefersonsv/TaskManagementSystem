import { EStatus } from "./EStatus";

export interface ITaskProgress {
  status: EStatus;
  percentage: number;
}

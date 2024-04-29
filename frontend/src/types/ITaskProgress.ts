import { EStatus } from "./EStatus";

export interface TaskProgress {
  status: EStatus;
  percentage: number;
}

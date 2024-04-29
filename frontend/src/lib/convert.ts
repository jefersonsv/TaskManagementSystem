import { EPriority } from "@/types/EPriority";
import { EStatus } from "@/types/EStatus";

export function statusToString(enumValue: number): string | undefined {
  return EStatus[enumValue];
}

export function priorityToString(enumValue: number): string | undefined {
  return EPriority[enumValue];
}

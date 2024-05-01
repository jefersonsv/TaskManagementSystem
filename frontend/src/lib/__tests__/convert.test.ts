import { expect, test } from 'vitest'
import { EPriority } from "@/types/EPriority";
import { EStatus } from "@/types/EStatus";
import { priorityToString, statusToString } from "../convert";

test("Test status enumerator", () => {
  expect(statusToString(1)).toBe(EStatus[EStatus.Pending]);
  expect(statusToString(2)).toBe(EStatus[EStatus["In Progress"]]);
  expect(statusToString(3)).toBe(EStatus[EStatus.Completed]);
  expect(statusToString(4)).toBe(EStatus[EStatus.Archived]);
  expect(statusToString(5)).toBe(undefined);
});

test("Test priority enumerator", () => {
  expect(priorityToString(1)).toBe(EPriority[EPriority.Low]);
  expect(priorityToString(2)).toBe(EPriority[EPriority.Medium]);
  expect(priorityToString(3)).toBe(EPriority[EPriority.High]);
  expect(priorityToString(4)).toBe(undefined);
});

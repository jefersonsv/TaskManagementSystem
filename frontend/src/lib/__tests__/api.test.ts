import { GetTasks } from "../api";

jest.mock("@/types/Constants", () => ({
  API_ENDPOINT: "http://localhost",
}));

test("Test API GetTasks", async () => {
  const aa = await GetTasks("token", 1, "Archived", "Low");

  // expect(statusToString(1)).toBe(EStatus[EStatus.Pending]);
  // expect(statusToString(2)).toBe(EStatus[EStatus["In Progress"]]);
  // expect(statusToString(3)).toBe(EStatus[EStatus.Completed]);
  // expect(statusToString(4)).toBe(EStatus[EStatus.Archived]);
  expect(aa).toBe(undefined);
});

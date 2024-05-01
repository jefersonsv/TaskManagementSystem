import { GetTasks } from "../api";
import { expect, test,vi } from 'vitest'

vi.mock("@/types/Constants", () => ({
  API_ENDPOINT: "http://localhost",
}));

test("API offline return no success", async () => {
  const res = await GetTasks("token", 1, "Archived", "Low");

  expect(res.success).toBe(false);
  expect(res.message).toBe("Error loading tasks");
});

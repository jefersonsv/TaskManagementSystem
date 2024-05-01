import Progress from "@/components/Progress";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import { expect, test, vi } from "vitest";

vi.mock("@/lib/api", () => ({
  GetProgress: async () => ({
    success: true,
    data: [{ percentage: 10, status: "Pendent" }],
  }),
}));

test("Render pie chart container", async () => {
  // arrange
  await act(async () => {
    render(<Progress />);
  });

  // act
  const chartContainer = screen.getByRole("img");

  // assert
  expect(chartContainer).toBeVisible();
});

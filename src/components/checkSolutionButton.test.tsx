import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CheckSolutionButton } from "./CheckSolutionButton";

const mockOnSolve = vi.fn();

const mockCheckSolution = vi.hoisted(() => vi.fn());
vi.mock("../utilities/checkSolution", () => ({
  checkSolution: mockCheckSolution,
}));

const mockCells = ["1", "2", "", ""];
const mockSolution = [1, 2, 3, 4];

function renderButton({ cells = mockCells, solution = mockSolution }) {
  render(
    <CheckSolutionButton
      cells={cells}
      solution={solution}
      onSolve={mockOnSolve}
    />,
  );
}

describe("Check Solution button", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("is hidden when no puzzle has been generated", () => {
    renderButton({ cells: [], solution: [] });
    const button = screen.getByText("Check solution");
    expect(button).not.toBeVisible();
  });

  it("is visible when a puzzle has been generated", () => {
    renderButton({});
    const button = screen.getByRole("button", { name: "Check solution" });
    expect(button).toBeVisible();
  });

  it("calls onSolve when the puzzle is solved", async () => {
    mockCheckSolution.mockReturnValue("solved");

    renderButton({});
    await userEvent.click(
      screen.getByRole("button", { name: "Check solution" }),
    );
    expect(mockCheckSolution).toHaveBeenCalledExactlyOnceWith(
      mockCells,
      mockSolution,
    );
    expect(mockOnSolve).toHaveBeenCalledOnce();
  });

  it("does not call onSolve when the puzzle is incomplete", async () => {
    mockCheckSolution.mockReturnValue("incomplete");

    renderButton({});
    await userEvent.click(
      screen.getByRole("button", { name: "Check solution" }),
    );
    expect(mockCheckSolution).toHaveBeenCalledOnce();
    expect(mockOnSolve).not.toHaveBeenCalled();
  });

  it("does not call onSolve when the puzzle is incorrect", async () => {
    mockCheckSolution.mockReturnValue("incorrect");

    renderButton({});
    await userEvent.click(
      screen.getByRole("button", { name: "Check solution" }),
    );
    expect(mockCheckSolution).toHaveBeenCalledOnce();
    expect(mockOnSolve).toHaveBeenCalledTimes(0);
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewPuzzleButton } from "./NewPuzzleButton";

const mockSetCells = vi.fn();
const mockSetPuzzle = vi.fn();
const mockSetSolution = vi.fn();

const mockGenerate = vi.hoisted(() => vi.fn());
vi.mock("../utilities/generateSudoku", () => ({
  generateSudoku: mockGenerate,
}));

const mockPuzzle = [1, 0, 0, 4];
const mockSolution = [1, 2, 3, 4];

function renderButton() {
  render(
    <NewPuzzleButton
      setCells={mockSetCells}
      setPuzzle={mockSetPuzzle}
      setSolution={mockSetSolution}
    />,
  );
  return screen.getByRole("button", { name: "New puzzle" });
}

describe("New Puzzle button", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGenerate.mockReturnValue({
      puzzle: mockPuzzle,
      solution: mockSolution,
    });
  });

  it("correctly sets the generated puzzle array", async () => {
    await userEvent.click(renderButton());
    expect(mockSetPuzzle).toHaveBeenCalledOnce();
    expect(mockSetPuzzle).toHaveBeenCalledWith(mockPuzzle);
  });

  it("correctly sets the initial grid cells", async () => {
    await userEvent.click(renderButton());
    expect(mockSetCells).toHaveBeenCalledOnce();
    expect(mockSetCells).toHaveBeenCalledWith(["1", "", "", "4"]);
  });

  it("correctly sets the solution", async () => {
    await userEvent.click(renderButton());
    expect(mockSetSolution).toHaveBeenCalledOnce();
    expect(mockSetSolution).toHaveBeenCalledWith(mockSolution);
  });

  it("regenerates the puzzle on every click", async () => {
    const button = renderButton();
    await userEvent.click(button);
    await userEvent.click(button);
    expect(mockGenerate).toHaveBeenCalledTimes(2);
  });
});

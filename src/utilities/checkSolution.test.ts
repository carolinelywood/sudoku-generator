import { describe, expect, it } from "vitest";
import { checkSolution } from "./checkSolution";
import { generateSudoku } from "./generateSudoku";

const { solution } = generateSudoku();
const solvedCells = solution.map(String);

describe("checkSolution", () => {
  it("returns solved when every cell matches the solution", () => {
    expect(checkSolution(solvedCells, solution)).toBe("solved");
  });

  it("returns incomplete when any cell is empty", () => {
    const cells = [...solvedCells];
    cells[40] = "";
    expect(checkSolution(cells, solution)).toBe("incomplete");
  });

  it("returns incomplete when every cell is empty", () => {
    const cells = solution.map(() => "");
    expect(checkSolution(cells, solution)).toBe("incomplete");
  });

  it("returns incorrect when the grid is full but a cell is wrong", () => {
    const cells = [...solvedCells];
    cells[0] = String((solution[0] % 9) + 1);
    expect(checkSolution(cells, solution)).toBe("incorrect");
  });

  it("returns incomplete rather than incorrect when a grid is both", () => {
    const cells = [...solvedCells];
    cells[0] = String((solution[0] % 9) + 1);
    cells[80] = "";
    expect(checkSolution(cells, solution)).toBe("incomplete");
  });
});

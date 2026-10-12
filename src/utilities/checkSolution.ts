import type { Result } from "../constants";

export function checkSolution(cells: string[], solution: number[]): Result {
  if (cells.some((value) => value === "")) return "incomplete";
  return solution.every((n, i) => String(n) === cells[i])
    ? "solved"
    : "incorrect";
}

import { describe, expect, it } from "vitest";
import { BOX, CELLS, CLUES, SIZE, type Difficulty } from "../constants";
import { generateSudoku } from "./generateSudoku";

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const difficulties = Object.keys(CLUES) as Difficulty[];

function rows(board: number[]) {
  return Array.from({ length: SIZE }, (_, r) =>
    board.slice(r * SIZE, (r + 1) * SIZE),
  );
}

function columns(board: number[]) {
  return Array.from({ length: SIZE }, (_, c) =>
    Array.from({ length: SIZE }, (_, r) => board[r * SIZE + c]),
  );
}

function boxes(board: number[]) {
  return Array.from({ length: SIZE }, (_, b) => {
    const boxRow = Math.floor(b / BOX) * BOX;
    const boxCol = (b % BOX) * BOX;
    return Array.from(
      { length: SIZE },
      (_, i) =>
        board[(boxRow + Math.floor(i / BOX)) * SIZE + boxCol + (i % BOX)],
    );
  });
}

/** Brute-force solution counter, kept separate from the generator's own. */
/** TODO: Revise this? */
function countSolutions(board: number[], limit = 2): number {
  // Branch on the empty cell with the fewest possible digits, which keeps the
  // search small enough to check hard puzzles quickly
  let bestIndex = -1;
  let bestCandidates: number[] = [];
  for (let index = 0; index < CELLS; index++) {
    if (board[index] !== 0) continue;
    const candidates = candidatesFor(board, index);
    if (bestIndex === -1 || candidates.length < bestCandidates.length) {
      bestIndex = index;
      bestCandidates = candidates;
      if (candidates.length <= 1) break;
    }
  }
  if (bestIndex === -1) return 1;

  let count = 0;
  for (const digit of bestCandidates) {
    if (count >= limit) break;
    board[bestIndex] = digit;
    count += countSolutions(board, limit - count);
    board[bestIndex] = 0;
  }
  return count;
}

function candidatesFor(board: number[], index: number): number[] {
  const row = Math.floor(index / SIZE);
  const col = index % SIZE;
  const boxRow = row - (row % BOX);
  const boxCol = col - (col % BOX);
  const used = new Set<number>();
  for (let i = 0; i < SIZE; i++) {
    used.add(board[row * SIZE + i]);
    used.add(board[i * SIZE + col]);
    used.add(board[(boxRow + Math.floor(i / BOX)) * SIZE + boxCol + (i % BOX)]);
  }
  return DIGITS.filter((digit) => !used.has(digit));
}

describe("generateSudoku", () => {
  it("returns a puzzle and solution of the correct size (number of cells)", () => {
    const { puzzle, solution } = generateSudoku();
    expect(puzzle).toHaveLength(CELLS);
    expect(solution).toHaveLength(CELLS);
  });

  it("returns a valid solution in which every row, column and box contain digits 1-9 exactly once", () => {
    const { solution } = generateSudoku();
    for (const group of [
      ...rows(solution),
      ...columns(solution),
      ...boxes(solution),
    ]) {
      expect([...group].sort()).toEqual(DIGITS);
    }
  });

  it("only shows clues that match the solution", () => {
    const { puzzle, solution } = generateSudoku();
    puzzle.forEach((value, i) => {
      if (value !== 0) expect(value).toBe(solution[i]);
    });
  });

  it.each(difficulties)("leaves the target number of clues for %s", (level) => {
    const { puzzle } = generateSudoku(level);
    const clues = puzzle.filter((value) => value !== 0).length;
    // Hard puzzles can keep a few extra clues if no more can be removed
    expect(clues).toBeGreaterThanOrEqual(CLUES[level]);
    expect(clues).toBeLessThanOrEqual(CLUES[level] + 3);
  });

  it.each(difficulties)("has exactly one solution for %s", (level) => {
    const { puzzle } = generateSudoku(level);
    expect(countSolutions([...puzzle])).toBe(1);
  });

  it("generates different puzzles each time", () => {
    const first = generateSudoku().solution;
    const second = generateSudoku().solution;
    expect(second).not.toEqual(first);
  });
});

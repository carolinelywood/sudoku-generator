import { CELLS, CLUES, type Difficulty, type Puzzle } from "../constants";
import { countSolutions, fillBoard, shuffle } from "./helpers";

/**
 *
 * @param difficulty - The difficulty of the puzzle, which determines how many cells are pre-filled
 * @returns puzzle - The initial array of cells when the puzzle is generated
 *          solution - The correct solution to the puzzle
 *
 * Generates a random Sudoku puzzle with exactly one solution.
 *
 * Cells are removed from a random full solution one at a time, and a removal
 * is undone if it would allow more than one solution. Hard puzzles may end up
 * with a few more clues than the target if no further cell can be removed.
 */

export function generateSudoku(difficulty: Difficulty = "easy"): Puzzle {
  const solution: number[] = Array(CELLS).fill(0);
  fillBoard(solution);

  const puzzle = [...solution];
  let clues = CELLS;

  for (const index of shuffle([...Array(CELLS).keys()])) {
    if (clues <= CLUES[difficulty]) break;

    const removed = puzzle[index];
    puzzle[index] = 0;
    if (countSolutions([...puzzle]) === 1) {
      clues--;
    } else {
      puzzle[index] = removed;
    }
  }

  return { puzzle, solution };
}

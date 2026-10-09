/** A 9x9 board stored row by row; 0 means an empty cell. */
export type Board = number[];

export type Difficulty = "easy" | "medium" | "hard";

export interface Puzzle {
  puzzle: Board;
  solution: Board;
}

const SIZE = 9;
const BOX = 3;
const CELLS = SIZE * SIZE;

/** Target number of givens left on the board for each difficulty. */
const CLUES: Record<Difficulty, number> = {
  easy: 40,
  medium: 32,
  hard: 26,
};

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function canPlace(board: Board, index: number, digit: number): boolean {
  const row = Math.floor(index / SIZE);
  const col = index % SIZE;
  const boxRow = row - (row % BOX);
  const boxCol = col - (col % BOX);

  for (let i = 0; i < SIZE; i++) {
    if (board[row * SIZE + i] === digit) return false;
    if (board[i * SIZE + col] === digit) return false;
    const r = boxRow + Math.floor(i / BOX);
    const c = boxCol + (i % BOX);
    if (board[r * SIZE + c] === digit) return false;
  }
  return true;
}

/** Fills the board in place with a random complete solution. */
function fillBoard(board: Board): boolean {
  const index = board.indexOf(0);
  if (index === -1) return true;

  for (const digit of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    if (canPlace(board, index, digit)) {
      board[index] = digit;
      if (fillBoard(board)) return true;
      board[index] = 0;
    }
  }
  return false;
}

/** Counts solutions of the board, stopping once `limit` is reached. */
function countSolutions(board: Board, limit = 2): number {
  const index = board.indexOf(0);
  if (index === -1) return 1;

  let count = 0;
  for (let digit = 1; digit <= SIZE && count < limit; digit++) {
    if (canPlace(board, index, digit)) {
      board[index] = digit;
      count += countSolutions(board, limit - count);
      board[index] = 0;
    }
  }
  return count;
}

/**
 * Generates a random Sudoku puzzle with exactly one solution.
 *
 * Cells are removed from a random full solution one at a time, and a removal
 * is undone if it would allow more than one solution. Hard puzzles may end up
 * with a few more clues than the target if no further cell can be removed.
 */
export function generateSudoku(difficulty: Difficulty = "medium"): Puzzle {
  const solution: Board = Array(CELLS).fill(0);
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

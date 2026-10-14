import { BOX, SIZE } from "../constants";

export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function canPlace(board: number[], index: number, digit: number): boolean {
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
export function fillBoard(board: number[]): boolean {
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
export function countSolutions(board: number[], limit = 2): number {
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

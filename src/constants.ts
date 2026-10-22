export const SIZE = 9;
export const BOX = 3;
export const CELLS = SIZE * SIZE;

export type Difficulty = "easy" | "medium" | "hard";

/** Target number of givens left on the board for each difficulty. */
export const CLUES: Record<Difficulty, number> = {
  easy: 40,
  medium: 32,
  hard: 26,
};

export interface Puzzle {
  puzzle: number[];
  solution: number[];
}

export type Result = "incomplete" | "solved" | "incorrect";

export const FEEDBACK = {
  incomplete: {
    message: "Missing numbers",
    hint: "Click to see incomplete cells",
  },
  incorrect: { message: "Wrong answer", hint: "Click to see incorrect cells" },
};
export type FeedbackType = keyof typeof FEEDBACK;

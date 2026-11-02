import { generateSudoku } from "../utilities/generateSudoku";
import type { Dispatch, SetStateAction } from "react";

export function NewPuzzleButton({
  setCells,
  setPuzzle,
  setSolution,
}: {
  setCells: Dispatch<SetStateAction<string[]>>;
  setPuzzle: Dispatch<SetStateAction<number[]>>;
  setSolution: Dispatch<SetStateAction<number[]>>;
}) {
  const handleNewPuzzle = () => {
    const { puzzle, solution } = generateSudoku();
    setCells(puzzle.map((n) => (n === 0 ? "" : String(n))));
    //setCells(solution.map((n) => (n === 0 ? "" : String(n)))); //For testing
    setPuzzle(puzzle);
    setSolution(solution);
  };

  return (
    <button
      type="button"
      className="rounded-md border-2 border-transparent bg-accent-bg px-5 py-2 font-medium text-accent-text transition-[border-color] duration-300 hover:cursor-pointer hover:border-accent-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      onClick={handleNewPuzzle}
    >
      New puzzle
    </button>
  );
}

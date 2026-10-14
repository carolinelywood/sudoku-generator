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
    <button type="button" className="button" onClick={handleNewPuzzle}>
      New puzzle
    </button>
  );
}

import { generateSudoku } from "../utilities/generateSudoku";
import type { Dispatch, SetStateAction } from "react";

export function NewPuzzleButton({
  setCells,
  setGivens,
  setSolution,
}: {
  setCells: Dispatch<SetStateAction<string[]>>;
  setGivens: Dispatch<SetStateAction<boolean[]>>;
  setSolution: Dispatch<SetStateAction<number[] | undefined>>;
}) {
  const handleNewPuzzle = () => {
    const { puzzle, solution } = generateSudoku();
    setCells(puzzle.map((n) => (n === 0 ? "" : String(n))));
    //setCells(solution.map((n) => (n === 0 ? "" : String(n)))); //For testing
    setGivens(puzzle.map((n) => n !== 0));
    setSolution(solution);
  };

  return (
    <button type="button" className="button" onClick={handleNewPuzzle}>
      New puzzle
    </button>
  );
}

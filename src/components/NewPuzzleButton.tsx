import { generateSudoku } from "../utilities/sudoku";

export function NewPuzzleButton({
  setCells,
  setGivens,
}: {
  setCells: React.Dispatch<React.SetStateAction<string[]>>;
  setGivens: React.Dispatch<React.SetStateAction<boolean[]>>;
}) {
  const handleNewPuzzle = () => {
    const { puzzle } = generateSudoku();
    setCells(puzzle.map((n) => (n === 0 ? "" : String(n))));
    setGivens(puzzle.map((n) => n !== 0));
  };

  return (
    <button type="button" className="new-puzzle" onClick={handleNewPuzzle}>
      New puzzle
    </button>
  );
}

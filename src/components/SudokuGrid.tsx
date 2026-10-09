import { useState } from "react";
import { generateSudoku } from "../utilities/sudoku";
import "./SudokuGrid.css";

const SIZE = 9;

function SudokuGrid() {
  const [cells, setCells] = useState<string[]>(() => Array(SIZE * SIZE).fill(""));
  const [givens, setGivens] = useState<boolean[]>(() => Array(SIZE * SIZE).fill(false));

  const handleChange = (index: number, value: string) => {
    if (givens[index]) return;
    const digit = value.replace(/[^1-9]/g, "").slice(-1);
    setCells((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
  };

  const handleNewPuzzle = () => {
    const { puzzle } = generateSudoku();
    setCells(puzzle.map((n) => (n === 0 ? "" : String(n))));
    setGivens(puzzle.map((n) => n !== 0));
  };

  return (
    <div className="sudoku">
      <div className="sudoku-grid" role="grid" aria-label="Sudoku grid">
        {cells.map((value, index) => {
          const row = Math.floor(index / SIZE);
          const col = index % SIZE;
          return (
            <input
              key={index}
              className={givens[index] ? "sudoku-cell given" : "sudoku-cell"}
              data-row={row}
              data-col={col}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              readOnly={givens[index]}
              aria-label={`Row ${row + 1}, column ${col + 1}`}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          );
        })}
      </div>
      <button type="button" className="new-puzzle" onClick={handleNewPuzzle}>
        New puzzle
      </button>
    </div>
  );
}

export default SudokuGrid;

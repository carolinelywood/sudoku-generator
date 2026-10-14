import { SIZE } from "../constants";
import "./SudokuGrid.css";
import type { Dispatch, SetStateAction } from "react";

export function SudokuGrid({
  cells,
  puzzle,
  setCells,
}: {
  cells: string[];
  puzzle: number[];
  setCells: Dispatch<SetStateAction<string[]>>;
}) {
  const handleChange = (index: number, value: string) => {
    if (puzzle[index] !== 0) return;
    const digit = value.replace(/[^1-9]/g, "").slice(-1);
    setCells((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
  };

  return (
    <div className="sudoku-grid" role="grid" aria-label="Sudoku grid">
      {cells.map((value, index) => {
        const row = Math.floor(index / SIZE);
        const col = index % SIZE;
        const isGiven = puzzle[index] !== 0;
        return (
          <input
            key={index}
            className={isGiven ? "sudoku-cell given" : "sudoku-cell"}
            data-row={row}
            data-col={col}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            readOnly={isGiven}
            aria-label={`Row ${row + 1}, column ${col + 1}`}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        );
      })}
    </div>
  );
}

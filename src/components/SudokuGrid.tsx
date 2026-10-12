import { SIZE } from "../constants";
import "./SudokuGrid.css";
import type { Dispatch, SetStateAction } from "react";

export function SudokuGrid({
  cells,
  givens,
  setCells,
}: {
  cells: string[];
  givens: boolean[];
  setCells: Dispatch<SetStateAction<string[]>>;
}) {
  const handleChange = (index: number, value: string) => {
    if (givens[index]) return;
    const digit = value.replace(/[^1-9]/g, "").slice(-1);
    setCells((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
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
    </div>
  );
}

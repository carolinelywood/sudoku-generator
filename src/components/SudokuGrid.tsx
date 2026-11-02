import { SIZE } from "../constants";
import type { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

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
    <div
      className="grid grid-cols-[repeat(9,var(--cell-size))] grid-rows-[repeat(9,var(--cell-size))] border-2 border-text-h [--cell-size:min(48px,calc((100vw-40px)/9))]"
      role="group"
      aria-label="Sudoku grid"
    >
      {cells.map((value, index) => {
        const row = Math.floor(index / SIZE);
        const col = index % SIZE;
        const isGiven = puzzle[index] !== 0;

        const isBoxRight = col === 2 || col === 5;
        const isBoxBottom = row === 2 || row === 5;
        const isLastCol = col === SIZE - 1;
        const isLastRow = row === SIZE - 1;

        return (
          <input
            key={index}
            className={clsx(
              "size-full border-border text-center text-[calc(var(--cell-size)*0.5)] leading-none font-medium caret-transparent",
              "focus:bg-accent-bg focus:outline-0",
              isGiven ? "cursor-default text-text-h" : "text-accent-text",
              isBoxRight && "border-r-2 border-r-text-h",
              isBoxBottom && "border-b-2 border-b-text-h",
              !isLastCol && "border-r",
              !isLastRow && "border-b",
            )}
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

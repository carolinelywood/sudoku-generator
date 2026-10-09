import SudokuGrid from "./components/SudokuGrid";
import "./App.css";
import { useState } from "react";
import { NewPuzzleButton } from "./components/NewPuzzleButton";

export const SIZE = 9;

function App() {
  const [cells, setCells] = useState<string[]>(() =>
    Array(SIZE * SIZE).fill(""),
  );
  const [givens, setGivens] = useState<boolean[]>(() =>
    Array(SIZE * SIZE).fill(false),
  );

  return (
    <>
      <section id="center">
        <SudokuGrid cells={cells} givens={givens} setCells={setCells} />
        <NewPuzzleButton setCells={setCells} setGivens={setGivens} />
      </section>
    </>
  );
}

export default App;

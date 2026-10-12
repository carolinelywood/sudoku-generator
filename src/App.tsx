import { useState } from "react";
import "./App.css";
import { CheckSolutionButton } from "./components/CheckSolutionButton";
import { NewPuzzleButton } from "./components/NewPuzzleButton";
import { SudokuGrid } from "./components/SudokuGrid";
import { CELLS } from "./constants";

function App() {
  const [cells, setCells] = useState<string[]>(() => Array(CELLS).fill(""));
  const [givens, setGivens] = useState<boolean[]>(() =>
    Array(CELLS).fill(false),
  );
  const [solution, setSolution] = useState<number[]>();

  return (
    <section id="center">
      <SudokuGrid cells={cells} givens={givens} setCells={setCells} />
      <NewPuzzleButton
        setCells={setCells}
        setGivens={setGivens}
        setSolution={setSolution}
      />
      {solution && <CheckSolutionButton cells={cells} solution={solution} />}
    </section>
  );
}

export default App;

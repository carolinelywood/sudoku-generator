import { useState } from "react";
import "./App.css";
import { CheckSolutionButton } from "./components/CheckSolutionButton";
import { NewPuzzleButton } from "./components/NewPuzzleButton";
import { SudokuGrid } from "./components/SudokuGrid";
import { CELLS } from "./constants";
import { SolvedConfetti } from "./components/SolvedConfetti";

function App() {
  const [cells, setCells] = useState<string[]>(() => Array(CELLS).fill(""));
  const [givens, setGivens] = useState<boolean[]>(() =>
    Array(CELLS).fill(false),
  );
  const [solution, setSolution] = useState<number[]>([]);
  const [confettiBurst, setConfettiBurst] = useState(0);
  const [winMessage, setWinMessage] = useState<"shown" | "hiding" | null>(null);

  const handlePuzzleSolved = () => {
    setConfettiBurst((n) => n + 1);
    setWinMessage("shown");
  };

  const handleConfettiComplete = () => {
    setConfettiBurst(0);
    setWinMessage("hiding");
  };

  return (
    <>
      <section id="center">
        <SudokuGrid cells={cells} givens={givens} setCells={setCells} />

        <NewPuzzleButton
          setCells={setCells}
          setGivens={setGivens}
          setSolution={setSolution}
        />

        <CheckSolutionButton
          cells={cells}
          solution={solution}
          onSolved={handlePuzzleSolved}
        />
      </section>
      {confettiBurst > 0 && (
        <SolvedConfetti key={confettiBurst} reset={handleConfettiComplete} />
      )}
      {winMessage && (
        <p
          className={
            winMessage === "hiding" ? "win-message hiding" : "win-message"
          }
          onAnimationEnd={() => {
            if (winMessage === "hiding") setWinMessage(null);
          }}
          role="status"
        >
          You won!
        </p>
      )}
    </>
  );
}

export default App;

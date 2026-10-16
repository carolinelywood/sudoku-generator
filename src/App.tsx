import { useState, type Dispatch, type SetStateAction } from "react";
import "./App.css";
import { CheckSolutionButton } from "./components/CheckSolutionButton";
import { NewPuzzleButton } from "./components/NewPuzzleButton";
import { SudokuGrid } from "./components/SudokuGrid";
import { CELLS, type FeedbackType, type Result } from "./constants";
import { SolvedConfetti } from "./components/SolvedConfetti";
import { Feedback } from "./components/Feedback";

function App() {
  const [cells, setCells] = useState<string[]>(() => Array(CELLS).fill(""));
  const [puzzle, setPuzzle] = useState<number[]>(() => Array(CELLS).fill(0));
  const [solution, setSolution] = useState<number[]>([]);
  const [confettiBurst, setConfettiBurst] = useState(0);
  const [winMessage, setWinMessage] = useState<"shown" | "hiding" | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType>("incomplete");
  const [showFeedback, setShowFeedback] = useState(false);

  const updateCells: Dispatch<SetStateAction<string[]>> = (value) => {
    setCells(value);
    setShowFeedback(false);
  };

  const handleCheck = (result: Result) => {
    if (result === "solved") {
      setShowFeedback(false);
      setConfettiBurst((n) => n + 1);
      setWinMessage("shown");
    } else {
      setFeedback(result);
      setShowFeedback(true);
    }
  };

  const handleConfettiComplete = () => {
    setConfettiBurst(0);
    setWinMessage("hiding");
  };

  return (
    <>
      <section id="center">
        <Feedback feedback={feedback} showFeedback={showFeedback} />

        <SudokuGrid cells={cells} puzzle={puzzle} setCells={updateCells} />

        <NewPuzzleButton
          setCells={updateCells}
          setPuzzle={setPuzzle}
          setSolution={setSolution}
        />

        <CheckSolutionButton
          cells={cells}
          solution={solution}
          onCheck={handleCheck}
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

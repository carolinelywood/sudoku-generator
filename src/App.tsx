import { useState, type Dispatch, type SetStateAction } from "react";
import "./App.css";
import { CheckSolutionButton } from "./components/CheckSolutionButton";
import { NewPuzzleButton } from "./components/NewPuzzleButton";
import { SudokuGrid } from "./components/SudokuGrid";
import { CELLS, type FeedbackType, type Result } from "./constants";
import { SolvedConfetti } from "./components/SolvedConfetti";
import { Feedback } from "./components/Feedback";
import { WinMessage } from "./components/WinMessage";

function App() {
  const [cells, setCells] = useState<string[]>(() => Array(CELLS).fill(""));
  const [puzzle, setPuzzle] = useState<number[]>(() => Array(CELLS).fill(0));
  const [solution, setSolution] = useState<number[]>([]);
  const [confettiBurst, setConfettiBurst] = useState(0);
  const [winMessageVisible, setWinMessageVisible] = useState<boolean | null>(
    null,
  );
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
      setWinMessageVisible(true);
    } else {
      setFeedback(result);
      setShowFeedback(true);
    }
  };

  const handleConfettiComplete = () => {
    setConfettiBurst(0);
    setWinMessageVisible(false);
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
      {winMessageVisible !== null && (
        <WinMessage
          isVisible={winMessageVisible}
          setIsVisible={setWinMessageVisible}
        />
      )}
    </>
  );
}

export default App;

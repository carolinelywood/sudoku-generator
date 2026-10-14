import { checkSolution } from "../utilities/checkSolution";

export function CheckSolutionButton({
  cells,
  solution,
  onSolve,
}: {
  cells: string[];
  solution: number[];
  onSolve: () => void;
}) {
  const handleCheckSolution = () => {
    const result = checkSolution(cells, solution);
    if (result === "solved") {
      onSolve();
    }
    console.log("result: ", result);
  };

  return (
    <button
      type="button"
      className="button"
      onClick={handleCheckSolution}
      style={{ visibility: solution.length === 0 ? "hidden" : "visible" }}
    >
      Check solution
    </button>
  );
}

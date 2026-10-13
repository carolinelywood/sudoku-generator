import { checkSolution } from "../utilities/checkSolution";

export function CheckSolutionButton({
  cells,
  solution,
  onSolved,
}: {
  cells: string[];
  solution: number[];
  onSolved: () => void;
}) {
  const handleCheckSolution = () => {
    const result = checkSolution(cells, solution);
    if (result === "solved") {
      onSolved();
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

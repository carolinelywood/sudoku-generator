import { checkSolution } from "../utilities/checkSolution";
import type { Result } from "../constants";

export function CheckSolutionButton({
  cells,
  solution,
  onCheck,
}: {
  cells: string[];
  solution: number[];
  onCheck: (result: Result) => void;
}) {
  const handleCheckSolution = () => {
    onCheck(checkSolution(cells, solution));
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

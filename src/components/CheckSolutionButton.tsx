import { checkSolution } from "../utilities/checkSolution";

export function CheckSolutionButton({
  cells,
  solution,
}: {
  cells: string[];
  solution: number[];
}) {
  const handleCheckSolution = () => {
    const result = checkSolution(cells, solution);
    console.log("result: ", result);
  };

  return (
    <button type="button" className="button" onClick={handleCheckSolution}>
      Check solution
    </button>
  );
}

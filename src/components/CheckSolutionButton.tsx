import { checkSolution } from "../utilities/checkSolution";
import type { Result } from "../constants";
import clsx from "clsx";

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
      className={clsx(
        "rounded-md border-2 border-transparent bg-accent-bg px-5 py-2 font-medium text-accent-text transition-[border-color] duration-300 hover:cursor-pointer hover:border-accent-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        solution.length === 0 && "invisible",
      )}
      onClick={handleCheckSolution}
    >
      Check solution
    </button>
  );
}

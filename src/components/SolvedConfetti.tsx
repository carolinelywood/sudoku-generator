import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export function SolvedConfetti({ reset }: { reset: () => void }) {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={reset}
    />
  );
}

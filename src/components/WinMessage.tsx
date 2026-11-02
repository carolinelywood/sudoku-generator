import type { Dispatch, SetStateAction } from "react";

export function WinMessage({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean | null>>;
}) {
  return (
    <p
      className={`pointer-events-none fixed top-1/2 left-1/2 z-1 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-8 py-4 text-5xl font-bold whitespace-nowrap text-accent shadow-box-shadow ${isVisible ? "animate-fade-in" : "animate-fade-out"}`}
      onAnimationEnd={() => {
        if (!isVisible) setIsVisible(null);
      }}
      role="status"
    >
      You won!
    </p>
  );
}

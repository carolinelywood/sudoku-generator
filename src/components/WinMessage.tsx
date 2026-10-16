import type { Dispatch, SetStateAction } from "react";
import "./winMessage.css";

export function WinMessage({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean | null>>;
}) {
  return (
    <p
      className={isVisible ? "win-message" : "win-message hiding"}
      onAnimationEnd={() => {
        if (!isVisible) setIsVisible(null);
      }}
      role="status"
    >
      You won!
    </p>
  );
}

import { FEEDBACK, type FeedbackType } from "../constants";
import clsx from "clsx";

export function Feedback({
  showFeedback,
  feedback,
}: {
  showFeedback: boolean;
  feedback: FeedbackType;
}) {
  return (
    <div
      className={clsx(
        "rounded-md border-2 border-error-border bg-error-bg px-6 py-4 whitespace-nowrap",
        "transition-[opacity,visibility] duration-600",
        showFeedback ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <p className="mb-2 text-2xl text-error" role="status">
        {FEEDBACK[feedback].message}
      </p>
      <p className="pointer-events-auto cursor-pointer text-sm font-bold text-accent-text underline underline-offset-3">
        {FEEDBACK[feedback].hint}
      </p>
    </div>
  );
}

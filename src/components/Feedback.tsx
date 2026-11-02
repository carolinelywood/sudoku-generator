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
        "rounded-md border-2 border-accent-border px-6 py-4",
        "transition-[opacity,visibility] duration-600",
        showFeedback ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <p className="mb-2 text-2xl" role="status">
        {FEEDBACK[feedback].message}
      </p>
      <p className="text-sm font-bold">{FEEDBACK[feedback].hint}</p>
    </div>
  );
}

import { FEEDBACK, type FeedbackType } from "../constants";
import "./Feedback.css";

export function Feedback({
  showFeedback,
  feedback,
}: {
  showFeedback: boolean;
  feedback: FeedbackType;
}) {
  return (
    <div
      className={
        showFeedback ? "unsolved-container shown" : "unsolved-container"
      }
    >
      <p className="unsolved-message" role="status">
        {FEEDBACK[feedback].message}
      </p>
      <p className="unsolved-hint">{FEEDBACK[feedback].hint}</p>
    </div>
  );
}

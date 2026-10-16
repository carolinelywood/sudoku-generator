import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Feedback } from "./Feedback";
import type { FeedbackType } from "../constants";

function renderFeedback({
  feedback,
  showFeedback = true,
}: {
  feedback: FeedbackType;
  showFeedback?: boolean;
}) {
  render(<Feedback showFeedback={showFeedback} feedback={feedback} />);
}

describe("Feedback component", () => {
  it("displays correct message when feedback is incorrect", () => {
    renderFeedback({ feedback: "incorrect" });
    expect(screen.getByText("Wrong answer")).toBeVisible();
    expect(screen.getByText("Try again!")).toBeVisible();
  });

  it("displays correct message when feedback is incomplete", () => {
    renderFeedback({ feedback: "incomplete" });
    expect(screen.getByText("Missing numbers")).toBeVisible();
    expect(screen.getByText("Fill in all of the squares")).toBeVisible();
  });

  it("is hidden when showFeedback is false", () => {
    renderFeedback({ feedback: "incomplete", showFeedback: false });
    const container = screen.getByText("Missing numbers").parentElement;
    expect(container).not.toHaveClass("shown");
  });
});

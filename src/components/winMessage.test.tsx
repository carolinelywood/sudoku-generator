import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WinMessage } from "./WinMessage";

const mockSetIsVisible = vi.fn();

function renderWinMessage({ isVisible = true } = {}) {
  render(<WinMessage isVisible={isVisible} setIsVisible={mockSetIsVisible} />);
  return screen.getByRole("status");
}

describe("WinMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("announces the win to screen readers", () => {
    expect(renderWinMessage()).toHaveTextContent("You won!");
  });

  // The fades are CSS, which jsdom doesn't apply, so check the classes instead
  it("fades in while visible", () => {
    const message = renderWinMessage();
    expect(message).toHaveClass("animate-fade-in");
    expect(message).not.toHaveClass("animate-fade-out");
  });

  it("fades out once no longer visible", () => {
    const message = renderWinMessage({ isVisible: false });
    expect(message).toHaveClass("animate-fade-out");
    expect(message).not.toHaveClass("animate-fade-in");
  });

  it("asks to be removed when the fade-out finishes", () => {
    fireEvent.animationEnd(renderWinMessage({ isVisible: false }));
    expect(mockSetIsVisible).toHaveBeenCalledExactlyOnceWith(null);
  });

  it("stays on screen when the fade-in finishes", () => {
    fireEvent.animationEnd(renderWinMessage());
    expect(mockSetIsVisible).not.toHaveBeenCalled();
  });
});

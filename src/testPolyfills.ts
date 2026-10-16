// jsdom has no AnimationEvent. Without it, react-dom listens for the old
// prefixed "webkitAnimationEnd" event, so onAnimationEnd never fires in tests.
// This must run before react-dom loads, so it has its own setup file.
if (typeof window !== "undefined" && !("AnimationEvent" in window)) {
  class AnimationEvent extends Event {
    readonly animationName: string;
    readonly elapsedTime: number;
    readonly pseudoElement: string;

    constructor(type: string, init: AnimationEventInit = {}) {
      super(type, init);
      this.animationName = init.animationName ?? "";
      this.elapsedTime = init.elapsedTime ?? 0;
      this.pseudoElement = init.pseudoElement ?? "";
    }
  }
  Object.assign(window, { AnimationEvent });
}

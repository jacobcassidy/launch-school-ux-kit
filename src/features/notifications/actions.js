/**
 * NOTIFICATIONS ACTIONS
 * @module features/notifications/actions
 */

export function showToast(message, styleClass = null, duration = 2500) {
  const toastContainer = document.querySelector(".toast-container");
  toastContainer.setAttribute("role", "status");
  toastContainer.setAttribute("aria-live", "polite");
  toastContainer.setAttribute("aria-atomic", "true");

  const createToastEl = () => {
    const toastEl = document.createElement("div");
    toastEl.className = "toast";
    toastEl.textContent = message;
    if (styleClass) toastEl.classList.add(styleClass);
    toastContainer.appendChild(toastEl);
    return toastEl;
  };

  const toast = createToastEl();

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Remove after duration
  setTimeout(() => {
    toast.classList.remove("show");
    const transitions = toast.getAnimations?.().filter((animation) => animation.transitionProperty) || [];
    let removed = false;
    let removalFallback;
    const removeToast = () => {
      if (removed) return;
      removed = true;
      clearTimeout(removalFallback);
      toast.remove();
    };
    const transitionDuration = getMaxTransitionDuration(toast);
    if (transitions.length === 0) {
      if (transitionDuration === 0) removeToast();
      else removalFallback = setTimeout(removeToast, transitionDuration + 100);
      return;
    }

    removalFallback = setTimeout(removeToast, transitionDuration + 100);
    Promise.allSettled(transitions.map((animation) => animation.finished)).then(removeToast);
  }, duration);
}

function getMaxTransitionDuration(element) {
  const durations = window.getComputedStyle(element).transitionDuration || "0s";
  return Math.max(
    ...durations.split(",").map((duration) => {
      const value = Number.parseFloat(duration);
      return duration.trim().endsWith("ms") ? value : value * 1000;
    }),
    0,
  );
}

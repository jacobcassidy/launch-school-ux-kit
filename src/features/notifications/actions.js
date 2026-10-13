/**
 * NOTIFICATIONS ACTIONS
 * @module features/notifications/actions
 */

/**
 * Appends and announces a toast, animates it into view, then removes it after its display duration and exit transition.
 *
 * @param {string} message Text to announce and display.
 * @param {string|null} [styleClass=null] Optional toast style class.
 * @param {number} [duration=2500] Milliseconds before the exit animation begins.
 * @returns {void}
 */
export function showToast(message, styleClass = null, duration = 2500) {
  const toastContainer = document.querySelector(".toast-container");
  toastContainer.setAttribute("role", "status");
  toastContainer.setAttribute("aria-live", "polite");
  toastContainer.setAttribute("aria-atomic", "true");

  /**
   * Creates, styles, and appends the current toast message.
   *
   * @returns {HTMLDivElement} Appended toast element.
   */
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
  requestAnimationFrame(
    /**
     * Starts the toast entry animation on the next frame.
     *
     * @returns {void}
     */
    () => {
      toast.classList.add("show");
    },
  );

  // Remove after duration
  setTimeout(
    /**
     * Starts the toast exit animation and schedules cleanup after transition completion or its bounded fallback.
     *
     * @returns {void}
     */
    () => {
      toast.classList.remove("show");
      const transitions =
        toast.getAnimations?.().filter(
          /**
           * Selects animation records that identify a CSS transition.
           *
           * @param {Animation} animation Animation currently associated with the toast.
           * @returns {string|undefined} Transition property when present, used as a truthy filter result.
           */
          (animation) => animation.transitionProperty,
        ) || [];
      let removed = false;
      let removalFallback;

      /**
       * Removes the toast at most once and clears its transition fallback timer.
       *
       * @returns {void}
       */
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
      Promise.allSettled(
        transitions.map(
          /**
           * Gets the completion promise for a toast transition.
           *
           * @param {Animation} animation Running toast transition.
           * @returns {Promise<Animation>} Promise fulfilled when the transition finishes.
           */
          (animation) => animation.finished,
        ),
      ).then(removeToast);
    },
    duration,
  );
}

/**
 * Reads the longest computed CSS transition duration and converts it to milliseconds.
 *
 * @param {Element} element Element whose transition durations are inspected.
 * @returns {number} Maximum duration in milliseconds, or zero for no duration.
 */
function getMaxTransitionDuration(element) {
  const durations = window.getComputedStyle(element).transitionDuration || "0s";
  return Math.max(
    ...durations.split(",").map(
      /**
       * Converts one computed transition duration from seconds or milliseconds to milliseconds.
       *
       * @param {string} duration Single CSS transition-duration value.
       * @returns {number} Duration in milliseconds.
       */
      (duration) => {
        const value = Number.parseFloat(duration);
        return duration.trim().endsWith("ms") ? value : value * 1000;
      },
    ),
    0,
  );
}

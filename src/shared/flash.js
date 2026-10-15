/**
 * FLASH
 * @module shared/flash
 */

/**
 * Flashes an already active control; tab buttons also flash the optional secondary element.
 *
 * @param {HTMLElement} activeEl Active control receiving visual feedback.
 * @param {HTMLElement} [secondaryActiveEl] Additional element flashed only when the primary control is a tab button.
 * @returns {void}
 */
export function flashActiveElement(activeEl, secondaryActiveEl) {
  const isTabButton = activeEl.classList.contains("tab-button");

  if (isTabButton) {
    flashWithClass(activeEl, secondaryActiveEl);
  } else {
    flashWithClass(activeEl);
  }
}

/**
 * Restarts a short flash-active animation on the supplied elements, cancelling their previous flash timers and frames.
 *
 * @param {HTMLElement} flashEl Primary element to flash.
 * @param {HTMLElement} [secondaryFlashEl] Optional additional element to flash.
 * @returns {void}
 */
function flashWithClass(flashEl, secondaryFlashEl) {
  const elementsToFlash = [flashEl];
  const flashDuration = 300;

  if (secondaryFlashEl) elementsToFlash.push(secondaryFlashEl);

  elementsToFlash.forEach(
    /**
     * Cancels earlier flash work and schedules a fresh animation for one element.
     *
     * @param {HTMLElement} el Element receiving focus feedback.
     * @returns {void}
     */
    (el) => {
      clearTimeout(el.flashTimeout);
      cancelAnimationFrame(el.flashFrame);

      el.classList.remove("flash-active");

      el.flashFrame = requestAnimationFrame(
        /**
         * Adds the flash class on the next frame and schedules its removal.
         *
         * @returns {void}
         */
        () => {
          el.classList.add("flash-active");

          el.flashTimeout = setTimeout(
            /**
             * Removes the flash class and clears the stored timeout reference.
             *
             * @returns {void}
             */
            () => {
              el.classList.remove("flash-active");
              el.flashTimeout = null;
            },
            flashDuration,
          );
        },
      );
    },
  );
}

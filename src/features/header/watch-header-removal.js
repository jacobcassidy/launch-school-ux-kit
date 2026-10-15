/**
 * WATCH HEADER REMOVAL
 * @module features/header/watch-header-removal
 */

/**
 * Observes document mutations once and schedules a UI reload if the header remains absent after a debounce.
 *
 * @param {object} options Feature dependencies.
 * @param {function(): void} options.scheduleReload Schedules rebuilding the current UI.
 * @returns {void}
 */
export function watchHeaderRemoval({ scheduleReload }) {
  if (document.documentElement.dataset.headerObserverBound) {
    return;
  }
  document.documentElement.dataset.headerObserverBound = "true";

  let headerMissingTimeoutId;

  // Observe .site-header for mutations
  const observer = new MutationObserver(
    /**
     * Cancels pending recovery when the header exists, otherwise starts one debounced missing-header check.
     *
     * @returns {void}
     */
    () => {
      if (document.querySelector(".site-header")) {
        clearTimeout(headerMissingTimeoutId);
        headerMissingTimeoutId = undefined;
        return;
      }

      if (headerMissingTimeoutId) return;

      headerMissingTimeoutId = setTimeout(
        /**
         * Clears the debounce timer and schedules a reload only if the header is still absent.
         *
         * @returns {void}
         */
        () => {
          headerMissingTimeoutId = undefined;
          const siteHeader = document.querySelector(".site-header");
          if (!siteHeader) scheduleReload();
        },
        300,
      );
    },
  );

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

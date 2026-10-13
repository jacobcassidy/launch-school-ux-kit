/**
 * WATCH FOR MISSING HEADER
 * @module features/header/watch-missing-header
 */

/**
 * Reloads the UI when the header is removed from the DOM by the native code.
 */
export function watchForMissingHeader({ scheduleReload }) {
  if (document.documentElement.dataset.headerObserverBound) {
    return;
  }
  document.documentElement.dataset.headerObserverBound = "true";

  let headerMissingTimeoutId;

  // Observe .site-header for mutations
  const observer = new MutationObserver(() => {
    if (document.querySelector(".site-header")) {
      clearTimeout(headerMissingTimeoutId);
      headerMissingTimeoutId = undefined;
      return;
    }

    if (headerMissingTimeoutId) return;

    headerMissingTimeoutId = setTimeout(() => {
      headerMissingTimeoutId = undefined;
      const siteHeader = document.querySelector(".site-header");
      if (!siteHeader) scheduleReload();
    }, 300);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

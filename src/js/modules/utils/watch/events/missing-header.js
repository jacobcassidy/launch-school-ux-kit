/**
 * WATCH FOR MISSING HEADER
 * @module utils/watch/events/missing-header
 */

// Import utils
import { scheduleReload } from "../../helpers";

/**
 * Reloads the UI when the header is removed from the DOM by the native code.
 */
export function watchForMissingHeader() {
  // colorLog.run("Running watchForMissingHeader()");
  if (document.documentElement.dataset.headerObserverBound) {
    // colorLog.detail("Header watch already exist. Exited watchForMissingHeader().");
    return;
  }
  document.documentElement.dataset.headerObserverBound = "true";

  let headerMissingTimeoutId;

  // Observe .site-header for mutations
  const observer = new MutationObserver(() => {
    // colorLog.detail("Running contentChange observer");

    if (document.querySelector(".site-header")) {
      clearTimeout(headerMissingTimeoutId);
      headerMissingTimeoutId = undefined;
      return;
    }

    if (headerMissingTimeoutId) return;

    headerMissingTimeoutId = setTimeout(() => {
      headerMissingTimeoutId = undefined;
      const siteHeader = document.querySelector(".site-header");
      if (siteHeader) {
        // colorLog.info("header exists again.");
      } else {
        // colorLog.notice(".site-header has been missing for over 300ms. Scheduling reload.");
        scheduleReload();
      }
    }, 300);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

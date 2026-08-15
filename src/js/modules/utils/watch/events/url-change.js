/**
 * WATCH FOR URL CHANGE
 * @module utils/watch/events/url-change
 */

// Import utils
import { scheduleReload } from "../../helpers";
import { ui } from "../../state";

/**
 * Reloads the custom UI when the URL changes.
 */
export function watchForUrlChange() {
  // colorLog.run("Running watchForUrlChange()");

  if (document.documentElement.dataset.watchPageBound) {
    // colorLog.detail("URL watch already exist. Exited watchForUrlChange().");
    return;
  }
  document.documentElement.dataset.watchPageBound = "true";

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  /**
   * CHECK FOR URL CHANGE
   * Schedules a UI reload if the page URL has changed.
   *
   * @param {string} from Where this function was called from.
   */
  const checkForUrlChange = () => {
    // colorLog.notice(`checkForUrlChange() called from ${from}`);

    if (ui.load.isReloadScheduled) {
      // colorLog.detail("Reload already scheduled. Exited checkForUrlChange().");
      return;
    }

    const currentUrl = `${location.origin}${location.pathname}`;
    const isChangedUrl = currentUrl !== ui.load.lastUrl;

    if (!isChangedUrl) {
      // colorLog.detail("No URL change detected. Exiting checkForUrlChange().");
      return;
    }

    // colorLog.info("URL has changed.");
    scheduleReload();
  };

  window.addEventListener("popstate", () => checkForUrlChange("popstate"));
  window.addEventListener("hashchange", () => checkForUrlChange("hashchange"));
  document.addEventListener("turbo:load", () => checkForUrlChange("turbo:load"));
  document.addEventListener("turbo:render", () => checkForUrlChange("turbo:render"));

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    checkForUrlChange("pushState");
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    checkForUrlChange("replaceState");
  };
}

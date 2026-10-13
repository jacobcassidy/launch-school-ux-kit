import { scheduleReload } from "./reload.js";
import { appState } from "./state.js";
/**
 * WATCH FOR URL CHANGE
 * @module app/navigation
 */

/**
 * Reloads the custom UI when the URL changes.
 */
export function watchUrlChanges() {
  if (document.documentElement.dataset.watchPageBound) {
    return;
  }
  document.documentElement.dataset.watchPageBound = "true";

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  /**
   * CHECK FOR URL CHANGE
   * Schedules a UI reload if the page URL has changed.
   */
  const checkForUrlChange = () => {
    if (appState.isReloadScheduled) {
      return;
    }

    const currentUrl = `${location.origin}${location.pathname}${location.search}`;
    const isChangedUrl = currentUrl !== appState.lastUrl;

    if (!isChangedUrl) {
      return;
    }

    scheduleReload();
  };

  window.addEventListener("popstate", checkForUrlChange);
  window.addEventListener("hashchange", checkForUrlChange);
  // A render can complete after the history change, including at the same URL.
  for (const eventType of ["turbo:load", "turbo:render", "turbolinks:load", "turbolinks:render"]) {
    document.addEventListener(eventType, scheduleReload);
  }

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    checkForUrlChange();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    checkForUrlChange();
  };
}

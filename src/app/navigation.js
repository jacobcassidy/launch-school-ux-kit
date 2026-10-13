/**
 * WATCH URL CHANGES
 * @module app/navigation
 */

import { scheduleReload } from "./reload.js";
import { appState } from "./state.js";

/**
 * Registers history and native-render listeners that schedule UI reloads; repeated setup is ignored.
 *
 * @returns {void}
 */
export function watchUrlChanges() {
  if (document.documentElement.dataset.watchPageBound) {
    return;
  }
  document.documentElement.dataset.watchPageBound = "true";

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  /**
   * Schedules one UI reload when the page path or query differs from the last loaded URL.
   *
   * @returns {void}
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

  /**
   * Calls the original history method and schedules a reload if the page URL changed.
   *
   * @param {...*} args Arguments forwarded unchanged to the native pushState method.
   * @returns {void}
   */
  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    checkForUrlChange();
  };

  /**
   * Calls the original history method and schedules a reload if the page URL changed.
   *
   * @param {...*} args Arguments forwarded unchanged to the native replaceState method.
   * @returns {void}
   */
  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    checkForUrlChange();
  };
}

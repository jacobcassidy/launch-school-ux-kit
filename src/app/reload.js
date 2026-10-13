import { appState, setIsReloadScheduled, setLastUrl } from "./state.js";
/**
 * RELOAD
 * @module app/reload
 */

let loadUI = () => {};

/**
 * Sets the UI loader used after native page navigation.
 * @param {Function} handler
 */
export function setLoadUIHandler(handler) {
  loadUI = handler;
}

/**
 * Schedules a UI reload after the current page render completes.
 */
export function scheduleReload() {
  if (appState.isReloadScheduled) return;
  setIsReloadScheduled(true);

  requestAnimationFrame(() => {
    try {
      loadUI();
      setLastUrl(`${location.origin}${location.pathname}${location.search}`);
    } finally {
      setIsReloadScheduled(false);
    }
  });
}

/**
 * RELOAD
 * @module app/reload
 */

import { appState, setIsReloadScheduled, setLastUrl } from "./state.js";

/**
 * Does nothing until a UI loader is registered through setLoadUIHandler.
 *
 * @returns {void}
 */
let loadUI = () => {};

/**
 * Stores the UI loader invoked by scheduled reloads.
 *
 * @param {function(): void} handler Loads the UI for the current page.
 * @returns {void}
 */
export function setLoadUIHandler(handler) {
  loadUI = handler;
}

/**
 * Coalesces reload requests into one animation frame and resets the pending flag even if loading fails.
 *
 * @returns {void}
 */
export function scheduleReload() {
  if (appState.isReloadScheduled) return;
  setIsReloadScheduled(true);

  requestAnimationFrame(
    /**
     * Loads the current UI, records its URL, and clears the reload flag even when the loader throws.
     *
     * @returns {void}
     */
    () => {
      try {
        loadUI();
        setLastUrl(`${location.origin}${location.pathname}${location.search}`);
      } finally {
        setIsReloadScheduled(false);
      }
    },
  );
}

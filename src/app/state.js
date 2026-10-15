/**
 * APPLICATION STATE
 * @module app/state
 */

export const appState = { isReloadScheduled: false, lastUrl: null };

/**
 * Stores whether a UI reload is waiting for its animation frame.
 *
 * @param {boolean} value Whether a reload is pending.
 * @returns {void}
 */
export function setIsReloadScheduled(value) {
  appState.isReloadScheduled = value;
}

/**
 * Stores the URL against which navigation changes are compared.
 *
 * @param {string|null} value Last loaded origin, path, and query, or null before initialization.
 * @returns {void}
 */
export function setLastUrl(value) {
  appState.lastUrl = value;
}

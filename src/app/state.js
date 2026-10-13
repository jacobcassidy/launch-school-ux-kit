/**
 * APPLICATION STATE
 * @module app/state
 */

export const appState = { isReloadScheduled: false, lastUrl: null };

export function setIsReloadScheduled(value) {
  appState.isReloadScheduled = value;
}

export function setLastUrl(value) {
  appState.lastUrl = value;
}

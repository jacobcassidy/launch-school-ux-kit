/**
 * SYNC SETTINGS PREFERENCES
 * @module features/settings/preferences
 */

/**
 * Checks existing sidebar setting controls for preferences enabled in stored state.
 *
 * @param {object} options Feature dependencies.
 * @param {object} options.sidebarState Sidebar preference values.
 * @param {boolean} options.sidebarState.isSettingSidebarShrinkOn Whether collapsed-sidebar shrinking is enabled.
 * @param {boolean} options.sidebarState.isSettingSidebarHiddenHeadersOn Whether expanded section headers are hidden.
 * @returns {void}
 */
export function syncSettingsPreferences({ sidebarState }) {
  // Sync setting togglers
  const isSettingSidebarShrinkOn = sidebarState.isSettingSidebarShrinkOn;
  const sidebarShrinkToggler = document.querySelector("#setting--sidebar-shrink");
  if (isSettingSidebarShrinkOn && sidebarShrinkToggler) sidebarShrinkToggler.checked = true;

  const isSettingSidebarHiddenHeadersOn = sidebarState.isSettingSidebarHiddenHeadersOn;
  const sidebarHiddenHeadersToggler = document.querySelector("#setting--sidebar-hidden-headers");
  if (isSettingSidebarHiddenHeadersOn && sidebarHiddenHeadersToggler) sidebarHiddenHeadersToggler.checked = true;
}

/**
 * SYNC SETTINGS PREFERENCES
 * @module features/settings/preferences
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

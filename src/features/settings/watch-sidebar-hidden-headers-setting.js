/**
 * WATCH SETTING SIDEBAR HIDDEN HEADERS TOGGLER
 * @module features/settings/watch-sidebar-hidden-headers-setting
 */

const watchedHiddenHeadersTogglers = new WeakSet();

/**
 * Toggles the Sidebar's Hidden Section Headers setting.
 */
export function watchSidebarHiddenHeadersSetting({ setSettingSidebarHiddenHeaders }) {
  const settingSidebarHiddenHeadersToggler = document.querySelector("#setting--sidebar-hidden-headers");
  if (!settingSidebarHiddenHeadersToggler) {
    return;
  }

  if (watchedHiddenHeadersTogglers.has(settingSidebarHiddenHeadersToggler)) return;
  watchedHiddenHeadersTogglers.add(settingSidebarHiddenHeadersToggler);

  settingSidebarHiddenHeadersToggler.addEventListener("change", () => {
    if (settingSidebarHiddenHeadersToggler.checked) {
      setSettingSidebarHiddenHeaders(true);
    } else {
      setSettingSidebarHiddenHeaders(false);
    }
  });
}

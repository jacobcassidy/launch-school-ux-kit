/**
 * WATCH SIDEBAR HIDDEN HEADERS SETTING
 * @module features/settings/watch-sidebar-hidden-headers-setting
 */

const watchedHiddenHeadersTogglers = new WeakSet();

/**
 * Binds the hidden-headers preference checkbox once to update and persist its checked value.
 *
 * @param {object} options Feature dependencies.
 * @param {function(boolean): void} options.setSettingSidebarHiddenHeaders Applies and stores the preference.
 * @returns {void}
 */
export function watchSidebarHiddenHeadersSetting({ setSettingSidebarHiddenHeaders }) {
  const settingSidebarHiddenHeadersToggler = document.querySelector("#setting--sidebar-hidden-headers");
  if (!settingSidebarHiddenHeadersToggler) {
    return;
  }

  if (watchedHiddenHeadersTogglers.has(settingSidebarHiddenHeadersToggler)) return;
  watchedHiddenHeadersTogglers.add(settingSidebarHiddenHeadersToggler);

  settingSidebarHiddenHeadersToggler.addEventListener(
    "change",
    /**
     * Applies and stores the current hidden-headers checkbox value.
     *
     * @returns {void}
     */
    () => {
      if (settingSidebarHiddenHeadersToggler.checked) {
        setSettingSidebarHiddenHeaders(true);
      } else {
        setSettingSidebarHiddenHeaders(false);
      }
    },
  );
}

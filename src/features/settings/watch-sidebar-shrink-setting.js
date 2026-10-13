/**
 * WATCH SIDEBAR SHRINK SETTING
 * @module features/settings/watch-sidebar-shrink-setting
 */

const watchedSidebarShrinkTogglers = new WeakSet();

/**
 * Binds the sidebar-shrink preference checkbox once to update and persist its checked value.
 *
 * @param {object} options Feature dependencies.
 * @param {function(boolean): void} options.setSettingSidebarShrink Applies and stores the preference.
 * @returns {void}
 */
export function watchSidebarShrinkSetting({ setSettingSidebarShrink }) {
  const settingSidebarShrinkToggler = document.querySelector("#setting--sidebar-shrink");
  if (!settingSidebarShrinkToggler) {
    return;
  }

  if (watchedSidebarShrinkTogglers.has(settingSidebarShrinkToggler)) return;
  watchedSidebarShrinkTogglers.add(settingSidebarShrinkToggler);

  settingSidebarShrinkToggler.addEventListener(
    "change",
    /**
     * Applies and stores the current sidebar-shrink checkbox value.
     *
     * @returns {void}
     */
    () => {
      if (settingSidebarShrinkToggler.checked) {
        setSettingSidebarShrink(true);
      } else {
        setSettingSidebarShrink(false);
      }
    },
  );
}

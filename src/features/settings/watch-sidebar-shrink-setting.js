/**
 * WATCH SIDEBAR SHRINK SETTING
 * @module features/settings/watch-sidebar-shrink-setting
 */

const watchedSidebarShrinkTogglers = new WeakSet();

/**
 * Toggles the Sidebar's collapsed sizing (hidden or shrunken).
 */
export function watchSidebarShrinkSetting({ setSettingSidebarShrink }) {
  const settingSidebarShrinkToggler = document.querySelector("#setting--sidebar-shrink");
  if (!settingSidebarShrinkToggler) {
    return;
  }

  if (watchedSidebarShrinkTogglers.has(settingSidebarShrinkToggler)) return;
  watchedSidebarShrinkTogglers.add(settingSidebarShrinkToggler);

  settingSidebarShrinkToggler.addEventListener("change", () => {
    if (settingSidebarShrinkToggler.checked) {
      setSettingSidebarShrink(true);
    } else {
      setSettingSidebarShrink(false);
    }
  });
}

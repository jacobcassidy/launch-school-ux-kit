/**
 * WATCH SETTING SIDEBAR SHRINK TOGGLER
 * @module utils/watch/settings/toggler-sidebar-shrink
 */

// Import utils
import { setSettingSidebarShrink } from "../../state";

/**
 * Toggles the Sidebar's collapsed sizing (hidden or shrunken).
 */
export function watchSettingSidebarShrinkToggler() {
  // colorLog.run("Running watchSettingSidebarShrinkToggle()");

  const settingSidebarShrinkToggler = document.querySelector("#setting--sidebar-shrink");
  if (!settingSidebarShrinkToggler) {
    // colorLog.detail("No sidebar shrink setting toggler found.");
    return;
  }

  if (settingSidebarShrinkToggler.dataset.sidebarShrinkTogglerEventBound) {
    // colorLog.detail("Sidebar Shrink setting watch already exist. Exited watchSettingSidebarShrinkToggler().");
    return;
  }
  settingSidebarShrinkToggler.dataset.sidebarShrinkTogglerEventBound = "true";

  settingSidebarShrinkToggler.addEventListener("change", () => {
    if (settingSidebarShrinkToggler.checked) {
      setSettingSidebarShrink(true);
    } else {
      setSettingSidebarShrink(false);
    }
  });
}

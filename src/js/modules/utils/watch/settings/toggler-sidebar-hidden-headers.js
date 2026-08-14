/**
 * WATCH SETTING SIDEBAR HIDDEN HEADERS TOGGLER
 * @module utils/watch/settings/toggler-sidebar-hidden-header
 */

// Import utils
import { setSettingSidebarHiddenHeaders } from "../../state";

/**
 * Toggles the Sidebar's Hidden Section Headers setting.
 */
export function watchSettingSidebarHiddenHeadersToggler() {
  // colorLog.run("Running watchSettingSidebarHiddenHeadersToggler()");

  const settingSidebarHiddenHeadersToggler = document.querySelector("#setting--sidebar-hidden-headers");
  if (!settingSidebarHiddenHeadersToggler) {
    // colorLog.detail("No sidebar hidden headers setting toggler found.");
    return;
  }

  if (settingSidebarHiddenHeadersToggler.dataset.sidebarHiddenHeadersTogglerEventBound) {
    // colorLog.detail(
    // "Sidebar Hidden Headers setting watch already exist. Exited watchSettingSidebarHiddenHeadersToggler().",
    // );
    return;
  }
  settingSidebarHiddenHeadersToggler.dataset.sidebarHiddenHeadersTogglerEventBound = "true";

  settingSidebarHiddenHeadersToggler.addEventListener("change", () => {
    if (settingSidebarHiddenHeadersToggler.checked) {
      setSettingSidebarHiddenHeaders(true);
    } else {
      setSettingSidebarHiddenHeaders(false);
    }
  });
}

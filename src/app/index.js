/**
 * SCRIPT INITIALIZATION
 * @module app/index
 */

import { setLastUrl } from "./state.js";
import { loadUI } from "./load-ui.js";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

/**
 * Records the initial page URL and loads the custom UI after DOM readiness.
 *
 * @returns {void}
 */
function init() {
  setLastUrl(`${location.origin}${location.pathname}${location.search}`);
  loadUI();
}

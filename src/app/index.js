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

function init() {
  setLastUrl(`${location.origin}${location.pathname}${location.search}`);
  loadUI();
}

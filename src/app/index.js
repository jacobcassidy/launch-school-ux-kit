import { setLastUrl } from "./state.js";
import { loadUI } from "./load-ui.js";
/**
 * SCRIPT INITIALIZATION
 */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

function init() {
  setLastUrl(`${location.origin}${location.pathname}${location.search}`);
  loadUI();
}

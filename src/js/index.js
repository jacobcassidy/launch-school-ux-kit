/**
 * SCRIPT INITIALIZATION
 */
import { setLastUrl, setPreviousBody } from "./modules/utils/state.js";
import { loadUI } from "./modules/utils/load.js";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

function init() {
  setLastUrl(`${location.origin}${location.pathname}`);
  setPreviousBody(document.body);
  loadUI();
}

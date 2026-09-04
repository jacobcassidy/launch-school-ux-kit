/**
 * SCRIPT INITIALIZATION
 */
import { setLastUrl, setPreviousBody } from "./modules/utils/state";
import { loadUI } from "./modules/utils/helpers";

if (document.readyState === "complete") {
  document.addEventListener("load", init, { once: true });
} else {
  init();
}

function init() {
  setLastUrl(`${location.origin}${location.pathname}`);
  setPreviousBody(document.body);
  loadUI();
}

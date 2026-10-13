import { elements } from "../../shared/dom/elements.js";
import { headerState, setIsHeaderHidden } from "./state.js";
export function showHeader() {
  setIsHeaderHidden(false);
}

export function hideHeader() {
  setIsHeaderHidden(true);
}

export function toggleHeader({ hideSettings }) {
  if (headerState.isHidden) {
    showHeader();
  } else {
    if (elements.injected.settingsMenu?.classList.contains("active")) hideSettings();
    hideHeader();
  }
}

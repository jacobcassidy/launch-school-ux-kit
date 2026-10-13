import { elements } from "../../shared/dom/dom.js";
export const headerState = { isHidden: sessionStorage.getItem("isHeaderHidden") === "true" };

export function setIsHeaderHidden(value) {
  const header = elements.injected.header;
  if (value && header?.contains(document.activeElement)) document.activeElement.blur();
  header?.classList.toggle("is-hidden", value);
  if (header) {
    header.inert = value;
    header.setAttribute("aria-hidden", String(value));
  }

  headerState.isHidden = value;
  sessionStorage.setItem("isHeaderHidden", value);
}

export function restoreHeaderState() {
  if (elements.injected.header && headerState.isHidden) setIsHeaderHidden(true);
}

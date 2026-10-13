import { elements } from "../../shared/dom/dom.js";
export const sidebarState = {
  isSettingSidebarHiddenHeadersOn: sessionStorage.getItem("isSettingSidebarHiddenHeadersOn") === "true",
  isSettingSidebarShrinkOn: sessionStorage.getItem("isSettingSidebarShrinkOn") === "true",
};

export function setIsSidebarCollapsed(value) {
  const sidebarCollapseCheckbox = document.querySelector("#navbar-collapsor");

  // This page does not include the native sidebar control.
  if (!sidebarCollapseCheckbox) {
    return;
  }

  const isSidebarCollapsed = sidebarCollapseCheckbox.checked;
  if (isSidebarCollapsed !== value) {
    const sidebarButton = document.querySelector(value ? "#navbar-collapse" : "#navbar-expand");
    if (!sidebarButton) return;

    sidebarButton.dispatchEvent(
      new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        button: 0,
      }),
    );
    sidebarButton.click();
  }
}

export function setSettingSidebarHiddenHeaders(value) {
  if (value === true) {
    elements.native.sidebar?.classList.add("hide-section-headers");
  } else {
    elements.native.sidebar?.classList.remove("hide-section-headers");
  }

  sidebarState.isSettingSidebarHiddenHeadersOn = value;
  sessionStorage.setItem("isSettingSidebarHiddenHeadersOn", value);
}

export function setSettingSidebarShrink(value) {
  if (value === true) {
    elements.native.sidebar?.classList.add("shrink");
  } else {
    elements.native.sidebar?.classList.remove("shrink");
  }

  sidebarState.isSettingSidebarShrinkOn = value;
  sessionStorage.setItem("isSettingSidebarShrinkOn", value);
}

export function restoreSidebarState() {
  const sidebar = elements.native.sidebar;
  if (sidebar && sidebarState.isSettingSidebarHiddenHeadersOn) sidebar.classList.add("hide-section-headers");
  if (sidebar && sidebarState.isSettingSidebarShrinkOn) sidebar.classList.add("shrink");
}

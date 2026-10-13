import { elements } from "../../shared/dom/elements.js";
export function showTocMenu({ hideSettings }) {
  const tocBtn = elements.native.tocButton;
  if (tocBtn) {
    tocBtn.click();

    // If Settings Menu is open, close it.
    const settingsMenu = elements.injected.settingsMenu;
    if (settingsMenu && settingsMenu.classList.contains("active")) hideSettings();
  }
}

export function hideTocMenu() {
  const tocBtn = elements.native.tocButton;
  if (tocBtn) tocBtn.click();
}

export function toggleTocMenu(options) {
  const tocBtn = elements.native.tocButton;

  if (tocBtn && tocBtn.classList.contains("open")) {
    hideTocMenu();
  } else if (tocBtn) {
    showTocMenu(options);
  }
}

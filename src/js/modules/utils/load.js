/**
 * LOAD
 * @module utils/load
 */

// Import Components
import { updatePanelButtons, updateTabButtons } from "../components/buttons.js";
import { injectHeader } from "../components/header.js";
import { injectHotkeysSection } from "../components/hotkeys.js";
import { updateSidebar } from "../components/sidebar.js";
import { injectToaster } from "../components/toaster.js";

// Import Utils
// import { colorLog } from "./log.js";
import { setIsReloadScheduled, setLastUrl, states } from "./state.js";
import { injectStyles } from "./style.js";
import {
  syncAvailableHotkeys,
  syncElementsLoadState,
  syncInjectedElementsState,
  syncNativeElementsState,
} from "./sync.js";
import {
  watchForMissingHeader,
  watchForUrlChange,
  watchHotkeys,
  watchPromptSubmission,
  watchQuestionBoxes,
  watchSettingContainerToggleBtn,
  watchSettingSidebarShrinkToggler,
  watchSettingSidebarHiddenHeadersToggler,
  watchSidebarLinks,
  watchSidebarToggleBtn,
  watchTabBtns,
  watchTabsPanelToggleBtn,
} from "./watch.js";

/**
 * LOAD UI
 * Inserts the UI modifications into the DOM.
 */
export function loadUI() {
  injectStyles();
  syncNativeElementsState();
  injectHeader();
  injectToaster();
  syncInjectedElementsState();
  updateTabButtons();
  updatePanelButtons();
  syncAvailableHotkeys();
  injectHotkeysSection();
  syncElementsLoadState();
  updateSidebar();

  watchForUrlChange();
  watchForMissingHeader();
  watchHotkeys();
  watchPromptSubmission();
  watchQuestionBoxes();
  watchSidebarToggleBtn();
  watchSidebarLinks();
  watchSettingSidebarShrinkToggler();
  watchSettingSidebarHiddenHeadersToggler();
  watchTabBtns();
  watchTabsPanelToggleBtn();
  watchSettingContainerToggleBtn();
}

/**
 * RELOAD UI
 * Reloads loadUI() after a DOM refresh from a page/url change.
 */
export function scheduleReload() {
  // colorLog.run("Running scheduleReload()");
  if (states.load.isReloadScheduled) {
    // colorLog.detail("Reload is already scheduled. Exited scheduleReload().");
    return;
  }
  setIsReloadScheduled(true);

  const reloadUI = () => {
    // colorLog.run("Running reloadUI()");
    loadUI();
    setLastUrl();
    setIsReloadScheduled(false);
  };

  // colorLog.detail("Waiting for new DOM to be ready...");
  const startWait = performance.now();

  const waitForDom = () => {
    // colorLog.run("Running waitForDom()");
    const isNewBody = document.body !== states.load.previousBody;
    const isWaitMaxReached = performance.now() - startWait > 3000;

    if (isNewBody) {
      // colorLog.info("New DOM is ready, calling reloadUI().");
      requestAnimationFrame(reloadUI);
      return;
    } else if (isWaitMaxReached) {
      // colorLog.alert("Max wait time reached, calling reloadUI().");
      requestAnimationFrame(reloadUI);
      return;
    } else {
      requestAnimationFrame(waitForDom);
    }
  };

  requestAnimationFrame(waitForDom);
}

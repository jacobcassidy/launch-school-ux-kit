/**
 * LOAD
 * @module utils/helpers/load
 */

// Import components
import {
  injectHeader,
  injectContentSolutionButtons,
  injectHotkeysSection,
  injectToaster,
  updateConversationHistoryButton,
  updateConversationNewButton,
  updateCopyCodeButton,
  updateCopyMarkupButton,
  updateExerciseCompletionButton,
  updateNextExerciseButton,
  updatePaginationButton,
  updateRunCodeButton,
  updateSidebar,
  updateSolutionButton,
  updateTabButtons,
  updateWorkInEditorButton,
} from "../../components";

// Import utils
import { setIsReloadScheduled, setLastUrl, ui } from "../state";
import { injectStyles } from "../helpers";
import {
  syncAvailableHotkeys,
  syncLoadedElementsState,
  syncInjectedElementsState,
  syncNativeElementsState,
} from "../sync";
import {
  watchForMissingHeader,
  watchForUrlChange,
  watchHotkeys,
  watchMarkupCopyBlockBtns,
  watchNextExerciseBtn,
  watchPromptSubmission,
  watchQuestionBoxes,
  watchSettingSidebarHiddenHeadersToggler,
  watchSettingSidebarShrinkToggler,
  watchSettingsToggleBtn,
  watchSidebarLinks,
  watchSidebarToggleBtn,
  watchTabBtns,
  watchTabsPanelToggleBtn,
} from "../watch";

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
  updateSidebar();

  injectContentSolutionButtons();
  updateConversationHistoryButton();
  updateConversationNewButton();
  updateCopyCodeButton();
  updateCopyMarkupButton();
  updateExerciseCompletionButton();
  updateNextExerciseButton();
  updatePaginationButton();
  updateRunCodeButton();
  updateSolutionButton();
  updateTabButtons();
  updateWorkInEditorButton();
  syncAvailableHotkeys();
  injectHotkeysSection();
  syncLoadedElementsState();

  watchForMissingHeader();
  watchForUrlChange();
  watchHotkeys();
  watchPromptSubmission();
  watchQuestionBoxes();
  watchSettingSidebarHiddenHeadersToggler();
  watchSettingSidebarShrinkToggler();
  watchSettingsToggleBtn();
  watchSidebarLinks();
  watchSidebarToggleBtn();
  watchMarkupCopyBlockBtns();
  watchTabBtns();
  watchTabsPanelToggleBtn();
  watchNextExerciseBtn();
}

/**
 * RELOAD UI
 * Reloads loadUI() after a DOM refresh from a page/url change.
 */
export function scheduleReload() {
  // colorLog.run("Running scheduleReload()");
  if (ui.load.isReloadScheduled) {
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
    const isNewBody = document.body !== ui.load.previousBody;
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

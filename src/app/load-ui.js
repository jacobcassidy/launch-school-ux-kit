import {
  handleFocus,
  injectTabsPanelToggleButton,
  restoreTabsState,
  updateTabButtons,
  watchTabBtns,
  watchTabsPanelToggleBtn,
} from "../features/tabs/index.js";
import { hideTocMenu, moveTocBtnToHeader } from "../features/toc/index.js";
import {
  injectContentSolutionButtons,
  updateExerciseCompletionButton,
  updateNextExerciseButton,
  updatePaginationButton,
  updateSolutionButton,
  watchNextExerciseBtn,
} from "../features/exercises/index.js";
import { injectHeader, restoreHeaderState, watchForMissingHeader } from "../features/header/index.js";
import {
  injectSettingsMenu,
  injectSettingsToggleButton,
  syncSettingsPreferences,
  watchSettingSidebarHiddenHeadersToggler,
  watchSettingSidebarShrinkToggler,
  watchSettingsToggleBtn,
} from "../features/settings/index.js";
import {
  injectSidebarToggleButton,
  restoreSidebarState,
  setSettingSidebarHiddenHeaders,
  setSettingSidebarShrink,
  sidebarState,
  updateSidebar,
  watchSidebarLinks,
  watchSidebarToggleBtn,
} from "../features/sidebar/index.js";
import { injectStyles } from "../shared/styles.js";
import { injectToaster, showToast } from "../features/notifications/index.js";
import { refreshShortcuts } from "./shortcuts.js";
import { scheduleReload, setLoadUIHandler } from "./reload.js";
import { syncInjectedElementsState } from "../shared/dom/injected-elements-state.js";
import { syncNativeElementsState } from "../shared/dom/native-elements-state.js";
import {
  updateConversationHistoryButton,
  updateConversationNewButton,
  watchPromptFocus,
  watchPromptSubmission,
  watchQuestionBoxes,
} from "../features/prompts/index.js";
import {
  updateCopyCodeButton,
  updateCopyMarkupButton,
  updateRunCodeButton,
  updateWorkInEditorButton,
  watchForNewCopyMarkupBtns,
} from "../features/editor/index.js";
import { watchForUrlChange } from "./navigation.js";
import { watchShortcutElements, watchShortcuts } from "../features/shortcuts/index.js";
export function loadUI() {
  injectStyles();
  syncNativeElementsState();
  injectHeader({
    injectSettingsMenu,
    injectSettingsToggleButton,
    injectSidebarToggleButton,
    injectTabsPanelToggleButton,
    moveTocBtnToHeader,
  });
  injectToaster();
  syncInjectedElementsState();
  syncSettingsPreferences({ sidebarState });
  updateSidebar();
  injectContentSolutionButtons();
  updateConversationHistoryButton();
  updateConversationNewButton();
  updateCopyCodeButton();
  updateCopyMarkupButton();
  updateExerciseCompletionButton({ refreshShortcuts });
  updateNextExerciseButton();
  updatePaginationButton();
  updateRunCodeButton();
  updateSolutionButton();
  updateTabButtons();
  updateWorkInEditorButton();
  refreshShortcuts();
  restoreHeaderState();
  restoreTabsState();
  restoreSidebarState();

  watchForMissingHeader({ scheduleReload });
  watchForUrlChange();
  watchShortcuts({ showToast });
  watchShortcutElements({ refreshShortcuts });
  watchPromptFocus();
  watchPromptSubmission();
  watchQuestionBoxes({ handleFocus });
  watchSettingSidebarHiddenHeadersToggler({ setSettingSidebarHiddenHeaders });
  watchSettingSidebarShrinkToggler({ setSettingSidebarShrink });
  watchSettingsToggleBtn({ hideTocMenu });
  watchSidebarLinks();
  watchSidebarToggleBtn();
  watchForNewCopyMarkupBtns();
  watchTabBtns({ refreshShortcuts });
  watchTabsPanelToggleBtn();
  watchNextExerciseBtn({ refreshShortcuts });
}

/**
 * RELOAD UI
 * Reloads loadUI() after a DOM refresh from a page/url change.
 */
setLoadUIHandler(loadUI);

import {
  handleFocus,
  injectTabsPanelToggleButton,
  restoreTabsState,
  updateTabButtons,
  watchTabButtons,
  watchTabsPanelToggleButton,
} from "../features/tabs/index.js";
import { hideTocMenu, moveTocButtonToHeader } from "../features/toc/index.js";
import {
  injectContentSolutionButtons,
  updateExerciseCompletionButton,
  updateNextExerciseButton,
  updatePaginationButtons,
  updateSolutionButtons,
  watchNextExerciseButton,
} from "../features/exercises/index.js";
import { injectHeader, restoreHeaderState, watchHeaderRemoval } from "../features/header/index.js";
import {
  injectSettingsMenu,
  injectSettingsToggleButton,
  syncSettingsPreferences,
  watchSidebarHiddenHeadersSetting,
  watchSidebarShrinkSetting,
  watchSettingsToggleButton,
} from "../features/settings/index.js";
import {
  injectSidebarToggleButton,
  restoreSidebarState,
  setSettingSidebarHiddenHeaders,
  setSettingSidebarShrink,
  sidebarState,
  updateSidebar,
  watchSidebarLinks,
  watchSidebarToggleButton,
} from "../features/sidebar/index.js";
import { injectStyles } from "../shared/styles.js";
import { injectToaster, showToast } from "../features/notifications/index.js";
import { refreshShortcuts } from "./shortcuts.js";
import { scheduleReload, setLoadUIHandler } from "./reload.js";
import { syncInjectedElementsState } from "../shared/dom/injected-elements-state.js";
import { syncNativeElementsState } from "../shared/dom/native-elements-state.js";
import {
  updateConversationHistoryButtons,
  updateNewConversationButtons,
  watchPromptEnterShortcut,
  watchPromptSubmission,
  watchQuestionBoxes,
} from "../features/prompts/index.js";
import {
  updateCopyCodeButtons,
  updateCopyMarkupButtons,
  updateRunCodeButtons,
  updateWorkInEditorButtons,
  watchCopyMarkupButtons,
} from "../features/editor/index.js";
import { watchUrlChanges } from "./navigation.js";
import { watchShortcutElements, watchShortcuts } from "../features/shortcuts/index.js";
export function loadUI() {
  injectStyles();
  syncNativeElementsState();
  injectHeader({
    injectSettingsMenu,
    injectSettingsToggleButton,
    injectSidebarToggleButton,
    injectTabsPanelToggleButton,
    moveTocButtonToHeader,
  });
  injectToaster();
  syncInjectedElementsState();
  syncSettingsPreferences({ sidebarState });
  updateSidebar();
  injectContentSolutionButtons();
  updateConversationHistoryButtons();
  updateNewConversationButtons();
  updateCopyCodeButtons();
  updateCopyMarkupButtons();
  updateExerciseCompletionButton({ refreshShortcuts });
  updateNextExerciseButton();
  updatePaginationButtons();
  updateRunCodeButtons();
  updateSolutionButtons();
  updateTabButtons();
  updateWorkInEditorButtons();
  refreshShortcuts();
  restoreHeaderState();
  restoreTabsState();
  restoreSidebarState();

  watchHeaderRemoval({ scheduleReload });
  watchUrlChanges();
  watchShortcuts({ showToast });
  watchShortcutElements({ refreshShortcuts });
  watchPromptEnterShortcut();
  watchPromptSubmission();
  watchQuestionBoxes({ handleFocus });
  watchSidebarHiddenHeadersSetting({ setSettingSidebarHiddenHeaders });
  watchSidebarShrinkSetting({ setSettingSidebarShrink });
  watchSettingsToggleButton({ hideTocMenu });
  watchSidebarLinks();
  watchSidebarToggleButton();
  watchCopyMarkupButtons();
  watchTabButtons({ refreshShortcuts });
  watchTabsPanelToggleButton();
  watchNextExerciseButton({ refreshShortcuts });
}

/**
 * RELOAD UI
 * Reloads loadUI() after a DOM refresh from a page/url change.
 */
setLoadUIHandler(loadUI);

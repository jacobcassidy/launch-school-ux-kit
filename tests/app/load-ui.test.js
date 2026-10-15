import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { sourceContext } from "../support/source-context.js";

test("application preserves load order and supplies each feature's named callbacks", () => {
  const source = readFileSync("src/app/load-ui.js", "utf8");
  const names = [...source.matchAll(/import \{([^}]+)\}/gs)].flatMap((match) =>
    match[1]
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean),
  );
  const calls = [];
  const globals = Object.fromEntries(names.map((name) => [name, (options) => calls.push({ name, options })]));
  globals.sidebarState = {};
  const context = sourceContext("src/app/load-ui.js", globals);
  assert.deepEqual(
    calls.map(({ name }) => name),
    ["setLoadUIHandler"],
  );
  assert.equal(calls[0].options, context.loadUI);
  calls.length = 0;
  context.loadUI();
  assert.deepEqual(
    calls.map(({ name }) => name),
    [
      "injectStyles",
      "syncNativeElementsState",
      "injectHeader",
      "injectToaster",
      "syncInjectedElementsState",
      "syncSettingsPreferences",
      "updateSidebar",
      "injectContentSolutionButtons",
      "updateConversationHistoryButtons",
      "updateNewConversationButtons",
      "updateCopyCodeButtons",
      "updateCopyMarkupButtons",
      "updateExerciseCompletionButton",
      "updateNextExerciseButton",
      "updatePaginationButtons",
      "updateRunCodeButtons",
      "updateSolutionButtons",
      "updateTabButtons",
      "updateWorkInEditorButtons",
      "refreshShortcuts",
      "restoreHeaderState",
      "restoreTabsState",
      "restoreSidebarState",
      "watchHeaderRemoval",
      "watchUrlChanges",
      "watchShortcuts",
      "watchShortcutElements",
      "watchPromptEnterShortcut",
      "watchPromptSubmission",
      "watchQuestionBoxes",
      "watchSidebarHiddenHeadersSetting",
      "watchSidebarShrinkSetting",
      "watchSettingsToggleButton",
      "watchSidebarLinks",
      "watchSidebarToggleButton",
      "watchCopyMarkupButtons",
      "watchTabButtons",
      "watchTabsPanelToggleButton",
      "watchNextExerciseButton",
    ],
  );
  const expectedOptions = {
    injectHeader: [
      "injectSettingsMenu",
      "injectSettingsToggleButton",
      "injectSidebarToggleButton",
      "injectTabsPanelToggleButton",
      "moveTocButtonToHeader",
    ],
    syncSettingsPreferences: ["sidebarState"],
    updateExerciseCompletionButton: ["refreshShortcuts"],
    watchHeaderRemoval: ["scheduleReload"],
    watchShortcuts: ["showToast"],
    watchShortcutElements: ["refreshShortcuts"],
    watchQuestionBoxes: ["handleFocus"],
    watchSidebarHiddenHeadersSetting: ["setSettingSidebarHiddenHeaders"],
    watchSidebarShrinkSetting: ["setSettingSidebarShrink"],
    watchSettingsToggleButton: ["hideTocMenu"],
    watchTabButtons: ["refreshShortcuts"],
    watchNextExerciseButton: ["refreshShortcuts"],
  };
  for (const [name, keys] of Object.entries(expectedOptions)) {
    const options = calls.find((call) => call.name === name).options;
    assert.deepEqual(Object.keys(options), keys);
    for (const key of keys) assert.equal(options[key], globals[key]);
  }
});

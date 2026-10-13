import assert from "node:assert/strict";
import test from "node:test";
import { sourceContext } from "../../support/source-context.js";

test("missing completion form does not abort initialization and can appear later", () => {
  let callback;
  let styled = 0;
  let shortcutsSynced = 0;
  let settingsRefreshed = 0;
  const context = sourceContext("src/features/exercises/exercise-completion-button.js", {
    document: { querySelector: () => ({ querySelector: () => null }) },
    watchExerciseCompletionControls(fn) {
      callback = fn;
    },
    applyButtonAppearance() {
      styled++;
    },
    syncAvailableShortcuts() {
      shortcutsSynced++;
    },
    injectShortcutsSection() {
      settingsRefreshed++;
    },
  });
  context.updateExerciseCompletionButton({
    refreshShortcuts: () => {
      context.syncAvailableShortcuts();
      context.injectShortcutsSection();
    },
  });
  assert.equal(styled, 0);
  callback({ querySelectorAll: () => [{}], querySelector: () => null });
  assert.equal(styled, 1);
  assert.equal(shortcutsSynced, 1);
  assert.equal(settingsRefreshed, 1);
});

test("completion watcher binds once per panel and handles replacement forms", () => {
  let buttons = [{}];
  let form = { querySelectorAll: () => buttons };
  const panel = {
    querySelector(selector) {
      assert.equal(selector, ".gray-links form");
      return form;
    },
  };
  let currentPanel = panel;
  const observers = [];
  let updates = 0;
  const context = sourceContext("src/features/exercises/watch-exercise-completion-controls.js", {
    document: { querySelector: () => currentPanel },
    MutationObserver: class {
      constructor(callback) {
        this.callback = callback;
        observers.push(this);
      }
      observe() {}
    },
  });
  const update = () => {
    updates++;
  };
  context.watchExerciseCompletionControls(update);
  context.watchExerciseCompletionControls(update);
  assert.equal(observers.length, 1);
  observers[0].callback();
  assert.equal(updates, 0);
  form = {};
  form.querySelectorAll = () => buttons;
  observers[0].callback();
  assert.equal(updates, 1);
  form = null;
  observers[0].callback();
  assert.equal(updates, 2);
  form = { querySelectorAll: () => buttons };
  observers[0].callback();
  assert.equal(updates, 3);

  buttons = [{}];
  observers[0].callback();
  assert.equal(updates, 4);
  currentPanel = { querySelector: () => null };
  context.watchExerciseCompletionControls(update);
  assert.equal(observers.length, 2);
});

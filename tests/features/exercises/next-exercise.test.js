import assert from "node:assert/strict";
import test from "node:test";
import { sourceContext } from "../../support/source-context.js";

test("next-exercise state follows navigation and clears when the destination has no link", () => {
  const elements = { native: { nextExerciseButton: null } };
  let panel = {};
  let links = [{ textContent: "Go to the next exercise", href: "/next" }];
  let styled = 0;
  const context = sourceContext("src/features/exercises/next-exercise-button.js", {
    document: { querySelector: () => panel, querySelectorAll: () => links },
    setElementNextExerciseButton(el) {
      elements.native.nextExerciseButton = el;
    },
    applyButtonAppearance() {
      styled++;
    },
  });
  context.updateNextExerciseButton();
  assert.equal(elements.native.nextExerciseButton, links[0]);
  panel = null;
  context.updateNextExerciseButton();
  assert.equal(elements.native.nextExerciseButton, null);
  panel = {};
  links = [];
  context.updateNextExerciseButton();
  assert.equal(elements.native.nextExerciseButton, null);
  assert.equal(styled, 1);
});

import assert from "node:assert/strict";
import test from "node:test";
import { sourceContext } from "./source-context.js";

test("missing completion form does not abort initialization and can appear later", () => {
  let callback;
  let styled = 0;
  const context = sourceContext("../src/js/modules/components/buttons/panels/exercise-completion.js", {
    document: { querySelector: () => ({ querySelector: () => null }) },
    watchExerciseCompletionToggleBtn(fn) {
      callback = fn;
    },
    setButtonProperties() {
      styled++;
    },
  });
  context.updateExerciseCompletionButton();
  assert.equal(styled, 0);
  callback({ querySelectorAll: () => [{}], querySelector: () => null });
  assert.equal(styled, 1);
});

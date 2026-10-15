/**
 * WATCH SHORTCUTS
 * @module features/shortcuts/watch-shortcuts
 */

import { activateShortcut } from "./actions.js";
import { shortcuts } from "./state.js";
import { getShortcutModifier } from "./platform.js";

/**
 * Registers platform-aware keyboard shortcuts once, preserving composition and AltGr input and reporting unavailable actions.
 *
 * @param {object} options Feature dependencies.
 * @param {function(string, string=): void} options.showToast Displays action feedback.
 * @returns {void}
 */
export function watchShortcuts({ showToast }) {
  if (document.documentElement.dataset.shortcutsBound) {
    return;
  }
  document.documentElement.dataset.shortcutsBound = "true";

  // AltGr may report Ctrl+Alt; track the right Alt key so text entry stays intact.
  let altGraphPressed = false;
  window.addEventListener(
    "blur",
    /**
     * Clears AltGr tracking when the window loses focus.
     *
     * @returns {void}
     */
    () => {
      altGraphPressed = false;
    },
  );
  document.addEventListener(
    "keyup",

    /**
     * Clears AltGr tracking when the right Alt key is released.
     *
     * @param {KeyboardEvent} event Key-release event.
     * @returns {void}
     */
    (event) => {
      if (event.code === "AltRight") altGraphPressed = false;
    },
    true,
  );

  document.addEventListener(
    "keydown",

    /**
     * Dispatches supported shortcuts or unavailable-action feedback while protecting repeats, composition, and AltGr input.
     *
     * @param {KeyboardEvent} event Captured keydown event.
     * @returns {void}
     */
    (event) => {
      if (event.code === "AltRight" && event.getModifierState?.("AltGraph")) altGraphPressed = true;
      if (event.repeat || event.isComposing || event.keyCode === 229 || altGraphPressed) return;
      const modifier = getShortcutModifier(event);
      if (!modifier) return;

      if (modifier === "cmdOnly") {
        if (event.code !== "KeyB" || !shortcuts.cmdOnly.KeyB) return;
      } else if (modifier === "cmdShift") {
        if (event.code !== "Digit1" && event.code !== "Digit2") return;

        if (event.code === "Digit2" && !shortcuts.cmdShift.Digit2) {
          showToast("No tabs panel available to toggle on this page");
        }
      } else if (modifier === "cmdCtrl") {
        if (
          !shortcuts.cmdCtrl[event.code] &&
          event.code !== "KeyC" &&
          event.code !== "KeyE" &&
          event.code !== "KeyM" &&
          event.code !== "KeyN" &&
          event.code !== "KeyR" &&
          event.code !== "KeyT" &&
          event.code !== "Comma"
        )
          return;

        if (event.code === "KeyC" && !shortcuts.cmdCtrl.KeyC) {
          showToast("No editor code available to copy on this page");
        }
        if (event.code === "KeyE" && !shortcuts.cmdCtrl.KeyE) {
          showToast("No editor available to focus on this page");
        }
        if (event.code === "KeyM" && !shortcuts.cmdCtrl.KeyM) {
          showToast("No exercise to mark status of on this page");
        }
        if (event.code === "KeyN" && !shortcuts.cmdCtrl.KeyN) {
          showToast("No next exercise available to go to from this page");
        }
        if (event.code === "KeyR" && !shortcuts.cmdCtrl.KeyR) {
          showToast("No reviewer available to focus on this page");
        }
        if (event.code === "KeyT" && !shortcuts.cmdCtrl.KeyT) {
          showToast("No table of contents available to toggle on this page");
        }
      }

      if (shortcuts[modifier][event.code]) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
      activateShortcut(modifier, event.code);
    },
    true,
  );
}

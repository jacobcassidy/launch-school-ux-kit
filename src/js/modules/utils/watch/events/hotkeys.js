/**
 * WATCH HOTKEYS
 * @module utils/watch/events/hotkeys
 */

// Import utils
import { activateHotkey, showToast } from "../../helpers";
import { ui } from "../../state";

/**
 * Activates the triggered hotkey.
 */
export function watchHotkeys() {
  // colorLog.run("Running watchHotkeys()");

  if (document.documentElement.dataset.hotkeysBound) {
    // colorLog.detail("Hotkeys already exist. Exited watchHotkeys().");
    return;
  }
  document.documentElement.dataset.hotkeysBound = "true";

  document.addEventListener("keydown", (event) => {
    const keyAlt = event.altKey;
    const keyCmd = event.metaKey;
    const keyCtrl = event.ctrlKey;
    const keyShift = event.shiftKey;
    const isCmdCtrl = keyCmd && keyCtrl && !keyShift && !keyAlt;
    const isCmdOnly = keyCmd && !keyAlt && !keyCtrl && !keyShift;
    const isCmdShift = keyCmd && keyShift && !keyCtrl && !keyAlt;
    let modifier;

    if (isCmdCtrl) modifier = "cmdCtrl";
    if (isCmdOnly) modifier = "cmdOnly";
    if (isCmdShift) modifier = "cmdShift";

    if (event.repeat || (!isCmdOnly && !isCmdCtrl && !isCmdShift)) return;

    if (isCmdOnly) {
      if (event.code !== "KeyB") return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    } else if (isCmdShift) {
      if (event.code !== "Digit1" && event.code !== "Digit2") return;

      if (event.code === "Digit2" && !hotkeys.cmdShift.Digit2) {
        showToast("No tabs panel available to toggle on this page");
      }
    } else if (isCmdCtrl) {
      if (
        event.code !== "Digit1" &&
        event.code !== "Digit2" &&
        event.code !== "Digit3" &&
        event.code !== "Digit4" &&
        event.code !== "Digit5" &&
        event.code !== "KeyC" &&
        event.code !== "KeyE" &&
        event.code !== "KeyM" &&
        event.code !== "KeyN" &&
        event.code !== "KeyR" &&
        event.code !== "KeyT" &&
        event.code !== "Comma"
      )
        return;

      if (event.code === "KeyC" && !hotkeys.cmdCtrl.KeyC) {
        showToast("No editor code available to copy on this page");
      }
      if (event.code === "KeyE" && !hotkeys.cmdCtrl.KeyE) {
        showToast("No editor available to focus on this page");
      }
      if (event.code === "KeyM" && !hotkeys.cmdCtrl.KeyM) {
        showToast("No exercise to mark status of on this page");
      }
      if (event.code === "KeyN" && !hotkeys.cmdCtrl.KeyN) {
        showToast("No next exercise available to go to from this page");
      }
      if (event.code === "KeyR" && !hotkeys.cmdCtrl.KeyR) {
        showToast("No reviewer available to focus on this page");
      }
      if (event.code === "KeyT" && !hotkeys.cmdCtrl.KeyT) {
        showToast("No table of contents available to toggle on this page");
      }
    }

    activateHotkey(modifier, event.code);
  });
}

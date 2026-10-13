/**
 * SHORTCUTS STATE
 * @module features/shortcuts/state
 */

// Logical shortcut groups; platform helpers choose the actual modifier keys.
export const shortcuts = {
  enterOnly: {},
  cmdOnly: {},
  cmdShift: {},
  cmdCtrl: {},
};

/**
 * Stores a shortcut entry, its optional activation callback, and controls that should display its key labels.
 *
 * @param {string} modifier Existing logical shortcut registry group.
 * @param {string} key KeyboardEvent.code identifying the shortcut.
 * @param {string|number} symbol Display label for the non-modifier key.
 * @param {string} label Human-readable action label.
 * @param {(function(): void)|null} [callbackFunc=null] Action callback; null creates a display-only entry.
 * @param {Array<HTMLElement|null>} [buttons=[]] Controls associated with shortcut labels.
 * @returns {void}
 */
export function setAvailableShortcut(modifier, key, symbol, label, callbackFunc = null, buttons = []) {
  let callback;
  if (!callbackFunc) {
    callback = null;
  } else {
    /**
     * Invokes the stored shortcut action.
     *
     * @returns {void}
     */
    callback = () => callbackFunc();
  }

  shortcuts[modifier][key] = { callback: callback, label: label, symbol: symbol, buttons: buttons };
}

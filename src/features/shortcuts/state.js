/**
 * SHORTCUTS STATE
 * @module utils/state/shortcuts
 */

// Logical shortcut groups; platform helpers choose the actual modifier keys.
export const shortcuts = {
  enterOnly: {},
  cmdOnly: {},
  cmdShift: {},
  cmdCtrl: {},
};

export function setAvailableShortcut(modifier, key, symbol, label, callbackFunc = null, buttons = []) {
  let callback;
  if (!callbackFunc) {
    callback = null;
  } else {
    callback = () => callbackFunc();
  }

  shortcuts[modifier][key] = { callback: callback, label: label, symbol: symbol, buttons: buttons };
}

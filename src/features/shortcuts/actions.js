/**
 * SHORTCUTS ACTIONS
 * @module features/shortcuts/actions
 */

import { shortcuts } from "./state.js";

/**
 * Invokes the registered callback matching a key code in the supplied logical modifier group.
 *
 * @param {string} modifier Existing shortcut registry group.
 * @param {string} eventCode KeyboardEvent.code to look up.
 * @returns {void}
 */
export function activateShortcut(modifier, eventCode) {
  const keyEvents = shortcuts[modifier];

  for (const [key, keyObj] of Object.entries(keyEvents)) {
    if (key === eventCode) {
      keyObj.callback();
    }
  }
}

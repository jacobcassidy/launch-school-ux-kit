import { shortcuts } from "./state.js";
export function activateShortcut(modifier, eventCode) {
  const keyEvents = shortcuts[modifier];

  for (const [key, keyObj] of Object.entries(keyEvents)) {
    if (key === eventCode) {
      keyObj.callback();
    }
  }
}

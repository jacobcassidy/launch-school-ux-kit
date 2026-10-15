/**
 * PLATFORM SHORTCUTS
 * @module features/shortcuts/platform
 */

const modifierLabels = { meta: "Cmd", ctrl: "Ctrl", alt: "Alt", shift: "Shift" };
const modifierSymbols = { meta: "⌘", ctrl: "⌃", alt: "⎇", shift: "⇧" };
const macModifiers = { cmdOnly: ["meta"], cmdShift: ["meta", "shift"], cmdCtrl: ["meta", "ctrl"] };
const controlModifiers = { cmdOnly: ["ctrl"], cmdShift: ["ctrl", "shift"], cmdCtrl: ["ctrl", "alt"] };

/**
 * Chooses logical modifier mappings from available browser platform metadata.
 *
 * @returns {Object<string, string[]>} Mac modifier mappings on Apple platforms, otherwise Control-based mappings.
 */
function getPlatformModifiers() {
  const browser = globalThis.navigator;
  const platform = browser?.userAgentData?.platform || browser?.platform || browser?.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(platform) ? macModifiers : controlModifiers;
}

/**
 * Formats modifier keys and the non-modifier key for a logical shortcut on the current platform.
 *
 * @param {string} modifier Logical shortcut group.
 * @param {string|number} symbol Non-modifier key label.
 * @param {object} [options={}] Display options.
 * @param {boolean} [options.symbols=true] Use modifier symbols instead of names.
 * @returns {string[]} Key labels in display order.
 */
export function getShortcutKeys(modifier, symbol, { symbols = true } = {}) {
  const modifiers = getPlatformModifiers()[modifier] || [];
  const labels = symbols ? modifierSymbols : modifierLabels;
  return [
    ...modifiers.map(
      /**
       * Looks up the display label for a physical modifier key.
       *
       * @param {string} key Modifier key name in the platform mapping.
       * @returns {string} Modifier symbol or name.
       */
      (key) => labels[key],
    ),
    String(symbol),
  ];
}

/**
 * Matches a keyboard event to a logical shortcut group using its exact modifier-key combination.
 *
 * @param {KeyboardEvent} event Keyboard event to inspect.
 * @returns {string|null} Matching logical group, or null when no combination matches.
 */
export function getShortcutModifier(event) {
  for (const [modifier, keys] of Object.entries(getPlatformModifiers())) {
    if (
      Object.keys(modifierLabels).every(
        /**
         * Checks that one modifier key's pressed state exactly matches the candidate group.
         *
         * @param {string} key Physical modifier key name.
         * @returns {boolean} Whether this modifier agrees with the candidate group.
         */
        (key) => Boolean(event[`${key}Key`]) === keys.includes(key),
      )
    ) {
      return modifier;
    }
  }
  return null;
}

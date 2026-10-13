/**
 * WATCH DYNAMIC SHORTCUT ELEMENTS
 * @module features/shortcuts/watch-shortcut-elements
 */

const shortcutElementSelector = [
  ".tab-button",
  ".lsbot-question-input",
  ".lsbot-question-box-answer-input",
  ".lsbot-submit-btn",
  ".lsbot-question-box-send-answer-button",
  ".btn-copy-code",
  ".instructions-panel .gray-links form button[type=submit]",
  ".next-exercise",
  "#lsbot-send-review",
  "#btn-book-lsbot-review",
  ".toc-toggle-button",
].join(",");

/**
 * Observes relevant native control insertion, removal, or replacement once and coalesces shortcut refreshes into microtasks.
 *
 * @param {object} options Feature dependencies.
 * @param {function(): void} options.refreshShortcuts Rebuilds current-page shortcuts and their UI.
 * @returns {void}
 */
export function watchShortcutElements({ refreshShortcuts }) {
  if (document.documentElement.dataset.shortcutElementsBound) return;
  document.documentElement.dataset.shortcutElementsBound = "true";

  let refreshScheduled = false;
  const observer = new MutationObserver(
    /**
     * Detects relevant control mutations and queues at most one pending shortcut refresh.
     *
     * @param {MutationRecord[]} mutations Document child-list mutation batch.
     * @returns {void}
     */
    (mutations) => {
      const hasRelevantChange = mutations.some(
        /**
         * Checks whether one mutation added or removed a shortcut control or its containing subtree.
         *
         * @param {MutationRecord} mutation Mutation to inspect.
         * @returns {boolean} Whether this mutation affects shortcut controls.
         */
        (mutation) =>
          [...mutation.addedNodes, ...mutation.removedNodes].some(
            /**
             * Checks an added or removed element for a shortcut control at its root or among its descendants.
             *
             * @param {Node} node Added or removed subtree root.
             * @returns {boolean|Element|null} Truthy when the node contains a relevant control.
             */
            (node) =>
              node instanceof Element &&
              (node.matches(shortcutElementSelector) || node.querySelector(shortcutElementSelector)),
          ),
      );
      if (!hasRelevantChange || refreshScheduled) return;

      refreshScheduled = true;
      queueMicrotask(
        /**
         * Clears the pending flag and refreshes shortcuts after the mutation batch.
         *
         * @returns {void}
         */
        () => {
          refreshScheduled = false;
          refreshShortcuts();
        },
      );
    },
  );

  observer.observe(document.body, { childList: true, subtree: true });
}

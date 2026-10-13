/**
 * WATCH COPY MARKUP BUTTONS
 * @module features/editor/watch-copy-markup-buttons
 */

import { updateCopyMarkupButtons } from "./copy-markup-buttons.js";

const watchedTabContents = new WeakSet();

/**
 * Observes the tab content once and decorates markup-copy controls added inside it.
 *
 * @returns {void}
 */
export function watchCopyMarkupButtons() {
  const tabContent = document.querySelector(".tab-content");
  if (!tabContent) return;

  if (watchedTabContents.has(tabContent)) return;
  watchedTabContents.add(tabContent);

  const observer = new MutationObserver(
    /**
     * Collects markup-copy buttons in added nodes and applies their appearance.
     *
     * @param {MutationRecord[]} mutationList Tab-content mutations delivered by the observer.
     * @returns {void}
     */
    (mutationList) => {
      const btns = [];

      mutationList.forEach(
        /**
         * Inspects added nodes in one tab-content mutation for new markup-copy controls.
         *
         * @param {MutationRecord} mutation Mutation whose added nodes should be inspected.
         * @returns {void}
         */
        (mutation) => {
          mutation.addedNodes.forEach(
            /**
             * Collects a matching added button and matching descendants, skipping non-HTML nodes.
             *
             * @param {Node} node Node added to the observed tab content.
             * @returns {void}
             */
            (node) => {
              if (!(node instanceof HTMLElement)) return;

              if (node.matches(".markup-copy-block button")) {
                btns.push(node);
              }

              btns.push(...node.querySelectorAll(".markup-copy-block button"));
            },
          );
        },
      );

      updateCopyMarkupButtons(btns);
    },
  );

  observer.observe(tabContent, {
    childList: true,
    subtree: true,
  });
}

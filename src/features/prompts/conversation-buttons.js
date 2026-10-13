/**
 * CONVERSATION BUTTONS
 * @module features/prompts/conversation-buttons
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";

/**
 * Adds plain-button styling and a history icon to conversation-history controls.
 *
 * @returns {void}
 */
export function updateConversationHistoryButtons() {
  const btns = document.querySelectorAll(".conversation-history-button");
  if (btns.length < 1) return;

  const newIcons = [
    /**
     * Creates a fresh icon using the panelIcons.conversationHistory factory.
     *
     * @returns {SVGElement} New icon element.
     */
    () => icons.panelIcons.conversationHistory(),
  ];
  const btnClasses = ["btn--plain"];

  applyButtonAppearance(btns, newIcons, btnClasses);
}

/**
 * Adds plain-button styling and a new-conversation icon to conversation controls.
 *
 * @returns {void}
 */
export function updateNewConversationButtons() {
  const btns = document.querySelectorAll(".new-conversation-button");
  if (btns.length < 1) return;

  const newIcons = [
    /**
     * Creates a fresh icon using the panelIcons.conversationNew factory.
     *
     * @returns {SVGElement} New icon element.
     */
    () => icons.panelIcons.conversationNew(),
  ];
  const btnClasses = ["btn--plain"];

  applyButtonAppearance(btns, newIcons, btnClasses);
}

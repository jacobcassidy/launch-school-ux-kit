/**
 * CONVERSATION BUTTONS
 * @module features/prompts/conversation-buttons
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";

/**
 * Updates the conversation history button styles and icon.
 */
export function updateConversationHistoryButtons() {
  const btns = document.querySelectorAll(".conversation-history-button");
  if (btns.length < 1) return;

  const newIcons = [() => icons.panelIcons.conversationHistory()];
  const btnClasses = ["btn--plain"];

  applyButtonAppearance(btns, newIcons, btnClasses);
}

/**
 * Updates the new conversation button styles and icon.
 */
export function updateNewConversationButtons() {
  const btns = document.querySelectorAll(".new-conversation-button");
  if (btns.length < 1) return;

  const newIcons = [() => icons.panelIcons.conversationNew()];
  const btnClasses = ["btn--plain"];

  applyButtonAppearance(btns, newIcons, btnClasses);
}

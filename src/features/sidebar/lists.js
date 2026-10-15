/**
 * SIDEBAR LIST RENDERING
 * @module features/sidebar/lists
 */

import { icons } from "../../shared/icons.js";
import { sidebarLists } from "./sidebar-lists.js";

/**
 * Builds configured sidebar groups and section controls, moves current items into their configured order, and appends the groups.
 *
 * @param {HTMLElement} sidebar Native sidebar receiving the new grouped lists.
 * @param {Map<string, HTMLLIElement>} sidebarItems Native list items keyed by their logical link labels.
 * @returns {void}
 */
export function reorderSidebarLists(sidebar, sidebarItems) {
  sidebar.classList.add("sidebar");
  const updatedListsWrapperEl = document.createElement("div");
  updatedListsWrapperEl.className = "sidebar-lists";
  Object.entries(sidebarLists).forEach(
    /**
     * Builds one configured sidebar group with its section control and ordered native items.
     *
     * @param {Array<string|object>} entry Group name and configuration containing item positions and the displayed heading.
     * @returns {void}
     */
    ([listName, { listOrder, listTitle }]) => {
      const listClassName = listName.replace(/([A-Z])/g, "-$1").toLowerCase();
      const listWrapperEl = document.createElement("div");
      listWrapperEl.className = `sidebar-list-wrapper ${listClassName}-wrapper`;
      const listEl = document.createElement("ul");
      listEl.className = `sidebar-list ${listClassName}`;

      const listHeaderEl = document.createElement("button");
      listHeaderEl.className = "sidebar-list-toggle-btn btn--plain";
      const listHeaderTitleEl = document.createElement("span");
      listHeaderTitleEl.className = "list-title";
      listHeaderTitleEl.innerText = listTitle;
      listHeaderEl.appendChild(listHeaderTitleEl);
      listHeaderEl.appendChild(icons.sidebarIcons.toggle());
      listWrapperEl.appendChild(listHeaderEl);

      Object.entries(listOrder)
        .sort(
          /**
           * Orders configured sidebar items by ascending position.
           *
           * @param {Array<string|number>} firstEntry First label-and-position tuple.
           * @param {Array<string|number>} secondEntry Second label-and-position tuple.
           * @returns {number} Difference between the configured positions.
           */
          ([, firstOrder], [, secondOrder]) => firstOrder - secondOrder,
        )
        .forEach(
          /**
           * Moves an available native sidebar item into its configured group and applies item classes.
           *
           * @param {Array<string|number>} entry Configured item label and numeric position; only the label is used here.
           * @returns {void}
           */
          ([linkLabel]) => {
            const item = sidebarItems.get(linkLabel);
            if (!item) return;

            item.querySelectorAll("a").forEach(
              /**
               * Adds the sidebar item-link class to an item's anchor.
               *
               * @param {HTMLAnchorElement} link Native item link.
               * @returns {void}
               */
              (link) => link.classList.add("item-link"),
            );
            item.querySelectorAll("button").forEach(
              /**
               * Adds the sidebar item-button class to an item's button.
               *
               * @param {HTMLButtonElement} btn Native item button.
               * @returns {void}
               */
              (btn) => btn.classList.add("item-btn"),
            );
            item.className = "sidebar-list__item";
            listEl.appendChild(item);
          },
        );
      listWrapperEl.appendChild(listEl);
      updatedListsWrapperEl.appendChild(listWrapperEl);
    },
  );

  sidebar.appendChild(updatedListsWrapperEl);
}

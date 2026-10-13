/**
 * WATCH SIDEBAR UNREAD COUNTS
 * @module features/sidebar/unread-count
 */

let watchedSidebar = null;
let sidebarObserver = null;

/**
 * Observes the current sidebar and synchronizes unread badges, disconnecting and cleaning up when the sidebar changes or disappears.
 *
 * @param {HTMLElement|null} [sidebar] Sidebar to observe; defaults to the current native drawer, and null stops observation.
 * @returns {void}
 */
export function watchUnreadCounts(sidebar = document.querySelector(".nav-drawer")) {
  if (!sidebar) {
    sidebarObserver?.disconnect();
    sidebarObserver = null;
    watchedSidebar = null;
    return;
  }

  if (sidebar !== watchedSidebar) {
    sidebarObserver?.disconnect();
    watchedSidebar?.querySelectorAll(".unread-count").forEach(
      /**
       * Removes an injected badge from the previously observed sidebar.
       *
       * @param {HTMLElement} badge Unread badge owned by the old sidebar.
       * @returns {void}
       */
      (badge) => badge.remove(),
    );
    watchedSidebar = sidebar;
    sidebarObserver = new MutationObserver(
      /**
       * Synchronizes unread badges after mutations in the current sidebar.
       *
       * @returns {void}
       */
      () => syncUnreadCounts(sidebar),
    );
    sidebarObserver.observe(sidebar, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  syncUnreadCounts(sidebar);
}

/**
 * Creates, updates, or removes badges to mirror native unread-count text without disturbing unrelated siblings.
 *
 * @param {HTMLElement} sidebar Sidebar containing native counts and injected badges.
 * @returns {void}
 */
function syncUnreadCounts(sidebar) {
  const counts = sidebar.querySelectorAll('[class*="_unread_count"]');
  const currentCounts = new Set(counts);

  sidebar.querySelectorAll(".unread-count").forEach(
    /**
     * Removes an injected badge whose native count source no longer exists.
     *
     * @param {HTMLElement} badge Previously injected unread badge.
     * @returns {void}
     */
    (badge) => {
      if (!currentCounts.has(badge.unreadCountSource)) badge.remove();
    },
  );

  counts.forEach(
    /**
     * Synchronizes the badge adjacent to one native count, preserving unrelated siblings and hiding single-count text.
     *
     * @param {HTMLElement} count Native unread-count source.
     * @returns {void}
     */
    (count) => {
      const countText = count.textContent.replace(/[()]/g, "").trim();
      let badge = count.nextElementSibling;
      if (!badge?.classList.contains("unread-count") || badge.unreadCountSource !== count) badge = null;

      if (!countText) {
        badge?.remove();
        return;
      }

      if (!badge) {
        badge = document.createElement("span");
        badge.className = "unread-count";
        badge.unreadCountSource = count;
        count.after(badge);
      }

      if (badge.textContent !== countText) badge.textContent = countText;
      badge.classList.toggle("hide-single-count", countText === "1");
    },
  );
}

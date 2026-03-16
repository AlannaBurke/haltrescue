/**
 * Sidebar Accordion — collapses all other top-level categories when one is opened.
 *
 * Performance-safe implementation:
 * - Uses a single delegated click listener (never stacked, never duplicated)
 * - Collapses siblings by directly calling the Docusaurus internal collapse
 *   mechanism via aria-expanded + the hidden <ul> display, rather than firing
 *   synthetic click() events (which would re-trigger this handler and Docusaurus
 *   animations for every sibling, causing cascading reflows and freezes)
 * - Guards against re-entrant calls with a processing flag
 */

let sidebarRef = null;
let sidebarClickHandler = null;
let isProcessing = false;

/**
 * Collapse a single top-level sidebar category without firing a click event.
 * Docusaurus stores collapse state via:
 *   - `menu__list-item--collapsed` class on the <li>
 *   - `aria-expanded="false"` on the toggle button
 *   - `collapsed` class on the child <ul>
 */
function collapseItem(item) {
  if (item.classList.contains('menu__list-item--collapsed')) return; // already collapsed

  item.classList.add('menu__list-item--collapsed');

  const btn = item.querySelector(':scope > .menu__list-item-collapsible');
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
  }

  // Collapse the child list — Docusaurus uses either display:none or a
  // CSS transition via the `collapsed` class on the inner <ul>
  const childList = item.querySelector(':scope > .menu__list');
  if (childList) {
    childList.classList.add('menu__list--collapsed');
    // Also set inline style to match what Docusaurus does after animation
    childList.style.height = '0px';
    childList.style.overflow = 'hidden';
  }
}

function initAccordion() {
  const sidebar = document.querySelector('ul.menu__list');
  if (!sidebar) return;

  // If the sidebar element hasn't changed, no need to re-attach
  if (sidebar === sidebarRef) return;
  sidebarRef = sidebar;

  // Remove old listener from old sidebar element (if any)
  if (sidebarClickHandler && sidebar !== sidebarRef) {
    sidebar.removeEventListener('click', sidebarClickHandler);
  }

  sidebarClickHandler = (e) => {
    if (isProcessing) return;

    const btn = e.target.closest('.menu__list-item-collapsible');
    if (!btn) return;

    const clickedItem = btn.closest('.menu__list-item');
    if (!clickedItem) return;

    // Only act on direct children of the root sidebar list
    if (clickedItem.parentElement !== sidebar) return;

    // Set flag to prevent re-entrant processing
    isProcessing = true;

    // Use rAF to let Docusaurus process its own toggle first
    requestAnimationFrame(() => {
      try {
        const allTopLevel = sidebar.querySelectorAll(':scope > .menu__list-item');
        allTopLevel.forEach((item) => {
          if (item === clickedItem) return;
          collapseItem(item);
        });
      } finally {
        isProcessing = false;
      }
    });
  };

  sidebar.addEventListener('click', sidebarClickHandler);
}

// Run on initial page load
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordion);
  } else {
    initAccordion();
  }
}

// Re-run on Docusaurus client-side navigation (SPA route changes)
export function onRouteDidUpdate() {
  // Reset sidebar ref so initAccordion re-attaches if the sidebar remounted
  sidebarRef = null;
  setTimeout(initAccordion, 150);
}

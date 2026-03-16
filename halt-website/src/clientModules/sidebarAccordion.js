/**
 * Sidebar Accordion — collapses all other top-level categories when one is opened.
 *
 * Docusaurus renders sidebar categories as <li> elements with a button toggle.
 * When a category is expanded, the <li> gets the class `menu__list-item--collapsed`
 * removed (i.e. it is NOT collapsed). We watch for clicks on category buttons and
 * collapse every sibling category that is currently open.
 *
 * This only affects the top-level categories (direct children of the root
 * .menu__list), leaving nested sub-categories free to behave normally.
 */

function initAccordion() {
  const sidebar = document.querySelector('.menu__list');
  if (!sidebar) return;

  sidebar.addEventListener('click', (e) => {
    // Find the closest category toggle button
    const btn = e.target.closest('.menu__list-item-collapsible');
    if (!btn) return;

    const clickedItem = btn.closest('.menu__list-item');
    if (!clickedItem) return;

    // Only act on top-level items (direct children of the root menu__list)
    if (clickedItem.parentElement !== sidebar) return;

    // After a short tick (let Docusaurus do its own toggle first), collapse siblings
    requestAnimationFrame(() => {
      const allTopLevel = sidebar.querySelectorAll(':scope > .menu__list-item');
      allTopLevel.forEach((item) => {
        if (item === clickedItem) return; // leave the clicked one alone
        // If this sibling is currently expanded (i.e. NOT collapsed), collapse it
        if (!item.classList.contains('menu__list-item--collapsed')) {
          const siblingBtn = item.querySelector(':scope > .menu__list-item-collapsible');
          if (siblingBtn) {
            siblingBtn.click();
          }
        }
      });
    });
  });
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
  // Re-attach after navigation in case the sidebar remounts
  setTimeout(initAccordion, 100);
}

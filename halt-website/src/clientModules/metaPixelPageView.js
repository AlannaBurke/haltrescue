// The Meta Pixel base code (in docusaurus.config headTags) fires PageView
// once, on the first full page load. Docusaurus is a single-page app, so
// later in-site navigations never reload the page and would otherwise send
// no PageView at all. The pixel library also binds the page URL at init
// time, so events sent after an in-site navigation still report the
// landing page's URL (verified in Events Manager Test Events on
// 2026-11-14: every event showed the homepage URL). Re-running init after
// each route change refreshes the pixel's page context to the new URL,
// then PageView is fired for the new page.
const PIXEL_ID = '1504653878382201';

export function onRouteDidUpdate() {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return;
  }
  // Let the browser URL settle before the pixel reads it.
  window.setTimeout(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('init', PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  }, 0);
}

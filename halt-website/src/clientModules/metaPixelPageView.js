// The Meta Pixel base code (in docusaurus.config headTags) fires PageView
// once, on the first full page load. Docusaurus is a single-page app, so
// later in-site navigations never reload the page and would otherwise send
// no PageView at all, and every event would report the landing URL. Fire
// PageView again on each route change so Meta sees every page view with
// its real URL.
export function onRouteDidUpdate() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
}

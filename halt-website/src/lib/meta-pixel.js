// Send standard Meta Pixel events when the browser Pixel is available.
// This site currently uses browser Pixel events; no Conversions API is configured here.
const PIXEL_ID = '1504653878382201';

export function trackMetaEvent(eventName, parameters = {}, eventID) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return;
  }

  // The pixel library binds the page URL at init time; on this
  // single-page site, events sent after an in-site navigation would
  // otherwise report the landing page's URL. Re-running init refreshes
  // the pixel's page context to the current URL (init is idempotent
  // and does not fire any event by itself).
  window.fbq('init', PIXEL_ID);

  const options = eventID ? {eventID} : undefined;
  window.fbq('track', eventName, parameters, options);
}

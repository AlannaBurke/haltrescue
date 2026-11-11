// Send standard Meta Pixel events when the browser Pixel is available.
// This site currently uses browser Pixel events; no Conversions API is configured here.
export function trackMetaEvent(eventName, parameters = {}, eventID) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return;
  }

  const options = eventID ? {eventID} : undefined;
  window.fbq('track', eventName, parameters, options);
}

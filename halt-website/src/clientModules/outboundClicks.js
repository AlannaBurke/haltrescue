// Outbound click tracking for GA4 (added 2026-11-24 for Google Ad Grants).
// Clicks that leave helpingalllittlethings.org for places GA4/Google Ads
// cannot see into (Venmo, Cash App, Patreon, social networks, affiliate
// merchants) fire a named GA4 event here, on our own page, before the
// visitor leaves. Those events are the secondary conversions for the ad
// account: the click is countable even though the donation, follow, or
// membership that may follow happens off-site and stays invisible.
// Completed on-site actions (Givebutter donations, shop purchases,
// signups) remain the primary conversions and are tracked separately.

const DONATE_HOSTS = [
  [/venmo\.com$/, 'Venmo'],
  [/paypal\.com$/, 'PayPal'],
  [/paypal\.me$/, 'PayPal'],
  [/cash\.app$/, 'Cash App'],
  [/givebutter\.com$/, 'Givebutter'],
];

const SOCIAL_HOSTS = [
  [/facebook\.com$/, 'Facebook'],
  [/fb\.com$/, 'Facebook'],
  [/instagram\.com$/, 'Instagram'],
  [/tiktok\.com$/, 'TikTok'],
  [/youtube\.com$/, 'YouTube'],
  [/youtu\.be$/, 'YouTube'],
  [/threads\.net$/, 'Threads'],
  [/threads\.com$/, 'Threads'],
];

const AFFILIATE_HOSTS = [
  [/chewy\.com$/, 'Chewy'],
  // Chewy Shelters and Rescues tracking links run through sjv.io and land
  // on Chewy; count them as Chewy.
  [/sjv\.io$/, 'Chewy'],
  [/amazon\.com$/, 'Amazon'],
  [/amzn\.to$/, 'Amazon'],
  // The shop's Amazon product links use the link.amazon short domain.
  [/^link\.amazon$/, 'Amazon'],
  [/walmart\.com$/, 'Walmart'],
  [/target\.com$/, 'Target'],
  [/petsmart\.com$/, 'PetSmart'],
  [/petco\.com$/, 'Petco'],
  // The Anchor storefront (creator.anchor.store) carries the Chewpanions
  // per-product links; an affiliate route in its own right.
  [/anchor\.store$/, 'Anchor'],
  [/igive\.com$/, 'iGive'],
];

function matchHost(list, hostname) {
  for (const [pattern, label] of list) {
    if (pattern.test(hostname)) {
      return label;
    }
  }
  return null;
}

// The volunteer interest form lives on Google Forms, so a completed form
// can never be seen from our site. The click through to it is the countable
// step: it fires its own event instead of a generic outbound click.
const VOLUNTEER_FORM_MARKER = '1FAIpQLSeeH8FoK1ktMUSMrc_ZTkxb69KbFma3j0CMONr2mzyTJgw0zQ';

function classify(hostname) {
  const method = matchHost(DONATE_HOSTS, hostname);
  if (method) {
    return ['donate_click', { method }];
  }
  if (/patreon\.com$/.test(hostname)) {
    return ['patreon_click', {}];
  }
  const network = matchHost(SOCIAL_HOSTS, hostname);
  if (network) {
    return ['social_click', { network }];
  }
  const merchant = matchHost(AFFILIATE_HOSTS, hostname);
  if (merchant) {
    return ['affiliate_click', { merchant }];
  }
  return ['outbound_click', { link_domain: hostname }];
}

function onClick(event) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }
  const anchor = event.target && event.target.closest
    ? event.target.closest('a[href]')
    : null;
  if (!anchor) {
    return;
  }
  let url;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }
  if (url.hostname === window.location.hostname) {
    return;
  }
  if (url.href.includes(VOLUNTEER_FORM_MARKER)) {
    window.gtag('event', 'volunteer_form_click', {
      link_url: url.href,
      transport_type: 'beacon',
    });
    return;
  }
  const [eventName, params] = classify(url.hostname);
  window.gtag('event', eventName, {
    ...params,
    link_url: url.href,
    transport_type: 'beacon',
  });
}

if (typeof window !== 'undefined' && !window.__haltOutboundClicks) {
  window.__haltOutboundClicks = true;
  document.addEventListener('click', onClick, true);
}

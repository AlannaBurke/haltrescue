// Shared PayPal JS SDK loader with retries.
//
// Loading the SDK used to be a single attempt with no retry: when
// PayPal's script delivery hiccuped (which happens intermittently),
// the page went straight to its fallback and the buttons never
// appeared, even though a reload often worked. This loader injects
// the script once, retries with a fresh script element on failure,
// and renders with one retry as well. Only after every attempt
// fails does the caller show its fallback.

const PAYPAL_CLIENT_ID =
  'BAAiYr0r-y_hasJVi4FAnZzwYu4kFMSeaRJuM0NEg5YGMtzZdIimYWJkKEIX1q6U07dHTBkXVPkM0z0S8Y';
const PAYPAL_SDK_URL = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&components=buttons`;

let sdkPromise = null;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function injectOnce() {
  return new Promise((resolve, reject) => {
    if (window.paypal && window.paypal.Buttons) {
      resolve(window.paypal);
      return;
    }
    const script = document.createElement('script');
    script.src = PAYPAL_SDK_URL;
    script.async = true;
    script.onload = () => {
      if (window.paypal && window.paypal.Buttons) {
        resolve(window.paypal);
      } else {
        script.remove();
        reject(new Error('PayPal SDK loaded without Buttons'));
      }
    };
    script.onerror = () => {
      script.remove();
      reject(new Error('PayPal SDK failed to load'));
    };
    document.head.appendChild(script);
  });
}

export function loadPaypalSdk() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('No window'));
  }
  if (!sdkPromise) {
    sdkPromise = injectOnce()
      .catch(() => delay(1200).then(injectOnce))
      .catch(() => delay(2500).then(injectOnce))
      .catch((err) => {
        sdkPromise = null;
        throw err;
      });
  }
  return sdkPromise;
}

// Renders a Buttons instance, retrying once with a fresh instance
// if the first render rejects (the button iframe occasionally
// fails its first spin-up).
export function renderPaypalButtons(paypal, options, container) {
  const attempt = () => paypal.Buttons(options).render(container);
  return attempt().catch(() => delay(1500).then(attempt));
}

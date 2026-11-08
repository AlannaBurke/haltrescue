import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {PRODUCTS} from '../data/products';
import styles from './checkout.module.css';

const SITE_URL = 'https://helpingalllittlethings.org';
const CART_KEY = 'haltCartV1';

// Same PayPal app as the product pages. The Client ID is a public
// identifier that belongs in the page code.
const PAYPAL_CLIENT_ID =
  'BAAiYr0r-y_hasJVi4FAnZzwYu4kFMSeaRJuM0NEg5YGMtzZdIimYWJkKEIX1q6U07dHTBkXVPkM0z0S8Y';
const PAYPAL_SDK_URL = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;

function productById(id) {
  return PRODUCTS.find((p) => p.id === String(id));
}

// Meta Shops sends buyers here with a products parameter, e.g.
// /checkout?products=170766470:1,170766864:1&coupon&cart_origin=meta_shops
// Each entry is a catalog content ID (the same IDs our product
// pages use) and a quantity. Parse it into cart lines.
function parseProductsParam(search) {
  const params = new URLSearchParams(search);
  const raw = params.get('products');
  if (!raw) {
    return null;
  }
  const lines = [];
  raw.split(',').forEach((entry) => {
    const [id, qtyRaw] = entry.split(':');
    const product = productById((id || '').trim());
    if (!product) {
      return;
    }
    const qty = Math.max(1, parseInt(qtyRaw, 10) || 1);
    const existing = lines.find((l) => l.product.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      lines.push({product, qty});
    }
  });
  return lines;
}

function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) {
      return [];
    }
    const stored = JSON.parse(raw);
    const lines = [];
    Object.keys(stored).forEach((id) => {
      const product = productById(id);
      const qty = Math.max(1, parseInt(stored[id], 10) || 1);
      if (product) {
        lines.push({product, qty});
      }
    });
    return lines;
  } catch (e) {
    return [];
  }
}

function storeCart(lines) {
  try {
    const stored = {};
    lines.forEach((l) => {
      stored[l.product.id] = l.qty;
    });
    window.localStorage.setItem(CART_KEY, JSON.stringify(stored));
  } catch (e) {
    // Storage can be unavailable (private browsing); the cart still
    // works for this visit.
  }
}

function loadPaypalSdk() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('No window'));
      return;
    }
    if (window.paypal) {
      resolve(window.paypal);
      return;
    }
    const onLoad = () => {
      if (window.paypal) {
        resolve(window.paypal);
      } else {
        reject(new Error('PayPal SDK unavailable'));
      }
    };
    const existing = document.querySelector(
      `script[src="${PAYPAL_SDK_URL}"]`,
    );
    if (existing) {
      existing.addEventListener('load', onLoad);
      existing.addEventListener('error', () =>
        reject(new Error('PayPal SDK failed to load')),
      );
      if (window.paypal) {
        resolve(window.paypal);
      }
      return;
    }
    const script = document.createElement('script');
    script.src = PAYPAL_SDK_URL;
    script.async = true;
    script.onload = onLoad;
    script.onerror = () => reject(new Error('PayPal SDK failed to load'));
    document.head.appendChild(script);
  });
}

function money(n) {
  return Number(n).toFixed(2);
}

function CartPaypalButtons({lines, total, onFailure}) {
  const containerRef = useRef(null);
  const renderedRef = useRef(false);
  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    let cancelled = false;
    let buttons = null;

    loadPaypalSdk()
      .then((paypal) => {
        if (cancelled || renderedRef.current || !containerRef.current) {
          return;
        }
        renderedRef.current = true;
        buttons = paypal.Buttons({
          createOrder: (data, actions) => {
            const current = linesRef.current;
            const items = current.map((l) => ({
              name: l.product.sheetName || l.product.name,
              quantity: String(l.qty),
              unit_amount: {
                currency_code: 'USD',
                value: money(l.product.price),
              },
            }));
            const itemTotal = current.reduce(
              (sum, l) => sum + l.product.price * l.qty,
              0,
            );
            const customId = current
              .map((l) => l.product.sheetName || l.product.name)
              .join(' | ')
              .slice(0, 127);
            return actions.order.create({
              purchase_units: [
                {
                  custom_id: customId,
                  amount: {
                    currency_code: 'USD',
                    value: money(itemTotal),
                    breakdown: {
                      item_total: {
                        currency_code: 'USD',
                        value: money(itemTotal),
                      },
                    },
                  },
                  items: items,
                },
              ],
              application_context: {
                shipping_preference: 'GET_FROM_FILE',
                brand_name: 'Helping All Little Things',
              },
            });
          },
          onApprove: (data, actions) =>
            actions.order.capture().then(() => {
              try {
                window.localStorage.removeItem(CART_KEY);
              } catch (e) {}
              window.location.href = `${SITE_URL}/order-thank-you`;
            }),
          onError: () => {
            if (!cancelled) {
              onFailure();
            }
          },
        });
        return buttons.render(containerRef.current);
      })
      .catch(() => {
        if (!cancelled) {
          onFailure();
        }
      });

    return () => {
      cancelled = true;
      if (buttons && typeof buttons.close === 'function') {
        buttons.close().catch(() => {});
      }
    };
    // The buttons read the live cart through linesRef at order
    // creation time, so they only render once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} />;
}

export default function Checkout() {
  const [lines, setLines] = useState(null);
  const [paypalFailed, setPaypalFailed] = useState(false);

  useEffect(() => {
    const fromParam = parseProductsParam(window.location.search);
    if (fromParam && fromParam.length) {
      setLines(fromParam);
      storeCart(fromParam);
    } else {
      setLines(readStoredCart());
    }
  }, []);

  const updateLines = (next) => {
    setLines(next);
    storeCart(next);
  };

  const setQty = (id, qty) => {
    if (qty < 1) {
      updateLines(lines.filter((l) => l.product.id !== id));
      return;
    }
    updateLines(
      lines.map((l) => (l.product.id === id ? {...l, qty} : l)),
    );
  };

  const total =
    lines === null
      ? 0
      : lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  return (
    <Layout
      title="Your Cart"
      description="Check out from the HALT Shop. Every purchase supports the animals of Helping All Little Things.">
      <main className="container margin-vert--lg">
        <div className={styles.wrap}>
          <h1>Your Cart</h1>
          {lines === null ? (
            <p>Loading your cart…</p>
          ) : lines.length === 0 ? (
            <>
              <p>Your cart is empty.</p>
              <p>
                <Link to="/shop">Browse the HALT Shop</Link> and add
                items from their pages, or tap a product in our
                Facebook shop to start a cart here.
              </p>
            </>
          ) : (
            <>
              <div className={styles.lines}>
                {lines.map((l) => (
                  <div className={styles.line} key={l.product.id}>
                    <img
                      className={styles.thumb}
                      src={l.product.image}
                      alt={l.product.name}
                    />
                    <div className={styles.lineMain}>
                      <span className={styles.lineName}>
                        {l.product.name}
                      </span>
                      <span className={styles.linePrice}>
                        ${money(l.product.price)} each
                      </span>
                      <span className={styles.qtyControls}>
                        <button
                          type="button"
                          aria-label="One fewer"
                          onClick={() => setQty(l.product.id, l.qty - 1)}>
                          −
                        </button>
                        <span className={styles.qty}>{l.qty}</span>
                        <button
                          type="button"
                          aria-label="One more"
                          onClick={() => setQty(l.product.id, l.qty + 1)}>
                          +
                        </button>
                        <button
                          type="button"
                          className={styles.remove}
                          onClick={() => setQty(l.product.id, 0)}>
                          Remove
                        </button>
                      </span>
                    </div>
                    <span className={styles.lineTotal}>
                      ${money(l.product.price * l.qty)}
                    </span>
                  </div>
                ))}
              </div>
              <p className={styles.total}>
                Total: ${money(total)}
                <span className={styles.shipNote}>
                  {' '}
                  Shipping is free.
                </span>
              </p>
              {paypalFailed ? (
                <p>
                  Online checkout is unavailable right now. You can
                  still buy each item on its own page in the{' '}
                  <Link to="/shop">HALT Shop</Link>.
                </p>
              ) : (
                <>
                  <CartPaypalButtons
                    lines={lines}
                    total={total}
                    onFailure={() => setPaypalFailed(true)}
                  />
                  <p className={styles.buyNote}>
                    Pay with PayPal or a debit or credit card. PayPal
                    will ask for the mailing address these items
                    should be sent to.
                  </p>
                </>
              )}
              <p className={styles.backLink}>
                <Link to="/shop">Continue shopping</Link>
              </p>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}

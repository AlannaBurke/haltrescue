import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {PRODUCTS} from '../data/products';
import {loadPaypalSdk, renderPaypalButtons} from '../lib/paypal';
import {trackMetaEvent} from '../lib/meta-pixel';
import styles from './checkout.module.css';

const SITE_URL = 'https://helpingalllittlethings.org';
const CART_KEY = 'haltCartV1';

// Same PayPal app as the product pages; the SDK is loaded (with
// retries) by the shared loader in src/lib/paypal.js.

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

function money(n) {
  return Number(n).toFixed(2);
}

// Signup thank-you code: 10% off the item total. One shared code,
// printed on the signup success screen and sent in the welcome text
// and welcome email.
const PROMO_CODE = 'WELCOME10';
const PROMO_RATE = 0.1;

function discountFor(itemTotal, code) {
  if (!code || code !== PROMO_CODE) {
    return 0;
  }
  return Math.round(itemTotal * PROMO_RATE * 100) / 100;
}

function CartPaypalButtons({lines, promoRef, onFailure}) {
  const containerRef = useRef(null);
  const renderedRef = useRef(false);
  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    let cancelled = false;

    loadPaypalSdk()
      .then((paypal) => {
        if (cancelled || renderedRef.current || !containerRef.current) {
          return;
        }
        renderedRef.current = true;
        let rendered = false;
        const options = {
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
            const discount = discountFor(itemTotal, promoRef.current);
            const breakdown = {
              item_total: {
                currency_code: 'USD',
                value: money(itemTotal),
              },
            };
            if (discount > 0) {
              breakdown.discount = {
                currency_code: 'USD',
                value: money(discount),
              };
            }
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
                    value: money(itemTotal - discount),
                    breakdown: breakdown,
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
            actions.order.capture().then((capture) => {
              const purchasedLines = linesRef.current;
              const purchaseTotal = purchasedLines.reduce(
                (sum, line) => sum + line.product.price * line.qty,
                0,
              );
              const chargedTotal =
                purchaseTotal -
                discountFor(purchaseTotal, promoRef.current);
              const paypalCaptureId = capture?.purchase_units?.[0]?.payments?.captures?.[0]?.id;
              trackMetaEvent(
                'Purchase',
                {
                  content_ids: purchasedLines.map((line) => line.product.id),
                  content_type: 'product',
                  contents: purchasedLines.map((line) => ({
                    id: line.product.id,
                    quantity: line.qty,
                    item_price: line.product.price,
                  })),
                  value: chargedTotal,
                  currency: 'USD',
                },
                paypalCaptureId ? `paypal-${paypalCaptureId}` : undefined,
              );
              try {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'purchase', {
                    transaction_id: paypalCaptureId || data.orderID,
                    value: chargedTotal,
                    currency: 'USD',
                    items: purchasedLines.map((line) => ({
                      item_id: line.product.id,
                      item_name: line.product.name,
                      price: line.product.price,
                      quantity: line.qty,
                    })),
                  });
                }
              } catch (e) {}
              try {
                window.localStorage.removeItem(CART_KEY);
              } catch (e) {}
              window.location.href = `${SITE_URL}/order-thank-you`;
            }),
          onError: () => {
            if (!cancelled && !rendered) {
              onFailure();
            }
          },
        };
        return renderPaypalButtons(
          paypal,
          options,
          containerRef.current,
        ).then(() => {
          rendered = true;
        });
      })
      .catch(() => {
        if (!cancelled) {
          onFailure();
        }
      });

    return () => {
      cancelled = true;
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
  const [promoInput, setPromoInput] = useState('');
  const [appliedCode, setAppliedCode] = useState(null);
  const [promoError, setPromoError] = useState('');
  const promoRef = useRef(null);
  promoRef.current = appliedCode;

  useEffect(() => {
    const fromParam = parseProductsParam(window.location.search);
    let initial;
    if (fromParam && fromParam.length) {
      initial = fromParam;
      setLines(fromParam);
      storeCart(fromParam);
      // Meta Shops pre-populates this cart, so track that cart addition here.
      const value = fromParam.reduce(
        (sum, line) => sum + line.product.price * line.qty,
        0,
      );
      trackMetaEvent('AddToCart', {
        content_ids: fromParam.map((line) => line.product.id),
        content_type: 'product',
        contents: fromParam.map((line) => ({
          id: line.product.id,
          quantity: line.qty,
          item_price: line.product.price,
        })),
        value,
        currency: 'USD',
      });
    } else {
      initial = readStoredCart();
      setLines(initial);
    }
    // A discount code can arrive in the URL (Meta Shops passes a
    // coupon parameter when a shopper comes from an offer there).
    const couponParam = new URLSearchParams(window.location.search).get(
      'coupon',
    );
    if (couponParam && couponParam.trim().toUpperCase() === PROMO_CODE) {
      setAppliedCode(PROMO_CODE);
    }
    // Reaching checkout with items is the standard InitiateCheckout event.
    if (initial && initial.length) {      trackMetaEvent('InitiateCheckout', {
        content_ids: initial.map((line) => line.product.id),
        content_type: 'product',
        contents: initial.map((line) => ({
          id: line.product.id,
          quantity: line.qty,
          item_price: line.product.price,
        })),
        value: initial.reduce(
          (sum, line) => sum + line.product.price * line.qty,
          0,
        ),
        currency: 'USD',
        num_items: initial.reduce((sum, line) => sum + line.qty, 0),
      });
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

  const applyPromo = () => {
    const entered = promoInput.trim().toUpperCase();
    if (entered === PROMO_CODE) {
      setAppliedCode(PROMO_CODE);
      setPromoError('');
    } else {
      setPromoError('That code was not recognized.');
    }
  };

  const removePromo = () => {
    setAppliedCode(null);
    setPromoInput('');
    setPromoError('');
  };

  const total =
    lines === null
      ? 0
      : lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const discount = discountFor(total, appliedCode);
  const grandTotal = total - discount;

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
              <div className={styles.promo}>
                {appliedCode ? (
                  <p className={styles.promoApplied}>
                    Code {appliedCode} applied, 10% off your order.{' '}
                    <button
                      type="button"
                      className={styles.promoRemove}
                      onClick={removePromo}>
                      Remove
                    </button>
                  </p>
                ) : (
                  <>
                    <span className={styles.promoRow}>
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Discount code"
                        aria-label="Discount code"
                      />
                      <button type="button" onClick={applyPromo}>
                        Apply
                      </button>
                    </span>
                    {promoError ? (
                      <p className={styles.promoError}>{promoError}</p>
                    ) : null}
                  </>
                )}
              </div>
              {discount > 0 ? (
                <>
                  <p className={styles.subtotal}>
                    Subtotal: ${money(total)}
                  </p>
                  <p className={styles.subtotal}>
                    Discount ({appliedCode}): -${money(discount)}
                  </p>
                </>
              ) : null}
              <p className={styles.total}>
                Total: ${money(grandTotal)}
                <span className={styles.shipNote}>
                  {' '}
                  Shipping is free.
                </span>
              </p>
              {paypalFailed ? (
                <div>
                  <p>
                    Online checkout is unavailable right now. You can
                    still buy these items on Patreon:
                  </p>
                  <ul>
                    {lines.map((l) => (
                      <li key={l.product.id}>
                        <a
                          href={l.product.buyUrl}
                          target="_blank"
                          rel="noopener noreferrer">
                          {l.product.name} on Patreon
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <CartPaypalButtons
                    lines={lines}
                    promoRef={promoRef}
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

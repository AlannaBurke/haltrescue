import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {PRODUCTS} from '../data/products';
import styles from './ProductPage.module.css';

const SITE_URL = 'https://helpingalllittlethings.org';

// PayPal Smart Buttons. The Client ID is a public identifier that
// belongs in the page code. The order carries the product's
// sheetName both as the item name and as the purchase unit's
// custom_id, so the rescue's order listener can match each payment
// to the right item in its records.
const PAYPAL_CLIENT_ID =
  'BAAiYr0r-y_hasJVi4FAnZzwYu4kFMSeaRJuM0NEg5YGMtzZdIimYWJkKEIX1q6U07dHTBkXVPkM0z0S8Y';
const PAYPAL_SDK_URL = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;

function productDescription(product) {
  return (
    `${product.name}. Sold by Helping All Little Things, an ` +
    'all-volunteer 501(c)(3) rescue, sanctuary and education ' +
    'organization for small animals. A physical item, mailed to you ' +
    "after purchase. All proceeds support the rescue's 200+ animals " +
    'and its education and prevention work.'
  );
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
    script.onerror = () =>
      reject(new Error('PayPal SDK failed to load'));
    document.head.appendChild(script);
  });
}

function PaypalBuyButtons({product, onFailure}) {
  const containerRef = useRef(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let buttons = null;
    const itemName = product.sheetName || product.name;
    const price = Number(product.price).toFixed(2);

    loadPaypalSdk()
      .then((paypal) => {
        if (cancelled || renderedRef.current || !containerRef.current) {
          return;
        }
        renderedRef.current = true;
        buttons = paypal.Buttons({
          createOrder: (data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  custom_id: itemName,
                  amount: {
                    currency_code: 'USD',
                    value: price,
                    breakdown: {
                      item_total: {
                        currency_code: 'USD',
                        value: price,
                      },
                    },
                  },
                  items: [
                    {
                      name: itemName,
                      quantity: '1',
                      unit_amount: {
                        currency_code: 'USD',
                        value: price,
                      },
                    },
                  ],
                },
              ],
              application_context: {
                shipping_preference: 'GET_FROM_FILE',
                brand_name: 'Helping All Little Things',
              },
            }),
          onApprove: (data, actions) =>
            actions.order.capture().then(() => {
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
  }, [product, onFailure]);

  return <div ref={containerRef} />;
}

export default function ProductPage({productId}) {
  const product = PRODUCTS.find((p) => p.id === String(productId));
  const [paypalFailed, setPaypalFailed] = useState(false);

  if (!product) {
    return (
      <Layout title="Product not found">
        <main className="container margin-vert--lg">
          <div className={styles.wrap}>
            <h1>Product not found</h1>
            <p>
              <Link to="/shop">Back to the HALT Shop</Link>
            </p>
          </div>
        </main>
      </Layout>
    );
  }

  const description = productDescription(product);
  const pageUrl = `${SITE_URL}/shop/${product.id}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `${SITE_URL}${product.image}`,
    url: pageUrl,
    description: description,
    category: product.category,
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <Layout title={product.name} description={description}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script src={PAYPAL_SDK_URL} async />
      </Head>
      <main className="container margin-vert--lg">
        <div className={styles.wrap}>
          <h1>{product.name}</h1>
          <img
            className={styles.photo}
            src={product.image}
            alt={product.name}
          />
          <p className={styles.price}>${product.price}</p>
          <p className={styles.category}>{product.category}</p>
          <p>{description}</p>
          {paypalFailed ? (
            <>
              <p>
                <a
                  className={styles.buyButton}
                  href={product.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Buy on Patreon
                </a>
              </p>
              <p className={styles.buyNote}>
                You will complete your purchase on Patreon.
              </p>
            </>
          ) : (
            <>
              <PaypalBuyButtons
                product={product}
                onFailure={() => setPaypalFailed(true)}
              />
              <p className={styles.buyNote}>
                Pay with PayPal or a debit or credit card. Shipping is
                free.
              </p>
            </>
          )}
          <p className={styles.backLink}>
            <Link to="/shop">Back to the HALT Shop</Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}

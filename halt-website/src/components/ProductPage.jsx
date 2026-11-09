import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {PRODUCTS} from '../data/products';
import styles from './ProductPage.module.css';

const SITE_URL = 'https://helpingalllittlethings.org';

// Product pages are cart-only (user decision 2026-11-08): the buy
// action is Add to Cart, which takes the buyer to /checkout, plus
// a small Buy on Patreon link underneath. All PayPal checkout
// happens on the cart page.

function productDescription(product) {
  return (
    `${product.name}. Sold by Helping All Little Things, an ` +
    'all-volunteer 501(c)(3) rescue, sanctuary and education ' +
    'organization for small animals. A physical item, mailed to you ' +
    "after purchase. All proceeds support the rescue's 200+ animals " +
    'and its education and prevention work.'
  );
}

export default function ProductPage({productId}) {
  const product = PRODUCTS.find((p) => p.id === String(productId));

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
          {product.description
            .split('\n\n')
            .map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          <p>
            <button
              type="button"
              className={styles.buyButton}
              onClick={() => {
                try {
                  const raw = window.localStorage.getItem('haltCartV1');
                  const stored = raw ? JSON.parse(raw) : {};
                  stored[product.id] =
                    (parseInt(stored[product.id], 10) || 0) + 1;
                  window.localStorage.setItem(
                    'haltCartV1',
                    JSON.stringify(stored),
                  );
                } catch (e) {}
                window.location.href = '/checkout';
              }}>
              Add to Cart
            </button>
          </p>
          <p className={styles.buyNote}>
            Checkout with PayPal or a debit or credit card on the next
            page. Shipping is free.
          </p>
          <p className={styles.buyNote}>
            <a
              href={product.buyUrl}
              target="_blank"
              rel="noopener noreferrer">
              Buy on Patreon
            </a>
          </p>
          <p className={styles.backLink}>
            <Link to="/shop">Back to the HALT Shop</Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}

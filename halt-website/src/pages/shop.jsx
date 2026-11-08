import React, {useState} from 'react';
import Layout from '@theme/Layout';
import styles from './shop.module.css';
import {PRODUCTS} from '../data/products';

// Product data lives in src/data/products.js, shared with the
// individual product pages under /shop/<id>. Clicking an item in
// the grid opens its product page here on the site, where the
// buyer checks out with PayPal.
const CATEGORIES = ['All', 'Prints', 'Stickers'];

function ProductCard({product}) {
  return (
    <a className={styles.card} href={`/shop/${product.id}`}>
      <span className={styles.cardImgWrap}>
        <img
          className={styles.cardImg}
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </span>
      <span className={styles.cardName}>{product.name}</span>
      <span className={styles.cardPrice}>${product.price}</span>
    </a>
  );
}

export default function Shop() {
  const [category, setCategory] = useState('All');
  const visible =
    category === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

  return (
    <Layout
      title="HALT Shop"
      description="Shop prints and stickers from Helping All Little Things. Every purchase supports veterinary care, food, bedding, and enrichment for 200+ rescued small animals.">
      <main className="container margin-vert--lg">
        <div className={styles.wrap}>
          <h1>HALT Shop</h1>
          <p>
            Every purchase supports veterinary care, specialized diets,
            medications, and enrichment for the small animals of Helping
            All Little Things. Click any item to open its page, where
            you can check out with PayPal.
          </p>
          <p>
            Prints are 5x7, pre-matted, and ready to frame, on premium
            uncoated cover stock.
          </p>
          <p>
            Buying more than one item? Open an item and use Add to
            Cart, then check out once from{' '}
            <a href="/checkout">your cart</a>.
          </p>

          <div className={styles.filters}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={
                  category === c
                    ? `${styles.filterBtn} ${styles.filterBtnActive}`
                    : styles.filterBtn
                }
                onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <p className={styles.note}>
            Looking for more ways to support the animals? Visit our{' '}
            <a href="/donate">donate page</a>.
          </p>
        </div>
      </main>
    </Layout>
  );
}

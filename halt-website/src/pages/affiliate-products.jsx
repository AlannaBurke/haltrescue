import React, {useState} from 'react';
import Layout from '@theme/Layout';
import shopStyles from './shop.module.css';
import styles from './affiliate-products.module.css';
import {ENDORSED, CHEWY_STOREFRONT} from '../data/endorsed';

// HALT Affiliate Products: products the rescue uses and endorses.
// Each card shows the product photo and name, with a button for
// every store where buying it supports the rescue through an
// affiliate program. Buttons are listed in the order that helps
// the rescue most: Chewy (10% through Chewpanions) first, then
// Exotic Nutrition (5%), then Amazon once that storefront exists.

const CATEGORIES = ['All', 'Small Animals', 'Cats', 'Dogs', 'Cleaning'];

function StoreButtons({product}) {
  return (
    <span className={styles.buttons}>
      {product.chewy && (
        <a
          className={styles.storeBtn}
          href={CHEWY_STOREFRONT}
          target="_blank"
          rel="noopener noreferrer">
          <img src="/img/logos/chewy.svg" alt="" />
          Chewy
        </a>
      )}
      {product.exoticUrl && (
        <a
          className={styles.storeBtn}
          href={product.exoticUrl}
          target="_blank"
          rel="noopener noreferrer">
          <span className={styles.exoticDot}>EN</span>
          Exotic Nutrition
        </a>
      )}
      {product.amazonUrl && (
        <a
          className={styles.storeBtn}
          href={product.amazonUrl}
          target="_blank"
          rel="noopener noreferrer">
          <img src="/img/logos/amazon.svg" alt="" />
          Amazon
        </a>
      )}
    </span>
  );
}

function ProductCard({product}) {
  return (
    <div className={shopStyles.card}>
      <span className={shopStyles.cardImgWrap}>
        <img
          className={shopStyles.cardImg}
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </span>
      <span className={shopStyles.cardName}>{product.name}</span>
      <StoreButtons product={product} />
    </div>
  );
}

export default function AffiliateProducts() {
  const [category, setCategory] = useState('All');
  const visible =
    category === 'All'
      ? ENDORSED
      : ENDORSED.filter((p) => p.category === category);

  return (
    <Layout
      title="HALT Affiliate Products"
      description="Products Helping All Little Things uses and endorses. Buy them through our links and a commission supports the animals, at no extra cost to you.">
      <main className="container margin-vert--lg">
        <div className={shopStyles.wrap}>
          <h1>HALT Affiliate Products</h1>
          <p>
            These are products our team actually uses with the animals and
            is happy to endorse. When you buy through a button on this
            page, the seller pays Helping All Little Things a small
            commission. It never changes the price you pay, and it helps
            cover food, bedding, and veterinary care for 200+ small
            animals.
          </p>
          <p>
            Each product shows the stores where it helps us most first.
            Our own prints and stickers are in the{' '}
            <a href="/shop">HALT Shop</a>.
          </p>

          <div className={shopStyles.filters}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={
                  shopStyles.filterBtn +
                  (category === c ? ' ' + shopStyles.filterBtnActive : '')
                }
                onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className={shopStyles.grid}>
            {visible.map((p) => (
              <ProductCard key={p.name} product={p} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

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
          href={product.chewyUrl || CHEWY_STOREFRONT}
          target="_blank"
          rel="noopener noreferrer">
          <img
            className={styles.logoWord}
            src="/img/logos/chewy-logo.svg"
            alt="Chewy"
          />
        </a>
      )}
      {product.exoticUrl && (
        <a
          className={styles.storeBtn}
          href={product.exoticUrl}
          target="_blank"
          rel="noopener noreferrer">
          <img
            className={styles.logoEn}
            src="/img/logos/exotic-nutrition-logo.png"
            alt="Exotic Nutrition"
          />
        </a>
      )}
      {product.amazonUrl ? (
        <a
          className={styles.storeBtn}
          href={product.amazonUrl}
          target="_blank"
          rel="noopener noreferrer">
          <img
            className={styles.logoWord}
            src="/img/logos/amazon-logo.png"
            alt="Amazon"
          />
        </a>
      ) : (
        <span className={`${styles.storeBtn} ${styles.storeBtnSoon}`}>
          <img
            className={styles.logoWord}
            src="/img/logos/amazon-logo.png"
            alt="Amazon"
          />
        </span>
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

          <div className={styles.deals}>
            <h2>Our affiliate deals</h2>
            <p>
              When you shop through the buttons on this page, the store
              pays us a small commission at no extra cost to you, and it
              usually counts for everything in your order, not just the
              item you clicked. Buying the same day you click always
              helps. The buttons under each product are listed in order
              of the best commission for us, based on where that product
              is sold.
            </p>
            <p>
              Coming soon: PetSmart, Walmart, Target, and Petco. Their
              buttons will appear here as we are approved.
            </p>
          </div>

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

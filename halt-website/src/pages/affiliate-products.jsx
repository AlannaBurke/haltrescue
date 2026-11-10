import React, {useState} from 'react';
import Layout from '@theme/Layout';
import shopStyles from './shop.module.css';
import styles from './affiliate-products.module.css';
import {ENDORSED} from '../data/endorsed';
import {amazonUrlForProduct} from '../data/amazon-links';

// HALT Affiliate Products: endorsed products with store links provided by the rescue.
const CATEGORIES = ['All', 'Small Animals', 'Cats', 'Dogs', 'Cleaning'];

function StoreButtons({product}) {
  const amazonUrl = amazonUrlForProduct(product.name);
  return (
    <span className={styles.buttons}>
      {product.chewy && (
        <a
          className={styles.storeBtn}
          href={product.chewyUrl || 'https://chewpanions.chewy.com/840da941987'}
          target="_blank"
          rel="noopener noreferrer">
          <img
            className={styles.logoWord}
            src="/img/logos/chewy-logo.svg"
            alt="Chewy"
          />
        </a>
      )}
      {amazonUrl && (
        <a
          className={styles.storeBtn}
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer">
          <img
            className={styles.logoWord}
            src="/img/logos/amazon-logo.png"
            alt="Amazon"
          />
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
  const eligible = ENDORSED.filter(
    (product) => product.name !== 'Oxbow Critical Care Herbivore Apple-Banana, 141-gm bag',
  );
  const visible =
    category === 'All'
      ? eligible
      : eligible.filter((product) => product.category === category);

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
            {visible.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>

          <p style={{textAlign: 'center', marginTop: '2rem'}}>
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </div>
      </main>
    </Layout>
  );
}

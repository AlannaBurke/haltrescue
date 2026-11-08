import React from 'react';
import Layout from '@theme/Layout';
import styles from './shop.module.css';

// HALT Affiliate Products: products the rescue uses and endorses,
// bought through affiliate links so a commission supports the
// animals at no extra cost to the buyer. Programs are being joined
// now; each endorsed product gets an entry here with its photo, a
// line about why the rescue likes it, and its buying link.
export default function AffiliateProducts() {
  return (
    <Layout
      title="HALT Affiliate Products"
      description="Products Helping All Little Things uses and endorses. Buy them through our links and a commission supports the animals, at no extra cost to you.">
      <main className="container margin-vert--lg">
        <div className={styles.wrap}>
          <h1>HALT Affiliate Products</h1>
          <p>
            These are products our team actually uses with the animals and
            is happy to endorse. When you buy through a link on this page,
            the seller pays Helping All Little Things a small commission.
            It never changes the price you pay, and it helps cover food,
            bedding, and veterinary care for 200+ small animals.
          </p>
          <p>
            We are setting up our first affiliate partnerships now, and our
            first picks will appear here soon. Check back, and in the
            meantime our <a href="/shop">HALT Shop</a> is open.
          </p>
        </div>
      </main>
    </Layout>
  );
}

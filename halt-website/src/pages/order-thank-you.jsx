import React from 'react';
import Layout from '@theme/Layout';
import styles from './donate.module.css';

export default function OrderThankYou() {
  return (
    <Layout
      title="Thank You for Your Order"
      description="Thank you for your order from the Helping All Little Things shop.">
      <main className="container margin-vert--lg">
        <div className={styles.wrap}>
          <h1>Thank you for your order</h1>
          <p>
            Your payment was completed through PayPal, and PayPal will
            email your receipt. Your item is printed to order and mailed
            to the address you gave at checkout. Shipping is free.
          </p>
          <p>
            Questions about an order: email{' '}
            <a href="mailto:admin@helpingalllittlethings.org">
              admin@helpingalllittlethings.org
            </a>
            .
          </p>
          <p className={styles.thankYou}>
            Every purchase supports food, bedding, and veterinary care
            for the 200+ small animals at Helping All Little Things.
            <br />
            <a href="/shop">Back to the HALT Shop</a>
          </p>
        </div>
      </main>
    </Layout>
  );
}

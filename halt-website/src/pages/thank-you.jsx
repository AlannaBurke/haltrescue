import React from 'react';
import Layout from '@theme/Layout';
import AmplyMatchWidget from '../components/AmplyMatchWidget';
import styles from './donate.module.css';

export default function ThankYou() {
  return (
    <Layout
      title="Thank You"
      description="Thank you for donating to Helping All Little Things. Check whether your employer will match your gift and double it.">
      <main className="container margin-vert--lg">
        <div className={styles.wrap}>
          <h1>Thank you!</h1>
          <p>
            Thank you for your payment. Your transaction has been completed,
            and a receipt for your donation has been emailed to you. If you
            paid through PayPal, you can also log into your PayPal account to
            view the transaction details.
          </p>
          <p>
            Your gift goes straight to food, bedding, and veterinary care for
            the 200+ small animals at Helping All Little Things. We are so
            grateful.
          </p>

          <h2>One more thing: your gift might be doubled</h2>
          <p>
            Many employers match their employees' donations, and it takes
            less than a minute to check. A match means twice the hay, twice
            the bedding, and twice the vet care, at no extra cost to you.
            Search for your employer below:
          </p>
          <div className={styles.matchWrap}>
            <AmplyMatchWidget />
          </div>
          <p className={styles.formFallback}>
            Matching gifts are handled through DonateDouble. If your employer
            matches, their instructions will appear with the search results.
          </p>

          <p className={styles.thankYou}>
            Want to do even more?{' '}
            <a href="/donate">Give again or set up a monthly gift</a>, or
            share our rescue with a friend who loves little animals.
          </p>
        </div>
      </main>
    </Layout>
  );
}

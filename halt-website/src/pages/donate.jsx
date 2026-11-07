import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import AmplyMatchWidget from '../components/AmplyMatchWidget';
import styles from './donate.module.css';

// Alternative ways to give. These use the exact links already used in the
// footer and the blog "Support Us" box, so donors always land in the
// right place. Note: the real Venmo account is @haltrescue; haltrescue_
// is an imposter, which is why the button links to the account directly.
const ALT_LINKS = [
  {
    label: 'PayPal',
    mark: 'PP',
    href: 'https://www.paypal.com/ncp/payment/8SJFNZQVMQ452',
  },
  {
    label: 'Cash App',
    mark: '$',
    href: 'https://cash.app/$Haltrescue',
  },
  {
    label: 'Venmo',
    mark: 'V',
    href: 'https://account.venmo.com/u/haltrescue',
  },
];

// Monthly giving options. Facebook fundraising tools are still in review,
// so the Facebook option points at Page subscriptions for now and can be
// swapped to a Donate link once Meta approves the application.
const MONTHLY_LINKS = [
  {
    label: 'Patreon',
    mark: 'P',
    href: 'https://www.patreon.com/cw/helpingalllittlethingsrescue',
  },
  {
    label: 'Facebook',
    mark: 'f',
    href: 'https://www.facebook.com/HALTRescue/',
  },
];

function LinkButtons({links}) {
  return (
    <div className={styles.circleGroup}>
      {links.map(({label, mark, href}) => (
        <a
          key={href}
          className={styles.optionItem}
          href={href}
          target="_blank"
          rel="noopener noreferrer">
          <span className={styles.circleBtn}>{mark}</span>
          <span className={styles.optionLabel}>{label}</span>
        </a>
      ))}
    </div>
  );
}

export default function Donate() {
  return (
    <Layout
      title="Donate"
      description="Donate to Helping All Little Things, an all-volunteer 501(c)(3) rescue, education, and sanctuary for small animals.">
      <Head>
        <script
          async
          src="https://widgets.givebutter.com/latest.umd.cjs?acct=CMsaQJwAtduUNSQI&p=other"
        />
      </Head>
      <main className="container margin-vert--lg">
        <div className={styles.wrapWide}>
          <h1>Donate</h1>
          <p>
            Helping All Little Things is an all-volunteer 501(c)(3) rescue,
            sanctuary and educator on small animals, caring for 200+ guinea
            pigs, hamsters, cats, rabbits, and other small animals. Your gift
            buys food and bedding, covers veterinary care, and supports the
            education and prevention work that keeps small animals out of
            crisis. Thank you for helping all little things.
          </p>

          <div className={styles.giveGrid}>
            <div className={styles.formWrap}>
              <givebutter-widget id="pEZ2vX"></givebutter-widget>
              <p className={styles.formFallback}>
                If the form does not load, you can also give on our{' '}
                <a
                  href="https://givebutter.com/help-rescue-200-small-animals-this-year-tbw2xo"
                  target="_blank"
                  rel="noopener noreferrer">
                  Givebutter campaign page
                </a>
                .
              </p>
            </div>

            <div className={styles.sideCol}>
              <div className={styles.sideSection}>
                <h2>Give another way</h2>
                <LinkButtons links={ALT_LINKS} />
                <div className={styles.checkBlock}>
                  <h3>Mail a Check</h3>
                  <p>
                    Checks payable to{' '}
                    <strong>Helping All Little Things</strong>: PO Box 11,
                    Deerfield, NH 03037
                  </p>
                </div>
              </div>

              <div className={styles.sideSection}>
                <h2>Support us monthly</h2>
                <LinkButtons links={MONTHLY_LINKS} />
              </div>
            </div>
          </div>

          <h2>Could your gift be doubled?</h2>
          <div className={styles.matchWrap}>
            <AmplyMatchWidget />
          </div>
          <p>
            Many employers match donations made by their employees, which can
            double your gift to the animals at no extra cost to you. Search
            for your employer above to see if your gift qualifies and how to
            submit it for a match.
          </p>

          <p className={styles.thankYou}>
            Thank you for helping all little things. Every gift, in any amount,
            goes directly to the care and comfort of the animals.
          </p>
        </div>
      </main>
    </Layout>
  );
}

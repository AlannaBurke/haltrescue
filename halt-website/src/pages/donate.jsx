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
    href: 'https://www.paypal.com/ncp/payment/8SJFNZQVMQ452',
  },
  {
    label: 'Venmo',
    sublabel: '@haltrescue',
    href: 'https://account.venmo.com/u/haltrescue',
  },
  {
    label: 'Cash App',
    sublabel: '$Haltrescue',
    href: 'https://cash.app/$Haltrescue',
  },
];

// Monthly giving options. Facebook fundraising tools are still in review,
// so the Facebook option points at Page subscriptions for now and can be
// swapped to a Donate link once Meta approves the application.
const MONTHLY_LINKS = [
  {
    label: 'Patreon',
    sublabel: 'Monthly support',
    href: 'https://www.patreon.com/cw/helpingalllittlethingsrescue',
  },
  {
    label: 'Givebutter',
    sublabel: 'One-time or monthly',
    href: 'https://givebutter.com/help-rescue-200-small-animals-this-year-tbw2xo',
  },
  {
    label: 'Facebook',
    sublabel: 'Subscribe on Facebook',
    href: 'https://www.facebook.com/HALTRescue/',
  },
];

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
        <div className={styles.wrap}>
          <h1>Donate</h1>
          <p>
            Helping All Little Things is an all-volunteer 501(c)(3) rescue,
            sanctuary and educator on small animals, caring for 200+ guinea
            pigs, hamsters, cats, rabbits, and other small animals. Your gift
            buys food and bedding, covers veterinary care, and supports the
            education and prevention work that keeps small animals out of
            crisis. Thank you for helping all little things.
          </p>

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

          <h2>Could your gift be doubled?</h2>
          <p>
            Many employers match donations made by their employees, which can
            double your gift to the animals at no extra cost to you. Search
            for your employer below to see if your gift qualifies and how to
            submit it for a match.
          </p>
          <div className={styles.matchWrap}>
            <AmplyMatchWidget />
          </div>
          <p className={styles.formFallback}>
            Matching gifts are handled through DonateDouble. If your employer
            matches, their instructions will appear with the search results.
          </p>

          <h2>Give monthly</h2>
          <p>
            Monthly supporters give the animals steady food, bedding, and
            care all year long. Join through whichever service you like best:
          </p>
          <div className={styles.altGroup}>
            {MONTHLY_LINKS.map(({label, sublabel, href}) => (
              <a
                key={href}
                className={styles.altBtn}
                href={href}
                target="_blank"
                rel="noopener noreferrer">
                <span className={styles.altLabel}>{label}</span>
                {sublabel && (
                  <span className={styles.altSublabel}>{sublabel}</span>
                )}
              </a>
            ))}
          </div>

          <h2>Prefer to give another way?</h2>
          <div className={styles.altGroup}>
            {ALT_LINKS.map(({label, sublabel, href}) => (
              <a
                key={href}
                className={styles.altBtn}
                href={href}
                target="_blank"
                rel="noopener noreferrer">
                <span className={styles.altLabel}>{label}</span>
                {sublabel && (
                  <span className={styles.altSublabel}>{sublabel}</span>
                )}
              </a>
            ))}
          </div>
          <p className={styles.warning}>
            Venmo: watch for imposters. We are <strong>@haltrescue</strong>,
            not haltrescue_. Please use the button above to reach the real
            account.
          </p>
          <p>
            After you give, stop by our <a href="/thank-you">thank-you page</a>{' '}
            to check whether your employer will match your gift and double
            it.
          </p>

          <div className={styles.checkBlock}>
            <h3>Mail a Check</h3>
            <p>
              Checks payable to <strong>Helping All Little Things</strong>:
            </p>
            <address className={styles.address}>
              Helping All Little Things
              <br />
              PO Box 11
              <br />
              Deerfield, NH 03037
            </address>
          </div>

          <p className={styles.thankYou}>
            Thank you for helping all little things. Every gift, in any amount,
            goes directly to the care and comfort of the animals.
          </p>
        </div>
      </main>
    </Layout>
  );
}

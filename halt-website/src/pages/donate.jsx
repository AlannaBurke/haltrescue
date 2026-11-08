import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import AmplyMatchWidget from '../components/AmplyMatchWidget';
import styles from './donate.module.css';

// Alternative ways to give, shown with the same logo buttons the site
// footer uses (same icon files, brand colors, and destinations, from
// halt-website/src/theme/Footer/Layout). Note: the real Venmo account
// is @haltrescue; haltrescue_ is an imposter, which is why the button
// links to the account directly. Facebook fundraising tools are still
// in review, so the Facebook button points at the Page for now and can
// be swapped to a Donate link once Meta approves the application.
const ALT_LINKS = [
  {
    label: 'PayPal',
    icon: '/img/logos/paypal.svg',
    bg: '#003087',
    href: 'https://www.paypal.com/ncp/payment/8SJFNZQVMQ452',
  },
  {
    label: 'CashApp',
    icon: '/img/logos/cashapp.svg',
    bg: '#00D632',
    href: 'https://cash.app/$Haltrescue',
  },
  {
    label: 'Venmo',
    icon: '/img/logos/venmo.svg',
    bg: '#008CFF',
    href: 'https://account.venmo.com/u/haltrescue',
  },
  {
    label: 'Patreon',
    icon: '/img/logos/patreon.svg',
    bg: '#FF424D',
    href: 'https://www.patreon.com/cw/helpingalllittlethingsrescue',
  },
  {
    label: 'Facebook',
    icon: '/img/logos/facebook.svg',
    bg: '#1877F2',
    href: 'https://www.facebook.com/HALTRescue/',
  },
];

function LinkButtons({links}) {
  return (
    <div className={styles.logoGrid}>
      {links.map(({label, icon, bg, href}) => (
        <a
          key={href}
          className={styles.logoBtn}
          href={href}
          aria-label={label}
          title={label}
          target="_blank"
          rel="noopener noreferrer">
          <span className={styles.logoBtnIcon} style={{background: bg}}>
            <img
              src={icon}
              alt=""
              className={styles.logoBtnImg}
              aria-hidden="true"
            />
          </span>
          <span className={styles.logoBtnLabel}>{label}</span>
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
              <h2>Give another way</h2>
              <LinkButtons links={ALT_LINKS} />
              <div className={styles.checkBlock}>
                <h3>Mail a Check</h3>
                <p>
                  Checks payable to <strong>Helping All Little Things</strong>:
                  PO Box 11, Deerfield, NH 03037
                </p>
              </div>

              <div className={styles.doubledBlock}>
                <h2>Could your gift be doubled?</h2>
                <div className={styles.matchWrap}>
                  <AmplyMatchWidget />
                </div>
                <p>
                  Many employers match donations made by their employees,
                  which can double your gift to the animals at no extra cost
                  to you. Search for your employer above to see if your gift
                  qualifies and how to submit it for a match.
                </p>
              </div>
            </div>
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

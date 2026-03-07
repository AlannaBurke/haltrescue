import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// ─── Social links with logo icons ───────────────────────────────────────────
const SOCIAL_LINKS = [
  { label: 'Facebook',    href: 'https://www.facebook.com/HALTRescue/',                          logo: '/img/logos/facebook.svg',    bg: '#1877F2' },
  { label: 'Instagram',   href: 'https://www.instagram.com/helpingalllittlethings/',              logo: '/img/logos/instagram.svg',   bg: '#E1306C' },
  { label: 'TikTok',      href: 'https://www.tiktok.com/@helpingalllittlethings',                 logo: '/img/logos/tiktok.svg',      bg: '#010101' },
  { label: 'YouTube',     href: 'https://www.youtube.com/@HelpingAllLittleThings',               logo: '/img/logos/youtube.svg',     bg: '#FF0000' },
  { label: 'Threads',     href: 'https://www.threads.com/@helpingalllittlethings',               logo: '/img/logos/threads.svg',     bg: '#101010' },
  { label: 'BlueSky',     href: 'https://bsky.app/profile/haltrescue.bsky.social',               logo: '/img/logos/bluesky.svg',     bg: '#0085FF' },
  { label: 'Mastodon',    href: 'https://mstdn.social/@haltrescue',                              logo: '/img/logos/mastodon.svg',    bg: '#6364FF' },
  { label: 'Newsletter',  href: 'https://subscribepage.io/halt',                                  logo: '/img/logos/newsletter.svg',  bg: '#0f8a93' },
];

// ─── Donate links with logo icons ────────────────────────────────────────────
const DONATE_LINKS = [
  { label: 'PayPal',          href: 'https://www.paypal.com/ncp/payment/8SJFNZQVMQ452',                                  logo: '/img/logos/paypal.svg',   bg: '#003087' },
  { label: 'Venmo',           href: 'https://account.venmo.com/u/haltrescue',                                            logo: '/img/logos/venmo.svg',    bg: '#008CFF' },
  { label: 'CashApp',         href: 'https://cash.app/$Haltrescue',                                                       logo: '/img/logos/cashapp.svg',  bg: '#00D632' },
  { label: 'Amazon Wish List',href: 'https://bit.ly/halt-piggies',                                                        logo: '/img/logos/amazon.svg',   bg: '#FF9900' },
  { label: 'Chewy Wish List', href: 'https://www.chewy.com/g/helping-all-little-things_b129784992',                      logo: '/img/logos/chewy.svg',    bg: '#0075C9' },
];

// ─── Rescue links ─────────────────────────────────────────────────────────────
const RESCUE_LINKS = [
  { label: 'Adoption/Foster Application', href: 'https://bit.ly/halt-adoption' },
  { label: 'Surrender a Pet',             href: 'https://bit.ly/halt-surrender' },
  { label: 'Petfinder',                   href: 'https://www.petfinder.com/member/us/nh/deerfield/helping-all-little-pipsqueaks-nj654/' },
];

function LogoButton({ label, href, logo, bg }) {
  return (
    <a
      href={href}
      className={styles.logoBtn}
      aria-label={label}
      title={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.logoBtnIcon} style={{ background: bg }}>
        <img src={logo} alt="" className={styles.logoBtnImg} aria-hidden="true" />
      </span>
      <span className={styles.logoBtnLabel}>{label}</span>
    </a>
  );
}

export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      {/* Top wave */}
      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0a5c63" />
        </svg>
      </div>

      <div className={styles.inner}>
        {/* Brand row */}
        <div className={styles.brandRow}>
          <a href="/" className={styles.brandLink} aria-label="Helping All Little Things — home">
            <img
              src="/img/logo-square.png"
              alt="HALT Rescue logo"
              className={styles.brandLogo}
            />
          </a>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Helping All Little Things</span>
            <span className={styles.brandTagline}>Small animal rescue &amp; education · 501(c)(3) non-profit</span>
          </div>
        </div>

        {/* Three-column links */}
        <div className={styles.columns}>
          {/* Rescue column */}
          <div className={styles.column}>
            <h3 className={styles.colTitle}>Rescue</h3>
            <ul className={styles.linkList}>
              {RESCUE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={styles.textLink} target="_blank" rel="noopener noreferrer">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Donate column */}
          <div className={styles.column}>
            <h3 className={styles.colTitle}>Donate &amp; Wish Lists</h3>
            <div className={styles.logoGrid}>
              {DONATE_LINKS.map((item) => (
                <LogoButton key={item.href} {...item} />
              ))}
              <a
                href="https://giftcards.shopmarketbasket.com/products/mb-gift-card-fresh-produce"
                className={styles.veggieLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                🥬 Gift Card for Veggies
              </a>
            </div>
          </div>

          {/* Follow column */}
          <div className={styles.column}>
            <h3 className={styles.colTitle}>Follow Us</h3>
            <div className={styles.logoGrid}>
              {SOCIAL_LINKS.map((item) => (
                <LogoButton key={item.href} {...item} />
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <span>{copyright || `Copyright © ${new Date().getFullYear()} Helping All Little Things.`}</span>
        </div>
      </div>
    </footer>
  );
}

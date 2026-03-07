import React from 'react';
import styles from './styles.module.css';

/**
 * SupportUs — a beautifully styled "Support Our Rescue Work" section.
 *
 * Drop this at the end of any blog post or doc page with a single line:
 *
 *   <SupportUs />
 *
 * No imports needed — it's registered globally in src/theme/MDXComponents.js
 */

/** Reusable icon-badge button — matches the footer's LogoButton pattern */
function IconBtn({ label, href, logo, bg, sublabel }) {
  return (
    <a
      href={href}
      className={styles.iconBtn}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <span className={styles.iconBtnCircle} style={{ background: bg }}>
        <img src={logo} alt="" className={styles.iconBtnImg} aria-hidden="true" />
      </span>
      <span className={styles.iconBtnText}>
        <span className={styles.iconBtnLabel}>{label}</span>
        {sublabel && <span className={styles.iconBtnSublabel}>{sublabel}</span>}
      </span>
    </a>
  );
}

export default function SupportUs() {
  return (
    <aside className={styles.wrapper} aria-label="Support our rescue work">
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerIcon} aria-hidden="true">🐾</span>
        <div>
          <h2 className={styles.title}>Support Our Rescue Work</h2>
          <p className={styles.subtitle}>
            Every dollar goes directly to the care and comfort of the animals we rescue.
            Thank you for being part of this mission. 💕
          </p>
        </div>
      </div>

      {/* Three-column grid */}
      <div className={styles.grid}>

        {/* ── Donate ── */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Ways to Donate</h3>
          <div className={styles.iconBtnGroup}>
            <IconBtn
              label="PayPal"
              href="https://www.paypal.com/ncp/payment/8SJFNZQVMQ452"
              logo="/img/logos/paypal.svg"
              bg="#003087"
            />
            <IconBtn
              label="Venmo"
              sublabel="@haltrescue"
              href="https://account.venmo.com/u/haltrescue"
              logo="/img/logos/venmo.svg"
              bg="#008CFF"
            />
            <IconBtn
              label="CashApp"
              sublabel="$haltrescue"
              href="https://cash.app/$Haltrescue"
              logo="/img/logos/cashapp.svg"
              bg="#00D632"
            />
          </div>
          <p className={styles.warning}>
            ⚠️ Venmo: watch for imposters — we are <strong>@haltrescue</strong>, not haltrescue_
          </p>
          <div className={styles.checkBlock}>
            <strong>Mail a Check:</strong>
            <address className={styles.address}>
              Helping All Little Things<br />
              PO Box 11<br />
              Deerfield, NH 03037<br />
              <em>(payable to Helping All Little Things)</em>
            </address>
          </div>
        </div>

        {/* ── Wishlists ── */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Wishlist Donations</h3>
          <p className={styles.cardBody}>
            Shop our wishlists and items ship directly to our animals!
          </p>
          <div className={styles.iconBtnGroup}>
            <IconBtn
              label="Amazon Wishlist"
              href="https://tinyurl.com/HALT-Amazon-Wishlist"
              logo="/img/logos/amazon.svg"
              bg="#FF9900"
            />
            <IconBtn
              label="Chewy Wishlist"
              href="https://tinyurl.com/HALT-Chewy-Wishlist"
              logo="/img/logos/chewy.svg"
              bg="#0075C9"
            />
          </div>
          <p className={styles.cardBody} style={{ marginTop: '0.75rem' }}>
            🥬 You can also donate a{' '}
            <a
              href="https://giftcards.shopmarketbasket.com/products/mb-gift-card-fresh-produce"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              Market Basket fresh produce gift card
            </a>!
          </p>
        </div>

        {/* ── Donate to vets ── */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Donate Directly to Our Vets</h3>
          <p className={styles.cardBody}>
            You can call any of our veterinary partners and donate directly to our account.
          </p>
          <ul className={styles.vetList}>
            <li>
              <strong>Southern Maine Hospital for Small Mammals</strong><br />
              <a href="tel:+12075359330" className={styles.vetPhone}>(207) 535-9330</a>
            </li>
            <li>
              <strong>Broadview Vets of Dover</strong><br />
              <a href="tel:+16037401800" className={styles.vetPhone}>(603) 740-1800</a>
            </li>
            <li>
              <strong>House Paws</strong><br />
              <a href="tel:+18562345230" className={styles.vetPhone}>(856) 234-5230</a>
            </li>
          </ul>
          <p className={styles.vetNote}>
            Note: The account may still be under Helping All Little Pipsqueaks — we're in the process of updating it.
          </p>
        </div>

      </div>

      {/* Footer thank-you */}
      <p className={styles.thankYou}>
        🐹 Thank you for your continued love and support. Every life matters, and we're so grateful you're part of this mission with us. 💕
      </p>
    </aside>
  );
}

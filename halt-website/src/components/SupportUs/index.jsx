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

        {/* Donate */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Ways to Donate</h3>
          <ul className={styles.donateList}>
            <li>
              <a
                href="https://www.paypal.com/ncp/payment/8SJFNZQVMQ452"
                className={styles.donateLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donate via PayPal"
              >
                <img src="/img/logos/paypal.svg" alt="PayPal" className={styles.brandLogo} />
                <span className={styles.donateHandle}>PayPal</span>
              </a>
            </li>
            <li>
              <a
                href="https://account.venmo.com/u/haltrescue"
                className={styles.donateLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donate via Venmo"
              >
                <img src="/img/logos/venmo.svg" alt="Venmo" className={styles.brandLogo} />
                <span className={styles.donateHandle}>@haltrescue</span>
              </a>
              <span className={styles.warning}>(watch for imposters — not haltrescue_)</span>
            </li>
            <li>
              <a
                href="https://cash.app/$Haltrescue"
                className={styles.donateLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donate via CashApp"
              >
                <img src="/img/logos/cashapp.svg" alt="Cash App" className={styles.brandLogoSquare} />
                <span className={styles.donateHandle}>$haltrescue</span>
              </a>
            </li>
            <li className={styles.checkItem}>
              <strong>Mail a Check:</strong>
              <address className={styles.address}>
                Helping All Little Things<br />
                PO Box 11<br />
                Deerfield, NH 03037<br />
                <em>(payable to Helping All Little Things)</em>
              </address>
            </li>
          </ul>
        </div>

        {/* Wishlists */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Wishlist Donations</h3>
          <p className={styles.cardBody}>
            Shop our wishlists and items ship directly to our animals!
          </p>
          <div className={styles.wishlistButtons}>
            <a
              href="https://tinyurl.com/HALT-Amazon-Wishlist"
              className={styles.wishlistBtn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HALT Amazon Wishlist"
            >
              <img src="/img/logos/amazon.svg" alt="Amazon" className={styles.wishlistLogo} />
              <span>Wishlist</span>
            </a>
            <a
              href="https://tinyurl.com/HALT-Chewy-Wishlist"
              className={styles.wishlistBtn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HALT Chewy Wishlist"
            >
              <img src="/img/logos/chewy.svg" alt="Chewy" className={styles.wishlistLogo} />
              <span>Wishlist</span>
            </a>
          </div>
        </div>

        {/* Donate to vets */}
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

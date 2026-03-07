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
          <div className={styles.cardIcon} aria-hidden="true">💸</div>
          <h3 className={styles.cardTitle}>Ways to Donate</h3>
          <ul className={styles.list}>
            <li>
              <a
                href="mailto:donations@helpingalllittlethings.org"
                className={styles.link}
                aria-label="Donate via PayPal"
              >
                PayPal
              </a>
              <span className={styles.detail}> donations@helpingalllittlethings.org</span>
            </li>
            <li>
              <a
                href="https://account.venmo.com/u/haltrescue"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donate via Venmo"
              >
                Venmo
              </a>
              <span className={styles.detail}> @haltrescue</span>
              <span className={styles.warning}> (watch for imposters — not haltrescue_)</span>
            </li>
            <li>
              <a
                href="https://cash.app/$Haltrescue"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donate via CashApp"
              >
                CashApp
              </a>
              <span className={styles.detail}> $haltrescue</span>
            </li>
            <li className={styles.checkAddress}>
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
          <div className={styles.cardIcon} aria-hidden="true">🛒</div>
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
              🛍️ Amazon Wishlist
            </a>
            <a
              href="https://tinyurl.com/HALT-Chewy-Wishlist"
              className={styles.wishlistBtn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HALT Chewy Wishlist"
            >
              🛍️ Chewy Wishlist
            </a>
          </div>
        </div>

        {/* Donate to vets */}
        <div className={styles.card}>
          <div className={styles.cardIcon} aria-hidden="true">📞</div>
          <h3 className={styles.cardTitle}>Donate Directly to Our Vets</h3>
          <p className={styles.cardBody}>
            You can call any of our veterinary partners and donate directly to our account.
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Southern Maine Hospital for Small Mammals</strong><br />
              <a href="tel:+12075359330" className={styles.link}>(207) 535-9330</a>
            </li>
            <li>
              <strong>Broadview Vets of Dover</strong><br />
              <a href="tel:+16037401800" className={styles.link}>(603) 740-1800</a>
            </li>
            <li>
              <strong>House Paws</strong><br />
              <a href="tel:+18562345230" className={styles.link}>(856) 234-5230</a>
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

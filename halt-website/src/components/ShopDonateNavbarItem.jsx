import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './ShopDonateNavbarItem.module.css';

// The right end of the navbar: one pill-shaped bubble, ( Shop | Donate ).
// Shop opens a small menu with the two shop pages; Donate goes straight
// to /donate and is filled in teal so it reads as the action button.
// Registered as the navbar item type "custom-shop-donate".
export default function ShopDonateNavbarItem() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      className={styles.wrap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={styles.bubble}>
        <button
          type="button"
          className={styles.shopHalf}
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((o) => !o)}
        >
          Shop <span className={styles.caret} aria-hidden="true">▾</span>
        </button>
        <Link className={styles.donateHalf} to="/donate">
          Donate
        </Link>
      </div>
      {open && (
        <div className={styles.menu} role="menu">
          <Link
            className={styles.menuItem}
            to="/shop"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            HALT Shop
          </Link>
          <Link
            className={styles.menuItem}
            to="/affiliate-products"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            HALT Affiliate Products
          </Link>
        </div>
      )}
    </div>
  );
}

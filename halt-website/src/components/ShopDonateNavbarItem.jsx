import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './ShopDonateNavbarItem.module.css';

// The right end of the navbar: one pill-shaped bubble, ( Shop | Donate ).
// Shop opens a small menu with the two shop pages; Donate goes straight
// to /donate and is filled in teal so it reads as the action button.
// Registered as the navbar item type "custom-shop-donate".
//
// The menu is deliberately forgiving to use: an invisible bridge fills
// the space between the bubble and the menu so the pointer never
// crosses dead air, and closing is delayed briefly so a small slip
// off the path does not slam the menu shut before the click lands.
// Only the Shop half (and the open menu itself) reacts to hover: the
// Donate half never opens the menu, so a first tap on Donate always
// navigates instead of being spent on opening the menu.
export default function ShopDonateNavbarItem() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const { pathname } = useLocation();

  const openNow = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };

  const closeSoon = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => setOpen(false), 350);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(
    () => () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    },
    []
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.bubble}>
        <button
          type="button"
          className={styles.shopHalf}
          aria-expanded={open}
          aria-haspopup="menu"
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
          onClick={() => (open ? setOpen(false) : openNow())}
        >
          Shop <span className={styles.caret} aria-hidden="true">▾</span>
        </button>
        <Link
          className={styles.donateHalf}
          to="/donate"
          onMouseEnter={() => setOpen(false)}
        >
          Donate
        </Link>
      </div>
      {open && (
        <div
          className={styles.menuOuter}
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
        >
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
        </div>
      )}
    </div>
  );
}

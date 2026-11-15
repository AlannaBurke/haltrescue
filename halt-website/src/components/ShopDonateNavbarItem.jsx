import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './ShopDonateNavbarItem.module.css';

// The right end of the navbar: one teal pill button, "Support Us".
// It opens a menu mirroring the mobile bottom bar's Support Us menu:
// Donate, a Shop sub-menu with the two shop pages, and Free Ways to
// Support. Registered as the navbar item type "custom-shop-donate"
// (the registration name predates the Support Us wording).
//
// The menu is deliberately forgiving to use: an invisible bridge fills
// the space between the button and the menu so the pointer never
// crosses dead air, and closing is delayed briefly so a small slip
// off the path does not slam the menu shut before the click lands.
export default function ShopDonateNavbarItem() {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
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
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setShopOpen(false);
    }, 350);
  };

  useEffect(() => {
    setOpen(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(
    () => () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    },
    []
  );

  const closeAll = () => {
    setOpen(false);
    setShopOpen(false);
  };

  return (
    <div className={styles.wrap + ' shop-donate-nav'}>
      <button
        type="button"
        className={styles.supportButton}
        aria-expanded={open}
        aria-haspopup="menu"
        onMouseEnter={openNow}
        onMouseLeave={closeSoon}
        onClick={() => (open ? closeAll() : openNow())}
      >
        Support Us <span className={styles.caret} aria-hidden="true">▾</span>
      </button>
      {open && (
        <div
          className={styles.menuOuter}
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
        >
          <div className={styles.menu} role="menu">
            <Link
              className={styles.menuItem}
              to="/donate"
              role="menuitem"
              onClick={closeAll}
            >
              Donate
            </Link>
            <button
              type="button"
              className={styles.menuItem + ' ' + styles.menuToggle}
              aria-expanded={shopOpen}
              aria-haspopup="menu"
              onClick={() => setShopOpen((current) => !current)}
            >
              Shop <span className={styles.caret} aria-hidden="true">▾</span>
            </button>
            {shopOpen && (
              <>
                <Link
                  className={styles.menuItem + ' ' + styles.subMenuItem}
                  to="/shop"
                  role="menuitem"
                  onClick={closeAll}
                >
                  HALT Shop
                </Link>
                <Link
                  className={styles.menuItem + ' ' + styles.subMenuItem}
                  to="/affiliate-products"
                  role="menuitem"
                  onClick={closeAll}
                >
                  HALT Affiliate Products
                </Link>
              </>
            )}
            <Link
              className={styles.menuItem}
              to="/free-ways-to-support"
              role="menuitem"
              onClick={closeAll}
            >
              Free Ways to Support
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

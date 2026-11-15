import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

// The homepage hero's Support Us button. It replaces the old hero
// Donate button and opens a menu mirroring the mobile bottom bar's
// Support Us menu: Donate, a Shop sub-menu with the two shop pages,
// and Free Ways to Support. Click (or tap) opens and closes it;
// clicking anywhere else on the page closes it too.
export default function HeroSupportUs() {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const wrapRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onDocClick = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
        setShopOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open ]);

  const closeAll = () => {
    setOpen(false);
    setShopOpen(false);
  };

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className="button button--secondary"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Support us: ways to support the rescue"
        onClick={() => (open ? closeAll() : setOpen(true))}
      >
        💛 Support Us <span className={styles.caret} aria-hidden="true">▾</span>
      </button>
      {open && (
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
      )}
    </div>
  );
}

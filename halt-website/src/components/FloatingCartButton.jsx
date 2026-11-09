import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './FloatingCartButton.module.css';

// Floating cart button in the bottom corner of the screen. It only
// appears once the visitor has actually put something in the cart
// (localStorage key haltCartV1, the same cart the product pages and
// /checkout use), and it stays out of the way on /checkout itself,
// where the visitor is already looking at the cart. Mounted in the
// site Layout, next to the MobileNavBar.
function readCount() {
  try {
    const raw = window.localStorage.getItem('haltCartV1');
    if (!raw) {
      return 0;
    }
    const stored = JSON.parse(raw);
    let n = 0;
    Object.keys(stored).forEach((id) => {
      n += Math.max(0, parseInt(stored[id], 10) || 0);
    });
    return n;
  } catch (e) {
    return 0;
  }
}

export default function FloatingCartButton() {
  const [count, setCount] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const update = () => setCount(readCount());
    update();
    const timer = setInterval(update, 1000);
    window.addEventListener('storage', update);
    return () => {
      clearInterval(timer);
      window.removeEventListener('storage', update);
    };
  }, []);

  useEffect(() => {
    setCount(readCount());
  }, [pathname]);

  if (count === 0 || pathname === '/checkout') {
    return null;
  }

  return (
    <Link
      to="/checkout"
      className={styles.floatingCart}
      aria-label={`Your cart, ${count} item${count === 1 ? '' : 's'}. Go to checkout.`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <span className={styles.badge}>{count}</span>
    </Link>
  );
}

import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

// Navbar cart link with a live item count. The count comes from
// the cart saved in this browser (localStorage key haltCartV1,
// shared with the product pages and /checkout), so it stays right
// as the visitor moves around the site. Rendered as a real React
// component (registered as the navbar item type "custom-cart"):
// an earlier approach that rewrote the link text from a plain
// script proved unreliable, so the count is React state instead.
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

export default function CartNavbarItem() {
  const [count, setCount] = useState(0);
  const location = useLocation();

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
  }, [location.pathname]);

  return (
    <Link
      className="navbar__item navbar__link halt-cart-link"
      to="/checkout"
      aria-label="Your cart">
      🛒 Cart{count > 0 ? ` (${count})` : ''}
    </Link>
  );
}

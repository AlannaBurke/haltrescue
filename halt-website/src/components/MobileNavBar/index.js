import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

const NAV_ITEMS = [
  { label: 'Resources', to: '/docs/intro', icon: '📚' },
  { label: 'About',     to: '/about',      icon: '🐾' },
  { label: 'Blog',      to: '/blog',       icon: '✏️'  },
];

export default function MobileNavBar() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.mobileNav} aria-label="Mobile navigation">
      {NAV_ITEMS.map(({ label, to, icon }) => {
        const isActive =
          pathname === to ||
          (to !== '/' && pathname.startsWith(to.replace('/docs/intro', '/docs')));
        return (
          <Link
            key={label}
            to={to}
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className={styles.navIcon}>{icon}</span>
            <span className={styles.navLabel}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

// SVG icons — inline so no extra network request
const Icons = {
  resources: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  blog: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  adopt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="3"/>
      <circle cx="17" cy="7" r="2"/>
      <circle cx="7" cy="7" r="2"/>
      <circle cx="17" cy="15" r="2"/>
      <circle cx="7" cy="15" r="2"/>
    </svg>
  ),
  stories: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

const NAV_ITEMS = [
  { label: 'Resources', to: '/docs/intro',       icon: Icons.resources, activePrefix: '/docs' },
  { label: 'Blog',      to: '/blog',              icon: Icons.blog,      activePrefix: '/blog' },
  { label: 'Adopt',     to: '/adoptables',        icon: Icons.adopt,     activePrefix: '/adoptables' },
  { label: 'Stories',   to: '/success-stories',   icon: Icons.stories,   activePrefix: '/success-stories' },
  { label: 'About',     to: '/about',             icon: Icons.about,     activePrefix: '/about' },
];

export default function MobileNavBar() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.mobileNav} aria-label="Mobile navigation">
      {NAV_ITEMS.map(({ label, to, icon, activePrefix }) => {
        const isActive =
          pathname === to ||
          (activePrefix && pathname.startsWith(activePrefix));
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

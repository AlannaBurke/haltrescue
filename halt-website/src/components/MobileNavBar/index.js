import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

// SVG icons — inline so no extra network request
const Icons = {
  adopt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="3"/>
      <circle cx="17" cy="7" r="2"/>
      <circle cx="7" cy="7" r="2"/>
      <circle cx="17" cy="15" r="2"/>
      <circle cx="7" cy="15" r="2"/>
    </svg>
  ),
  resources: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  stories: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  shop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  donate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 12 20 22 4 22 4 12"/>
      <rect x="2" y="7" width="20" height="5"/>
      <line x1="12" y1="22" x2="12" y2="7"/>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
    </svg>
  ),
};

// Same four destinations as the desktop "Stories, Blogs & Updates" dropdown
const STORY_LINKS = [
  { label: 'Blog', to: '/blog', activePrefix: '/blog' },
  { label: 'Success Stories', to: '/success-stories', activePrefix: '/success-stories' },
  { label: 'Sanctuary', to: '/sanctuary', activePrefix: '/sanctuary' },
  { label: 'Case Studies', to: '/case-studies', activePrefix: '/case-studies' },
];

const NAV_ITEMS = [
  { label: 'Adopt', to: '/adoptables', icon: Icons.adopt, activePrefix: '/adoptables' },
  { label: 'Resources & Education', to: '/docs/intro', icon: Icons.resources, activePrefix: '/docs' },
  { label: 'Stories & Blog', dropdown: true, icon: Icons.stories },
  { label: 'About', to: '/about', icon: Icons.about, activePrefix: '/about' },
  { label: 'Shop', to: '/shop', icon: Icons.shop, activePrefix: '/shop' },
  { label: 'Donate', to: '/donate', icon: Icons.donate, activePrefix: '/donate' },
];

export default function MobileNavBar() {
  const { pathname } = useLocation();
  const [storiesOpen, setStoriesOpen] = useState(false);

  // Close the Stories menu whenever the page changes
  useEffect(() => {
    setStoriesOpen(false);
  }, [pathname]);

  const storiesActive = STORY_LINKS.some(
    ({ to, activePrefix }) => pathname === to || pathname.startsWith(activePrefix)
  );

  return (
    <>
      {storiesOpen && (
        <>
          <div
            className={styles.menuBackdrop}
            onClick={() => setStoriesOpen(false)}
            aria-hidden="true"
          />
          <div className={styles.storiesMenu} role="menu" aria-label="Stories and Blog">
            {STORY_LINKS.map(({ label, to, activePrefix }) => {
              const isActive = pathname === to || pathname.startsWith(activePrefix);
              return (
                <Link
                  key={label}
                  to={to}
                  role="menuitem"
                  className={`${styles.storiesMenuItem} ${isActive ? styles.storiesMenuItemActive : ''}`}
                  onClick={() => setStoriesOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </>
      )}
      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        {NAV_ITEMS.map((item) => {
          if (item.dropdown) {
            return (
              <button
                key={item.label}
                type="button"
                className={`${styles.navItem} ${styles.navButton} ${storiesActive || storiesOpen ? styles.navItemActive : ''}`}
                aria-expanded={storiesOpen}
                aria-haspopup="menu"
                onClick={() => setStoriesOpen((open) => !open)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </button>
            );
          }
          const isActive =
            pathname === item.to ||
            (item.activePrefix && pathname.startsWith(item.activePrefix));
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

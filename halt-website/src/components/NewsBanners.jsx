import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './NewsBanners.module.css';

// Slim news banners at the very top of every page, above the navbar.
// Mounted in the site Layout (src/theme/Layout), before the page.
//
// TO CHANGE THE BANNERS: edit the BANNERS list below. Each banner has
// a unique id. When a visitor closes a banner, its id is remembered in
// their browser (localStorage key haltDismissedBannersV1) and that
// banner stays closed for them. A banner with a NEW id shows for
// everyone, even people who closed the older ones, so give every new
// announcement a fresh id. Delete a banner from the list to remove it
// for everyone.
const BANNERS = [
  {
    id: 'crafty-corner-2026',
    variant: 'festive',
    emoji: '🎄',
    text: 'Our Crafty Corner holiday sale is live! Handmade gifts galore, and every purchase helps the critters.',
    linkText: 'Join the group',
    linkTo: 'https://www.facebook.com/groups/1128952988751160/',
    external: true,
  },
  {
    id: 'givingtuesday-2026',
    variant: 'teal',
    emoji: '💛',
    text: 'GivingTuesday is December 1! We are looking for matching donors and local businesses to partner with, and we will be live streaming in the days leading up to it and on the day itself.',
    linkText: 'See how to help',
    linkTo: '/donate',
    external: false,
  },
];

const STORAGE_KEY = 'haltDismissedBannersV1';

function readDismissed() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export default function NewsBanners() {
  const [dismissed, setDismissed] = useState([]);

  useEffect(() => {
    setDismissed(readDismissed());
  }, []);

  const dismiss = (id) => {
    setDismissed((prev) => {
      const next = prev.includes(id) ? prev : [...prev, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        // Storage unavailable (private mode and the like): the banner
        // still closes for this visit.
      }
      return next;
    });
  };

  const visible = BANNERS.filter((b) => !dismissed.includes(b.id));
  if (visible.length === 0) {
    return null;
  }

  return (
    <div className={styles.banners}>
      {visible.map((b) => (
        <div
          key={b.id}
          className={`${styles.bar} ${
            b.variant === 'festive' ? styles.barFestive : styles.barTeal
          }`}
        >
          <span>
            {b.emoji ? `${b.emoji} ` : ''}
            {b.text}{' '}
            {b.external ? (
              <a
                href={b.linkTo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {b.linkText}
              </a>
            ) : (
              <Link to={b.linkTo} className={styles.link}>
                {b.linkText}
              </Link>
            )}
          </span>
          <button
            type="button"
            className={styles.close}
            aria-label="Dismiss this announcement"
            onClick={() => dismiss(b.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

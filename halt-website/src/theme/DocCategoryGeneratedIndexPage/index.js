/**
 * Custom swizzle of DocCategoryGeneratedIndexPage (wrapper pattern).
 *
 * Adds a hero banner image above the default Docusaurus category index page.
 * Uses @theme-original/DocCategoryGeneratedIndexPage to avoid re-implementing
 * the full component and its internal imports.
 *
 * Hero images are mapped by permalink path for precise matching.
 */
import React from 'react';
import OriginalDocCategoryGeneratedIndexPage from '@theme-original/DocCategoryGeneratedIndexPage';
import styles from './styles.module.css';

/**
 * Maps permalink path segments → hero images.
 * Checked against the full permalink (lowercased) using startsWith/includes.
 * More specific paths are listed first.
 */
const PERMALINK_IMAGE_MAP = [
  // ── General Care ──────────────────────────────────────────────────────────
  { match: '/docs/general-care', image: '/img/heroes/general-care/hero.png' },

  // ── Chinchillas ───────────────────────────────────────────────────────────
  { match: '/docs/chinchillas/getting-started',        image: '/img/heroes/chinchillas/getting-started.png' },
  { match: '/docs/chinchillas/health-and-wellness',    image: '/img/heroes/chinchillas/health-wellness.png' },
  { match: '/docs/chinchillas/illnesses',              image: '/img/heroes/chinchillas/illnesses.png' },
  { match: '/docs/chinchillas',                        image: '/img/heroes/chinchillas/hero.png' },

  // ── Ferrets ───────────────────────────────────────────────────────────────
  { match: '/docs/ferrets/getting-started',            image: '/img/heroes/ferrets/getting-started.png' },
  { match: '/docs/ferrets/health-and-wellness',        image: '/img/heroes/ferrets/health-wellness.png' },
  { match: '/docs/ferrets/illnesses',                  image: '/img/heroes/ferrets/illnesses.png' },
  { match: '/docs/ferrets',                            image: '/img/heroes/ferrets/hero.png' },

  // ── Guinea Pigs ───────────────────────────────────────────────────────────
  { match: '/docs/guinea-pigs/getting-started',        image: '/img/heroes/guinea-pigs/getting-started.png' },
  { match: '/docs/guinea-pigs/health-and-wellness',    image: '/img/heroes/guinea-pigs/health-wellness.png' },
  { match: '/docs/guinea-pigs/illnesses',              image: '/img/heroes/guinea-pigs/illnesses.png' },
  { match: '/docs/guinea-pigs/breeds',                 image: '/img/heroes/guinea-pigs/breeds.png' },
  { match: '/docs/guinea-pigs/safety',                 image: '/img/heroes/guinea-pigs/safety.png' },
  { match: '/docs/guinea-pigs',                        image: '/img/heroes/guinea-pigs/hero.png' },

  // ── Hamsters ──────────────────────────────────────────────────────────────
  { match: '/docs/hamsters/getting-started',           image: '/img/heroes/hamsters/getting-started.png' },
  { match: '/docs/hamsters/health-and-wellness',       image: '/img/heroes/hamsters/health-wellness.png' },
  { match: '/docs/hamsters/illnesses',                 image: '/img/heroes/hamsters/illnesses.png' },
  { match: '/docs/hamsters',                           image: '/img/heroes/hamsters/hero.png' },

  // ── Hedgehogs ─────────────────────────────────────────────────────────────
  { match: '/docs/hedgehogs/getting-started',          image: '/img/heroes/hedgehogs/getting-started.png' },
  { match: '/docs/hedgehogs/health-and-wellness',      image: '/img/heroes/hedgehogs/health-wellness.png' },
  { match: '/docs/hedgehogs/illnesses',                image: '/img/heroes/hedgehogs/illnesses.png' },
  { match: '/docs/hedgehogs',                          image: '/img/heroes/hedgehogs/hero.png' },

  // ── Mice ──────────────────────────────────────────────────────────────────
  { match: '/docs/mice/getting-started',               image: '/img/heroes/mice/getting-started.png' },
  { match: '/docs/mice/health-and-wellness',           image: '/img/heroes/mice/health-wellness.png' },
  { match: '/docs/mice/illnesses',                     image: '/img/heroes/mice/illnesses.png' },
  { match: '/docs/mice',                               image: '/img/heroes/mice/hero.png' },

  // ── Rabbits ───────────────────────────────────────────────────────────────
  { match: '/docs/rabbits/getting-started',            image: '/img/heroes/rabbits/getting-started.png' },
  { match: '/docs/rabbits/health-and-wellness',        image: '/img/heroes/rabbits/health-wellness.png' },
  { match: '/docs/rabbits/illnesses',                  image: '/img/heroes/rabbits/illnesses.png' },
  { match: '/docs/rabbits',                            image: '/img/heroes/rabbits/hero.png' },

  // ── Rats ──────────────────────────────────────────────────────────────────
  { match: '/docs/rats/getting-started',               image: '/img/heroes/rats/getting-started.png' },
  { match: '/docs/rats/health-and-wellness',           image: '/img/heroes/rats/health-wellness.png' },
  { match: '/docs/rats/illnesses',                     image: '/img/heroes/rats/illnesses.png' },
  { match: '/docs/rats/breeds',                        image: '/img/heroes/rats/breeds.png' },
  { match: '/docs/rats/behavior',                      image: '/img/heroes/rats/behavior.png' },
  { match: '/docs/rats',                               image: '/img/heroes/rats/hero.png' },

  // ── Rescue Resources ──────────────────────────────────────────────────────
  { match: '/docs/rescue-resources/report',            image: '/img/heroes/report-cruelty/hero.png' },
  { match: '/docs/rescue-resources/rescue',            image: '/img/heroes/rescue-resources/running-rescue.png' },
  { match: '/docs/rescue-resources',                   image: '/img/heroes/rescue-resources/hero.png' },

  // ── Chinchillas uppercase path variant ────────────────────────────────────
  { match: '/docs/chinchillas',                        image: '/img/heroes/chinchillas/hero.png' },
  { match: '/docs/rabbits',                            image: '/img/heroes/rabbits/hero.png' },
];

const FALLBACK_IMAGE = '/img/heroes/intro-hero.png';

function getHeroImage(permalink) {
  if (!permalink) return FALLBACK_IMAGE;
  const lower = permalink.toLowerCase();
  for (const entry of PERMALINK_IMAGE_MAP) {
    if (lower.startsWith(entry.match) || lower.includes(entry.match)) {
      return entry.image;
    }
  }
  return FALLBACK_IMAGE;
}

export default function DocCategoryGeneratedIndexPage(props) {
  const { categoryGeneratedIndex } = props;
  const heroImage = getHeroImage(categoryGeneratedIndex?.permalink);

  return (
    <div className={styles.pageWrapper}>
      {/* Hero banner */}
      <div className={styles.heroBanner}>
        <img
          src={heroImage}
          alt={`${categoryGeneratedIndex?.title || 'Category'} illustration`}
          className={styles.heroImage}
          loading="eager"
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>{categoryGeneratedIndex?.title}</h1>
          {categoryGeneratedIndex?.description && (
            <p className={styles.heroDescription}>{categoryGeneratedIndex.description}</p>
          )}
        </div>
      </div>

      {/* Original Docusaurus category page (without its own h1/description — we rendered those above) */}
      <div className={styles.contentWrapper}>
        <OriginalDocCategoryGeneratedIndexPage {...props} />
      </div>
    </div>
  );
}

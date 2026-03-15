/**
 * Custom swizzle of DocCategoryGeneratedIndexPage (wrapper pattern).
 *
 * Adds a hero banner image above the default Docusaurus category index page.
 * Uses @theme-original/DocCategoryGeneratedIndexPage to avoid re-implementing
 * the full component and its internal imports.
 *
 * Hero image priority:
 *   1. categoryGeneratedIndex.image  (from _category_.json → link.image)
 *   2. PERMALINK_IMAGE_MAP           (fallback by URL path)
 *   3. FALLBACK_IMAGE                (generic intro hero)
 */
import React from 'react';
import OriginalDocCategoryGeneratedIndexPage from '@theme-original/DocCategoryGeneratedIndexPage';
import styles from './styles.module.css';

/**
 * Fallback map: maps /docs/category/... permalink → hero image.
 * Only used when _category_.json does not specify an image.
 * More specific paths are listed first.
 */
const PERMALINK_IMAGE_MAP = [
  // ── General Care ──────────────────────────────────────────────────────────
  { match: '/docs/category/general-care',                image: '/img/heroes/general-care/hero.png' },

  // ── Chinchillas ───────────────────────────────────────────────────────────
  { match: '/docs/category/getting-started-1',           image: '/img/heroes/chinchillas/getting-started.png' },
  { match: '/docs/category/health-wellness-1',           image: '/img/heroes/chinchillas/health-wellness.png' },
  { match: '/docs/category/illnesses-conditions-1',      image: '/img/heroes/chinchillas/illnesses.png' },
  { match: '/docs/category/chinchillas',                 image: '/img/heroes/chinchillas/hero.png' },

  // ── Degus ─────────────────────────────────────────────────────────────────
  { match: '/docs/category/degus',                       image: '/img/heroes/degus/hero.png' },

  // ── Ferrets ───────────────────────────────────────────────────────────────
  { match: '/docs/category/ferrets',                     image: '/img/heroes/ferrets/hero.png' },

  // ── Guinea Pigs ───────────────────────────────────────────────────────────
  { match: '/docs/category/guinea-pigs',                 image: '/img/heroes/guinea-pigs/hero.png' },

  // ── Gerbils ───────────────────────────────────────────────────────────────
  { match: '/docs/category/gerbils',                     image: '/img/heroes/gerbils/hero.png' },

  // ── Hamsters ──────────────────────────────────────────────────────────────
  { match: '/docs/category/hamsters',                    image: '/img/heroes/hamsters/hero.png' },

  // ── Hedgehogs ─────────────────────────────────────────────────────────────
  { match: '/docs/category/hedgehogs',                   image: '/img/heroes/hedgehogs/hero.png' },

  // ── Mice ──────────────────────────────────────────────────────────────────
  { match: '/docs/category/mice',                        image: '/img/heroes/mice/hero.png' },

  // ── Rabbits ───────────────────────────────────────────────────────────────
  { match: '/docs/category/rabbits',                     image: '/img/heroes/rabbits/hero.png' },

  // ── Rats ──────────────────────────────────────────────────────────────────
  { match: '/docs/category/rats',                        image: '/img/heroes/rats/hero.png' },

  // ── Rescue Resources ──────────────────────────────────────────────────────
  { match: '/docs/category/rescue-resources',            image: '/img/heroes/rescue-resources/hero.png' },
];

const FALLBACK_IMAGE = '/img/heroes/intro-hero.png';

function getHeroImage(categoryGeneratedIndex) {
  // Priority 1: use the image declared in _category_.json (link.image)
  if (categoryGeneratedIndex?.image) {
    return categoryGeneratedIndex.image;
  }
  // Priority 2: match by permalink
  const permalink = categoryGeneratedIndex?.permalink;
  if (permalink) {
    const lower = permalink.toLowerCase();
    for (const entry of PERMALINK_IMAGE_MAP) {
      if (lower === entry.match || lower.startsWith(entry.match + '/') || lower.includes(entry.match)) {
        return entry.image;
      }
    }
  }
  return FALLBACK_IMAGE;
}

export default function DocCategoryGeneratedIndexPage(props) {
  const { categoryGeneratedIndex } = props;
  const heroImage = getHeroImage(categoryGeneratedIndex);

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

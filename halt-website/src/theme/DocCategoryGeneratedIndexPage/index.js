/**
 * Custom swizzle of DocCategoryGeneratedIndexPage (wrapper pattern).
 *
 * Adds a hero banner image above the default Docusaurus category index page.
 * Uses @theme-original/DocCategoryGeneratedIndexPage to avoid re-implementing
 * the full component and its internal imports.
 */
import React from 'react';
import OriginalDocCategoryGeneratedIndexPage from '@theme-original/DocCategoryGeneratedIndexPage';
import styles from './styles.module.css';

/**
 * Maps category title keywords → hero images (checked case-insensitively).
 * Longer/more-specific keys are matched first.
 */
const CATEGORY_IMAGES = {
  // Top-level animal sections
  'guinea pig':    '/img/tags/guineapigs.png',
  'guinea pigs':   '/img/tags/guineapigs.png',
  'chinchillas':   '/img/tags/chinchillas.png',
  'chinchilla':    '/img/tags/chinchillas.png',
  'hedgehogs':     '/img/tags/hedgehogs.png',
  'hedgehog':      '/img/tags/hedgehogs.png',
  'hamsters':      '/img/tags/hamsters.png',
  'hamster':       '/img/tags/hamsters.png',
  'rabbits':       '/img/tags/rabbits.png',
  'rabbit':        '/img/tags/rabbits.png',
  'ferrets':       '/img/tags/ferrets.png',
  'ferret':        '/img/tags/ferrets.png',
  'mice':          '/img/tags/mice.png',
  'mouse':         '/img/tags/mice.png',
  'rats':          '/img/tags/rats.png',
  'rat':           '/img/tags/rats.png',
  // Sub-section topics
  'illnesses':     '/img/tags/medical.png',
  'illness':       '/img/tags/medical.png',
  'conditions':    '/img/tags/medical.png',
  'health':        '/img/tags/health.png',
  'wellness':      '/img/tags/health.png',
  'getting started': '/img/tags/care.png',
  'care':          '/img/tags/care.png',
  'husbandry':     '/img/tags/care.png',
  'nutrition':     '/img/tags/nutrition.png',
  'diet':          '/img/tags/nutrition.png',
  'feeding':       '/img/tags/nutrition.png',
  'housing':       '/img/tags/housing.png',
  'habitat':       '/img/tags/housing.png',
  'enrichment':    '/img/tags/housing.png',
  'behavior':      '/img/tags/behavior.png',
  'behaviour':     '/img/tags/behavior.png',
  'social':        '/img/tags/behavior.png',
  'genetics':      '/img/tags/genetics.png',
  'breeds':        '/img/tags/genetics.png',
  'grooming':      '/img/tags/grooming.png',
  'safety':        '/img/tags/safety.png',
  'rescue':        '/img/tags/adoptables.png',
  'adoption':      '/img/tags/adoptions.png',
  'parasites':     '/img/tags/parasites.png',
  'respiratory':   '/img/tags/respiratory.png',
  'neurological':  '/img/tags/neurological.png',
  'neurologic':    '/img/tags/neurological.png',
  'dental':        '/img/tags/dental.png',
  'general':       '/img/tags/care.png',
  'resources':     '/img/tags/educational.png',
};

const FALLBACK_IMAGE = '/img/tags/guineapigs.png';

function getCategoryImage(title) {
  if (!title) return FALLBACK_IMAGE;
  const lower = title.toLowerCase();
  // Sort keys by length descending so multi-word keys match before single-word ones
  const sortedKeys = Object.keys(CATEGORY_IMAGES).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (lower.includes(key)) {
      return CATEGORY_IMAGES[key];
    }
  }
  return FALLBACK_IMAGE;
}

export default function DocCategoryGeneratedIndexPage(props) {
  const { categoryGeneratedIndex } = props;
  const heroImage = getCategoryImage(categoryGeneratedIndex?.title);

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

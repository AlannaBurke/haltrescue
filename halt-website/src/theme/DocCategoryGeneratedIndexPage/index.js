import React from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
import { useCurrentSidebarCategory } from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocCardList from '@theme/DocCardList';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/**
 * Maps category title keywords to hero images.
 * Checked case-insensitively against the category title.
 */
const CATEGORY_IMAGES = {
  // Top-level animal sections
  rats:           '/img/tags/rats.png',
  rat:            '/img/tags/rats.png',
  rabbits:        '/img/tags/rabbits.png',
  rabbit:         '/img/tags/rabbits.png',
  'guinea pig':   '/img/tags/guineapigs.png',
  'guinea pigs':  '/img/tags/guineapigs.png',
  chinchillas:    '/img/tags/chinchillas.png',
  chinchilla:     '/img/tags/chinchillas.png',
  ferrets:        '/img/tags/ferrets.png',
  ferret:         '/img/tags/ferrets.png',
  hamsters:       '/img/tags/hamsters.png',
  hamster:        '/img/tags/hamsters.png',
  hedgehogs:      '/img/tags/hedgehogs.png',
  hedgehog:       '/img/tags/hedgehogs.png',
  mice:           '/img/tags/mice.png',
  mouse:          '/img/tags/mice.png',
  // Sub-section topics
  'illnesses':    '/img/tags/medical.png',
  'illness':      '/img/tags/medical.png',
  'conditions':   '/img/tags/medical.png',
  'health':       '/img/tags/health.png',
  'wellness':     '/img/tags/health.png',
  'getting started': '/img/tags/care.png',
  'care':         '/img/tags/care.png',
  'husbandry':    '/img/tags/care.png',
  'nutrition':    '/img/tags/nutrition.png',
  'diet':         '/img/tags/nutrition.png',
  'feeding':      '/img/tags/nutrition.png',
  'housing':      '/img/tags/housing.png',
  'habitat':      '/img/tags/housing.png',
  'enrichment':   '/img/tags/housing.png',
  'behavior':     '/img/tags/behavior.png',
  'behaviour':    '/img/tags/behavior.png',
  'social':       '/img/tags/behavior.png',
  'genetics':     '/img/tags/genetics.png',
  'breeds':       '/img/tags/genetics.png',
  'grooming':     '/img/tags/grooming.png',
  'safety':       '/img/tags/safety.png',
  'rescue':       '/img/tags/adoptables.png',
  'adoption':     '/img/tags/adoptions.png',
  'parasites':    '/img/tags/parasites.png',
  'respiratory':  '/img/tags/respiratory.png',
  'neurological': '/img/tags/neurological.png',
  'neurologic':   '/img/tags/neurological.png',
  'dental':       '/img/tags/dental.png',
  'general':      '/img/tags/care.png',
  'resources':    '/img/tags/educational.png',
};

const FALLBACK_IMAGE = '/img/tags/guineapigs.png';

function getCategoryImage(title) {
  if (!title) return FALLBACK_IMAGE;
  const lower = title.toLowerCase();
  // Try longest match first (multi-word keys)
  const sortedKeys = Object.keys(CATEGORY_IMAGES).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (lower.includes(key)) {
      return CATEGORY_IMAGES[key];
    }
  }
  return FALLBACK_IMAGE;
}

function DocCategoryGeneratedIndexPageMetadata({ categoryGeneratedIndex }) {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function DocCategoryGeneratedIndexPageContent({ categoryGeneratedIndex }) {
  const category = useCurrentSidebarCategory();
  const heroImage = getCategoryImage(categoryGeneratedIndex.title);

  return (
    <div className={styles.generatedIndexPage}>
      <DocVersionBanner />
      <DocBreadcrumbs />
      <DocVersionBadge />

      {/* Hero banner */}
      <div className={styles.heroBanner}>
        <img
          src={heroImage}
          alt={`${categoryGeneratedIndex.title} illustration`}
          className={styles.heroImage}
          loading="eager"
        />
        <div className={styles.heroOverlay}>
          <Heading as="h1" className={styles.heroTitle}>
            {categoryGeneratedIndex.title}
          </Heading>
          {categoryGeneratedIndex.description && (
            <p className={styles.heroDescription}>{categoryGeneratedIndex.description}</p>
          )}
        </div>
      </div>

      <article className="margin-top--lg">
        <DocCardList items={category.items} className={styles.list} />
      </article>
      <footer className="margin-top--md">
        <DocPaginator
          previous={categoryGeneratedIndex.navigation.previous}
          next={categoryGeneratedIndex.navigation.next}
        />
      </footer>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(props) {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}

/**
 * Shared PostCard component used across all blog list pages:
 * - BlogTagsPostsPage
 * - BlogListPage (main blog index)
 * - BlogAuthorsPostsPage
 * - BlogArchivePage
 *
 * Image resolution order:
 *   1. content.assets.image  — Docusaurus-processed hashed URL (preferred)
 *   2. metadata.frontMatter.image — raw frontmatter path (fallback)
 *   3. tag-based default kawaii image — picked randomly from the post's tags
 *   4. generic guinea pig default
 */

import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/** Map tag slugs → default kawaii images */
export const TAG_DEFAULT_IMAGES = {
  adoptables:    '/img/tags/adoptables.png',
  adoptions:     '/img/tags/adoptions.png',
  chinchillas:   '/img/tags/chinchillas.png',
  educational:   '/img/tags/educational.png',
  fundraiser:    '/img/tags/fundraiser.png',
  guineapigs:    '/img/tags/guineapigs.png',
  hamsters:      '/img/tags/hamsters.png',
  humans:        '/img/tags/humans.png',
  lethalwhite:   '/img/tags/lethalwhite.png',
  medical:       '/img/tags/medical.png',
  mice:          '/img/tags/mice.png',
  news:          '/img/tags/news.png',
  rainbowbridge: '/img/tags/rainbowbridge.png',
  sanctuary:     '/img/tags/sanctuary.png',
  satin:         '/img/tags/satin.png',
};

const FALLBACK_IMAGE = '/img/tags/guineapigs.png';

/**
 * Pick a default image based on the post's tags (random pick from matching tags).
 * Falls back to the generic guinea pig image.
 */
export function getDefaultImageForTags(tags) {
  if (!tags || tags.length === 0) return FALLBACK_IMAGE;
  const matching = tags
    .map(t => {
      const slug = (t.label || t.permalink?.split('/').pop() || '').toLowerCase().replace(/\s+/g, '');
      return TAG_DEFAULT_IMAGES[slug];
    })
    .filter(Boolean);
  if (matching.length === 0) return FALLBACK_IMAGE;
  // Pick a random one so variety shows across the page
  return matching[Math.floor(Math.random() * matching.length)];
}

export default function PostCard({ item }) {
  const { content: BlogPostContent } = item;
  const { metadata, assets } = BlogPostContent;
  const { permalink, title, description, date, tags, authors, frontMatter } = metadata;

  // Resolve image: hashed asset → raw frontmatter → tag default
  const image = assets?.image ?? frontMatter?.image ?? getDefaultImageForTags(tags);

  const dateObj = new Date(date);
  const dateStr = dateObj.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <article className={styles.card}>
      <Link href={permalink} className={styles.cardImageLink} aria-hidden="true" tabIndex="-1">
        <div className={styles.cardImageWrapper}>
          <img
            src={image}
            alt=""
            className={styles.cardImage}
            loading="lazy"
          />
        </div>
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <time dateTime={date} className={styles.cardDate}>{dateStr}</time>
          {authors && authors.length > 0 && (
            <span className={styles.cardAuthor}>
              {' · '}{authors.map(a => a.name).join(', ')}
            </span>
          )}
        </div>
        <Heading as="h2" className={styles.cardTitle}>
          <Link href={permalink}>{title}</Link>
        </Heading>
        {description && (
          <p className={styles.cardDescription}>{description}</p>
        )}
        <div className={styles.cardFooter}>
          <Link
            href={permalink}
            className={styles.readMore}
            aria-label={`Read more about ${title}`}
          >
            Read more →
          </Link>
          {tags && tags.length > 0 && (
            <div className={styles.cardTags}>
              {tags.map(tag => (
                <Link key={tag.permalink} href={tag.permalink} className={styles.cardTag}>
                  {tag.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

import React from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  translateTagsPageTitle,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import SearchMetadata from '@theme/SearchMetadata';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { TAG_DEFAULT_IMAGES } from '@site/src/components/PostCard';
import styles from './styles.module.css';

/** Get the kawaii image for a tag by its label or permalink slug */
function getTagImage(tag) {
  const slug = (tag.label || tag.permalink?.split('/').pop() || '')
    .toLowerCase()
    .replace(/\s+/g, '');
  return TAG_DEFAULT_IMAGES[slug] || TAG_DEFAULT_IMAGES['guineapigs'];
}

function TagCard({ tag }) {
  const { label, permalink, count } = tag;
  const image = getTagImage(tag);

  return (
    <article className={styles.tagCard}>
      <Link href={permalink} className={styles.tagCardLink} aria-label={`View all posts tagged ${label}`}>
        <div className={styles.tagImageWrapper}>
          <img
            src={image}
            alt={`${label} tag illustration`}
            className={styles.tagImage}
            loading="lazy"
          />
          <div className={styles.tagOverlay} aria-hidden="true" />
        </div>
        <div className={styles.tagBody}>
          <Heading as="h2" className={styles.tagLabel}>{label}</Heading>
          <span className={styles.tagCount}>
            {count} post{count !== 1 ? 's' : ''}
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function BlogTagsListPage({ tags, sidebar }) {
  const title = translateTagsPageTitle();
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage,
      )}>
      <PageMetadata title={title} description="Browse all topics from Helping All Little Things Rescue" />
      <SearchMetadata tag="blog_tags_list" />
      <BlogLayout sidebar={sidebar}>
        <header className={styles.pageHeader}>
          <Heading as="h1" className={styles.pageTitle}>Browse by Topic</Heading>
          <p className={styles.pageSubtitle}>
            Explore all posts from Helping All Little Things Rescue by topic
          </p>
        </header>
        <div className={styles.tagsGrid}>
          {tags.map((tag) => (
            <TagCard key={tag.permalink} tag={tag} />
          ))}
        </div>
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}

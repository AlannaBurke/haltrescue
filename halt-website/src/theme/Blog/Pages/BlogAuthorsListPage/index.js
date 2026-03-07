import React from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {translateBlogAuthorsListPageTitle} from '@docusaurus/theme-common/internal';
import BlogLayout from '@theme/BlogLayout';
import SearchMetadata from '@theme/SearchMetadata';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function AuthorCard({ author }) {
  const { name, title, imageURL, url, count } = author;
  return (
    <article className={styles.authorCard}>
      <Link href={url} className={styles.authorCardLink} aria-label={`View all posts by ${name}`}>
        <div className={styles.authorImageWrapper}>
          {imageURL ? (
            <img
              src={imageURL}
              alt={name}
              className={styles.authorImage}
              loading="lazy"
            />
          ) : (
            <div className={styles.authorImagePlaceholder} aria-hidden="true">
              🐾
            </div>
          )}
        </div>
        <div className={styles.authorInfo}>
          <Heading as="h2" className={styles.authorName}>{name}</Heading>
          {title && <p className={styles.authorTitle}>{title}</p>}
          <span className={styles.authorCount}>
            {count} post{count !== 1 ? 's' : ''}
          </span>
        </div>
        <span className={styles.authorCta}>View posts →</span>
      </Link>
    </article>
  );
}

export default function BlogAuthorsListPage({ authors, sidebar }) {
  const title = translateBlogAuthorsListPageTitle();
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogAuthorsListPage,
      )}>
      <PageMetadata title={title} description="Meet the people behind Helping All Little Things Rescue" />
      <SearchMetadata tag="blog_authors_list" />
      <BlogLayout sidebar={sidebar}>
        <header className={styles.pageHeader}>
          <Heading as="h1" className={styles.pageTitle}>Meet Our Authors</Heading>
          <p className={styles.pageSubtitle}>
            The dedicated people sharing stories from Helping All Little Things Rescue
          </p>
        </header>
        <div className={styles.authorsGrid}>
          {authors.map((author) => (
            <AuthorCard key={author.key} author={author} />
          ))}
        </div>
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}

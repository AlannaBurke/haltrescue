import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {getDefaultImageForTags} from '@site/src/components/PostCard';
import cardStyles from '@site/src/components/PostCard/styles.module.css';
import styles from './styles.module.css';

/**
 * Archive posts have a different shape from list-page items:
 *   post.metadata.{permalink, title, date, tags, authors, frontMatter}
 * There is no assets.image — we use frontMatter.image or tag default.
 */
function ArchivePostCard({post}) {
  const {permalink, title, date, tags, authors, frontMatter, description} = post.metadata;
  const image = frontMatter?.image ?? getDefaultImageForTags(tags);

  const dateObj = new Date(date);
  const dateStr = dateObj.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <article className={cardStyles.card}>
      <Link href={permalink} className={cardStyles.cardImageLink} aria-hidden="true" tabIndex="-1">
        <div className={cardStyles.cardImageWrapper}>
          <img
            src={image}
            alt=""
            className={cardStyles.cardImage}
            loading="lazy"
          />
        </div>
      </Link>
      <div className={cardStyles.cardBody}>
        <div className={cardStyles.cardMeta}>
          <time dateTime={date} className={cardStyles.cardDate}>{dateStr}</time>
          {authors && authors.length > 0 && (
            <span className={cardStyles.cardAuthor}>
              {' · '}{authors.map(a => a.name).join(', ')}
            </span>
          )}
        </div>
        <Heading as="h3" className={cardStyles.cardTitle}>
          <Link href={permalink}>{title}</Link>
        </Heading>
        {description && (
          <p className={cardStyles.cardDescription}>{description}</p>
        )}
        <div className={cardStyles.cardFooter}>
          <Link
            href={permalink}
            className={cardStyles.readMore}
            aria-label={`Read more about ${title}`}
          >
            Read more →
          </Link>
          {tags && tags.length > 0 && (
            <div className={cardStyles.cardTags}>
              {tags.map(tag => (
                <Link key={tag.permalink} href={tag.permalink} className={cardStyles.cardTag}>
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

function YearSection({year, posts}) {
  return (
    <section className={styles.yearSection}>
      <div className={styles.yearHeading}>
        <span className={styles.yearBadge}>{year}</span>
        <span className={styles.yearCount}>{posts.length} post{posts.length !== 1 ? 's' : ''}</span>
      </div>
      <div className={cardStyles.grid}>
        {posts.map((post) => (
          <ArchivePostCard key={post.metadata.permalink} post={post} />
        ))}
      </div>
    </section>
  );
}

function listPostsByYears(blogPosts) {
  const postsByYear = blogPosts.reduce((acc, post) => {
    const year = post.metadata.date.split('-')[0];
    const yearPosts = acc.get(year) ?? [];
    return acc.set(year, [post, ...yearPosts]);
  }, new Map());
  return Array.from(postsByYear, ([year, posts]) => ({year, posts}));
}

export default function BlogArchive({archive}) {
  const title = translate({
    id: 'theme.blog.archive.title',
    message: 'Archive',
    description: 'The page & hero title of the blog archive page',
  });
  const years = listPostsByYears(archive.blogPosts);

  return (
    <>
      <PageMetadata title={title} description="All blog posts from HALT Rescue" />
      <Layout>
        <header className={styles.archiveHeader}>
          <div className={styles.archiveHeaderInner}>
            <Heading as="h1" className={styles.archiveTitle}>
              📚 Blog Archive
            </Heading>
            <p className={styles.archiveSubtitle}>
              All posts from Helping All Little Things Rescue
            </p>
          </div>
        </header>
        <main className={styles.archiveMain}>
          <div className="container">
            {years.length > 0
              ? years.map(({year, posts}) => (
                  <YearSection key={year} year={year} posts={posts} />
                ))
              : <p>No posts found.</p>
            }
          </div>
        </main>
      </Layout>
    </>
  );
}

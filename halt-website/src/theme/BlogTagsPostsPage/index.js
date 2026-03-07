import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useBlogTagsPostsPageTitle} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import Unlisted from '@theme/ContentVisibility/Unlisted';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/** Map tag slugs to default kawaii images */
const TAG_DEFAULT_IMAGES = {
  adoptables:   '/img/tags/adoptables.png',
  adoptions:    '/img/tags/adoptions.png',
  chinchillas:  '/img/tags/chinchillas.png',
  educational:  '/img/tags/educational.png',
  fundraiser:   '/img/tags/fundraiser.png',
  guineapigs:   '/img/tags/guineapigs.png',
  hamsters:     '/img/tags/hamsters.png',
  humans:       '/img/tags/humans.png',
  lethalwhite:  '/img/tags/lethalwhite.png',
  medical:      '/img/tags/medical.png',
  mice:         '/img/tags/mice.png',
  news:         '/img/tags/news.png',
  rainbowbridge:'/img/tags/rainbowbridge.png',
  sanctuary:    '/img/tags/sanctuary.png',
  satin:        '/img/tags/satin.png',
};

function getDefaultImage(tagLabel) {
  const slug = tagLabel?.toLowerCase().replace(/\s+/g, '');
  return TAG_DEFAULT_IMAGES[slug] || '/img/tags/guineapigs.png';
}

function PostCard({ item, tagLabel }) {
  const { content: BlogPostContent } = item;
  const { metadata } = BlogPostContent;
  const { permalink, title, description, date, tags, authors, frontMatter } = metadata;
  const image = frontMatter?.image;

  const displayImage = image || getDefaultImage(tagLabel);
  const dateObj = new Date(date);
  const dateStr = dateObj.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <article className={styles.card}>
      <Link href={permalink} className={styles.cardImageLink} aria-hidden="true" tabIndex="-1">
        <div className={styles.cardImageWrapper}>
          <img
            src={displayImage}
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
          <Link href={permalink} className={styles.readMore} aria-label={`Read more about ${title}`}>
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

function BlogTagsPostsPageMetadata({tag}) {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    <>
      <PageMetadata title={title} description={tag.description} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  );
}

function BlogTagsPostsPageContent({tag, items, sidebar, listMetadata}) {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    <BlogLayout sidebar={sidebar}>
      {tag.unlisted && <Unlisted />}

      {/* Tag page header with default image banner */}
      <header className={styles.tagHeader}>
        <div
          className={styles.tagBanner}
          style={{ backgroundImage: `url(${getDefaultImage(tag.label)})` }}
          aria-hidden="true"
        />
        <div className={styles.tagHeaderContent}>
          <Heading as="h1" className={styles.tagTitle}>{title}</Heading>
          {tag.description && <p className={styles.tagDescription}>{tag.description}</p>}
          <Link href={tag.allTagsPath} className={styles.allTagsLink}>
            <Translate
              id="theme.tags.tagsPageLink"
              description="The label of the link targeting the tag list page">
              ← View All Tags
            </Translate>
          </Link>
        </div>
      </header>

      {/* Post cards grid */}
      <div className={styles.grid}>
        {items.map((item) => (
          <PostCard
            key={item.content.metadata.permalink}
            item={item}
            tagLabel={tag.label}
          />
        ))}
      </div>

      <BlogListPaginator metadata={listMetadata} />
    </BlogLayout>
  );
}

export default function BlogTagsPostsPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}>
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}

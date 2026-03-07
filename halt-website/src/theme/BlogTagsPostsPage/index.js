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
import PostCard, {TAG_DEFAULT_IMAGES} from '@site/src/components/PostCard';
import cardStyles from '@site/src/components/PostCard/styles.module.css';
import styles from './styles.module.css';

function getDefaultImage(tagLabel) {
  const slug = tagLabel?.toLowerCase().replace(/\s+/g, '');
  return TAG_DEFAULT_IMAGES[slug] || '/img/tags/guineapigs.png';
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
      <div className={cardStyles.grid}>
        {items.map((item) => (
          <PostCard
            key={item.content.metadata.permalink}
            item={item}
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

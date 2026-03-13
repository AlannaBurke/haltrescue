import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import PostCard from '@site/src/components/PostCard';
import cardStyles from '@site/src/components/PostCard/styles.module.css';
function BlogListPageMetadata(props) {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}
function BlogListPageContent(props) {
  const {metadata, items, sidebar} = props;
  const {blogTitle} = metadata;
  return (
    <BlogLayout sidebar={sidebar}>
      {blogTitle && (
        <header style={{marginBottom: '2rem'}}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--ifm-color-primary)',
            marginBottom: '0.25rem',
          }}>
            {blogTitle}
          </h1>
          <p style={{color: 'var(--ifm-color-emphasis-800)', fontSize: '0.95rem', margin: 0}}>
            Updates, stories, and news from the rescue
          </p>
        </header>
      )}
      <div className={cardStyles.grid}>
        {items.map((item) => (
          <PostCard key={item.content.metadata.permalink} item={item} />
        ))}
      </div>
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}
export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}

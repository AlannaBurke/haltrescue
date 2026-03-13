import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import VetDisclaimer from '@site/src/components/VetDisclaimer';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

export default function LayoutWrapper(props) {
  const { metadata } = useDoc();
  // Don't show the disclaimer on auto-generated category index pages
  const isCategoryIndex = metadata?.id?.endsWith('/index') ||
    metadata?.frontMatter?.hide_table_of_contents === true && !metadata?.editUrl;
  return (
    <>
      <Layout {...props} />
      {!isCategoryIndex && <VetDisclaimer />}
    </>
  );
}

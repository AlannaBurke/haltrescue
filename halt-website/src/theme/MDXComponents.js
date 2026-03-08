// Docusaurus theme swizzle: MDXComponents
// This file extends the default MDX component map so that <Caption> and
// <SensitiveImage> are available in every .mdx blog post and doc page
// without needing an explicit import statement.
//
// See: https://docusaurus.io/docs/markdown-features/react#mdx-component-scope

import React from 'react';
// Re-export everything from the original theme
import MDXComponents from '@theme-original/MDXComponents';
import Caption from '@site/src/components/Caption';
import SensitiveImage from '@site/src/components/SensitiveImage';
import SupportUs from '@site/src/components/SupportUs';
import InfographicShare from '@site/src/components/InfographicShare';

export default {
  // Spread all the original Docusaurus MDX components
  ...MDXComponents,
  // Add our custom components
  Caption,
  SensitiveImage,
  SupportUs,
  InfographicShare,
};

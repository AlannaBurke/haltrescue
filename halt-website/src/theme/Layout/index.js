import React from 'react';
import Layout from '@theme-original/Layout';
import MobileNavBar from '@site/src/components/MobileNavBar';
import FloatingCartButton from '@site/src/components/FloatingCartButton';
import NewsBanners from '@site/src/components/NewsBanners';

export default function LayoutWrapper(props) {
  return (
    <>
      <NewsBanners />
      <Layout {...props} />
      <MobileNavBar />
      <FloatingCartButton />
    </>
  );
}

import React from 'react';
import Layout from '@theme-original/Layout';
import MobileNavBar from '@site/src/components/MobileNavBar';

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <MobileNavBar />
    </>
  );
}

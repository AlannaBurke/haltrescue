import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import VetDisclaimer from '@site/src/components/VetDisclaimer';

export default function LayoutWrapper(props) {
  return (
    <>
      <VetDisclaimer />
      <Layout {...props} />
    </>
  );
}

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../../pages/404.module.css';

// Swizzled NotFound component — overrides Docusaurus's default client-side 404
// so that client-side navigation to unknown routes shows our custom kawaii page
// instead of the plain default "Page Not Found" text.
export default function NotFound() {
  return (
    <Layout title="Page Not Found" description="Oops! This page has gone missing.">
      <div className={styles.container}>
        <div className={styles.card}>
          <img
            src="/img/404/404-critter.png"
            alt="A confused guinea pig holding a map, with a rabbit, hamster, and chinchilla peeking in curiously"
            className={styles.illustration}
          />
          <h1 className={styles.title}>404</h1>
          <p className={styles.subtitle}>Uh oh — this page has gone missing!</p>
          <p className={styles.body}>
            Our little guinea pig searched the whole map but couldn't find what you were looking for.
            The page may have moved, been renamed, or never existed in the first place.
          </p>
          <div className={styles.buttons}>
            <Link className={styles.primaryBtn} to="/">
              Take Me Home
            </Link>
            <Link className={styles.secondaryBtn} to="/docs/intro">
              Browse Resources
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

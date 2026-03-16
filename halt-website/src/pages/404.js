import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './404.module.css';

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
            <Link className={styles.secondaryBtn} to="/docs">
              Browse Resources
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

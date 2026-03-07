import React from 'react';
import styles from './styles.module.css';

/**
 * Caption — wraps an image (or any content) with a styled figure caption.
 *
 * Usage in .mdx files:
 *
 *   <Caption text="Boba recovering after surgery, October 2024">
 *     ![Boba the guinea pig resting in a fleece bed](./boba-recovery.jpeg)
 *   </Caption>
 */
export default function Caption({ children, text }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.imageWrapper}>{children}</div>
      {text && (
        <figcaption className={styles.caption}>
          {text}
        </figcaption>
      )}
    </figure>
  );
}

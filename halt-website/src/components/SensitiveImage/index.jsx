import React, { useState } from 'react';
import styles from './styles.module.css';

/**
 * SensitiveImage — displays an image blurred with a warning overlay.
 * The viewer must click to reveal it. Clicking again re-blurs it.
 *
 * Usage in .mdx files:
 *
 *   <SensitiveImage
 *     src="./boba-incision.jpeg"
 *     alt="Boba's surgical incision site, post-op day 1"
 *     caption="Boba's incision after tumor removal surgery, October 2024"
 *     warning="This photo shows a post-surgical incision."
 *   />
 *
 * Props:
 *   src       — image path (relative to the post/doc, or absolute URL)
 *   alt       — descriptive alt text (required for accessibility)
 *   caption   — optional caption shown below the image
 *   warning   — optional custom warning text (defaults to a standard message)
 */
export default function SensitiveImage({
  src,
  alt,
  caption,
  warning = 'This image contains sensitive content (e.g. medical or surgical photos).',
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <figure className={styles.figure}>
      <div
        className={`${styles.imageContainer} ${revealed ? styles.revealed : styles.blurred}`}
        onClick={() => setRevealed((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-label={
          revealed
            ? `Hide sensitive image: ${alt}`
            : `Show sensitive image: ${alt}`
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setRevealed((prev) => !prev);
          }
        }}
      >
        <img
          src={src}
          alt={alt}
          className={styles.image}
          draggable={false}
        />

        {!revealed && (
          <div className={styles.overlay} aria-hidden="true">
            <div className={styles.overlayContent}>
              <span className={styles.warningIcon} aria-hidden="true">⚠️</span>
              <p className={styles.warningText}>{warning}</p>
              <span className={styles.revealBtn}>Click to view</span>
            </div>
          </div>
        )}

        {revealed && (
          <div className={styles.hideHint} aria-hidden="true">
            Click to hide
          </div>
        )}
      </div>

      {caption && (
        <figcaption className={styles.caption}>{caption}</figcaption>
      )}
    </figure>
  );
}

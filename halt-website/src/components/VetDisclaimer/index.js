import React from 'react';
import styles from './styles.module.css';

/**
 * VetDisclaimer — a reusable disclaimer box to be placed before the
 * References section on all resource/care guide pages.
 *
 * Usage in MDX:
 *   import VetDisclaimer from '@site/src/components/VetDisclaimer';
 *   <VetDisclaimer />
 */
export default function VetDisclaimer() {
  return (
    <div className={styles.disclaimer}>
      <div className={styles.icon} aria-hidden="true">🩺</div>
      <div className={styles.content}>
        <strong className={styles.heading}>Important: This is not a substitute for veterinary care.</strong>
        <p className={styles.body}>
          The information on this page is provided for educational purposes only. It is not intended to replace
          professional veterinary advice, diagnosis, or treatment. If you suspect your pet is ill, injured, or
          in distress, <strong>contact a licensed veterinarian immediately</strong>. Do not attempt any medical
          treatments, procedures, or dietary changes without the guidance and supervision of a qualified
          veterinary professional.
        </p>
      </div>
    </div>
  );
}

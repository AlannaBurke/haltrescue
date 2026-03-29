/**
 * HALT Rescue — Adoptables Page
 * Design: Kawaii warmth, teal + coral palette, Nunito font, generous whitespace
 * Features: Hero banner, intro copy, Petfinder pet-scroller widget, apply CTA
 *
 * Widget: Uses Petfinder's pet-scroller.bundle.js custom element.
 * Organization ID: NJ654
 */

import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './adoptables.module.css';

const HERO_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663404885239/ir8ZBMkrEmipstzK2EZ9Vs/adoptables-hero-9FCsaKZXhQBwLeX2rTCqfB.webp';

function PetfinderWidget() {
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || !containerRef.current) return;
    scriptLoaded.current = true;

    // Build the <pet-scroller> custom element with the correct attributes
    const scroller = document.createElement('pet-scroller');
    scroller.setAttribute('s3Url', 'https://dbw3zep4prcju.cloudfront.net/');
    scroller.setAttribute('apiBase', 'https://psl.petfinder.com/graphql');
    scroller.setAttribute('organization', '["NJ654"]');
    scroller.setAttribute('status', 'adoptable');
    scroller.setAttribute('petfinderUrl', 'https://www.petfinder.com/');
    scroller.setAttribute('hideBreed', 'true');
    scroller.setAttribute('limit', '24');
    scroller.setAttribute('petListTitle', '');
    containerRef.current.appendChild(scroller);

    // Load the Petfinder widget bundle
    const script = document.createElement('script');
    script.src = 'https://www.petfinder.com/pet-scroller.bundle.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={styles.widgetWrapper}>
      <div ref={containerRef} className={styles.petScrollerContainer} />
    </div>
  );
}

export default function AdoptablesPage() {
  return (
    <Layout
      title="Adopt a Small Animal | HALT Rescue"
      description="Meet our adoptable small animals — guinea pigs, rats, rabbits, hamsters, chinchillas, and more — all looking for their forever homes."
    >
      <Head>
        <meta property="og:image" content={HERO_IMAGE} />
      </Head>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <img
          src={HERO_IMAGE}
          alt="Adorable small animals waiting for their forever homes at HALT Rescue"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Helping All Little Things</p>
          <h1 className={styles.heroTitle}>Find Your Forever Friend</h1>
          <p className={styles.heroSubtitle}>
            Every animal here is loved, vetted, and ready to bring joy to your home.
            We rescue small animals across New England — guinea pigs, rats, rabbits,
            hamsters, chinchillas, mice, and more.
          </p>
          <div className={styles.heroCtas}>
            <a
              href="https://bit.ly/halt-adoption"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Apply to Adopt
            </a>
            <a
              href="https://bit.ly/halt-adoption"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              Foster an Animal
            </a>
          </div>
        </div>
      </section>

      {/* ── Info bar ─────────────────────────────────────────────────────── */}
      <section className={styles.infoBar}>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>🏠</span>
          <div>
            <strong>Foster-Based Rescue</strong>
            <span>All animals live in loving foster homes, not a shelter facility</span>
          </div>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>💉</span>
          <div>
            <strong>Fully Vetted</strong>
            <span>Health-checked, treated for any conditions, and ready to thrive</span>
          </div>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>💛</span>
          <div>
            <strong>Personality-Matched</strong>
            <span>We help match you with the right animal for your lifestyle</span>
          </div>
        </div>

      </section>

      {/* ── Widget section ───────────────────────────────────────────────── */}
      <main className={styles.main}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Animals Looking for Homes</h2>
          <p className={styles.sectionSubtitle}>
            Our adoptable animals are listed live on Petfinder and update automatically.
            Click any animal to learn more about their personality, history, and care needs.
          </p>
        </div>

        <PetfinderWidget />

        {/* ── Process section ──────────────────────────────────────────── */}
        <section className={styles.processSection}>
          <h2 className={styles.processSectionTitle}>How Adoption Works</h2>
          <div className={styles.processGrid}>
            <div className={styles.processStep}>
              <div className={styles.processNumber}>1</div>
              <h3>Browse &amp; Connect</h3>
              <p>
                Browse our available animals above. When you find a match, fill out
                our adoption application — it takes about 10 minutes.
              </p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.processNumber}>2</div>
              <h3>Application Review</h3>
              <p>
                Our team reviews your application and reaches out within a few days
                to discuss the animal, your home setup, and any questions.
              </p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.processNumber}>3</div>
              <h3>Meet Your Match</h3>
              <p>
                We arrange a meet-and-greet with your potential new family member,
                either in person or via video call, to make sure it's a great fit.
              </p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.processNumber}>4</div>
              <h3>Welcome Home!</h3>
              <p>
                Once approved, we coordinate the adoption, provide a care packet,
                and stay in touch to support you and your new companion.
              </p>
            </div>
          </div>
          <div className={styles.processCta}>
            <a
              href="https://bit.ly/halt-adoption"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              Start Your Application
            </a>
            <a href="/success-stories" className={styles.ctaGhost}>
              Read Success Stories →
            </a>
          </div>
        </section>

        {/* ── Not ready callout ────────────────────────────────────────── */}
        <section className={styles.fosterCallout}>
          <div className={styles.fosterCalloutInner}>
            <span className={styles.fosterCalloutIcon}>🏡</span>
            <div>
              <h3>Not Ready to Adopt? Consider Fostering!</h3>
              <p>
                Fostering saves lives. You provide a temporary home while we cover
                all veterinary costs — and you get to experience the joy of helping
                an animal on their journey to their forever home.
              </p>
              <a
                href="https://bit.ly/halt-adoption"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSecondarySmall}
              >
                Apply to Foster
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

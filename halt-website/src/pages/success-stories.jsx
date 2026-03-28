/**
 * HALT Rescue — Success Stories Page
 * Design: Kawaii / warm teal + coral palette, Nunito font
 *
 * Two sections:
 *   1. "Happy Endings" — animals that have been adopted / found their forever home
 *   2. "Meet Our Adoptables" — animals currently available for adoption
 */
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './success-stories.module.css';

/* ─────────────────────────────────────────────────────────────
   ADOPTED — confirmed forever homes
───────────────────────────────────────────────────────────── */
const ADOPTED = [
  {
    slug: 'po',
    title: 'Po Finds His Forever Home',
    date: 'June 1, 2025',
    desc: 'Po the hamster settled into his new kingdom and is living his very best life.',
    image: '/blog-img/po.jpg',
    tags: ['Hamsters'],
    blogPath: '/blog/po',
  },
  {
    slug: '6-8-adoptions',
    title: 'Sylvie, Checkers, Challah & Fortune — All Adopted!',
    date: 'June 8, 2025',
    desc: 'Four guinea pigs found loving forever homes in one wonderful day.',
    image: '/blog-img/adoptions.jpg',
    tags: ['Guinea Pigs'],
    blogPath: '/blog/6-8-adoptions',
  },
  {
    slug: '6-19-snowwhite',
    title: 'Snow White Finds Her Forever Family',
    date: 'June 19, 2025',
    desc: 'Snow White the guinea pig found her perfect home and is being thoroughly spoiled.',
    image: '/blog-img/snowwhite.jpg',
    tags: ['Guinea Pigs'],
    blogPath: '/blog/6-19-snowwhite',
  },
  {
    slug: '7-2-ziggy',
    title: 'Ziggy Stays in the HALT Family',
    date: 'July 2, 2025',
    desc: 'Ziggy was snatched up by Alanna before he even hit Petfinder — now living with two HALT alumni boys.',
    image: '/blog-img/ziggy.jpg',
    tags: ['Guinea Pigs'],
    blogPath: '/blog/7-2-ziggy',
  },
  {
    slug: '2026-foster-fail-jen-ratties',
    title: 'Foster Fail! Jen Keeps Her Ratties',
    date: 'January 1, 2026',
    desc: 'Sometimes the best adoption is when a foster parent simply can\'t let go. Jen\'s four rats are officially home forever.',
    image: '/blog-img/foster-fail-photo1.jpg',
    tags: ['Rats'],
    blogPath: '/blog/2026-foster-fail-jen-ratties',
  },
  {
    slug: 'umbreon-espeon-adoption-2026',
    title: 'Umbreon & Espeon Find Their Forever Home',
    date: 'January 5, 2026',
    desc: 'Our Pokémon-named guinea pig duo found a family who loves them just as much as we do.',
    image: '/blog-img/umbreon-espeon-photo1.jpg',
    tags: ['Guinea Pigs'],
    blogPath: '/blog/umbreon-espeon-adoption-2026',
  },
  {
    slug: 'ducky-joins-the-herd',
    title: 'Ducky Joins the Herd',
    date: 'January 30, 2026',
    desc: 'Abandoned in a cardboard box, Ducky found her place in the resident herd and never looked back.',
    image: '/blog-img/ducky-photo1.jpg',
    tags: ['Guinea Pigs'],
    blogPath: '/blog/ducky-joins-the-herd',
  },
];

/* ─────────────────────────────────────────────────────────────
   ADOPTABLE — still looking for their forever home
───────────────────────────────────────────────────────────── */
const ADOPTABLE = [
  {
    slug: 'julius-cheeser-forever-home',
    title: 'Julius Cheeser Is Looking for His Forever Home',
    date: 'January 11, 2026',
    desc: 'Found in a storm drain on Long Island, Julius has come so far. He\'s a champion burrower, a secret wheel athlete, and ready for a patient family.',
    image: '/blog-img/julius-cheeser-photo1.jpg',
    tags: ['Mice'],
    blogPath: '/blog/julius-cheeser-forever-home',
  },
];

/* ─────────────────────────────────────────────────────────────
   Tag color map
───────────────────────────────────────────────────────────── */
const TAG_COLORS = {
  'Guinea Pigs': { bg: '#e0f5f7', text: '#0a6067' },
  Hamsters:      { bg: '#fdecea', text: '#c45f54' },
  Rats:          { bg: '#f3eeff', text: '#6b4fa0' },
  Mice:          { bg: '#fff3e0', text: '#a05a00' },
  Rabbits:       { bg: '#e8f5e9', text: '#2e7d32' },
};

function TagPill({ label }) {
  const style = TAG_COLORS[label] || { bg: '#f0f0f0', text: '#444' };
  return (
    <span className={styles.tagPill} style={{ backgroundColor: style.bg, color: style.text }}>
      {label}
    </span>
  );
}

function StoryCard({ story, adoptable }) {
  return (
    <article className={`${styles.card} ${adoptable ? styles.cardAdoptable : ''}`}>
      <Link href={story.blogPath} className={styles.cardImageLink} aria-hidden="true" tabIndex="-1">
        <div className={styles.cardImageWrapper}>
          {adoptable && <div className={styles.adoptableBadge}>Looking for a Home</div>}
          <img
            src={story.image}
            alt={story.title}
            className={styles.cardImage}
            loading="lazy"
            onError={(e) => { e.target.src = '/img/tags/success-stories.png'; }}
          />
        </div>
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <time className={styles.cardDate}>{story.date}</time>
        </div>
        <h3 className={styles.cardTitle}>
          <Link href={story.blogPath}>{story.title}</Link>
        </h3>
        {story.desc && <p className={styles.cardDesc}>{story.desc}</p>}
        <div className={styles.cardFooter}>
          <Link href={story.blogPath} className={adoptable ? styles.readMoreAdoptable : styles.readMore}>
            {adoptable ? 'Meet them →' : 'Read the story →'}
          </Link>
          <div className={styles.cardTags}>
            {story.tags.map((t) => <TagPill key={t} label={t} />)}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function SuccessStoriesPage() {
  return (
    <Layout
      title="Success Stories"
      description="Celebrating every adoption and happy ending from Helping All Little Things Rescue."
    >
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className={styles.hero}>
        <img
          src="/img/success-stories-hero.png"
          alt="Rescued animals celebrating their forever homes"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>Helping All Little Things Rescue</div>
          <h1 className={styles.heroTitle}>Success Stories</h1>
          <p className={styles.heroSubtitle}>
            Every adoption is a victory. Here we celebrate the animals who found
            their forever homes — and the people who opened their hearts.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>110</span>
              <span className={styles.heroStatLabel}>Animals placed in 2025</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>{ADOPTED.length}</span>
              <span className={styles.heroStatLabel}>Happy endings shared</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>{ADOPTABLE.length}</span>
              <span className={styles.heroStatLabel}>Waiting for their home</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Intro ─────────────────────────────────────────── */}
      <div className={styles.introSection}>
        <div className={styles.introInner}>
          <p className={styles.introText}>
            Behind every adoption is a story of resilience, love, and second chances.
            These are the animals who came to us scared, sick, or simply in need —
            and found families who gave them everything.
          </p>
          <div className={styles.introActions}>
            <Link href="https://bit.ly/halt-adoption" className={styles.btnPrimary}>
              Adopt an Animal
            </Link>
            <Link href="/blog/tags/success-stories" className={styles.btnSecondary}>
              Browse All Stories
            </Link>
          </div>
        </div>
      </div>

      {/* ── Adoptable Section ────────────────────────────── */}
      {ADOPTABLE.length > 0 && (
        <div className={styles.adoptableSection}>
          <div className={styles.gridInner}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionEyebrow}>Ready for a Forever Home</div>
              <h2 className={styles.sectionHeading}>Meet Our Adoptables</h2>
              <p className={styles.sectionSubtext}>
                These animals are in our care right now and looking for their perfect match.
                Could that be you?
              </p>
            </div>
            <div className={`${styles.grid} ${ADOPTABLE.length === 1 ? styles.gridCentered : ''}`}>
              {ADOPTABLE.map((story) => (
                <StoryCard key={story.slug} story={story} adoptable={true} />
              ))}
            </div>
            <div className={styles.adoptableCta}>
              <Link href="https://bit.ly/halt-adoption" className={styles.btnPrimary}>
                Apply to Adopt
              </Link>
              <Link
                href="https://www.petfinder.com/member/us/nh/deerfield/helping-all-little-pipsqueaks-nj654/"
                className={styles.btnSecondary}
              >
                View All on Petfinder
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Happy Endings Grid ───────────────────────────── */}
      <div className={styles.gridSection}>
        <div className={styles.gridInner}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>Forever Homes Found</div>
            <h2 className={styles.sectionHeading}>Happy Endings</h2>
            <p className={styles.sectionSubtext}>
              These animals have found their people. Their stories are worth celebrating.
            </p>
          </div>
          <div className={styles.grid}>
            {ADOPTED.slice().reverse().map((story) => (
              <StoryCard key={story.slug} story={story} adoptable={false} />
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA Banner ───────────────────────────────────── */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Could Your Story Be Next?</h2>
          <p className={styles.ctaText}>
            We have small animals of all kinds waiting for their forever homes —
            guinea pigs, rats, hamsters, mice, rabbits, and more.
          </p>
          <Link href="https://bit.ly/halt-adoption" className={styles.ctaBtn}>
            Meet Our Adoptables on Petfinder
          </Link>
        </div>
      </div>
    </Layout>
  );
}

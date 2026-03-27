/**
 * HALT Rescue — Success Stories Page
 * Design: Kawaii / warm teal + coral palette, Nunito font
 * Shows a hero banner, intro text, and a card grid of all adoption/success posts
 * with the actual post photo as the card image.
 */
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './success-stories.module.css';

/**
 * Static list of success-story posts.
 * Each entry has: slug (blog permalink slug), title, date, description,
 * image (relative to /blog/<folder>/), tags, and a human-readable date.
 *
 * To add a new story: add an entry here AND tag the blog post with
 * "success-stories" or "adoptions".
 */
const STORIES = [
  {
    slug: 'po',
    title: 'Adoption Alert — Po',
    date: 'June 1, 2025',
    desc: 'Po the hamster found his perfect family and is living his best life.',
    image: '/blog-img/po.jpg',
    tags: ['Hamsters', 'Adoptions'],
    blogPath: '/blog/po',
  },
  {
    slug: '6-8-adoptions',
    title: 'Sylvie, Checkers, Challah & Fortune Find Homes!',
    date: 'June 8, 2025',
    desc: 'Four guinea pigs found loving forever homes in one wonderful week.',
    image: '/blog-img/adoptions.jpg',
    tags: ['Guinea Pigs', 'Adoptions'],
    blogPath: '/blog/6-8-adoptions',
  },
  {
    slug: '6-19-snowwhite',
    title: 'Adoption Alert — Snow White',
    date: 'June 19, 2025',
    desc: 'Snow White the guinea pig found her forever family.',
    image: '/blog-img/snowwhite.jpg',
    tags: ['Guinea Pigs', 'Adoptions'],
    blogPath: '/blog/6-19-snowwhite',
  },
  {
    slug: '7-2-ziggy',
    title: 'Adoption Alert — Ziggy',
    date: 'July 2, 2025',
    desc: 'Ziggy the guinea pig is off to his forever home.',
    image: '/blog-img/ziggy.jpg',
    tags: ['Guinea Pigs', 'Adoptions'],
    blogPath: '/blog/7-2-ziggy',
  },
  {
    slug: '2026-foster-fail-jen-ratties',
    title: 'Foster Fail! Jen Keeps Her Ratties',
    date: 'January 1, 2026',
    desc: 'Sometimes the best adoption is when a foster parent can\'t let go — Jen\'s four rats officially became permanent family.',
    image: '/blog-img/foster-fail-photo1.jpg',
    tags: ['Rats', 'Success Stories'],
    blogPath: '/blog/2026-foster-fail-jen-ratties',
  },
  {
    slug: 'umbreon-espeon-adoption-2026',
    title: 'Umbreon & Espeon Find Their Forever Home',
    date: 'January 5, 2026',
    desc: 'Our Pokémon-named guinea pig duo found a family who loves them just as much as we do.',
    image: '/blog-img/umbreon-espeon-photo1.jpg',
    tags: ['Guinea Pigs', 'Success Stories'],
    blogPath: '/blog/umbreon-espeon-adoption-2026',
  },
  {
    slug: 'julius-cheeser-forever-home',
    title: 'Julius Cheeser: From Storm Drain to Forever Home',
    date: 'January 11, 2026',
    desc: 'Found alone in a storm drain, Julius Cheeser the mouse went from rescue to royalty in record time.',
    image: '/blog-img/julius-cheeser-photo1.jpg',
    tags: ['Mice', 'Success Stories'],
    blogPath: '/blog/julius-cheeser-forever-home',
  },
  {
    slug: 'ducky-joins-the-herd',
    title: 'Ducky Joins the Herd: A Happy Ending for Our Box Baby',
    date: 'January 30, 2026',
    desc: 'Abandoned in a cardboard box, Ducky the guinea pig found a loving herd and a forever family.',
    image: '/blog-img/ducky-photo1.jpg',
    tags: ['Guinea Pigs', 'Success Stories'],
    blogPath: '/blog/ducky-joins-the-herd',
  },
];

const TAG_COLORS = {
  'Guinea Pigs': { bg: '#e0f5f7', text: '#0a6067' },
  Hamsters:      { bg: '#fdecea', text: '#c45f54' },
  Rats:          { bg: '#f3eeff', text: '#6b4fa0' },
  Mice:          { bg: '#fff3e0', text: '#a05a00' },
  Rabbits:       { bg: '#e8f5e9', text: '#2e7d32' },
  Adoptions:     { bg: '#e0f5f7', text: '#0a6067' },
  'Success Stories': { bg: '#fce4ec', text: '#880e4f' },
};

function TagPill({ label }) {
  const style = TAG_COLORS[label] || { bg: '#f0f0f0', text: '#444' };
  return (
    <span
      className={styles.tagPill}
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {label}
    </span>
  );
}

function StoryCard({ story }) {
  return (
    <article className={styles.card}>
      <Link href={story.blogPath} className={styles.cardImageLink} aria-hidden="true" tabIndex="-1">
        <div className={styles.cardImageWrapper}>
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
        <h2 className={styles.cardTitle}>
          <Link href={story.blogPath}>{story.title}</Link>
        </h2>
        {story.desc && <p className={styles.cardDesc}>{story.desc}</p>}
        <div className={styles.cardFooter}>
          <Link href={story.blogPath} className={styles.readMore}>
            Read the story →
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
              <span className={styles.heroStatNumber}>110+</span>
              <span className={styles.heroStatLabel}>Animals placed in 2025</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>{STORIES.length}</span>
              <span className={styles.heroStatLabel}>Stories shared</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>∞</span>
              <span className={styles.heroStatLabel}>Happy endings</span>
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

      {/* ── Cards Grid ───────────────────────────────────── */}
      <div className={styles.gridSection}>
        <div className={styles.gridInner}>
          <h2 className={styles.gridHeading}>Recent Happy Endings</h2>
          <div className={styles.grid}>
            {STORIES.slice().reverse().map((story) => (
              <StoryCard key={story.slug} story={story} />
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
            Meet Our Adoptables
          </Link>
        </div>
      </div>
    </Layout>
  );
}

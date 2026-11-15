import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import styles from './free-ways-to-support.module.css';

// Free ways to support the rescue: shop-through links where HALT earns a
// commission at no extra cost to the buyer, plus following and interacting
// on Facebook, where HALT earns through the creator program.
const WAYS = [
  {
    emoji: '🛍️',
    title: 'Shop through iGive',
    text: 'Join iGive, choose Helping All Little Things as your cause, and shop at more than 2,000 stores the way you normally would. A percentage of what you spend comes back to the rescue, at no extra cost to you.',
    linkLabel: 'Choose us on iGive',
    href: 'https://www.iGive.com/HelpingAllLittleThings',
  },
  {
    emoji: '🐾',
    title: 'Shop our Chewy storefront',
    text: 'Buying the food, hay, and supplies you already need through our Chewy storefront earns the rescue a commission on your order.',
    linkLabel: 'Visit our Chewy storefront',
    href: 'https://chewpanions.chewy.com/840da941987',
  },
  {
    emoji: '🎁',
    title: 'New to Chewy? Earn us $20',
    text: 'If you have never ordered from Chewy before, shop through our rescue referral link for your first order and Chewy sends the rescue $20, at no extra cost to you.',
    linkLabel: 'Use our new-shopper link',
    href: 'https://chewyshelterandrescue.sjv.io/c/8148608/2941955/34823',
  },
  {
    emoji: '📦',
    title: 'Start your Amazon shopping with our link',
    text: 'Click through our Amazon link before you shop for anything, and Amazon may pay the rescue a small commission on your order, at no extra cost to you.',
    linkLabel: 'Shop Amazon with our link',
    href: 'https://www.amazon.com/?tag=haltrescue-20',
  },
  {
    emoji: '💬',
    title: 'Follow and interact on Facebook',
    text: 'Helping All Little Things is in the Facebook creator program, which means we earn when people watch, like, comment on, and share our posts. Following our Page and joining the conversation genuinely helps feed the animals.',
    linkLabel: 'Follow us on Facebook',
    href: 'https://www.facebook.com/HALTRescue',
  },
  {
    emoji: '🥕',
    title: 'Donate your garden extras',
    text: 'Gardeners near Deerfield, New Hampshire, or Flanders or Madison, New Jersey: extra vegetables from your garden make wonderful meals for our guinea pigs and rabbits.',
    linkLabel: 'See volunteering',
    to: '/volunteer',
  },
];

export default function FreeWaysToSupport() {
  return (
    <Layout
      title="Free Ways to Support"
      description="Support Helping All Little Things for free: shop through iGive, Chewy, and Amazon links, follow and interact on Facebook, or donate garden vegetables.">
      <Head>
        <meta property="og:title" content="Free Ways to Support | Helping All Little Things" />
        <meta
          property="og:description"
          content="No spare change needed. These everyday actions support more than 200 rescued small animals at no extra cost to you."
        />
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1>Free Ways to Support</h1>
          <p>
            You can help more than 200 rescued small animals without spending an extra cent.
            Shop through our links, interact with our posts, or share your garden extras.
          </p>
        </section>

        <section className={styles.grid}>
          {WAYS.map((way) => (
            <article key={way.title} className={styles.card}>
              <div className={styles.cardEmoji} aria-hidden="true">{way.emoji}</div>
              <h2 className={styles.cardTitle}>{way.title}</h2>
              <p className={styles.cardText}>{way.text}</p>
              {way.href && (
                <a
                  className={styles.cardLink}
                  href={way.href}
                  target="_blank"
                  rel="noopener noreferrer">
                  {way.linkLabel} →
                </a>
              )}
              {way.to && (
                <Link className={styles.cardLink} to={way.to}>
                  {way.linkLabel} →
                </Link>
              )}
            </article>
          ))}
        </section>

        <section className={styles.closing}>
          <p className={styles.disclosure}>
            When you buy through the shopping links on this page, Helping All Little Things may
            earn a commission at no extra cost to you. Looking for the specific products we use
            and love? See our <Link to="/affiliate-products">affiliate products</Link>. Want to
            give directly instead? <Link to="/donate">Donate here</Link>.
          </p>
        </section>
      </main>
    </Layout>
  );
}

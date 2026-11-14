import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import styles from './volunteer.module.css';

// The volunteer interest form (Google Form, responses feed a Sheet and
// email info@ and admin@). Swap this URL if the form is ever replaced.
const VOLUNTEER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeeH8FoK1ktMUSMrc_ZTkxb69KbFma3j0CMONr2mzyTJgw0zQ/viewform';

const AREAS = [
  {
    emoji: '🏠',
    title: 'Foster a Small Animal',
    text: 'Open your home to a guinea pig, rabbit, hamster, or other small animal while they wait for their forever family. We provide guidance and support, and fostering truly saves lives.',
    linkLabel: 'Foster and adoption application',
    href: 'https://bit.ly/halt-adoption',
  },
  {
    emoji: '🚗',
    title: 'Drive Transports',
    text: 'Help move rabbits and small animals safely between shelters, fosters, and adopters, one driving leg at a time. We also take part in the Bunderground Railroad, the volunteer transport network for rabbits.',
    linkLabel: 'The Bunderground Railroad on Facebook',
    href: 'https://www.facebook.com/The-Bunderground-Railroad-101587966580411/',
  },
  {
    emoji: '📝',
    title: 'Grant Applications',
    text: 'Help us find grants, track deadlines, and write applications. Grant funding keeps the food, bedding, and vet care coming for more than 200 animals.',
  },
  {
    emoji: '📱',
    title: 'Social Media',
    text: 'Take photos, share stories, and help our posts reach more people. Every share helps the animals get seen.',
  },
  {
    emoji: '💻',
    title: 'Website Management',
    text: 'Our website runs on JavaScript, and we are building an open source system so other rescues can run high tech websites at the level of an SPCA. Developers, testers, and tinkerers are all welcome.',
  },
  {
    emoji: '🌍',
    title: 'Translation',
    text: 'Speak another language? Help us translate care guides and posts so small animal care reaches international audiences.',
  },
  {
    emoji: '🎨',
    title: 'Art and Graphics',
    text: 'We want to replace many of our website graphics with original art, and we want to work with human artists to do it. Illustrators and designers, we would love to see your work.',
  },
  {
    emoji: '🥕',
    title: 'Gardening',
    text: 'Gardeners near Deerfield, New Hampshire, or Flanders or Madison, New Jersey: extra vegetables from your garden can go straight to our guinea pigs and rabbits. Fresh produce helps provide our piggies with the nutrients they need.',
  },
  {
    emoji: '📣',
    title: 'Business and Advertising',
    text: 'Experience with marketing, partnerships, fundraising, or advertising? Help us grow so we can help more animals.',
  },
  {
    emoji: '✨',
    title: 'Anything Else',
    text: 'Have a skill that is not on this list? If it helps animals, we can probably use it. Tell us what you love to do.',
  },
];

export default function Volunteer() {
  return (
    <Layout
      title="Volunteer"
      description="Volunteer with Helping All Little Things, an all-volunteer small animal rescue and sanctuary. Foster, transport, write grants, help with social media, the website, art, gardening, and more.">
      <Head>
        <meta property="og:title" content="Volunteer | Helping All Little Things" />
        <meta
          property="og:description"
          content="Helping All Little Things is run entirely by volunteers. See the many ways you can help more than 200 rescued small animals."
        />
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1>Volunteer With Us</h1>
          <p>
            Helping All Little Things is run entirely by volunteers, caring for more than 200
            guinea pigs, rabbits, hamsters, cats, and other small animals. Whatever your skills,
            there is a way to help.
          </p>
          <a
            className={styles.ctaButton}
            href={VOLUNTEER_FORM_URL}
            target="_blank"
            rel="noopener noreferrer">
            Tell us how you would like to help
          </a>
        </section>

        <section className={styles.grid}>
          {AREAS.map((area) => (
            <article key={area.title} className={styles.card}>
              <div className={styles.cardEmoji} aria-hidden="true">{area.emoji}</div>
              <h2 className={styles.cardTitle}>{area.title}</h2>
              <p className={styles.cardText}>{area.text}</p>
              {area.href && (
                <a
                  className={styles.cardLink}
                  href={area.href}
                  target="_blank"
                  rel="noopener noreferrer">
                  {area.linkLabel} →
                </a>
              )}
            </article>
          ))}
        </section>

        <section className={styles.closing}>
          <h2>Ready to help?</h2>
          <p>
            Fill out our short volunteer interest form and tell us what you would like to do.
            Thank you for offering to help all little things.
          </p>
          <a
            className={styles.ctaButton}
            href={VOLUNTEER_FORM_URL}
            target="_blank"
            rel="noopener noreferrer">
            Open the volunteer form
          </a>
          <p className={styles.altWays}>
            Short on time instead? See the <Link to="/free-ways-to-support">free ways to support</Link> the
            rescue, or <Link to="/donate">make a donation</Link>.
          </p>
        </section>
      </main>
    </Layout>
  );
}

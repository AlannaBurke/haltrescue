import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import heroBannerUrl from '@site/static/img/hero-banner.png';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <div className="halt-hero-buttons">
          <Link
            className="button button--primary"
            to="https://bit.ly/halt-adoption"
            aria-label="Apply to adopt or foster a small animal">
            🐾 Adopt or Foster
          </Link>
          <Link
            className="button button--secondary"
            to="/blog"
            aria-label="Read our rescue blog">
            📖 Read Our Blog
          </Link>
          <Link
            className="button button--secondary"
            to="https://www.paypal.com/ncp/payment/8SJFNZQVMQ452"
            aria-label="Donate to support the rescue">
            💛 Donate
          </Link>
        </div>

        <img
          src={heroBannerUrl}
          alt="Adorable illustration of a rabbit, guinea pigs, chinchilla, and hamster peeking through flowers"
          className="halt-hero-banner"
          loading="eager"
          width="820"
          height="348"
        />
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome | ${siteConfig.title}`}
      description="Helping All Little Things is a 501(c)(3) nonprofit rescue dedicated to small animals — rabbits, guinea pigs, chinchillas, hamsters, and more — based in New Hampshire.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

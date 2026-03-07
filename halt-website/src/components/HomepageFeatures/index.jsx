import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Rescuing Small Animals',
    icon: require('@site/static/img/icon-rescue.png').default,
    iconAlt: 'Illustration of gentle hands cupping a tiny guinea pig surrounded by hearts',
    description: (
      <>
        Helping All Little Things is a dedicated rescue that focuses on small animals,
        providing them with love, care, and, in some cases, hospice care for those in need.
        Based in New Hampshire and operating as a 501(c)(3) nonprofit organization, we're
        passionate about giving vulnerable animals the attention and medical care they deserve.
      </>
    ),
    linkHref: 'https://bit.ly/halt-adoption',
    linkLabel: 'Apply to Adopt or Foster',
  },
  {
    title: 'Education and Awareness',
    icon: require('@site/static/img/icon-education.png').default,
    iconAlt: 'Illustration of a chinchilla wearing glasses reading a book',
    description: (
      <>
        Did you know that small animals like hamsters, rabbits, and guinea pigs have unique
        care needs that often go overlooked? At Helping All Little Things, we are passionate
        about spreading awareness and providing accurate, accessible information to help pet
        owners take the best care of their little companions.
      </>
    ),
    linkHref: '/docs/intro',
    linkLabel: 'Browse Resources',
  },
  {
    title: 'Every Dollar Makes a Difference',
    icon: require('@site/static/img/icon-donate.png').default,
    iconAlt: 'Illustration of a hamster holding a big heart',
    description: (
      <>
        Helping All Little Things is entirely grant and donor-funded. We rely on the
        generosity of our community, and every single dollar goes directly toward the care
        and comfort of the small animals we rescue. Your support, no matter the amount,
        makes a huge impact. Thank you for making a difference!
      </>
    ),
    linkHref: 'https://www.paypal.com/ncp/payment/8SJFNZQVMQ452',
    linkLabel: 'Donate Now',
  },
];

function Feature({icon, iconAlt, title, description, linkHref, linkLabel}) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <div className="halt-feature-card">
        <img
          className="halt-feature-icon"
          src={icon}
          alt={iconAlt}
          loading="lazy"
          width="160"
          height="160"
        />
        <Heading as="h3" className="halt-feature-title">{title}</Heading>
        <p className="halt-feature-desc">{description}</p>
        {linkHref && (
          <a
            href={linkHref}
            className={styles.featureLink}
            aria-label={linkLabel}>
            {linkLabel} →
          </a>
        )}
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

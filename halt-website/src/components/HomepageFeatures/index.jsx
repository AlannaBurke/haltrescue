import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Rescuing Small Animals',
    png: require('@site/static/img/piggie1.png').default,
    description: (
      <>
        Helping All Little Things is a dedicated rescue that focuses on small animals, providing them with love, care, and, in some cases, hospice care for those in need. Based in New Hampshire and operating as a 501(c)(3) nonprofit organization, we’re passionate about giving vulnerable animals the attention and medical care they deserve.
      </>
    ),
  },
  {
    title: 'Education and Awareness',
    png: require('@site/static/img/ada-2.png').default,
    description: (
      <>
        Did you know that small animals like hamsters, rabbits, and guinea pigs have unique care needs that often go overlooked? At Helping All Little Things, we are passionate about spreading awareness and providing accurate, accessible information to help pet owners take the best care of their little companions. From regular care tips to advice on recognizing health issues, we’re committed to making sure every small animal receives the care they deserve.
      </>
    ),
  },
  {
    title: 'Every Dollar Makes a Difference',
    png: require('@site/static/img/chinnie.png').default,
    description: (
      <>
        Helping All Little Things is entirely grant and donor-funded, with the majority of our support coming from small donations from our amazing social media followers. We rely on the generosity of our community to continue our work, and every single dollar goes directly toward the care and comfort of the small animals we rescue. Your support, no matter the amount, makes a huge impact and helps us give these little creatures the love and care they deserve. Thank you for making a difference!
      </>
    ),
  },
];

function Feature({png, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} src={png} role="img"alt="Example banner" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
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

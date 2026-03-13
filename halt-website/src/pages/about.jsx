import React from 'react';
import Layout from '@theme/Layout';
import styles from './about.module.css';

const SERVICE_AREAS = [
  { state: 'New Hampshire', role: 'Sanctuary & Headquarters', detail: 'Deerfield, NH — our main sanctuary where animals receive care, medical treatment, and hospice support.', emoji: '🏡' },
  { state: 'Massachusetts', role: 'Foster Network', detail: 'Active foster homes throughout MA providing loving temporary care for animals awaiting adoption.', emoji: '🐾' },
  { state: 'New Jersey', role: 'Foster Network', detail: 'Foster homes in NJ caring for animals and facilitating local adoptions.', emoji: '🐾' },
  { state: 'Pennsylvania', role: 'Foster Network', detail: 'Foster homes in PA supporting our rescue mission and connecting animals with families.', emoji: '🐾' },
];

const TEAM = [
  {
    name: 'Danni Challender',
    role: 'President',
    photo: '/img/team/danni.jpg',
    bio: 'Danni started Helping All Little Things in August of 2010 when her best friend\'s rescue was overwhelmed with guinea pig surrenders. (Fun fact: Danni was terrified of guinea pigs as a child!) She currently runs the sanctuary from her home in New Hampshire, housing senior, hospice, and special needs small animals and managing our foster team.',
  },
  {
    name: 'Ericka Chadbourne',
    role: 'Vice President',
    photo: '/img/team/ericka.jpg',
    bio: 'Ericka has been involved in animal rescue since 2000. She started rescuing small animals about 14 years ago when she became heavily involved in HALT. She heads up our arts and crafts division, runs auctions, and focuses on fundraising to cover medical care for the animals in our care.',
  },
  {
    name: 'Alanna Burke',
    role: 'Secretary',
    photo: '/img/team/alanna.jpg',
    bio: 'Alanna has always been involved in rescue, mostly working with cats, but became a part of HALT in 2017 when she adopted rats and then guinea pigs. She handles all things technical and web-related for the rescue, as well as most of the graphics.',
  },
  {
    name: 'Lynne Blecher',
    role: 'Treasurer',
    photo: '/img/team/lynne.jpg',
    bio: 'Lynne is a passionate animal advocate who has fostered and adopted unwanted pets since she was a teenager — from reptiles and birds to guinea pigs, mice, rats, dogs, and cats. She is currently a member of Bucks County Aquarium Society and supports the CARES program for endangered fish species.',
  },
  {
    name: 'Jen Dupee',
    role: 'Board Member',
    photo: '/img/team/jen.jpg',
    bio: 'Jen has been involved in animal rescue for a number of years, starting with wildlife rehabilitation at age 16 before moving into domestic animal rescue in 2017. Her primary focus is New Jersey-based surrenders and sanctuary cases. She shares her home with cats, dogs, rabbits, guinea pigs, and a variety of other smaller exotics.',
  },
];

const FAQS = [
  {
    q: 'Can I adopt if I live outside New England?',
    a: 'We transport throughout New England and the Northeast for most cases. If you\'re outside that range, reach out and we\'ll see what we can arrange — we want every animal to find the right home!',
  },
  {
    q: 'Do you take owner surrenders?',
    a: 'Yes, for most species. Please note that we are currently not accepting rabbit or rat surrenders due to capacity — we are overwhelmed with both at this time. For all other animals, please fill out our surrender inquiry form and we\'ll do our best to help. We never judge — we just want what\'s best for the animal.',
  },
  {
    q: 'Do you take in animals from other rescues or shelters?',
    a: 'Yes, we regularly partner with shelters and other rescues to take in animals who need specialized small-animal care or who have been overlooked.',
  },
  {
    q: 'What does "hospice care" mean for you?',
    a: 'Some animals come to us with terminal or chronic conditions. We believe every animal deserves to live out their days with dignity, comfort, and love — even if that time is short. Our hospice animals receive full medical support and a forever home with us.',
  },
  {
    q: 'Are you a 501(c)(3)?',
    a: 'Yes! Helping All Little Things is a federally recognized 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent permitted by law.',
  },
  {
    q: 'How is the rescue funded?',
    a: 'We are entirely grant and donor-funded. We receive no government funding. Every dollar donated goes directly to the care and medical needs of our animals.',
  },
];

export default function About() {
  return (
    <Layout
      title="About Us | Helping All Little Things"
      description="Learn about Helping All Little Things — a 501(c)(3) small-animal rescue and sanctuary based in Deerfield, NH, with foster homes in MA, NJ, and PA. We specialize in guinea pigs, rats, hamsters, gerbils, and mice, with experience in rabbits and other small animals."
    >
      {/* Hero */}
      <div className={styles.hero}>
        <img
          src="/img/heroes/about-hero.png"
          alt="Adorable kawaii illustration of all the animals we rescue gathered together with caring hands"
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>About Us</h1>
          <p className={styles.heroSubtitle}>
            Every little life matters. We're here to prove it.
          </p>
        </div>
      </div>

      <main className={styles.main}>

        {/* Mission */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.lead}>
            <strong>Helping All Little Things (HALT)</strong> is a 501(c)(3) nonprofit rescue and sanctuary
            dedicated to the small animals that are so often overlooked — with a special focus on animals
            with unique or complex medical needs.
          </p>
          <p>
            We rescue animals from shelters, owner surrenders, cruelty cases, and hoarding situations.
            We provide them with expert veterinary care, a safe and loving environment, and — whenever
            possible — a permanent adoptive home. For animals with terminal or chronic conditions, we
            offer compassionate hospice care so that every animal can live out their days with dignity
            and love.
          </p>
          <p>
            We also believe that education saves lives. Our free resource library covers care guides,
            health information, and illness guides for every species we work with — because a
            well-informed owner is the best thing an animal can have.
          </p>
        </section>

        {/* Animals we help */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Animals We Help</h2>
          <p>
            While we won't turn away a critter in need, our expertise and primary focus is on animals
            with <strong>unique or complex medical needs</strong>. Here's where our experience runs deepest:
          </p>

          <h3 className={styles.animalSubhead}>Our Specialties</h3>
          <div className={styles.animalGrid}>
            <div className={styles.animalChip}>
              <span className={styles.animalEmoji}>🐹</span>
              <span>Guinea Pigs</span>
              <span className={styles.animalBadge}>Primary Focus</span>
            </div>
            <div className={styles.animalChip}>
              <span className={styles.animalEmoji}>🐀</span>
              <span>Rats</span>
            </div>
            <div className={styles.animalChip}>
              <span className={styles.animalEmoji}>🐹</span>
              <span>Hamsters</span>
            </div>
            <div className={styles.animalChip}>
              <span className={styles.animalEmoji}>🐭</span>
              <span>Gerbils</span>
            </div>
            <div className={styles.animalChip}>
              <span className={styles.animalEmoji}>🐁</span>
              <span>Mice</span>
            </div>
          </div>

          <h3 className={styles.animalSubhead}>Also Experienced With</h3>
          <div className={styles.animalGrid}>
            <div className={`${styles.animalChip} ${styles.animalChipMuted}`}>
              <span className={styles.animalEmoji}>🐰</span>
              <span>Rabbits</span>
            </div>
          </div>

          <div className={styles.surrenderNotice}>
            <span className={styles.surrenderIcon}>⚠️</span>
            <div>
              <strong>Surrender notice:</strong> We are currently <strong>not accepting rabbit or rat surrenders</strong> due to capacity. We are at capacity for both species at this time. Please check back or reach out to inquire about future availability.
            </div>
          </div>

          <p className={styles.animalNote}>
            We occasionally encounter chinchillas and other small exotics, and we will always do our best
            to help any animal in need — but our deepest expertise lies with the species above.
          </p>
        </section>

        {/* Where we are */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Where We Are</h2>
          <p>
            Our sanctuary is headquartered in <strong>Deerfield, New Hampshire</strong>, where our
            animals receive hands-on care, medical treatment, and hospice support. We also have an
            active network of foster homes across <strong>Massachusetts</strong>,{' '}
            <strong>New Jersey</strong>, and <strong>Pennsylvania</strong>.
          </p>
          <p>
            We are able to transport animals throughout <strong>New England and the Northeast</strong>{' '}
            for most adoptions — so even if you're not local to any of our foster locations, we can
            often make it work. Please don't let distance stop you from reaching out!
          </p>
          <div className={styles.serviceAreaGrid}>
            {SERVICE_AREAS.map(({ state, role, detail, emoji }) => (
              <div key={state} className={styles.serviceAreaCard}>
                <div className={styles.serviceAreaEmoji}>{emoji}</div>
                <div>
                  <strong className={styles.serviceAreaState}>{state}</strong>
                  <span className={styles.serviceAreaRole}>{role}</span>
                  <p className={styles.serviceAreaDetail}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What we do */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What We Do</h2>
          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>🏥</div>
              <h3 className={styles.pillarTitle}>Rescue &amp; Rehabilitation</h3>
              <p>We take in animals from shelters, owner surrenders, cruelty cases, and hoarding situations. Every animal receives a full veterinary intake, any needed treatment, and time to decompress before being placed for adoption.</p>
            </div>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>🏡</div>
              <h3 className={styles.pillarTitle}>Foster &amp; Adoption</h3>
              <p>Our foster network gives animals a real home environment while they wait for their forever family. We carefully match animals with adopters to ensure the best possible outcome for both.</p>
            </div>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>💊</div>
              <h3 className={styles.pillarTitle}>Hospice &amp; Special Needs Care</h3>
              <p>Animals with terminal or chronic conditions deserve love too. We provide full hospice care and are experienced in managing complex medical needs in small animals.</p>
            </div>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>📚</div>
              <h3 className={styles.pillarTitle}>Education &amp; Resources</h3>
              <p>Our free resource library helps current and prospective pet owners understand the unique needs of small animals — from diet and habitat to illness recognition and emergency care.</p>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Meet the Team</h2>
          <p>
            HALT is run entirely by volunteers who are passionate about small animals. Meet our Board of Directors:
          </p>
          <div className={styles.teamGrid}>
            {TEAM.map(({ name, role, photo, bio }) => (
              <div key={name} className={styles.teamCard}>
                <div className={styles.teamPhotoWrap}>
                  <img src={photo} alt={`${name}, ${role} of HALT`} className={styles.teamPhoto} />
                </div>
                <div className={styles.teamInfo}>
                  <span className={styles.teamRole}>{role}</span>
                  <h3 className={styles.teamName}>{name}</h3>
                  <p className={styles.teamBio}>{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {FAQS.map(({ q, a }) => (
              <div key={q} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{q}</h3>
                <p className={styles.faqA}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Get Involved</h2>
          <p className={styles.ctaBody}>
            Whether you want to adopt, foster, volunteer, or donate — every form of support makes a
            real difference in the lives of these little animals.
          </p>
          <div className={styles.ctaButtons}>
            <a href="https://bit.ly/halt-adoption" className={styles.ctaBtnPrimary}>
              🐾 Adopt or Foster
            </a>
            <a href="https://www.paypal.com/ncp/payment/8SJFNZQVMQ452" className={styles.ctaBtnSecondary}>
              💛 Donate
            </a>
            <a href="/docs/intro" className={styles.ctaBtnSecondary}>
              📚 Browse Resources
            </a>
          </div>
        </section>

      </main>
    </Layout>
  );
}

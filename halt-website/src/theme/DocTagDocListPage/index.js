/**
 * Custom swizzle of DocTagDocListPage.
 *
 * Renders individual docs tag pages (e.g. /docs/tags/chinchillas) with:
 *   - A hero banner using the kawaii tag image
 *   - A responsive card grid of articles
 *   - Cards use the post's own image (from frontmatter) when available,
 *     falling back to the tag image
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  usePluralForm,
} from '@docusaurus/theme-common';
import Translate, { translate } from '@docusaurus/Translate';
import SearchMetadata from '@theme/SearchMetadata';
import Unlisted from '@theme/ContentVisibility/Unlisted';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/* ─── Tag image mapping ───────────────────────────────────────────────────── */
const DOC_TAG_IMAGES = {
  // ── Species ──────────────────────────────────────────────────────────────
  rat:              '/img/tags/rats.png',
  rats:             '/img/tags/rats.png',
  ratvarieties:     '/img/tags/rats.png',
  fancyrat:         '/img/tags/rats.png',
  rodent:           '/img/tags/rats.png',
  rabbit:           '/img/tags/rabbits.png',
  rabbits:          '/img/tags/rabbits.png',
  rvhd2:            '/img/tags/rabbits.png',
  chinchilla:       '/img/tags/chinchillas.png',
  chinchillas:      '/img/tags/chinchillas.png',
  ferret:           '/img/tags/ferrets.png',
  ferrets:          '/img/tags/ferrets.png',
  guineapig:        '/img/tags/guineapigs.png',
  guineapigs:       '/img/tags/guineapigs.png',
  skinnypig:        '/img/tags/guineapigs.png',
  hamster:          '/img/tags/hamsters.png',
  hamsters:         '/img/tags/hamsters.png',
  dwarfhamsters:    '/img/tags/hamsters.png',
  hedgehog:         '/img/tags/hedgehogs.png',
  hedgehogs:        '/img/tags/hedgehogs.png',
  mice:             '/img/tags/mice.png',
  mouse:            '/img/tags/mice.png',
  degu:             '/img/tags/degus.png',
  degus:            '/img/tags/degus.png',
  // ── Species-specific health ───────────────────────────────────────────────
  'guinea-pig-health':     '/img/tags/guinea-pig-health.png',
  'guinea-pig-care':       '/img/tags/guinea-pig-care.png',
  'guinea-pig-diet':       '/img/tags/guinea-pig-diet.png',
  'guinea-pig-housing':    '/img/tags/guinea-pig-housing.png',
  'guinea-pig-behavior':   '/img/tags/guinea-pig-behavior.png',
  'guinea-pig-enrichment': '/img/tags/guinea-pig-enrichment.png',
  'guinea-pig-bonding':    '/img/tags/guinea-pig-bonding.png',
  'guinea-pig-grooming':   '/img/tags/guinea-pig-grooming.png',
  'guinea-pig-safety':     '/img/tags/guinea-pig-safety.png',
  'guinea-pig-getting-started': '/img/tags/guinea-pig-getting-started.png',
  'rabbit-health':         '/img/tags/rabbit-health.png',
  'rabbit-care':           '/img/tags/rabbit-care.png',
  'rabbit-diet':           '/img/tags/rabbit-diet.png',
  'rabbit-housing':        '/img/tags/rabbit-housing.png',
  'rabbit-behavior':       '/img/tags/rabbit-behavior.png',
  'rabbit-enrichment':     '/img/tags/rabbit-enrichment.png',
  'rabbit-bonding':        '/img/tags/rabbit-bonding.png',
  'rabbit-safety':         '/img/tags/rabbit-safety.png',
  'rabbit-getting-started': '/img/tags/rabbit-getting-started.png',
  'rat-health':            '/img/tags/rat-health.png',
  'rat-care':              '/img/tags/rat-care.png',
  'rat-diet':              '/img/tags/rat-diet.png',
  'rat-behavior':          '/img/tags/rat-behavior.png',
  'rat-enrichment':        '/img/tags/rat-enrichment.png',
  'rat-bonding':           '/img/tags/rat-bonding.png',
  'rat-safety':            '/img/tags/rat-safety.png',
  'rat-getting-started':   '/img/tags/rat-getting-started.png',
  'hamster-health':        '/img/tags/hamster-health.png',
  'hamster-care':          '/img/tags/hamster-care.png',
  'hamster-diet':          '/img/tags/hamster-diet.png',
  'hamster-behavior':      '/img/tags/hamster-behavior.png',
  'hamster-enrichment':    '/img/tags/hamster-enrichment.png',
  'hamster-safety':        '/img/tags/hamster-safety.png',
  'hamster-getting-started': '/img/tags/hamster-getting-started.png',
  'chinchilla-health':     '/img/tags/chinchilla-health.png',
  'chinchilla-care':       '/img/tags/chinchilla-care.png',
  'chinchilla-diet':       '/img/tags/chinchilla-diet.png',
  'chinchilla-behavior':   '/img/tags/chinchilla-behavior.png',
  'chinchilla-enrichment': '/img/tags/chinchilla-enrichment.png',
  'chinchilla-safety':     '/img/tags/chinchilla-safety.png',
  'chinchilla-getting-started': '/img/tags/chinchilla-getting-started.png',
  'ferret-health':         '/img/tags/ferret-health.png',
  'ferret-care':           '/img/tags/ferret-care.png',
  'ferret-diet':           '/img/tags/ferret-diet.png',
  'ferret-behavior':       '/img/tags/ferret-behavior.png',
  'ferret-enrichment':     '/img/tags/ferret-enrichment.png',
  'ferret-bonding':        '/img/tags/ferret-bonding.png',
  'ferret-safety':         '/img/tags/ferret-safety.png',
  'ferret-getting-started': '/img/tags/ferret-getting-started.png',
  'hedgehog-health':       '/img/tags/hedgehog-health.png',
  'hedgehog-care':         '/img/tags/hedgehog-care.png',
  'hedgehog-diet':         '/img/tags/hedgehog-diet.png',
  'hedgehog-behavior':     '/img/tags/hedgehog-behavior.png',
  'hedgehog-enrichment':   '/img/tags/hedgehog-enrichment.png',
  'hedgehog-safety':       '/img/tags/hedgehog-safety.png',
  'hedgehog-getting-started': '/img/tags/hedgehog-getting-started.png',
  'degu-health':           '/img/tags/degu-health.png',
  'degu-care':             '/img/tags/degu-care.png',
  'degu-diet':             '/img/tags/degu-diet.png',
  'degu-safety':           '/img/tags/degu-safety.png',
  'degu-getting-started':  '/img/tags/degu-getting-started.png',
  'mouse-health':          '/img/tags/mouse-health.png',
  'mouse-care':            '/img/tags/mouse-care.png',
  'mouse-safety':          '/img/tags/mouse-safety.png',
  'mouse-getting-started': '/img/tags/mouse-getting-started.png',
  // ── Health & medical ─────────────────────────────────────────────────────
  health:           '/img/tags/health.png',
  illness:          '/img/tags/illness.png',
  illnesses:        '/img/tags/illness.png',
  disease:          '/img/tags/medical.png',
  medical:          '/img/tags/medical.png',
  veterinary:       '/img/tags/veterinary.png',
  symptoms:         '/img/tags/medical.png',
  treatment:        '/img/tags/medical.png',
  diagnosis:        '/img/tags/medical.png',
  emergency:        '/img/tags/emergency.png',
  diabetes:         '/img/tags/medical.png',
  metabolic:        '/img/tags/medical.png',
  endocrine:        '/img/tags/medical.png',
  hyperglycemia:    '/img/tags/medical.png',
  hypoglycemia:     '/img/tags/medical.png',
  insulinoma:       '/img/tags/medical.png',
  pancreatichealth: '/img/tags/medical.png',
  cancer:           '/img/tags/cancer.png',
  lymphoma:         '/img/tags/cancer.png',
  lumps:            '/img/tags/tumors.png',
  tumors:           '/img/tags/tumors.png',
  raredisease:      '/img/tags/medical.png',
  congenital:       '/img/tags/medical.png',
  fetalarrhythmia:  '/img/tags/medical.png',
  maxfactor:        '/img/tags/medical.png',
  mycoplasma:       '/img/tags/respiratory.png',
  murinerespiratorymycoplasmosis: '/img/tags/respiratory.png',
  mpulmonis:        '/img/tags/respiratory.png',
  respiratory:      '/img/tags/respiratory.png',
  respiratoryinfection: '/img/tags/respiratory.png',
  respiratorydisease: '/img/tags/respiratory.png',
  chronicrespiratorydisease: '/img/tags/respiratory.png',
  pneumonia:        '/img/tags/respiratory.png',
  uri:              '/img/tags/respiratory.png',
  parasites:        '/img/tags/parasites.png',
  intestinalparasites: '/img/tags/parasites.png',
  mites:            '/img/tags/parasites.png',
  lice:             '/img/tags/parasites.png',
  fleas:            '/img/tags/parasites.png',
  worms:            '/img/tags/parasites.png',
  coccidia:         '/img/tags/parasites.png',
  giardia:          '/img/tags/parasites.png',
  ecuniculi:        '/img/tags/parasites.png',
  bordetella:       '/img/tags/respiratory.png',
  dental:           '/img/tags/dental-disease.png',
  dentalcare:       '/img/tags/dental-disease.png',
  dentaldisease:    '/img/tags/dental-disease.png',
  malocclusion:     '/img/tags/dental-disease.png',
  teeth:            '/img/tags/dental-disease.png',
  vaccination:      '/img/tags/medical.png',
  prevention:       '/img/tags/safety.png',
  gistasis:         '/img/tags/digestive.png',
  gi:               '/img/tags/digestive.png',
  gastrointestinal: '/img/tags/digestive.png',
  digestive:        '/img/tags/digestive.png',
  digestivehealth:  '/img/tags/digestive.png',
  digestion:        '/img/tags/digestive.png',
  diarrhea:         '/img/tags/digestive.png',
  bloat:            '/img/tags/bloat.png',
  obstruction:      '/img/tags/digestive.png',
  cecotropes:       '/img/tags/digestive.png',
  poop:             '/img/tags/digestive.png',
  flystrike:        '/img/tags/parasites.png',
  myiasis:          '/img/tags/parasites.png',
  flystrikewarning: '/img/tags/emergency.png',
  neurologic:       '/img/tags/neurological.png',
  neurological:     '/img/tags/neurological.png',
  headtilt:         '/img/tags/neurological.png',
  seizures:         '/img/tags/neurological.png',
  stroke:           '/img/tags/neurological.png',
  heatstroke:       '/img/tags/emergency.png',
  hyperthermia:     '/img/tags/temperature.png',
  hemorrhagicdisease: '/img/tags/medical.png',
  heartdisease:     '/img/tags/heart-disease.png',
  heart:            '/img/tags/heart.png',
  urinary:          '/img/tags/urinary.png',
  bladder:          '/img/tags/urinary.png',
  stones:           '/img/tags/urinary.png',
  reproductive:     '/img/tags/reproductive.png',
  ovariancysts:     '/img/tags/reproductive.png',
  female:           '/img/tags/reproductive.png',
  skin:             '/img/tags/skin.png',
  skinhealth:       '/img/tags/skin-conditions.png',
  bumblefoot:       '/img/tags/bumblefoot.png',
  pododermatitis:   '/img/tags/bumblefoot.png',
  eyes:             '/img/tags/eye-health.png',
  cornealulcer:     '/img/tags/eye-conditions.png',
  haypoke:          '/img/tags/eye-conditions.png',
  otitis:           '/img/tags/ear-conditions.png',
  earinfections:    '/img/tags/ear-conditions.png',
  scurvy:           '/img/tags/vitamin-c.png',
  vitaminc:         '/img/tags/vitamin-c.png',
  hairball:         '/img/tags/digestive.png',
  nails:            '/img/tags/nail-trimming.png',
  hygiene:          '/img/tags/grooming.png',
  homecare:         '/img/tags/care.png',
  cervicallymphadenitis: '/img/tags/medical.png',
  surgery:          '/img/tags/surgery.png',
  medications:      '/img/tags/medications.png',
  medication:       '/img/tags/medications.png',
  'pain-management': '/img/tags/pain-management.png',
  painmanagement:   '/img/tags/pain-management.png',
  aging:            '/img/tags/aging.png',
  'senior-care':    '/img/tags/aging.png',
  seniorcare:       '/img/tags/aging.png',
  'critical-care':  '/img/tags/critical-care.png',
  criticalcare:     '/img/tags/critical-care.png',
  supplements:      '/img/tags/supplements.png',
  'satin-syndrome': '/img/tags/satin-syndrome.png',
  satinsyndrome:    '/img/tags/satin-syndrome.png',
  satin:            '/img/tags/satin.png',
  // ── Care & husbandry ─────────────────────────────────────────────────────
  checklist:        '/img/tags/getting-started.png',
  care:             '/img/tags/care.png',
  careguide:        '/img/tags/care.png',
  husbandry:        '/img/tags/care.png',
  gettingstarted:   '/img/tags/getting-started.png',
  beginner:         '/img/tags/getting-started.png',
  handling:         '/img/tags/handling.png',
  grooming:         '/img/tags/grooming.png',
  bathing:          '/img/tags/bathing.png',
  socialization:    '/img/tags/socialization.png',
  social:           '/img/tags/socialization.png',
  introductions:    '/img/tags/bonding.png',
  quarantine:       '/img/tags/care.png',
  training:         '/img/tags/taming.png',
  nutrition:        '/img/tags/nutrition.png',
  diet:             '/img/tags/diet.png',
  feeding:          '/img/tags/diet.png',
  hay:              '/img/tags/hay.png',
  vegetables:       '/img/tags/vegetables.png',
  treats:           '/img/tags/treats.png',
  toxicfoods:       '/img/tags/dangerous-foods.png',
  'dangerous-foods': '/img/tags/dangerous-foods.png',
  habitat:          '/img/tags/habitat.png',
  housing:          '/img/tags/housing.png',
  cage:             '/img/tags/housing.png',
  bedding:          '/img/tags/bedding.png',
  enrichment:       '/img/tags/enrichment.png',
  toys:             '/img/tags/enrichment.png',
  environment:      '/img/tags/habitat.png',
  temperature:      '/img/tags/temperature.png',
  exercise:         '/img/tags/exercise.png',
  wheels:           '/img/tags/wheels.png',
  playtime:         '/img/tags/playtime.png',
  supplies:         '/img/tags/shopping.png',
  wishlist:         '/img/tags/shopping.png',
  // ── Genetics & breeds ────────────────────────────────────────────────────
  genetics:         '/img/tags/genetics.png',
  breeds:           '/img/tags/educational.png',
  breeding:         '/img/tags/breeding.png',
  genetic:          '/img/tags/genetics.png',
  coat:             '/img/tags/educational.png',
  coatcolor:        '/img/tags/educational.png',
  hairless:         '/img/tags/educational.png',
  sexing:           '/img/tags/sexing.png',
  clubbedfeet:      '/img/tags/educational.png',
  lethalwhite:      '/img/tags/lethalwhite.png',
  roan:             '/img/tags/educational.png',
  dalmatian:        '/img/tags/educational.png',
  lifespan:         '/img/tags/lifespan.png',
  spayingneutering: '/img/tags/spaying-neutering.png',
  'spaying-neutering': '/img/tags/spaying-neutering.png',
  pregnancy:        '/img/tags/pregnancy.png',
  newborn:          '/img/tags/babies.png',
  newborns:         '/img/tags/babies.png',
  lactation:        '/img/tags/pregnancy.png',
  babies:           '/img/tags/babies.png',
  // ── Rescue & adoption ────────────────────────────────────────────────────
  rescue:           '/img/tags/rescue.png',
  adoption:         '/img/tags/adoption.png',
  adoptions:        '/img/tags/adoptions.png',
  adoptables:       '/img/tags/adoptables.png',
  fostering:        '/img/tags/fostering.png',
  sanctuary:        '/img/tags/sanctuary.png',
  specialneeds:     '/img/tags/sanctuary.png',
  disability:       '/img/tags/sanctuary.png',
  rainbowbridge:    '/img/tags/rainbowbridge.png',
  // ── Behavior ─────────────────────────────────────────────────────────────
  behavior:         '/img/tags/behavior.png',
  socialbehavior:   '/img/tags/behavior.png',
  aggression:       '/img/tags/behavior.png',
  bonding:          '/img/tags/bonding.png',
  taming:           '/img/tags/taming.png',
  fearful:          '/img/tags/taming.png',
  // ── Safety ───────────────────────────────────────────────────────────────
  safety:           '/img/tags/safety.png',
  dangerous:        '/img/tags/dangerous-foods.png',
  // ── Lifecycle & end of life ───────────────────────────────────────────────
  endoflife:        '/img/tags/end-of-life.png',
  palliativecare:   '/img/tags/end-of-life.png',
  grief:            '/img/tags/grief.png',
  euthanasia:       '/img/tags/euthanasia.png',
  memorial:         '/img/tags/memorial.png',
  // ── Family & social ──────────────────────────────────────────────────────
  family:           '/img/tags/family.png',
  children:         '/img/tags/family.png',
  firstpet:         '/img/tags/getting-started.png',
  cost:             '/img/tags/cost.png',
  wellness:         '/img/tags/wellness.png',
  homehealthcheck:  '/img/tags/wellness.png',
  // ── Rescue & nonprofit ───────────────────────────────────────────────────
  nonprofit:        '/img/tags/nonprofit.png',
  fundraising:      '/img/tags/fundraiser.png',
  fundraiser:       '/img/tags/fundraiser.png',
  volunteers:       '/img/tags/volunteers.png',
  volunteering:     '/img/tags/volunteers.png',
  news:             '/img/tags/news.png',
  humans:           '/img/tags/humans.png',
  // ── Fallback ─────────────────────────────────────────────────────────────
  educational:      '/img/tags/educational.png',
  petcare:          '/img/tags/care.png',
  pethealth:        '/img/tags/health.png',
  pets:             '/img/tags/guineapigs.png',
  smallanimal:      '/img/tags/guineapigs.png',
  smallanimalrescue:'/img/tags/adoptables.png',
  exoticpet:        '/img/tags/educational.png',
};

const FALLBACK_IMAGE = '/img/tags/health.png';

function getTagImage(tagLabel) {
  const slug = (tagLabel || '')
    .toLowerCase()
    .replace(/[\s_\/\.]+/g, '-')
    .replace(/-+/g, '-');
  // Try with hyphens first (canonical form)
  if (DOC_TAG_IMAGES[slug]) return DOC_TAG_IMAGES[slug];
  // Try without hyphens (legacy form)
  const nohyphen = slug.replace(/-/g, '');
  return DOC_TAG_IMAGES[nohyphen] || FALLBACK_IMAGE;
}

/* ─── Pluralisation helper ────────────────────────────────────────────────── */
function useNDocsTaggedPlural() {
  const { selectMessage } = usePluralForm();
  return (count) =>
    selectMessage(
      count,
      translate(
        {
          id: 'theme.docs.tagDocListPageTitle.nDocsTagged',
          message: 'One doc tagged|{count} docs tagged',
        },
        { count },
      ),
    );
}

function usePageTitle(props) {
  const nDocsTaggedPlural = useNDocsTaggedPlural();
  return translate(
    {
      id: 'theme.docs.tagDocListPageTitle',
      message: '{nDocsTagged} with "{tagName}"',
    },
    {
      nDocsTagged: nDocsTaggedPlural(props.tag.count),
      tagName: props.tag.label,
    },
  );
}

/* ─── Doc card ────────────────────────────────────────────────────────────── */
function DocCard({ doc, tagLabel }) {
  // Use the post's own image if available (from frontmatter), otherwise use tag image
  const postImage = doc.frontMatter?.image || null;
  const tagImage = getTagImage(tagLabel);
  const image = postImage || tagImage;

  return (
    <article className={styles.card}>
      <Link to={doc.permalink} className={styles.cardImageLink} aria-hidden="true" tabIndex="-1">
        <div className={styles.cardImageWrapper}>
          <img
            src={image}
            alt=""
            className={styles.cardImage}
            loading="lazy"
          />
        </div>
      </Link>
      <div className={styles.cardBody}>
        <Heading as="h2" className={styles.cardTitle}>
          <Link to={doc.permalink}>{doc.title}</Link>
        </Heading>
        {doc.description && (
          <p className={styles.cardDescription}>{doc.description}</p>
        )}
        <div className={styles.cardFooter}>
          <Link to={doc.permalink} className={styles.readMore}>
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ─── Metadata ────────────────────────────────────────────────────────────── */
function DocTagDocListPageMetadata({ title, tag }) {
  return (
    <>
      <PageMetadata title={title} description={tag.description} />
      <SearchMetadata tag="doc_tag_doc_list" />
    </>
  );
}

/* ─── Page content ────────────────────────────────────────────────────────── */
function DocTagDocListPageContent({ tag, title }) {
  const bannerImage = getTagImage(tag.label);
  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.page.docsTagDocListPage)}>
      <div className={styles.pageWrapper}>
        {tag.unlisted && <Unlisted />}

        {/* Hero banner */}
        <header className={styles.tagHeader}>
          <div
            className={styles.tagBanner}
            style={{ backgroundImage: `url(${bannerImage})` }}
            aria-hidden="true"
          />
          <div className={styles.tagHeaderContent}>
            <Heading as="h1" className={styles.tagTitle}>{title}</Heading>
            {tag.description && (
              <p className={styles.tagDescription}>{tag.description}</p>
            )}
            <Link href={tag.allTagsPath} className={styles.allTagsLink}>
              <Translate
                id="theme.tags.tagsPageLink"
                description="The label of the link targeting the tag list page">
                ← View All Tags
              </Translate>
            </Link>
          </div>
        </header>

        {/* Article card grid */}
        <section className={styles.grid}>
          {tag.items.map((doc) => (
            <DocCard key={doc.id} doc={doc} tagLabel={tag.label} />
          ))}
        </section>
      </div>
    </HtmlClassNameProvider>
  );
}

export default function DocTagDocListPage(props) {
  const title = usePageTitle(props);
  return (
    <>
      <DocTagDocListPageMetadata {...props} title={title} />
      <DocTagDocListPageContent {...props} title={title} />
    </>
  );
}

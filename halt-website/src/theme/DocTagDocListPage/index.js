/**
 * Custom swizzle of DocTagDocListPage.
 *
 * Renders individual docs tag pages (e.g. /docs/tags/chinchillas) with:
 *   - A hero banner using the same kawaii tag image as the tag cards page
 *   - A responsive card grid of articles (matching the blog tag page style)
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

/* ─── Tag image mapping (same as DocTagsListPage) ─────────────────────────── */
const DOC_TAG_IMAGES = {
  // Species
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
  // Health & medical
  health:           '/img/tags/health.png',
  illness:          '/img/tags/health.png',
  illnesses:        '/img/tags/health.png',
  disease:          '/img/tags/medical.png',
  medical:          '/img/tags/medical.png',
  veterinary:       '/img/tags/medical.png',
  symptoms:         '/img/tags/medical.png',
  treatment:        '/img/tags/medical.png',
  diagnosis:        '/img/tags/medical.png',
  emergency:        '/img/tags/medical.png',
  diabetes:         '/img/tags/medical.png',
  metabolic:        '/img/tags/medical.png',
  endocrine:        '/img/tags/medical.png',
  hyperglycemia:    '/img/tags/medical.png',
  hypoglycemia:     '/img/tags/medical.png',
  insulinoma:       '/img/tags/medical.png',
  pancreatichealth: '/img/tags/medical.png',
  cancer:           '/img/tags/medical.png',
  lymphoma:         '/img/tags/medical.png',
  lumps:            '/img/tags/medical.png',
  raredisease:      '/img/tags/medical.png',
  congenital:       '/img/tags/medical.png',
  fetalarrhythmia:  '/img/tags/medical.png',
  maxfactor:        '/img/tags/medical.png',
  mycoplasma:       '/img/tags/medical.png',
  murinerespiratorymycoplasmosis: '/img/tags/medical.png',
  mpulmonis:        '/img/tags/medical.png',
  respiratory:      '/img/tags/medical.png',
  respiratoryinfection: '/img/tags/medical.png',
  respiratorydisease: '/img/tags/medical.png',
  chronicrespiratorydisease: '/img/tags/medical.png',
  pneumonia:        '/img/tags/medical.png',
  uri:              '/img/tags/medical.png',
  parasites:        '/img/tags/medical.png',
  intestinalparasites: '/img/tags/medical.png',
  mites:            '/img/tags/medical.png',
  lice:             '/img/tags/medical.png',
  fleas:            '/img/tags/medical.png',
  worms:            '/img/tags/medical.png',
  coccidia:         '/img/tags/medical.png',
  giardia:          '/img/tags/medical.png',
  ecuniculi:        '/img/tags/medical.png',
  bordetella:       '/img/tags/medical.png',
  dental:           '/img/tags/medical.png',
  dentalcare:       '/img/tags/medical.png',
  dentaldisease:    '/img/tags/medical.png',
  malocclusion:     '/img/tags/medical.png',
  teeth:            '/img/tags/medical.png',
  vaccination:      '/img/tags/medical.png',
  prevention:       '/img/tags/medical.png',
  gistasis:         '/img/tags/medical.png',
  gi:               '/img/tags/medical.png',
  gastrointestinal: '/img/tags/medical.png',
  digestive:        '/img/tags/medical.png',
  digestivehealth:  '/img/tags/medical.png',
  digestion:        '/img/tags/medical.png',
  diarrhea:         '/img/tags/medical.png',
  bloat:            '/img/tags/medical.png',
  obstruction:      '/img/tags/medical.png',
  cecotropes:       '/img/tags/medical.png',
  poop:             '/img/tags/medical.png',
  flystrike:        '/img/tags/medical.png',
  myiasis:          '/img/tags/medical.png',
  flystrikewarning: '/img/tags/medical.png',
  neurologic:       '/img/tags/medical.png',
  neurological:     '/img/tags/medical.png',
  headtilt:         '/img/tags/medical.png',
  seizures:         '/img/tags/medical.png',
  stroke:           '/img/tags/medical.png',
  heatstroke:       '/img/tags/medical.png',
  hyperthermia:     '/img/tags/medical.png',
  hemorrhagicdisease: '/img/tags/medical.png',
  heartdisease:     '/img/tags/medical.png',
  heart:            '/img/tags/medical.png',
  urinary:          '/img/tags/medical.png',
  bladder:          '/img/tags/medical.png',
  stones:           '/img/tags/medical.png',
  reproductive:     '/img/tags/medical.png',
  ovariancysts:     '/img/tags/medical.png',
  female:           '/img/tags/medical.png',
  skin:             '/img/tags/medical.png',
  skinhealth:       '/img/tags/medical.png',
  bumblefoot:       '/img/tags/medical.png',
  pododermatitis:   '/img/tags/medical.png',
  eyes:             '/img/tags/medical.png',
  cornealulcer:     '/img/tags/medical.png',
  haypoke:          '/img/tags/medical.png',
  otitis:           '/img/tags/medical.png',
  earinfections:    '/img/tags/medical.png',
  scurvy:           '/img/tags/medical.png',
  vitaminc:         '/img/tags/medical.png',
  hairball:         '/img/tags/medical.png',
  nails:            '/img/tags/medical.png',
  hygiene:          '/img/tags/care.png',
  homecare:         '/img/tags/care.png',
  cervicallymphadenitis: '/img/tags/medical.png',
  // Care & husbandry
  checklist:        '/img/tags/care.png',
  care:             '/img/tags/care.png',
  careguide:        '/img/tags/care.png',
  husbandry:        '/img/tags/care.png',
  gettingstarted:   '/img/tags/care.png',
  beginner:         '/img/tags/care.png',
  handling:         '/img/tags/care.png',
  grooming:         '/img/tags/care.png',
  socialization:    '/img/tags/care.png',
  social:           '/img/tags/care.png',
  introductions:    '/img/tags/care.png',
  quarantine:       '/img/tags/care.png',
  training:         '/img/tags/care.png',
  nutrition:        '/img/tags/care.png',
  diet:             '/img/tags/care.png',
  feeding:          '/img/tags/care.png',
  hay:              '/img/tags/care.png',
  vegetables:       '/img/tags/care.png',
  treats:           '/img/tags/care.png',
  toxicfoods:       '/img/tags/care.png',
  habitat:          '/img/tags/care.png',
  housing:          '/img/tags/care.png',
  cage:             '/img/tags/care.png',
  bedding:          '/img/tags/care.png',
  enrichment:       '/img/tags/care.png',
  toys:             '/img/tags/care.png',
  environment:      '/img/tags/care.png',
  supplies:         '/img/tags/care.png',
  // Genetics & breeds
  genetics:         '/img/tags/educational.png',
  breeds:           '/img/tags/educational.png',
  breeding:         '/img/tags/educational.png',
  genetic:          '/img/tags/educational.png',
  coat:             '/img/tags/educational.png',
  coatcolor:        '/img/tags/educational.png',
  hairless:         '/img/tags/educational.png',
  sexing:           '/img/tags/educational.png',
  clubbedfeet:      '/img/tags/educational.png',
  lethalwhite:      '/img/tags/lethalwhite.png',
  satinsyndrome:    '/img/tags/satin.png',
  satin:            '/img/tags/satin.png',
  roan:             '/img/tags/educational.png',
  dalmatian:        '/img/tags/educational.png',
  // Rescue & adoption
  rescue:           '/img/tags/adoptables.png',
  adoption:         '/img/tags/adoptions.png',
  adoptions:        '/img/tags/adoptions.png',
  sanctuary:        '/img/tags/sanctuary.png',
  specialneeds:     '/img/tags/sanctuary.png',
  disability:       '/img/tags/sanctuary.png',
  rainbowbridge:    '/img/tags/rainbowbridge.png',
  // Behavior
  behavior:         '/img/tags/educational.png',
  socialbehavior:   '/img/tags/educational.png',
  aggression:       '/img/tags/educational.png',
  // Safety
  safety:           '/img/tags/educational.png',
  dangerous:        '/img/tags/educational.png',
  // Fallback
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
    .replace(/[\s\-_\/\.]+/g, '');
  return DOC_TAG_IMAGES[slug] || FALLBACK_IMAGE;
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
  const image = getTagImage(tagLabel);
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

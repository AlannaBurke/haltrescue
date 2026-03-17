/**
 * Custom swizzle of DocTagDocListPage.
 *
 * Renders individual docs tag pages (e.g. /docs/tags/chinchillas) with:
 *   - A hero banner using the same kawaii tag image as the tag cards page
 *   - A responsive card grid of articles, each with a topic-specific image
 *     derived from keywords in the article title
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

/* ─── Tag image mapping ────────────────────────────────────────────────────── */
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
  degu:             '/img/tags/degus.png',
  degus:            '/img/tags/degus.png',
  // Health & medical
  health:           '/img/tags/health.png',
  wellness:         '/img/tags/wellness.png',
  illness:          '/img/tags/illness.png',
  illnesses:        '/img/tags/illness.png',
  disease:          '/img/tags/medical.png',
  medical:          '/img/tags/medical.png',
  veterinary:       '/img/tags/veterinary.png',
  vet:              '/img/tags/veterinary.png',
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
  lumps:            '/img/tags/cancer.png',
  tumors:           '/img/tags/cancer.png',
  tumor:            '/img/tags/cancer.png',
  raredisease:      '/img/tags/medical.png',
  congenital:       '/img/tags/genetics.png',
  fetalarrhythmia:  '/img/tags/heart.png',
  maxfactor:        '/img/tags/genetics.png',
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
  dental:           '/img/tags/dental.png',
  dentalcare:       '/img/tags/dental.png',
  dentaldisease:    '/img/tags/dental.png',
  malocclusion:     '/img/tags/dental.png',
  teeth:            '/img/tags/dental.png',
  vaccination:      '/img/tags/veterinary.png',
  prevention:       '/img/tags/safety.png',
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
  flystrikewarning: '/img/tags/parasites.png',
  neurologic:       '/img/tags/neurological.png',
  neurological:     '/img/tags/neurological.png',
  headtilt:         '/img/tags/neurological.png',
  seizures:         '/img/tags/neurological.png',
  stroke:           '/img/tags/neurological.png',
  heatstroke:       '/img/tags/emergency.png',
  hyperthermia:     '/img/tags/emergency.png',
  hemorrhagicdisease: '/img/tags/emergency.png',
  heartdisease:     '/img/tags/heart.png',
  heart:            '/img/tags/heart.png',
  cardiac:          '/img/tags/heart.png',
  urinary:          '/img/tags/urinary.png',
  bladder:          '/img/tags/urinary.png',
  stones:           '/img/tags/urinary.png',
  reproductive:     '/img/tags/reproductive.png',
  ovariancysts:     '/img/tags/reproductive.png',
  female:           '/img/tags/reproductive.png',
  skin:             '/img/tags/skin.png',
  skinhealth:       '/img/tags/skin.png',
  bumblefoot:       '/img/tags/bumblefoot.png',
  pododermatitis:   '/img/tags/bumblefoot.png',
  eyes:             '/img/tags/eye-health.png',
  cornealulcer:     '/img/tags/eye-health.png',
  haypoke:          '/img/tags/eye-health.png',
  otitis:           '/img/tags/ear-conditions.png',
  earinfections:    '/img/tags/ear-conditions.png',
  scurvy:           '/img/tags/vitamin-c.png',
  vitaminc:         '/img/tags/vitamin-c.png',
  supplements:      '/img/tags/supplements.png',
  supplement:       '/img/tags/supplements.png',
  criticalcare:     '/img/tags/critical-care.png',
  satinsyndrome:    '/img/tags/satin-syndrome.png',
  satin:            '/img/tags/satin.png',
  surgery:          '/img/tags/surgery.png',
  surgical:         '/img/tags/surgery.png',
  medications:      '/img/tags/medications.png',
  medication:       '/img/tags/medications.png',
  painmanagement:   '/img/tags/pain-management.png',
  pain:             '/img/tags/pain-management.png',
  aging:            '/img/tags/aging.png',
  senior:           '/img/tags/aging.png',
  hairball:         '/img/tags/digestive.png',
  nails:            '/img/tags/nail-trimming.png',
  cervicallymphadenitis: '/img/tags/medical.png',
  // Care & husbandry
  hygiene:          '/img/tags/grooming.png',
  homecare:         '/img/tags/care.png',
  checklist:        '/img/tags/getting-started.png',
  care:             '/img/tags/care.png',
  careguide:        '/img/tags/care.png',
  husbandry:        '/img/tags/care.png',
  gettingstarted:   '/img/tags/getting-started.png',
  beginner:         '/img/tags/getting-started.png',
  handling:         '/img/tags/handling.png',
  grooming:         '/img/tags/grooming.png',
  bathing:          '/img/tags/bathing.png',
  nailtrimming:     '/img/tags/nail-trimming.png',
  socialization:    '/img/tags/socialization.png',
  social:           '/img/tags/socialization.png',
  introductions:    '/img/tags/bonding.png',
  bonding:          '/img/tags/bonding.png',
  quarantine:       '/img/tags/safety.png',
  training:         '/img/tags/taming.png',
  taming:           '/img/tags/taming.png',
  nutrition:        '/img/tags/nutrition.png',
  diet:             '/img/tags/diet.png',
  feeding:          '/img/tags/diet.png',
  hay:              '/img/tags/hay.png',
  vegetables:       '/img/tags/vegetables.png',
  veggies:          '/img/tags/vegetables.png',
  treats:           '/img/tags/treats.png',
  toxicfoods:       '/img/tags/dangerous-foods.png',
  dangerousfoods:   '/img/tags/dangerous-foods.png',
  habitat:          '/img/tags/housing.png',
  housing:          '/img/tags/housing.png',
  cage:             '/img/tags/housing.png',
  bedding:          '/img/tags/bedding.png',
  enrichment:       '/img/tags/enrichment.png',
  toys:             '/img/tags/enrichment.png',
  environment:      '/img/tags/housing.png',
  supplies:         '/img/tags/shopping.png',
  shopping:         '/img/tags/shopping.png',
  temperature:      '/img/tags/temperature.png',
  exercise:         '/img/tags/exercise.png',
  wheels:           '/img/tags/wheels.png',
  playtime:         '/img/tags/playtime.png',
  weightmanagement: '/img/tags/wellness.png',
  obesity:          '/img/tags/wellness.png',
  // Genetics & breeds
  genetics:         '/img/tags/genetics.png',
  breeds:           '/img/tags/genetics.png',
  breeding:         '/img/tags/breeding.png',
  genetic:          '/img/tags/genetics.png',
  coat:             '/img/tags/genetics.png',
  coatcolor:        '/img/tags/genetics.png',
  hairless:         '/img/tags/genetics.png',
  sexing:           '/img/tags/sexing.png',
  clubbedfeet:      '/img/tags/genetics.png',
  lethalwhite:      '/img/tags/lethalwhite.png',
  roan:             '/img/tags/genetics.png',
  dalmatian:        '/img/tags/genetics.png',
  // Lifecycle
  lifespan:         '/img/tags/lifespan.png',
  spayingneutering: '/img/tags/spaying-neutering.png',
  spay:             '/img/tags/spaying-neutering.png',
  neuter:           '/img/tags/spaying-neutering.png',
  pregnancy:        '/img/tags/pregnancy.png',
  pregnant:         '/img/tags/pregnancy.png',
  babies:           '/img/tags/babies.png',
  pups:             '/img/tags/babies.png',
  kits:             '/img/tags/babies.png',
  // End of life
  endoflife:        '/img/tags/end-of-life.png',
  grief:            '/img/tags/grief.png',
  euthanasia:       '/img/tags/euthanasia.png',
  memorial:         '/img/tags/memorial.png',
  rainbowbridge:    '/img/tags/rainbowbridge.png',
  // Rescue & adoption
  rescue:           '/img/tags/rescue.png',
  adoption:         '/img/tags/adoption.png',
  adoptions:        '/img/tags/adoptions.png',
  adoptables:       '/img/tags/adoptables.png',
  fostering:        '/img/tags/fostering.png',
  foster:           '/img/tags/fostering.png',
  sanctuary:        '/img/tags/sanctuary.png',
  specialneeds:     '/img/tags/sanctuary.png',
  disability:       '/img/tags/sanctuary.png',
  // Behavior
  behavior:         '/img/tags/behavior.png',
  behaviour:        '/img/tags/behavior.png',
  socialbehavior:   '/img/tags/behavior.png',
  aggression:       '/img/tags/behavior.png',
  // Safety
  safety:           '/img/tags/safety.png',
  dangerous:        '/img/tags/safety.png',
  // Org / community
  volunteers:       '/img/tags/volunteers.png',
  volunteer:        '/img/tags/volunteers.png',
  nonprofit:        '/img/tags/nonprofit.png',
  fundraiser:       '/img/tags/fundraiser.png',
  fundraising:      '/img/tags/fundraiser.png',
  news:             '/img/tags/news.png',
  family:           '/img/tags/family.png',
  humans:           '/img/tags/humans.png',
  cost:             '/img/tags/cost.png',
  // Educational
  educational:      '/img/tags/educational.png',
  // Fallback
  petcare:          '/img/tags/care.png',
  pethealth:        '/img/tags/health.png',
  pets:             '/img/tags/guineapigs.png',
  smallanimal:      '/img/tags/guineapigs.png',
  smallanimalrescue:'/img/tags/rescue.png',
  exoticpet:        '/img/tags/educational.png',
};

const FALLBACK_IMAGE = '/img/tags/health.png';

/**
 * Normalise a string to a slug for map lookups.
 */
function toSlug(str) {
  return (str || '').toLowerCase().replace(/[\s\-_\/\.]+/g, '');
}

/**
 * Get the best image for a tag label.
 */
function getTagImage(tagLabel) {
  return DOC_TAG_IMAGES[toSlug(tagLabel)] || FALLBACK_IMAGE;
}

/**
 * Get the most topically relevant image for an article card.
 *
 * Strategy: scan the article title for topic keywords and return the most
 * specific matching image. Falls back to the tag image if nothing matches.
 *
 * The keyword list is ordered from most-specific to least-specific so the
 * first match wins.
 */
const TITLE_KEYWORD_MAP = [
  // Specific health conditions (most specific first)
  [['satin syndrome', 'satin guinea'],                  '/img/tags/satin-syndrome.png'],
  [['lethal white'],                                     '/img/tags/lethalwhite.png'],
  [['bumblefoot', 'pododermatitis'],                     '/img/tags/bumblefoot.png'],
  [['vitamin c', 'scurvy'],                              '/img/tags/vitamin-c.png'],
  [['critical care', 'syringe feed'],                   '/img/tags/critical-care.png'],
  [['dental', 'teeth', 'tooth', 'malocclusion', 'incisor', 'molar'], '/img/tags/dental.png'],
  [['respiratory', 'pneumonia', 'uri ', 'lung', 'breathing', 'mycoplasma', 'bordetella'], '/img/tags/respiratory.png'],
  [['heart', 'cardiac', 'cardiovascular'],              '/img/tags/heart.png'],
  [['neurolog', 'head tilt', 'seizure', 'stroke', 'e. cuniculi'], '/img/tags/neurological.png'],
  [['cancer', 'tumor', 'tumour', 'lymphoma', 'mass', 'lump'], '/img/tags/cancer.png'],
  [['urinary', 'bladder', 'kidney', 'stone', 'sludge'], '/img/tags/urinary.png'],
  [['digestive', 'gi stasis', 'bloat', 'diarrhea', 'diarrhoea', 'cecotrope', 'gut'], '/img/tags/digestive.png'],
  [['parasite', 'mite', 'lice', 'flea', 'worm', 'coccidia', 'giardia', 'flystrike'], '/img/tags/parasites.png'],
  [['skin', 'dermatitis', 'ringworm', 'abscess', 'wound', 'fur mite'], '/img/tags/skin.png'],
  [['eye', 'corneal', 'hay poke', 'cataracts', 'vision'],  '/img/tags/eye-health.png'],
  [['ear', 'otitis', 'ear infection'],                  '/img/tags/ear-conditions.png'],
  [['pain management', 'pain relief', 'palliative'],    '/img/tags/pain-management.png'],
  [['surgery', 'surgical', 'splenectomy', 'operation'], '/img/tags/surgery.png'],
  [['medication', 'medicine', 'drug', 'antibiotic', 'dosage', 'dose'], '/img/tags/medications.png'],
  [['supplement', 'probiotic', 'vitamin'],              '/img/tags/supplements.png'],
  [['aging', 'senior', 'elderly', 'geriatric', 'old age'], '/img/tags/aging.png'],
  [['emergency', 'urgent', 'crisis', 'heat stroke', 'hypothermia'], '/img/tags/emergency.png'],
  [['end of life', 'hospice', 'palliative', 'dying'],   '/img/tags/end-of-life.png'],
  [['euthanasia', 'putting down', 'humane death'],      '/img/tags/euthanasia.png'],
  [['grief', 'loss', 'mourning', 'bereavement'],        '/img/tags/grief.png'],
  [['rainbow bridge', 'memorial', 'remembrance'],       '/img/tags/rainbowbridge.png'],
  // Care topics
  [['nail trim', 'nail clip', 'claw'],                  '/img/tags/nail-trimming.png'],
  [['groom', 'brush', 'coat care'],                     '/img/tags/grooming.png'],
  [['bath', 'wash', 'dust bath'],                       '/img/tags/bathing.png'],
  [['taming', 'hand tame', 'trust building'],           '/img/tags/taming.png'],
  [['bonding', 'bond', 'introduction', 'pairing'],      '/img/tags/bonding.png'],
  [['socializ', 'socialise', 'companionship'],          '/img/tags/socialization.png'],
  [['handling', 'hold', 'pick up', 'carry'],            '/img/tags/handling.png'],
  [['enrichment', 'toy', 'stimulation', 'activity'],   '/img/tags/enrichment.png'],
  [['exercise', 'run', 'physical activity'],            '/img/tags/exercise.png'],
  [['wheel', 'running wheel', 'saucer'],                '/img/tags/wheels.png'],
  [['playtime', 'play time', 'free roam', 'floor time'], '/img/tags/playtime.png'],
  [['bedding', 'substrate', 'litter', 'fleece'],        '/img/tags/bedding.png'],
  [['housing', 'cage', 'enclosure', 'habitat', 'hutch', 'pen', 'c&c'], '/img/tags/housing.png'],
  [['temperature', 'heat', 'cold', 'climate', 'cooling'], '/img/tags/temperature.png'],
  [['hay', 'timothy', 'orchard grass', 'meadow grass'], '/img/tags/hay.png'],
  [['vegetable', 'veggie', 'leafy green', 'herb'],      '/img/tags/vegetables.png'],
  [['treat', 'snack', 'fruit'],                         '/img/tags/treats.png'],
  [['toxic', 'dangerous food', 'poisonous', 'avoid feeding', 'unsafe food'], '/img/tags/dangerous-foods.png'],
  [['diet', 'nutrition', 'feeding', 'food guide', 'what to feed'], '/img/tags/diet.png'],
  [['weight', 'obesity', 'overweight', 'slim'],         '/img/tags/wellness.png'],
  [['shopping', 'supplies', 'product', 'buy', 'recommend', 'what you need'], '/img/tags/shopping.png'],
  [['getting started', 'beginner', 'new owner', 'first time', 'checklist', 'guide to owning'], '/img/tags/getting-started.png'],
  // Genetics & lifecycle
  [['sexing', 'sex a ', 'determine sex', 'male or female'], '/img/tags/sexing.png'],
  [['genetics', 'gene', 'hereditary', 'inherited'],     '/img/tags/genetics.png'],
  [['breeding', 'breed'],                               '/img/tags/breeding.png'],
  [['pregnancy', 'pregnant', 'gestation', 'birth'],     '/img/tags/pregnancy.png'],
  [['baby', 'babies', 'pup', 'kit', 'newborn', 'litter'], '/img/tags/babies.png'],
  [['spay', 'neuter', 'desex', 'steriliz'],             '/img/tags/spaying-neutering.png'],
  [['lifespan', 'life expectancy', 'how long do'],      '/img/tags/lifespan.png'],
  // Rescue & org
  [['foster', 'fostering'],                             '/img/tags/fostering.png'],
  [['adopt', 'adoption', 'rehome'],                     '/img/tags/adoption.png'],
  [['rescue', 'surrendering', 'intake'],                '/img/tags/rescue.png'],
  [['sanctuary'],                                       '/img/tags/sanctuary.png'],
  [['volunteer'],                                       '/img/tags/volunteers.png'],
  [['fundrais', 'donation', 'donate'],                  '/img/tags/fundraiser.png'],
  [['cost', 'expense', 'budget', 'afford', 'price'],    '/img/tags/cost.png'],
  // Behavior
  [['behavior', 'behaviour', 'aggress', 'biting', 'territorial', 'dominance'], '/img/tags/behavior.png'],
  // Safety
  [['safety', 'safe', 'hazard', 'danger', 'toxic plant', 'predator'], '/img/tags/safety.png'],
  // Species (least specific — only if nothing else matched)
  [['guinea pig', 'cavy'],                              '/img/tags/guineapigs.png'],
  [['rabbit', 'bunny', 'bun '],                         '/img/tags/rabbits.png'],
  [['chinchilla'],                                      '/img/tags/chinchillas.png'],
  [['ferret'],                                          '/img/tags/ferrets.png'],
  [['hamster'],                                         '/img/tags/hamsters.png'],
  [['hedgehog'],                                        '/img/tags/hedgehogs.png'],
  [['rat ', 'rats ', 'fancy rat'],                      '/img/tags/rats.png'],
  [['mouse', 'mice'],                                   '/img/tags/mice.png'],
  [['degu'],                                            '/img/tags/degus.png'],
];

/**
 * Pick the best image for an article card based on its title.
 * Falls back to the tag image if no title keyword matches.
 */
function getDocCardImage(docTitle, tagLabel) {
  const lower = (docTitle || '').toLowerCase();
  for (const [keywords, img] of TITLE_KEYWORD_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return img;
    }
  }
  return getTagImage(tagLabel);
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
  const image = getDocCardImage(doc.title, tagLabel);
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

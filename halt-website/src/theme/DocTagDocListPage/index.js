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
<<<<<<< HEAD
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
  emergency:        '/img/tags/emergency.png',
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
  gi:               '/img/tags/digestive.png',
  gastrointestinal: '/img/tags/digestive.png',
  digestive:        '/img/tags/digestive.png',
  digestivehealth:  '/img/tags/digestive.png',
  digestion:        '/img/tags/digestive.png',
  diarrhea:         '/img/tags/digestive.png',
  bloat:            '/img/tags/digestive.png',
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
  heartdisease:     '/img/tags/heart.png',
  heart:            '/img/tags/heart.png',
  urinary:          '/img/tags/urinary.png',
  bladder:          '/img/tags/urinary.png',
  stones:           '/img/tags/urinary.png',
  reproductive:     '/img/tags/reproductive.png',
  ovariancysts:     '/img/tags/reproductive.png',
  female:           '/img/tags/reproductive.png',
  skin:             '/img/tags/skin.png',
  skinhealth:       '/img/tags/skin.png',
  bumblefoot:       '/img/tags/skin.png',
  pododermatitis:   '/img/tags/skin.png',
  eyes:             '/img/tags/eye-health.png',
  cornealulcer:     '/img/tags/eye-health.png',
  haypoke:          '/img/tags/eye-health.png',
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
  grooming:         '/img/tags/grooming.png',
  socialization:    '/img/tags/bonding.png',
  social:           '/img/tags/bonding.png',
  introductions:    '/img/tags/bonding.png',
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
  enrichment:       '/img/tags/enrichment.png',
  toys:             '/img/tags/enrichment.png',
  environment:      '/img/tags/care.png',
  supplies:         '/img/tags/shopping.png',
  wishlist:         '/img/tags/shopping.png',
  // Genetics & breeds
  genetics:         '/img/tags/educational.png',
  breeds:           '/img/tags/educational.png',
  breeding:         '/img/tags/breeding.png',
  genetic:          '/img/tags/educational.png',
  coat:             '/img/tags/educational.png',
  coatcolor:        '/img/tags/educational.png',
  hairless:         '/img/tags/educational.png',
  sexing:           '/img/tags/sexing.png',
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
  safety:           '/img/tags/emergency.png',
  dangerous:        '/img/tags/emergency.png',
  // Lifecycle & family
  pregnancy:        '/img/tags/pregnancy.png',
  newborn:          '/img/tags/pregnancy.png',
  newborns:         '/img/tags/pregnancy.png',
  lactation:        '/img/tags/pregnancy.png',
  babies:           '/img/tags/pregnancy.png',
  endoflife:        '/img/tags/endoflife.png',
  palliativecare:   '/img/tags/endoflife.png',
  grief:            '/img/tags/endoflife.png',
  euthanasia:       '/img/tags/endoflife.png',
  family:           '/img/tags/family.png',
  children:         '/img/tags/family.png',
  firstpet:         '/img/tags/family.png',
  cost:             '/img/tags/family.png',
  wellness:         '/img/tags/wellness.png',
  homehealthcheck:  '/img/tags/wellness.png',
  taming:           '/img/tags/taming.png',
  handling:         '/img/tags/taming.png',
  fearful:          '/img/tags/taming.png',
  // Rescue & nonprofit
  nonprofit:        '/img/tags/nonprofit.png',
  fundraising:      '/img/tags/nonprofit.png',
  volunteers:       '/img/tags/volunteers.png',
  volunteering:     '/img/tags/volunteers.png',
  // Fallback
  educational:      '/img/tags/educational.png',
  petcare:          '/img/tags/care.png',
  pethealth:        '/img/tags/health.png',
  pets:             '/img/tags/guineapigs.png',
  smallanimal:      '/img/tags/guineapigs.png',
  smallanimalrescue:'/img/tags/adoptables.png',
  exoticpet:        '/img/tags/educational.png',
=======
  // ── Species ──────────────────────────────────────────────────────────────
  rat:                '/img/tags/rat-health.png',
  rats:               '/img/tags/rat-health.png',
  'rat-health':       '/img/tags/rat-health.png',
  rathealth:          '/img/tags/rat-health.png',
  fancyrat:           '/img/tags/rat-health.png',
  rodent:             '/img/tags/rat-health.png',
  rabbit:             '/img/tags/rabbit-health.png',
  rabbits:            '/img/tags/rabbit-health.png',
  'rabbit-health':    '/img/tags/rabbit-health.png',
  rabbithealth:       '/img/tags/rabbit-health.png',
  chinchilla:         '/img/tags/chinchilla-health.png',
  chinchillas:        '/img/tags/chinchilla-health.png',
  'chinchilla-health':'/img/tags/chinchilla-health.png',
  chinchillahealth:   '/img/tags/chinchilla-health.png',
  ferret:             '/img/tags/ferret-health.png',
  ferrets:            '/img/tags/ferret-health.png',
  'ferret-health':    '/img/tags/ferret-health.png',
  ferrethealth:       '/img/tags/ferret-health.png',
  guineapig:          '/img/tags/guineapigs.png',
  guineapigs:         '/img/tags/guineapigs.png',
  'guinea-pig':       '/img/tags/guineapigs.png',
  'guinea-pig-health':'/img/tags/guineapigs.png',
  guineapighealth:    '/img/tags/guineapigs.png',
  skinnypig:          '/img/tags/guineapigs.png',
  hamster:            '/img/tags/hamster-health.png',
  hamsters:           '/img/tags/hamster-health.png',
  'hamster-health':   '/img/tags/hamster-health.png',
  hamsterhealth:      '/img/tags/hamster-health.png',
  dwarfhamsters:      '/img/tags/hamster-health.png',
  hedgehog:           '/img/tags/hedgehog-health.png',
  hedgehogs:          '/img/tags/hedgehog-health.png',
  'hedgehog-health':  '/img/tags/hedgehog-health.png',
  hedgehoghealth:     '/img/tags/hedgehog-health.png',
  mice:               '/img/tags/mouse-health.png',
  mouse:              '/img/tags/mouse-health.png',
  'mouse-health':     '/img/tags/mouse-health.png',
  mousehealth:        '/img/tags/mouse-health.png',
  degu:               '/img/tags/degu-health.png',
  degus:              '/img/tags/degu-health.png',
  'degu-health':      '/img/tags/degu-health.png',
  deguhealth:         '/img/tags/degu-health.png',
  gerbil:             '/img/tags/gerbil-health.png',
  gerbils:            '/img/tags/gerbil-health.png',
  'gerbil-health':    '/img/tags/gerbil-health.png',
  gerbilhealth:       '/img/tags/gerbil-health.png',

  // ── Health & medical (specific) ──────────────────────────────────────────
  health:             '/img/tags/health.png',
  illness:            '/img/tags/health.png',
  illnesses:          '/img/tags/health.png',
  'veterinary-care':  '/img/tags/veterinary-care.png',
  veterinarycare:     '/img/tags/veterinary-care.png',
  veterinary:         '/img/tags/veterinary-care.png',
  medical:            '/img/tags/veterinary-care.png',
  medication:         '/img/tags/medication.png',
  medications:        '/img/tags/medication.png',
  treatment:          '/img/tags/medication.png',
  surgery:            '/img/tags/surgery.png',
  'critical-care':    '/img/tags/critical-care.png',
  criticalcare:       '/img/tags/critical-care.png',
  emergency:          '/img/tags/emergency.png',
  'pain-management':  '/img/tags/pain-management.png',
  painmanagement:     '/img/tags/pain-management.png',
  'senior-care':      '/img/tags/senior-care.png',
  seniorcare:         '/img/tags/senior-care.png',
  senior:             '/img/tags/senior-care.png',
  'end-of-life':      '/img/tags/end-of-life.png',
  endoflife:          '/img/tags/end-of-life.png',
  palliativecare:     '/img/tags/end-of-life.png',
  grief:              '/img/tags/end-of-life.png',
  euthanasia:         '/img/tags/end-of-life.png',
  wellness:           '/img/tags/wellness.png',
  prevention:         '/img/tags/wellness.png',
  'dental-disease':   '/img/tags/dental-disease.png',
  dentaldisease:      '/img/tags/dental-disease.png',
  dental:             '/img/tags/dental-disease.png',
  dentalcare:         '/img/tags/dental-disease.png',
  malocclusion:       '/img/tags/dental-disease.png',
  teeth:              '/img/tags/dental-disease.png',
  respiratory:        '/img/tags/respiratory.png',
  respiratoryinfection:'/img/tags/respiratory.png',
  respiratorydisease: '/img/tags/respiratory.png',
  pneumonia:          '/img/tags/respiratory.png',
  uri:                '/img/tags/respiratory.png',
  'heart-disease':    '/img/tags/heart-disease.png',
  heartdisease:       '/img/tags/heart-disease.png',
  heart:              '/img/tags/heart-disease.png',
  cardiac:            '/img/tags/heart-disease.png',
  digestive:          '/img/tags/digestive.png',
  gi:                 '/img/tags/digestive.png',
  gastrointestinal:   '/img/tags/digestive.png',
  digestivehealth:    '/img/tags/digestive.png',
  diarrhea:           '/img/tags/digestive.png',
  bloat:              '/img/tags/bloat.png',
  obstruction:        '/img/tags/digestive.png',
  cecotropes:         '/img/tags/digestive.png',
  flystrike:          '/img/tags/digestive.png',
  neurological:       '/img/tags/neurological.png',
  neurologic:         '/img/tags/neurological.png',
  headtilt:           '/img/tags/neurological.png',
  seizures:           '/img/tags/neurological.png',
  stroke:             '/img/tags/neurological.png',
  parasites:          '/img/tags/parasites.png',
  mites:              '/img/tags/parasites.png',
  lice:               '/img/tags/parasites.png',
  fleas:              '/img/tags/parasites.png',
  worms:              '/img/tags/parasites.png',
  infections:         '/img/tags/infections.png',
  infection:          '/img/tags/infections.png',
  bacteria:           '/img/tags/infections.png',
  abscess:            '/img/tags/infections.png',
  cancer:             '/img/tags/cancer.png',
  tumor:              '/img/tags/cancer.png',
  lymphoma:           '/img/tags/cancer.png',
  lumps:              '/img/tags/cancer.png',
  'eye-health':       '/img/tags/eye-health.png',
  eyehealth:          '/img/tags/eye-health.png',
  eyes:               '/img/tags/eye-health.png',
  cornealulcer:       '/img/tags/eye-health.png',
  haypoke:            '/img/tags/eye-health.png',
  skin:               '/img/tags/skin.png',
  skinhealth:         '/img/tags/skin.png',
  bumblefoot:         '/img/tags/bumblefoot.png',
  pododermatitis:     '/img/tags/bumblefoot.png',
  urinary:            '/img/tags/urinary.png',
  bladder:            '/img/tags/urinary.png',
  stones:             '/img/tags/urinary.png',
  reproductive:       '/img/tags/reproductive.png',
  ovariancysts:       '/img/tags/reproductive.png',
  female:             '/img/tags/reproductive.png',
  pregnancy:          '/img/tags/pregnancy.png',
  newborn:            '/img/tags/pregnancy.png',
  newborns:           '/img/tags/pregnancy.png',
  lactation:          '/img/tags/pregnancy.png',
  babies:             '/img/tags/pregnancy.png',
  musculoskeletal:    '/img/tags/musculoskeletal.png',
  bones:              '/img/tags/musculoskeletal.png',
  joints:             '/img/tags/musculoskeletal.png',
  obesity:            '/img/tags/obesity.png',
  diabetes:           '/img/tags/obesity.png',
  metabolic:          '/img/tags/obesity.png',
  insulinoma:         '/img/tags/medical.png',
  heatstroke:         '/img/tags/emergency.png',
  hyperthermia:       '/img/tags/emergency.png',
  scurvy:             '/img/tags/nutrition.png',
  vitaminc:           '/img/tags/nutrition.png',
  vaccination:        '/img/tags/veterinary-care.png',
  'satin-syndrome':   '/img/tags/satin-syndrome.png',
  satinsyndrome:      '/img/tags/satin-syndrome.png',
  satin:              '/img/tags/satin-syndrome.png',
  lethalwhite:        '/img/tags/lethalwhite.png',
  'lethal-white':     '/img/tags/lethalwhite.png',

  // ── Care & husbandry ─────────────────────────────────────────────────────
  care:               '/img/tags/care.png',
  careguide:          '/img/tags/care.png',
  husbandry:          '/img/tags/care.png',
  gettingstarted:     '/img/tags/care.png',
  beginner:           '/img/tags/care.png',
  checklist:          '/img/tags/care.png',
  grooming:           '/img/tags/grooming.png',
  nails:              '/img/tags/grooming.png',
  hygiene:            '/img/tags/grooming.png',
  handling:           '/img/tags/handling.png',
  taming:             '/img/tags/taming.png',
  training:           '/img/tags/taming.png',
  fearful:            '/img/tags/taming.png',
  bonding:            '/img/tags/bonding.png',
  socialization:      '/img/tags/bonding.png',
  introductions:      '/img/tags/bonding.png',
  quarantine:         '/img/tags/bonding.png',
  nutrition:          '/img/tags/nutrition.png',
  diet:               '/img/tags/nutrition.png',
  feeding:            '/img/tags/nutrition.png',
  hay:                '/img/tags/nutrition.png',
  vegetables:         '/img/tags/nutrition.png',
  treats:             '/img/tags/nutrition.png',
  toxicfoods:         '/img/tags/safety.png',
  habitat:            '/img/tags/habitat.png',
  housing:            '/img/tags/housing.png',
  cage:               '/img/tags/housing.png',
  bedding:            '/img/tags/bedding.png',
  enrichment:         '/img/tags/enrichment.png',
  toys:               '/img/tags/enrichment.png',
  environment:        '/img/tags/habitat.png',
  supplies:           '/img/tags/shopping.png',
  shopping:           '/img/tags/shopping.png',
  wishlist:           '/img/tags/shopping.png',
  cost:               '/img/tags/cost.png',
  family:             '/img/tags/family.png',
  children:           '/img/tags/family.png',
  firstpet:           '/img/tags/family.png',
  safety:             '/img/tags/safety.png',
  dangerous:          '/img/tags/safety.png',
  behavior:           '/img/tags/behavior.png',
  socialbehavior:     '/img/tags/behavior.png',
  aggression:         '/img/tags/behavior.png',

  // ── Genetics & breeds ────────────────────────────────────────────────────
  genetics:           '/img/tags/genetics.png',
  breeds:             '/img/tags/breeds.png',
  breeding:           '/img/tags/breeding.png',
  coat:               '/img/tags/coat.png',
  coatcolor:          '/img/tags/coat.png',
  hairless:           '/img/tags/coat.png',
  sexing:             '/img/tags/sexing.png',
  clubbedfeet:        '/img/tags/musculoskeletal.png',
  roan:               '/img/tags/genetics.png',
  dalmatian:          '/img/tags/genetics.png',

  // ── Rescue & adoption ────────────────────────────────────────────────────
  rescue:             '/img/tags/rescue.png',
  adoption:           '/img/tags/adoption.png',
  adoptions:          '/img/tags/adoption.png',
  sanctuary:          '/img/tags/sanctuary.png',
  specialneeds:       '/img/tags/sanctuary.png',
  disability:         '/img/tags/sanctuary.png',
  rainbowbridge:      '/img/tags/rainbowbridge.png',
  nonprofit:          '/img/tags/nonprofit.png',
  volunteers:         '/img/tags/volunteers.png',
  volunteering:       '/img/tags/volunteers.png',
  fundraising:        '/img/tags/nonprofit.png',

  // ── General ──────────────────────────────────────────────────────────────
  educational:        '/img/tags/educational.png',
  petcare:            '/img/tags/care.png',
  pethealth:          '/img/tags/health.png',
  pets:               '/img/tags/guineapigs.png',
  smallanimal:        '/img/tags/guineapigs.png',
  smallanimalrescue:  '/img/tags/rescue.png',
  exoticpet:          '/img/tags/educational.png',
>>>>>>> 2071cacf (Tag audit: consolidate 440→70 canonical tags, add 53 new kawaii tag graphics, post-image-first cards)
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

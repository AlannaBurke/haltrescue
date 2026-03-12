import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  translateTagsPageTitle,
} from '@docusaurus/theme-common';
import SearchMetadata from '@theme/SearchMetadata';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/**
 * Maps doc tag slugs to kawaii HALT tag images.
 * Tags are normalised: lowercased, spaces/hyphens removed.
 */
const DOC_TAG_IMAGES = {
  // Species
  degu:             '/img/tags/degus.png',
  degus:            '/img/tags/degus.png',
  rat:              '/img/tags/rats.png',
  rats:             '/img/tags/rats.png',
  ratvarieties:     '/img/tags/rats.png',
  fancyrat:         '/img/tags/rats.png',
  rodent:           '/img/tags/rats.png',
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
  // General health
  health:           '/img/tags/health.png',
  illnesses:        '/img/tags/health.png',
  disease:          '/img/tags/health.png',
  // Medical / conditions
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
  uri:              '/img/tags/medical.png',
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
  eyes:             '/img/tags/medical.png',
  cornealulcer:     '/img/tags/medical.png',
  haypoke:          '/img/tags/medical.png',
  otitis:           '/img/tags/medical.png',
  earinfections:    '/img/tags/medical.png',
  scurvy:           '/img/tags/medical.png',
  vitaminc:         '/img/tags/medical.png',
  hairball:         '/img/tags/medical.png',
  nails:            '/img/tags/medical.png',
  cervicallymphadenitis: '/img/tags/medical.png',
  vaccination:      '/img/tags/medical.png',
  prevention:       '/img/tags/medical.png',
  // Parasites
  parasites:        '/img/tags/parasites.png',
  intestinalparasites: '/img/tags/parasites.png',
  mites:            '/img/tags/parasites.png',
  lice:             '/img/tags/parasites.png',
  fleas:            '/img/tags/parasites.png',
  worms:            '/img/tags/parasites.png',
  coccidia:         '/img/tags/parasites.png',
  giardia:          '/img/tags/parasites.png',
  ecuniculi:        '/img/tags/parasites.png',
  bordetella:       '/img/tags/parasites.png',
  // Respiratory
  respiratory:      '/img/tags/respiratory.png',
  respiratoryinfection: '/img/tags/respiratory.png',
  respiratorydisease: '/img/tags/respiratory.png',
  chronicrespiratorydisease: '/img/tags/respiratory.png',
  pneumonia:        '/img/tags/respiratory.png',
  // Neurological
  neurological:     '/img/tags/neurological.png',
  headtilt:         '/img/tags/neurological.png',
  seizures:         '/img/tags/neurological.png',
  stroke:           '/img/tags/neurological.png',
  // Dental
  dental:           '/img/tags/dental.png',
  dentalcare:       '/img/tags/dental.png',
  dentaldisease:    '/img/tags/dental.png',
  malocclusion:     '/img/tags/dental.png',
  teeth:            '/img/tags/dental.png',
  // Digestive
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
  // Skin
  skinhealth:       '/img/tags/medical.png',
  bumblefoot:       '/img/tags/medical.png',
  pododermatitis:   '/img/tags/medical.png',
  // Care & husbandry
  care:             '/img/tags/care.png',
  careguide:        '/img/tags/care.png',
  husbandry:        '/img/tags/care.png',
  gettingstarted:   '/img/tags/care.png',
  beginner:         '/img/tags/care.png',
  handling:         '/img/tags/care.png',
  checklist:        '/img/tags/care.png',
  homecare:         '/img/tags/care.png',
  hygiene:          '/img/tags/care.png',
  quarantine:       '/img/tags/care.png',
  training:         '/img/tags/care.png',
  // Grooming
  grooming:         '/img/tags/grooming.png',
  // Nutrition
  nutrition:        '/img/tags/nutrition.png',
  diet:             '/img/tags/nutrition.png',
  feeding:          '/img/tags/nutrition.png',
  hay:              '/img/tags/nutrition.png',
  vegetables:       '/img/tags/nutrition.png',
  treats:           '/img/tags/nutrition.png',
  toxicfoods:       '/img/tags/nutrition.png',
  // Housing & enrichment
  habitat:          '/img/tags/housing.png',
  housing:          '/img/tags/housing.png',
  cage:             '/img/tags/housing.png',
  bedding:          '/img/tags/housing.png',
  enrichment:       '/img/tags/housing.png',
  toys:             '/img/tags/housing.png',
  environment:      '/img/tags/housing.png',
  supplies:         '/img/tags/housing.png',
  // Behavior
  behavior:         '/img/tags/behavior.png',
  socialbehavior:   '/img/tags/behavior.png',
  socialization:    '/img/tags/behavior.png',
  introductions:    '/img/tags/behavior.png',
  aggression:       '/img/tags/behavior.png',
  // Genetics & breeds
  genetics:         '/img/tags/genetics.png',
  breeds:           '/img/tags/genetics.png',
  breeding:         '/img/tags/genetics.png',
  genetic:          '/img/tags/genetics.png',
  coat:             '/img/tags/genetics.png',
  coatcolor:        '/img/tags/genetics.png',
  hairless:         '/img/tags/genetics.png',
  sexing:           '/img/tags/genetics.png',
  clubbedfeet:      '/img/tags/genetics.png',
  roan:             '/img/tags/genetics.png',
  dalmatian:        '/img/tags/genetics.png',
  lethalwhite:      '/img/tags/lethalwhite.png',
  satinsyndrome:    '/img/tags/satin.png',
  satin:            '/img/tags/satin.png',
  // Safety
  safety:           '/img/tags/safety.png',
  dangerous:        '/img/tags/safety.png',
  // Rescue & adoption
  rescue:           '/img/tags/adoptables.png',
  adoption:         '/img/tags/adoptions.png',
  adoptions:        '/img/tags/adoptions.png',
  sanctuary:        '/img/tags/sanctuary.png',
  specialneeds:     '/img/tags/sanctuary.png',
  disability:       '/img/tags/sanctuary.png',
  rainbowbridge:    '/img/tags/rainbowbridge.png',
  // Fallback
  educational:      '/img/tags/educational.png',
  petcare:          '/img/tags/care.png',
  pethealth:        '/img/tags/health.png',
  petcare2:         '/img/tags/care.png',
  petcare3:         '/img/tags/care.png',
  petcare4:         '/img/tags/care.png',
  petcare5:         '/img/tags/care.png',
  pethealth:        '/img/tags/health.png',
  pets:             '/img/tags/guineapigs.png',
  smallanimal:      '/img/tags/guineapigs.png',
  exoticpet:        '/img/tags/educational.png',
};

const FALLBACK_IMAGE = '/img/tags/guineapigs.png';

function getTagImage(tag) {
  const slug = (tag.label || tag.permalink?.split('/').pop() || '')
    .toLowerCase()
    .replace(/[\s\-_\/\.]+/g, '');
  return DOC_TAG_IMAGES[slug] || FALLBACK_IMAGE;
}

/**
 * Assign a filter category to a tag for the filter buttons.
 */
function getTagCategory(tag) {
  const slug = (tag.label || tag.permalink?.split('/').pop() || '')
    .toLowerCase()
    .replace(/[\s\-_\/\.]+/g, '');

  if (['degu', 'degus', 'rat', 'rats', 'ratvarieties', 'fancyrat', 'rodent', 'rabbits', 'rvhd2',
       'chinchilla', 'chinchillas', 'ferret', 'ferrets', 'guineapig', 'guineapigs',
       'skinnypig', 'hamster', 'hamsters', 'dwarfhamsters', 'hedgehog', 'hedgehogs',
       'mice', 'mouse'].includes(slug)) return 'Species';

  if (['parasites', 'intestinalparasites', 'mites', 'lice', 'fleas', 'worms',
       'coccidia', 'giardia', 'ecuniculi', 'bordetella'].includes(slug)) return 'Parasites';

  if (['respiratory', 'respiratoryinfection', 'respiratorydisease',
       'chronicrespiratorydisease', 'pneumonia', 'uri', 'mpulmonis',
       'mycoplasma', 'murinerespiratorymycoplasmosis'].includes(slug)) return 'Respiratory';

  if (['neurological', 'headtilt', 'seizures', 'stroke'].includes(slug)) return 'Neurological';

  if (['dental', 'dentalcare', 'dentaldisease', 'malocclusion', 'teeth'].includes(slug)) return 'Dental';

  if (['genetics', 'breeds', 'breeding', 'genetic', 'coat', 'coatcolor', 'hairless',
       'sexing', 'clubbedfeet', 'roan', 'dalmatian', 'lethalwhite',
       'satinsyndrome', 'satin'].includes(slug)) return 'Genetics';

  if (['nutrition', 'diet', 'feeding', 'hay', 'vegetables', 'treats',
       'toxicfoods'].includes(slug)) return 'Nutrition';

  if (['habitat', 'housing', 'cage', 'bedding', 'enrichment', 'toys',
       'environment', 'supplies'].includes(slug)) return 'Housing';

  if (['behavior', 'socialbehavior', 'socialization', 'introductions',
       'aggression', 'training'].includes(slug)) return 'Behavior';

  if (['grooming', 'hygiene', 'nails', 'skinhealth', 'bumblefoot',
       'pododermatitis'].includes(slug)) return 'Grooming';

  if (['safety', 'dangerous', 'toxicfoods'].includes(slug)) return 'Safety';

  if (['rescue', 'adoption', 'adoptions', 'sanctuary', 'specialneeds',
       'disability', 'rainbowbridge'].includes(slug)) return 'Rescue';

  if (['health', 'illnesses', 'disease', 'medical', 'veterinary', 'symptoms',
       'treatment', 'diagnosis', 'emergency', 'diabetes', 'metabolic', 'endocrine',
       'hyperglycemia', 'hypoglycemia', 'insulinoma', 'pancreatichealth', 'cancer',
       'lymphoma', 'lumps', 'raredisease', 'congenital', 'fetalarrhythmia', 'maxfactor',
       'heatstroke', 'hyperthermia', 'hemorrhagicdisease', 'heartdisease', 'heart',
       'urinary', 'bladder', 'stones', 'reproductive', 'ovariancysts', 'female',
       'eyes', 'cornealulcer', 'haypoke', 'otitis', 'earinfections', 'scurvy',
       'vitaminc', 'hairball', 'cervicallymphadenitis', 'vaccination', 'prevention',
       'gistasis', 'gi', 'gastrointestinal', 'digestive', 'digestivehealth', 'digestion',
       'diarrhea', 'bloat', 'obstruction', 'cecotropes', 'poop', 'flystrike',
       'myiasis', 'flystrikewarning'].includes(slug)) return 'Health';

  return 'General';
}

const FILTER_CATEGORIES = [
  'All', 'Species', 'Health', 'Parasites', 'Respiratory', 'Neurological',
  'Dental', 'Nutrition', 'Housing', 'Behavior', 'Genetics', 'Grooming',
  'Safety', 'Rescue', 'General',
];

const SORT_OPTIONS = [
  { value: 'alpha-asc',   label: 'A → Z' },
  { value: 'alpha-desc',  label: 'Z → A' },
  { value: 'count-desc',  label: 'Most Articles' },
  { value: 'count-asc',   label: 'Fewest Articles' },
];

function TagCard({ tag }) {
  const { label, permalink, count } = tag;
  const image = getTagImage(tag);

  return (
    <article className={styles.tagCard}>
      <Link href={permalink} className={styles.tagCardLink} aria-label={`View all docs tagged ${label}`}>
        <div className={styles.tagImageWrapper}>
          <img
            src={image}
            alt={`${label} tag illustration`}
            className={styles.tagImage}
            loading="lazy"
          />
          <div className={styles.tagOverlay} aria-hidden="true" />
        </div>
        <div className={styles.tagBody}>
          <Heading as="h2" className={styles.tagLabel}>{label}</Heading>
          <span className={styles.tagCount}>
            {count} article{count !== 1 ? 's' : ''}
          </span>
        </div>
      </Link>
    </article>
  );
}

function DocTagsListPageMetadata({ title }) {
  return (
    <>
      <PageMetadata title={title} description="Browse all care guides and articles from Helping All Little Things Rescue by topic" />
      <SearchMetadata tag="doc_tags_list" />
    </>
  );
}

function DocTagsListPageContent({ tags }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('alpha-asc');

  const filteredTags = useMemo(() => {
    let result = tags;

    // Filter by search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(t => t.label.toLowerCase().includes(q));
    }

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(t => getTagCategory(t) === activeCategory);
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'alpha-asc':  return a.label.localeCompare(b.label);
        case 'alpha-desc': return b.label.localeCompare(a.label);
        case 'count-desc': return b.count - a.count;
        case 'count-asc':  return a.count - b.count;
        default:           return 0;
      }
    });

    return result;
  }, [tags, search, activeCategory, sortBy]);

  // Count tags per category for badge numbers
  const categoryCounts = useMemo(() => {
    const counts = { All: tags.length };
    tags.forEach(t => {
      const cat = getTagCategory(t);
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [tags]);

  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.page.docsTagsListPage)}>
      <div className={styles.pageWrapper}>
        <header className={styles.pageHeader}>
          <Heading as="h1" className={styles.pageTitle}>Browse by Topic</Heading>
          <p className={styles.pageSubtitle}>
            Explore all care guides and articles from Helping All Little Things Rescue by topic
          </p>
        </header>

        {/* Controls bar */}
        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon} aria-hidden="true">🔍</span>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search tags…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search tags"
            />
          </div>
          <div className={styles.sortWrapper}>
            <label htmlFor="tag-sort" className={styles.sortLabel}>Sort:</label>
            <select
              id="tag-sort"
              className={styles.sortSelect}
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category filter pills */}
        <div className={styles.filterBar} role="group" aria-label="Filter by category">
          {FILTER_CATEGORIES.filter(cat => categoryCounts[cat] > 0 || cat === 'All').map(cat => (
            <button
              key={cat}
              className={clsx(styles.filterPill, activeCategory === cat && styles.filterPillActive)}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
              {categoryCounts[cat] != null && (
                <span className={styles.filterPillCount}>{categoryCounts[cat]}</span>
              )}
            </button>
          ))}
        </div>

        {/* Results count */}
        {(search || activeCategory !== 'All') && (
          <p className={styles.resultsCount}>
            Showing {filteredTags.length} of {tags.length} tags
            {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
            {search ? ` matching "${search}"` : ''}
          </p>
        )}

        {/* Tag grid */}
        {filteredTags.length > 0 ? (
          <div className={styles.tagsGrid}>
            {filteredTags.map((tag) => (
              <TagCard key={tag.permalink} tag={tag} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No tags found{search ? ` matching "${search}"` : ''}.</p>
            <button
              className={styles.clearButton}
              onClick={() => { setSearch(''); setActiveCategory('All'); }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </HtmlClassNameProvider>
  );
}

export default function DocTagsListPage(props) {
  const title = translateTagsPageTitle();
  return (
    <>
      <DocTagsListPageMetadata {...props} title={title} />
      <DocTagsListPageContent {...props} title={title} />
    </>
  );
}

import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

// The Giving Tree: a little Christmas tree that lives in the bottom
// right corner of every page. Clicking it opens a big tree in the
// middle of the screen. The tree carries a set of decorative
// ornaments; clicking an ornament (or the tree itself) reveals a
// wish as a simple ticket: the critter's photo, what they are wishing
// for, a one line reason, the price, and a link to send the gift
// digitally so it comes straight to the rescue. The < and > buttons
// flip through the wishes. Mounted in the site Layout
// (src/theme/Layout), next to the MobileNavBar and FloatingCartButton.
//
// TO CHANGE THE WISHES: edit the WISHES list below. Photos live in
// static/img/giving-tree/. Only use photos of living residents.

const AMAZON_WISHLIST = 'https://tinyurl.com/HALT-Amazon-Wishlist';
const CHEWY_WISHLIST = 'https://tinyurl.com/HALT-Chewy-Wishlist';

// Visitors can pin wishes they want to come back to or fulfill. Pins
// are remembered in their browser (localStorage key
// haltPinnedWishesV1) and shown in a box under the tree.
const PIN_STORAGE_KEY = 'haltPinnedWishesV1';

// Each visitor gets their own shuffled wish order, saved in their
// browser (localStorage key haltGivingTreeOrderV1), so the order is
// different from person to person but stays the same for that person
// every time they open the tree.
const ORDER_STORAGE_KEY = 'haltGivingTreeOrderV1';

function readStoredOrder() {
  try {
    const raw = window.localStorage.getItem(ORDER_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((k) => typeof k === 'string') : [];
  } catch (e) {
    return [];
  }
}

function writeStoredOrder(keys) {
  try {
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(keys));
  } catch (e) {
    // Private browsing etc: the order just will not persist.
  }
}

function wishKey(w) {
  return `${w.name}|${w.item}`;
}

function readPinned() {
  try {
    const raw = window.localStorage.getItem(PIN_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((k) => typeof k === 'string') : [];
  } catch (e) {
    return [];
  }
}

function writePinned(keys) {
  try {
    window.localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(keys));
  } catch (e) {
    // Private browsing etc: pins just will not persist.
  }
}

const WISHES = [
  {
    name: 'Violet',
    img: '/img/giving-tree/violet.jpg',
    item: 'A Market Basket gift card for veggies',
    line: 'Violet would like a veggie gift card, to keep the bell peppers coming after her naps.',
    price: 'Any amount, $25 is perfect',
    link: '/donate',
    linkLabel: 'Send veggie money',
  },
  {
    name: 'Honey Magnolia',
    img: '/img/giving-tree/honey-magnolia.jpg',
    item: 'Garbage bags',
    line: 'Honey Magnolia would like garbage bags, because a herd this loved makes a heroic amount of trash.',
    price: 'About $10',
    link: AMAZON_WISHLIST,
    linkLabel: 'Send it from our wishlist',
  },
  {
    name: 'Jersey',
    img: '/img/giving-tree/jersey.jpg',
    item: 'A hidey house',
    line: 'Jersey would like a hidey house of his own, to be brave in private.',
    price: 'About $15',
    link: 'https://link.amazon/B07FJubYF',
    linkLabel: 'Send this hidey',
  },
  {
    name: 'Tally',
    img: '/img/giving-tree/tally.jpg',
    item: '50 lb of orchard grass',
    line: 'Tally would like orchard grass, for hiding in, snacking on, and generally being nowhere to be found.',
    price: 'About $40',
    link: 'https://link.amazon/B0g1BtOJA',
    linkLabel: 'Send orchard grass',
  },
  {
    name: 'Thora',
    img: '/img/giving-tree/thora.jpg',
    item: 'Paper towels',
    line: 'Thora would like paper towels, for wiping down cages and keeping every little space clean.',
    price: 'About $15',
    link: AMAZON_WISHLIST,
    linkLabel: 'Send it from our wishlist',
  },
  {
    name: 'Autumn',
    img: '/img/giving-tree/autumn.jpg',
    item: 'A plush cuddle cup bed',
    line: 'Autumn would like a soft cuddle cup bed, just her size for serious naps.',
    price: 'About $14',
    link: 'https://www.chewy.com/kaytee-cuddle-e-cup-plush-small/dp/129035',
    linkLabel: 'Send this bed',
  },
  {
    name: 'Harold',
    img: '/img/giving-tree/harold.jpg',
    item: 'A timothy tunnel',
    line: 'Harold would like a timothy tunnel, for hiding in, running through, and slowly eating his own house. Do not wake him up to give it to him.',
    price: 'About $12',
    link: 'https://www.chewy.com/oxbow-timothy-club-tunnel-small/dp/123718',
    linkLabel: 'Send this tunnel',
  },
  {
    name: 'Carter',
    img: '/img/giving-tree/carter.jpg',
    item: 'A fiddle sticks hideout',
    line: 'Carter would like a fiddle sticks hideout, a bendy little bridge to climb over, hide under, and chew on.',
    price: 'About $7',
    link: 'https://www.chewy.com/kaytee-tropical-fiddle-sticks/dp/248462',
    linkLabel: 'Send this hideout',
  },
  {
    name: 'Domino',
    img: '/img/giving-tree/domino.jpg',
    item: 'Knot nibbler chew toys',
    line: 'Domino would like knot nibbler chews, something satisfying to gnaw on between adventures.',
    price: 'About $7',
    link: 'https://www.chewy.com/kaytee-knot-nibbler-small-animal-chew/dp/129031',
    linkLabel: 'Send these chews',
  },
  {
    name: 'Tod',
    img: '/img/giving-tree/tod.jpg',
    item: 'Paper bedding',
    line: 'Tod would like fresh paper bedding, the blue kind, for burrowing, tunneling, and disappearing into for hours.',
    price: 'About $25',
    link: 'https://link.amazon/B0auxZUJz',
    linkLabel: 'Send this bedding',
  },
  {
    name: 'Ilya',
    img: '/img/giving-tree/ilya.jpg',
    item: 'A Kaytee crinkle tunnel',
    line: 'Ilya would like a crinkle tunnel of his own, perfect for zooming through, hiding in, and crinkling at top volume.',
    price: 'About $13',
    link: 'https://www.chewy.com/kaytee-crinkle-tunnel-oversized/dp/129044',
    linkLabel: 'Send this tunnel',
  },
  {
    name: 'Quill',
    img: '/img/giving-tree/quill.jpg',
    item: 'A dangly toy party pack',
    line: 'Quill would like the Oxbow dangly party pack, new toys to bat around and chew on.',
    price: 'About $19',
    link: 'https://www.chewy.com/oxbow-enriched-life-natural-dangly/dp/782318',
    linkLabel: 'Send these toys',
  },
  {
    name: 'Grimoire',
    img: '/img/giving-tree/grimoire.jpg',
    item: 'Arm & Hammer Deep Clean laundry detergent',
    line: 'Grimoire would like laundry detergent, the Arm & Hammer Deep Clean, to keep his blankets clean and smelling nice.',
    price: 'About $9',
    link: AMAZON_WISHLIST,
    linkLabel: 'Send it from our wishlist',
  },
  {
    name: 'Jasper',
    img: '/img/giving-tree/jasper.jpg',
    item: 'Thick textured baby wipes',
    line: 'Jasper would like the thick Bc Babycare cloud wipes, the grippy textured kind, for keeping his space (and his face) tidy.',
    price: 'About $15',
    link: AMAZON_WISHLIST,
    linkLabel: 'Send it from our wishlist',
  },
  {
    name: 'Paris',
    img: '/img/giving-tree/paris.jpg',
    item: 'Nitrile gloves for chopping veggies',
    line: 'Paris would like the black FRAMAR nitrile gloves for the humans. They are for chopping veggies, because Danni at sanctuary headquarters is allergic to them, so the gloves keep her hands safe.',
    price: 'About $16',
    link: AMAZON_WISHLIST,
    linkLabel: 'Send it from our wishlist',
  },
  {
    name: 'Paris',
    img: '/img/giving-tree/paris.jpg',
    item: 'Face masks for cleaning',
    line: 'Paris would like the purple FENFEN face masks for the humans, so cleaning day stays safe and sneeze free.',
    price: 'About $16',
    link: AMAZON_WISHLIST,
    linkLabel: 'Send it from our wishlist',
  },
  {
    name: 'Lumi',
    img: '/img/giving-tree/lumi.jpg',
    item: 'A gift certificate to Guinea Pig Market',
    line: 'Lumi would like a Guinea Pig Market gift certificate, for something special picked out just for piggies.',
    price: 'Any amount',
    link: 'http://guineapigmarket.com',
    linkLabel: 'Send a gift certificate',
  },
  {
    name: 'Evangeline',
    img: '/img/giving-tree/evangeline.jpg',
    item: 'Money on our vet account',
    line: 'Evangeline would like a little money on the vet account, so her next checkup is already covered.',
    price: 'Any amount, a wellness exam is $67',
    link: '/donate',
    linkLabel: 'Put money on the vet account',
  },
  {
    name: 'Sinatra',
    img: '/img/giving-tree/sinatra.jpg',
    item: 'Oven baked treats',
    line: 'Sinatra would like some oven baked treats, for doing things his way.',
    price: 'About $6',
    link: 'https://creator.anchor.store/a/qkewPzKH9P',
    linkLabel: 'Send these treats',
  },
  {
    name: 'Sinatra',
    img: '/img/giving-tree/sinatra.jpg',
    item: 'A soft sleeper bed',
    line: 'Sinatra would like a new sleeper bed, because a freshly made bed is his favorite place to do things his way.',
    price: 'About $19',
    link: 'https://www.chewy.com/ware-safari-small-animal-sleeper-bed/dp/181279',
    linkLabel: 'Send this bed',
  },
  {
    name: 'Hero',
    img: '/img/giving-tree/hero.jpg',
    item: 'A bedside bassinet for round the clock feedings',
    line: "Hero's life was made possible by round the clock feedings, curled up in a blanket next to the bed so he was right there for every one. In his honor, the team would like a bedside bassinet, so the next tiny patient can stay just as safe and close.",
    price: 'About $60',
    link: 'https://www.amazon.com/JinxZap-Bedside-Adjustable-Height-Small/dp/B0GLP4L66C',
    linkLabel: 'Send the bassinet',
  },
  {
    name: 'Villain',
    img: '/img/giving-tree/villain.jpg',
    item: 'An Oxbow play table',
    line: 'Villain would like an Oxbow play table to climb on and play under. Despite the name, he is the sweetest boy, full of kisses.',
    price: 'About $22',
    link: 'https://www.chewy.com/oxbow-play-table-small-animal-toy/dp/226841',
    linkLabel: 'Send this play table',
  },
  {
    name: 'Owen',
    img: '/img/giving-tree/owen.jpg',
    item: 'A dangly toy',
    line: 'Owen would like a dangly toy to bat around and chew on.',
    price: 'About $9',
    link: 'https://www.chewy.com/bird-life-parakeet-small-bird-combo/dp/370545',
    linkLabel: 'Send this toy',
  },
  {
    name: 'April',
    img: '/img/giving-tree/april.jpg',
    item: 'A big rainbow chew block kabob',
    line: 'April would like a SunGrow rainbow chew block kabob to gnaw on, made just right for chinchilla teeth.',
    price: 'About $10',
    link: 'https://www.chewy.com/sungrow-rainbow-foraging-chew-blocks/dp/359520',
    linkLabel: 'Send this chew',
  },
  {
    name: 'Sawyer',
    img: '/img/giving-tree/sawyer.jpg',
    item: 'Fleece pee pads',
    line: 'Sawyer would like fleece pee pads, soft and washable, for his favorite napping spot.',
    price: 'About $15',
    link: AMAZON_WISHLIST,
    linkLabel: 'Send it from our wishlist',
  },
  {
    name: 'Sunshine',
    img: '/img/giving-tree/sunshine.jpg',
    item: 'Wet food for the sanctuary cats',
    line: 'Sunshine would like her favorite wet foods, the good stuff that is safe for all her sanctuary buddies too.',
    price: 'About $20',
    link: 'https://creator.anchor.store/a/djHH3CAm04',
    linkLabel: 'Send this food',
  },
];

// Decorative ornaments on the big tree, as % of the tree area. There
// are deliberately fewer of these than there are wishes: they are
// decoration that sits ON the foliage (positions follow the tree's
// triangular shape), and each one reveals a wish when tapped. The
// arrows on a wish ticket flip through all of the wishes.
// Positions are % of the tree area, worked out against the tree
// drawing itself: every ball sits fully on the green, in the three
// bands between the two dotted garlands (the garlands arc across at
// roughly y 35-40% and y 59-65%) and above the foliage's bottom edge.
const DECOR_POSITIONS = [
  { x: 50, y: 17 },
  { x: 41, y: 27 }, { x: 59, y: 27 },
  { x: 35, y: 49 }, { x: 65, y: 49 },
  { x: 50, y: 52 },
  { x: 30, y: 72 }, { x: 43, y: 73 }, { x: 57, y: 73 }, { x: 70, y: 72 },
];

const ORNAMENT_COLORS = [
  '#e0245e', '#f59e0b', '#0f8a93', '#7c3aed', '#16a34a', '#eab308',
  '#dc2626', '#0891b2', '#db2777', '#65a30d', '#ea580c', '#2563eb',
];

function TreeSvg({ mini }) {
  return (
    <svg viewBox="0 0 200 240" className={mini ? styles.miniTree : styles.bigTree} aria-hidden="true">
      <polygon points="100,4 112,22 100,18 88,22" fill="#f5c542" />
      <path d="M100 18 L138 78 Q100 62 62 78 Z" fill="#2e9e5b" />
      <path d="M100 58 L152 132 Q100 112 48 132 Z" fill="#27894e" />
      <path d="M100 104 L168 196 Q100 172 32 196 Z" fill="#1f7a44" />
      <path d="M58 84 Q100 104 142 84" stroke="#f5c542" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 10" />
      <path d="M44 142 Q100 166 156 142" stroke="#e0245e" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1 10" />
      {mini && (
        <>
          <circle cx="100" cy="52" r="7" fill="#e0245e" stroke="#f5c542" strokeWidth="2" />
          <circle cx="76" cy="102" r="7" fill="#f59e0b" stroke="#f5c542" strokeWidth="2" />
          <circle cx="124" cy="102" r="7" fill="#0f8a93" stroke="#f5c542" strokeWidth="2" />
          <circle cx="62" cy="152" r="7" fill="#7c3aed" stroke="#f5c542" strokeWidth="2" />
          <circle cx="100" cy="160" r="7" fill="#e0245e" stroke="#f5c542" strokeWidth="2" />
          <circle cx="138" cy="152" r="7" fill="#f59e0b" stroke="#f5c542" strokeWidth="2" />
        </>
      )}
      <rect x="90" y="196" width="20" height="26" rx="3" fill="#8a5a33" />
      <ellipse cx="100" cy="228" rx="46" ry="7" fill="#e8f4f1" />
      <circle cx="76" cy="120" r="3" fill="#ffffff" opacity="0.85" />
      <circle cx="126" cy="150" r="3" fill="#ffffff" opacity="0.85" />
      <circle cx="92" cy="168" r="2.5" fill="#ffffff" opacity="0.7" />
    </svg>
  );
}

function shuffle(list) {
  const deck = list.slice();
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = deck[i];
    deck[i] = deck[j];
    deck[j] = tmp;
  }
  return deck;
}

// Build this visitor's personal wish order: the order saved in their
// browser if they have one (wishes that no longer exist drop out, new
// wishes join at the end in a shuffled order), or a fresh shuffle for
// a first time visitor.
function buildDeck() {
  const stored = readStoredOrder();
  const byKey = new Map(WISHES.map((w) => [wishKey(w), w]));
  const deck = [];
  stored.forEach((key) => {
    if (byKey.has(key)) {
      deck.push(byKey.get(key));
      byKey.delete(key);
    }
  });
  deck.push(...shuffle(WISHES.filter((w) => byKey.has(wishKey(w)))));
  return deck;
}

export default function GivingTree() {
  const [open, setOpen] = useState(false);
  const [wish, setWish] = useState(null);
  // The wish this visitor was shown first. Wish numbers on the ticket
  // are counted from here, so the first wish anyone sees is always
  // "Wish 1" for them, whatever order their deck is in.
  const [start, setStart] = useState(0);
  const [deck, setDeck] = useState(WISHES);
  const [pinned, setPinned] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    setPinned(readPinned());
    const personal = buildDeck();
    setDeck(personal);
    writeStoredOrder(personal.map(wishKey));
  }, []);

  const togglePin = (w) => {
    const key = wishKey(w);
    setPinned((cur) => {
      const next = cur.includes(key) ? cur.filter((k) => k !== key) : cur.concat(key);
      writePinned(next);
      return next;
    });
  };

  const openTree = () => {
    setWish(null);
    setOpen(true);
  };

  const close = useCallback(() => {
    setOpen(false);
    setWish(null);
  }, []);

  const openWish = useCallback(
    (i) => {
      setWish((cur) => {
        if (cur === null) {
          setStart(i);
        }
        return i;
      });
    },
    []
  );

  const step = useCallback(
    (dir) => {
      setWish((cur) => {
        if (cur === null) {
          const first = dir > 0 ? 0 : deck.length - 1;
          setStart(first);
          return first;
        }
        return (cur + dir + deck.length) % deck.length;
      });
    },
    [deck]
  );

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'ArrowRight') {
        step(1);
      } else if (e.key === 'ArrowLeft') {
        step(-1);
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  if (pathname === '/checkout') {
    return null;
  }

  const current = wish === null ? null : deck[wish];

  return (
    <>
      <button
        type="button"
        className={styles.treeButton}
        onClick={openTree}
        aria-label="Open the Giving Tree and see what our animals are wishing for"
      >
        <TreeSvg mini />
      </button>

      {open && (
        <div className={styles.backdrop} onClick={close} role="presentation">
          <div
            className={styles.panel}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="The Giving Tree"
          >
            <button type="button" className={styles.closeButton} onClick={close} aria-label="Close the Giving Tree">
              ×
            </button>

            {current === null ? (
              <>
                <h2 className={styles.title}>🎄 The Giving Tree 🎄</h2>
                <p className={styles.intro}>
                  Tap an ornament to reveal a wish from one of our residents.
                </p>
                <div className={styles.treeWrap} onClick={() => openWish(0)}>
                  <TreeSvg />
                  {DECOR_POSITIONS.map((pos, i) => (
                    <button
                      key={i}
                      type="button"
                      className={styles.ornament}
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openWish(i % deck.length);
                      }}
                      aria-label="Reveal a wish"
                    >
                      <span className={styles.bauble} style={{ animationDelay: `${(i % 6) * 0.35}s` }}>
                        <span className={styles.baubleCap} />
                        <span
                          className={styles.baubleBall}
                          style={{ background: ORNAMENT_COLORS[i % ORNAMENT_COLORS.length] }}
                        />
                        <span className={styles.baubleShine} />
                      </span>
                    </button>
                  ))}
                </div>
                {pinned.length > 0 && (
                  <div className={styles.pinnedBox}>
                    <div className={styles.pinnedTitle}>📌 Your pinned wishes</div>
                    {pinned
                      .map((key) => WISHES.find((w) => wishKey(w) === key))
                      .filter(Boolean)
                      .map((w) => (
                        <div key={wishKey(w)} className={styles.pinnedRow}>
                          {w.img && <img className={styles.pinnedThumb} src={w.img} alt="" />}
                          <div className={styles.pinnedInfo}>
                            <span className={styles.pinnedName}>{w.name}</span>: {w.item}
                            <div className={styles.pinnedPrice}>{w.price}</div>
                          </div>
                          <a
                            className={styles.sendSmall}
                            href={w.link}
                            target={w.link.startsWith('http') ? '_blank' : undefined}
                            rel="noreferrer"
                          >
                            Send it
                          </a>
                          <button
                            type="button"
                            className={styles.unpinButton}
                            onClick={() => togglePin(w)}
                            aria-label={`Unpin ${w.name}'s wish`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    <p className={styles.pinnedNote}>Pins are saved in your browser, so they will still be here when you come back.</p>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.wishView}>
                <button type="button" className={styles.backButton} onClick={() => setWish(null)}>
                  🎄 Back to the tree
                </button>
                <div className={styles.wishCard}>
                  <button type="button" className={`${styles.navButton} ${styles.navPrev}`} onClick={() => step(-1)} aria-label="Previous wish">
                    ‹
                  </button>
                  {current.img && <img className={styles.wishPhoto} src={current.img} alt={current.name} />}
                  <div className={styles.wishText}>
                    <div className={styles.wishName}>{current.name}</div>
                    <div className={styles.wishItem}>{current.item}</div>
                    <p className={styles.wishLine}>{current.line}</p>
                    <div className={styles.priceChip}>🎁 {current.price}</div>
                    <div>
                      <a className={styles.sendButton} href={current.link} target={current.link.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                        {current.linkLabel} →
                      </a>
                    </div>
                    <div>
                      <button
                        type="button"
                        className={`${styles.pinButton} ${pinned.includes(wishKey(current)) ? styles.pinButtonActive : ''}`}
                        onClick={() => togglePin(current)}
                      >
                        {pinned.includes(wishKey(current)) ? '📌 Pinned! Tap to unpin' : '📌 Pin this wish'}
                      </button>
                    </div>
                    <p className={styles.shipNote}>
                      Or pick it up yourself and mail it to Helping All Little Things, PO Box 11, Deerfield, NH 03037.
                    </p>
                  </div>
                  <button type="button" className={`${styles.navButton} ${styles.navNext}`} onClick={() => step(1)} aria-label="Next wish">
                    ›
                  </button>
                </div>
                <div className={styles.wishCount}>
                  Wish {((wish - start + deck.length) % deck.length) + 1} of {deck.length}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

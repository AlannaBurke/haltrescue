import React, {useState} from 'react';
import Layout from '@theme/Layout';
import styles from './shop.module.css';

// The HALT Shop catalog. Every item is sold through the rescue's
// Patreon shop; clicking an item takes the buyer to that item's
// Patreon page to check out. Photos were copied from the Patreon
// listings (Patreon's own image links expire, so the site hosts
// its own copies in static/img/shop/, named by Patreon post ID).
// To add a product: copy its photo into static/img/shop/ and add
// an entry below. New categories (Crafts, T-Shirts) appear as
// filter buttons automatically once an item uses them.
const CATEGORIES = ['All', 'Prints', 'Stickers'];

const PRODUCTS = [
  {
    name: "The Little Guy - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170767084.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/little-guy-5x7-170767084?source=storefront",
  },
  {
    name: "Peekaboo - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170767166.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/peekaboo-5x7-170767166?source=storefront",
  },
  {
    name: "HALT logo sticker",
    price: 5,
    category: "Stickers",
    image: "/img/shop/170766864.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/halt-logo-170766864?source=storefront",
  },
  {
    name: "Resting Piggy Face sticker",
    price: 5,
    category: "Stickers",
    image: "/img/shop/170766664.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/resting-piggy-170766664?source=storefront",
  },
  {
    name: "Big or Small sticker",
    price: 5,
    category: "Stickers",
    image: "/img/shop/170766470.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/big-or-small-170766470?source=storefront",
  },
  {
    name: "halt Finding Loving Homes sticker",
    price: 5,
    category: "Stickers",
    image: "/img/shop/170766265.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/halt-finding-170766265?source=storefront",
  },
  {
    name: "Think outside the box sticker",
    price: 5,
    category: "Stickers",
    image: "/img/shop/170759968.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/think-outside-170759968?source=storefront",
  },
  {
    name: "Happy Boy 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170729498.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/happy-boy-5x7-170729498?source=storefront",
  },
  {
    name: "Reunited - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170687996.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/reunited-5x7-170687996?source=storefront",
  },
  {
    name: "Ploy - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170687866.png",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/ploy-5x7-matted-170687866?source=storefront",
  },
  {
    name: "Keanu - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170687300.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/keanu-5x7-matted-170687300?source=storefront",
  },
  {
    name: "Pinecone - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170686854.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/pinecone-5x7-170686854?source=storefront",
  },
  {
    name: "Marshmallow and Lilypad - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170686673.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/marshmallow-and-lilypad-170686673?source=storefront",
  },
  {
    name: "Orville and Wilbur - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170686409.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/orville-and-5x7-170686409?source=storefront",
  },
  {
    name: "Duckie - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170686318.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/duckie-5x7-print-170686318?source=storefront",
  },
  {
    name: "Flavio - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170686237.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/flavio-5x7-print-170686237?source=storefront",
  },
  {
    name: "Roger - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170686083.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/roger-5x7-matted-170686083?source=storefront",
  },
  {
    name: "Castor and Pollux - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170685998.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/castor-and-5x7-170685998?source=storefront",
  },
  {
    name: "Rodent Raindrops - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170603434.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/rodent-raindrops-170603434?source=storefront",
  },
  {
    name: "Abby - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170685713.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/abby-5x7-matted-170685713?source=storefront",
  },
  {
    name: "Penelope - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170685581.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/penelope-5x7-170685581?source=storefront",
  },
  {
    name: "The Orchard - Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170388778.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/orchard-print-170388778?source=storefront",
  },
  {
    name: "Fall Shiver - Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170385256.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/fall-shiver-170385256?source=storefront",
  },
  {
    name: "Ghoulish fun - Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170382215.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/ghoulish-fun-170382215?source=storefront",
  },
  {
    name: "Sweet Tooth - Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/170381779.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/sweet-tooth-170381779?source=storefront",
  },
  {
    name: "The Auburn Rabbit - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166445256.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/auburn-rabbit-166445256?source=storefront",
  },
  {
    name: "Guinea Pig Riot - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166445099.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/guinea-pig-riot-5x7-166445099?source=storefront",
  },
  {
    name: "Heated Ratvalry - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166444612.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/heated-ratvalry-166444612?source=storefront",
  },
  {
    name: "Tootsies - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166294492.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/tootsies-5x7-166294492?source=storefront",
  },
  {
    name: "HALT Critter Infinity - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166291718.png",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/halt-critter-5x7-166291718?source=storefront",
  },
  {
    name: "Pool Party - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166291532.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/pool-party-5x7-166291532?source=storefront",
  },
  {
    name: "All Dolled Up - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166288132.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/all-dolled-up-166288132?source=storefront",
  },
  {
    name: "Sweet Little Thing - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166287941.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/sweet-little-thing-5x7-166287941?source=storefront",
  },
  {
    name: "Tiny Romeo - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166286421.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/tiny-romeo-5x7-166286421?source=storefront",
  },
  {
    name: "The Flower Hat - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166161270.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/flower-hat-5x7-166161270?source=storefront",
  },
  {
    name: "Dandelion Camouflage - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166161153.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/dandelion-5x7-166161153?source=storefront",
  },
  {
    name: "The Imposters - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166082490.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/imposters-5x7-166082490?source=storefront",
  },
  {
    name: "Look! - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166082204.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/look-5x7-166082204?source=storefront",
  },
  {
    name: "The Unicorn Tamer - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166081783.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/unicorn-tamer-166081783?source=storefront",
  },
  {
    name: "The Flower Girls - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/166081593.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/flower-girls-5x7-166081593?source=storefront",
  },
  {
    name: "HALT Letters and Critters - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/165595118.png",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/halt-letters-165595118?source=storefront",
  },
  {
    name: "Big or Small Adopt Them All - in Color - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/165475525.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/big-or-small-all-165475525?source=storefront",
  },
  {
    name: "Big Or Small Adopt Them All - B&W - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/156792733.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/big-or-small-156792733?source=storefront",
  },
  {
    name: "Rainbow Bridge - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/156802238.jpg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/rainbow-bridge-156802238?source=storefront",
  },
  {
    name: "Resting Piggie Face - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/156802585.jpeg",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/resting-piggie-156802585?source=storefront",
  },
  {
    name: "Historic Fancy Rat Photography - 5x7 Matted Print",
    price: 14,
    category: "Prints",
    image: "/img/shop/165386038.png",
    url: "https://www.patreon.com/HelpingAllLittleThingsRescue/posts/historic-fancy-165386038?source=storefront",
  },
];

function ProductCard({product}) {
  return (
    <a
      className={styles.card}
      href={product.url}
      target="_blank"
      rel="noopener noreferrer">
      <span className={styles.cardImgWrap}>
        <img
          className={styles.cardImg}
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </span>
      <span className={styles.cardName}>{product.name}</span>
      <span className={styles.cardPrice}>${product.price}</span>
    </a>
  );
}

export default function Shop() {
  const [category, setCategory] = useState('All');
  const visible =
    category === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

  return (
    <Layout
      title="HALT Shop"
      description="Shop prints and stickers from Helping All Little Things. Every purchase supports veterinary care, food, bedding, and enrichment for 200+ rescued small animals.">
      <main className="container margin-vert--lg">
        <div className={styles.wrap}>
          <h1>HALT Shop</h1>
          <p>
            Every print and sticker below is sold through our Patreon shop,
            and every purchase supports veterinary care, specialized diets,
            medications, and enrichment for the small animals of Helping All
            Little Things. Click any item to buy it on Patreon.
          </p>
          <p>
            Prints are 5x7, pre-matted, and ready to frame, on premium
            uncoated cover stock.
          </p>

          <div className={styles.filters}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={
                  category === c
                    ? `${styles.filterBtn} ${styles.filterBtnActive}`
                    : styles.filterBtn
                }
                onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {visible.map((p) => (
              <ProductCard key={p.url} product={p} />
            ))}
          </div>

          <p className={styles.note}>
            Looking for more ways to support the animals? Visit our{' '}
            <a href="/donate">donate page</a>.
          </p>
        </div>
      </main>
    </Layout>
  );
}

// Endorsed products for the HALT Affiliate Products page
// (/affiliate-products). These are products the rescue team uses
// and loves. Each card shows the product photo and name, with a
// button for every store where buying it supports the rescue
// through an affiliate program, listed in the order that helps
// the rescue most (Chewy's Chewpanions program pays 10%).
//
// Photos live in static/img/affiliate/.
// `chewy: true` means the item is on the rescue's Chewy
// storefront; every Chewy button points at the storefront.
// `exoticUrl` is the item's Exotic Nutrition affiliate link.
//
// TO ADD AN AMAZON LINK: every item below has an empty
// amazonUrl: '' slot. Paste the item's Amazon affiliate link
// between the quotes, like amazonUrl: 'https://www.amazon.com/...'
// and save. The Amazon button then appears on that item's card
// automatically, after the Chewy and Exotic Nutrition buttons.
// Items with an empty slot simply show no Amazon button yet.

export const CHEWY_STOREFRONT =
  'https://chewpanions.chewy.com/840da941987';

export const ENDORSED = [
  // Small animals
  {name: 'Sweet Meadow Farm Original Blend Pellets Guinea Pig Food, 40-lb bag', category: 'Small Animals', image: '/img/affiliate/sweet-meadow-farm-original-blend-pellets-guinea-pig-food-40lb-bag.webp', chewy: true, amazonUrl: ''},
  {name: 'Sweet Meadow Farm Timothy Hay Small Pet Food, 9-lb box', category: 'Small Animals', image: '/img/affiliate/sweet-meadow-farm-timothy-hay-small-pet-food-9lb-box.webp', chewy: true, amazonUrl: ''},
  {name: 'Sherwood Pet Health Timothy Pellet Adult Guinea Pig Food, 4.5-lb bag', category: 'Small Animals', image: '/img/affiliate/sherwood-pet-health-timothy-pellet-adult-guinea-pig-food-4.5lb.webp', chewy: true, amazonUrl: ''},
  {name: 'Blue Mountain Hay High Altitude Timothy Hay, 48-oz', category: 'Small Animals', image: '/img/affiliate/blue-mountain-hay-high-altitude-timothy-hay-small-animal-food-48oz.webp', chewy: true, amazonUrl: ''},
  {name: 'Blue Mountain Hay High Altitude Orchard Grass Hay, 48-oz', category: 'Small Animals', image: '/img/affiliate/blue-mountain-hay-high-altitude-orchard-grass-hay-small-animal-food-48oz.webp', chewy: true, amazonUrl: ''},
  {name: 'Oxbow Critical Care Herbivore Apple-Banana, 141-gm bag', category: 'Small Animals', image: '/img/affiliate/oxbow-critical-care-herbivore-apple-banana-small-pet-health-supplement-141gm.webp', chewy: true, amazonUrl: ''},
  {name: 'Oxbow Essentials Regal Rat Adult Rat Food, 3-lb bag', category: 'Small Animals', image: '/img/affiliate/oxbow-essentials-regal-rat-adult-rat-food-3lb.webp', chewy: true, amazonUrl: ''},
  {name: 'Oxbow Simple Rewards Oven Baked Treats with Cranberry, 3-oz bag', category: 'Small Animals', image: '/img/affiliate/oxbow-simple-rewards-oven-baked-with-cranberry-small-animal-treats-3oz.webp', chewy: true, amazonUrl: ''},
  {name: 'Oxbow Simple Rewards Oven Baked Treats with Apple & Banana, 3-oz bag', category: 'Small Animals', image: '/img/affiliate/oxbow-simple-rewards-oven-baked-with-apple-and-banana-small-animal-treats-3oz.webp', chewy: true, amazonUrl: ''},
  {name: 'Mazuri Mouse & Rat Food, 2-lb bag', category: 'Small Animals', image: '/img/affiliate/mazuri-mouse-and-rat-food-2lb.webp', chewy: true, amazonUrl: ''},
  {name: 'Higgins Sunburst Gourmet Blend Gerbil & Hamster Food, 2.5-lb bag', category: 'Small Animals', image: '/img/affiliate/higgins-sunburst-gourmet-blend-gerbil-and-hamster-food-2.5lb.webp', chewy: true, amazonUrl: ''},
  {name: 'MidWest Critter Nation Deluxe Small Animal Cage, Double Story', category: 'Small Animals', image: '/img/affiliate/midwest-critter-nation-deluxe-double-story-cage.webp', chewy: true, amazonUrl: ''},
  {name: 'MidWest Critter Nation Upper Scatter Guard', category: 'Small Animals', image: '/img/affiliate/midwest-critter-nation-upper-scatter-guard.webp', chewy: true, amazonUrl: ''},
  {name: 'MidWest Critter Nation Lower Scatter Guard', category: 'Small Animals', image: '/img/affiliate/midwest-critter-nation-lower-scatter-guard.webp', chewy: true, amazonUrl: ''},
  {name: 'Carefresh Complete Bedding, Natural, 6L', category: 'Small Animals', image: '/img/affiliate/carefresh-complete-bedding.jpg', chewy: true, exoticUrl: 'https://exoticnutrition.com/products/carefresh-complete-bedding?sca_ref=12727910.0pNlDA4ilmJmKU', amazonUrl: ''},
  // Cats
  {name: 'Fussie Cat Market Fresh Turkey & Guineafowl Wet Cat Food, case of 24', category: 'Cats', image: '/img/affiliate/fussie-cat-market-fresh-turkey-and-guineafowl-wet-cat-food-5.5oz-case-of-24.webp', chewy: true, amazonUrl: ''},
  {name: 'Fussie Cat Market Fresh Lamb & Pork Wet Cat Food, case of 24', category: 'Cats', image: '/img/affiliate/fussie-cat-market-fresh-lamb-and-pork-wet-cat-food-5.5oz-case-of-24.webp', chewy: true, amazonUrl: ''},
  {name: 'Fussie Cat Market Fresh Trout & Salmon Wet Cat Food, case of 24', category: 'Cats', image: '/img/affiliate/fussie-cat-market-fresh-trout-and-salmon-wet-cat-food-5.5oz-case-of-24.webp', chewy: true, amazonUrl: ''},
  {name: 'Hound & Gatos 98% Chicken & Liver Canned Cat Food, case of 24', category: 'Cats', image: '/img/affiliate/hound-and-gatos-98-percent-chicken-and-liver-grain-free-canned-cat-food-5.5oz-case-of-24.webp', chewy: true, amazonUrl: ''},
  {name: 'Hound & Gatos 98% Gamebird Poultry Canned Cat Food, case of 24', category: 'Cats', image: '/img/affiliate/hound-and-gatos-98-percent-gamebird-poultry-formula-grain-free-canned-cat-food-5.5oz-case-of-24.webp', chewy: true, amazonUrl: ''},
  {name: 'Hound & Gatos 98% Salmon, Mackerel & Sardine Canned Cat Food, case of 24', category: 'Cats', image: '/img/affiliate/hound-and-gatos-98-percent-salmon-mackerel-and-sardine-grain-free-canned-cat-food-5.5oz-case-of-24.webp', chewy: true, amazonUrl: ''},
  {name: 'Tiki Cat Luau Variety Pack Canned Cat Food, case of 12', category: 'Cats', image: '/img/affiliate/tiki-cat-luau-variety-pack-grain-free-canned-cat-food-2.8oz-case-of-12.webp', chewy: true, amazonUrl: ''},
  {name: 'Tiki Cat Aloha Friends Tuna with Pumpkin Wet Cat Food, case of 8', category: 'Cats', image: '/img/affiliate/tiki-cat-aloha-friends-tuna-with-pumpkin-grain-free-wet-cat-food-5.5oz-case-of-8.webp', chewy: true, amazonUrl: ''},
  {name: 'Tiki Cat Aloha Friends Variety Pack Wet Cat Food, case of 12', category: 'Cats', image: '/img/affiliate/tiki-cat-aloha-friends-variety-pack-grain-free-wet-cat-food-3oz-case-of-12.webp', chewy: true, amazonUrl: ''},
  {name: 'Tiki Cat After Dark Variety Pack Canned Cat Food, case of 12', category: 'Cats', image: '/img/affiliate/tiki-cat-after-dark-variety-pack-canned-cat-food-2.8oz-case-of-12.webp', chewy: true, amazonUrl: ''},
  {name: 'Tiki Cat After Dark Chicken & Quail Egg Wet Cat Food, case of 24', category: 'Cats', image: '/img/affiliate/tiki-cat-after-dark-chicken-and-quail-egg-grain-free-wet-cat-food-2.8oz-case-of-24.webp', chewy: true, amazonUrl: ''},
  {name: 'Tiki Cat After Dark Chicken & Beef Canned Cat Food, case of 8', category: 'Cats', image: '/img/affiliate/tiki-cat-after-dark-chicken-and-beef-canned-cat-food-5.5oz-case-of-8.webp', chewy: true, amazonUrl: ''},
  {name: 'Wellness Complete Health Grain-Free Chicken Dry Cat Food, 5.5-lb bag', category: 'Cats', image: '/img/affiliate/wellness-complete-health-grain-free-deboned-chicken-dry-cat-food-5.5lb.webp', chewy: true, amazonUrl: ''},
  {name: 'Wellness CORE Grain-Free Original Dry Cat Food, 11-lb bag', category: 'Cats', image: '/img/affiliate/wellness-core-grain-free-original-dry-cat-food-11lb.webp', chewy: true, amazonUrl: ''},
  {name: 'Orijen Original Grain-Free Dry Cat Food, 12-lb bag', category: 'Cats', image: '/img/affiliate/orijen-original-grain-free-dry-cat-food-12lb.webp', chewy: true, amazonUrl: ''},
  {name: 'Orijen Cat & Kitten Dry Cat Food, 12-lb bag', category: 'Cats', image: '/img/affiliate/orijen-cat-and-kitten-dry-cat-food-12lb.webp', chewy: true, amazonUrl: ''},
  {name: 'Purina Pro Plan Sensitive Skin & Stomach Lamb & Rice Dry Cat Food, 7-lb bag', category: 'Cats', image: '/img/affiliate/purina-pro-plan-sensitive-skin-and-stomach-lamb-and-rice-dry-cat-food-7lb.webp', chewy: true, amazonUrl: ''},
  {name: "Dr. Elsey's Ultra Unscented Cat Litter, 40-lb bag", category: 'Cats', image: '/img/affiliate/dr-elseys-ultra-unscented-clumping-clay-cat-litter-40lb.webp', chewy: true, amazonUrl: ''},
  {name: "Dr. Elsey's cleanprotein Chicken Kibble Cat Food, 6.6-lb bag", category: 'Cats', image: '/img/affiliate/dr-elseys-cleanprotein-chicken-kibble-cat-dry-food-6.6lb.webp', chewy: true, amazonUrl: ''},
  {name: "Dr. Elsey's cleanprotein Turkey Recipe Wet Cat Food, case of 24", category: 'Cats', image: '/img/affiliate/dr-elseys-cleanprotein-turkey-recipe-wet-cat-food-2.75oz-case-of-24.webp', chewy: true, amazonUrl: ''},
  // Dogs
  {name: 'Purina Pro Plan Bright Mind Adult 7+ Chicken & Rice Dry Dog Food, 30-lb bag', category: 'Dogs', image: '/img/affiliate/purina-pro-plan-bright-mind-adult-7-plus-chicken-and-rice-dry-dog-food-30lb.webp', chewy: true, amazonUrl: ''},
  {name: 'Purina Pro Plan AdvantEDGE Digestive Support Plus Salmon & Oat Meal Dry Dog Food, 22-lb bag', category: 'Dogs', image: '/img/affiliate/purina-pro-plan-advantedge-digestive-support-plus-salmon-and-oat-meal-adult-dry-dog-food-22lb.webp', chewy: true, amazonUrl: ''},
  {name: 'Purina Pro Plan Sensitive Skin & Stomach Salmon & Rice Dry Dog Food, 30-lb bag bundle', category: 'Dogs', image: '/img/affiliate/purina-pro-plan-sensitive-skin-and-stomach-salmon-and-rice-dry-dog-food-30lb-plus-skin-and-coat-care-bundle.webp', chewy: true, amazonUrl: ''},
  {name: 'Wellness Complete Health Chicken & Oatmeal Dry Dog Food, 30-lb bag', category: 'Dogs', image: '/img/affiliate/wellness-complete-health-adult-deboned-chicken-and-oatmeal-dry-dog-food-30lb.webp', chewy: true, amazonUrl: ''},
  {name: 'Wellness CORE Grain-Free Original Turkey Dry Dog Food, 26-lb bag', category: 'Dogs', image: '/img/affiliate/wellness-core-grain-free-original-deboned-turkey-dry-dog-food-26lb.webp', chewy: true, amazonUrl: ''},
  {name: 'Orijen Amazing Grains Original Dry Dog Food, 22.5-lb bag', category: 'Dogs', image: '/img/affiliate/orijen-amazing-grains-original-dry-dog-food-22.5lb.webp', chewy: true, amazonUrl: ''},
  {name: 'Orijen Original Grain-Free Dry Dog Food, 13-lb bag', category: 'Dogs', image: '/img/affiliate/orijen-original-grain-free-dry-dog-food-13lb.webp', chewy: true, amazonUrl: ''},
  // Cleaning
  {name: "Nature's Miracle Small Animal Cage Cleaner Spray, 24-fl oz", category: 'Cleaning', image: '/img/affiliate/natures-miracle-small-animal-cage-cleaner-spray-24oz.webp', chewy: true, amazonUrl: ''},
  {name: "Simply Nature's Miracle Pet Stain & Odor Remover, 32-fl oz", category: 'Cleaning', image: '/img/affiliate/simply-natures-miracle-pet-stain-and-odor-remover-32oz.jpg', chewy: true, amazonUrl: ''},
  {name: "Nature's Miracle Advanced Stain & Odor Eliminator, 128-fl oz, Sunny Lemon", category: 'Cleaning', image: '/img/affiliate/natures-miracle-enzymatic-advanced-stain-and-odor-eliminator-128oz-sunny-lemon.webp', chewy: true, amazonUrl: ''},
];

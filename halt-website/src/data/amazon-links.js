// Only products with links explicitly supplied for the affiliate page get an Amazon button.
// Match against the existing catalog names so catalog wording can remain descriptive.
const AMAZON_LINKS = [
  {match: ['sherwood pet health timothy pellet adult guinea pig'], url: 'https://link.amazon/B0c62FVAt'},
  {match: ['oxbow critical care omnivore'], url: 'https://link.amazon/B056594ck'},
  {match: ['oxbow essentials regal rat adult rat food'], url: 'https://link.amazon/B0eAWohT8'},
  {match: ['oxbow simple rewards oven baked treats with apple'], url: 'https://link.amazon/B0aNOp3cv'},
  {match: ['oxbow simple rewards oven baked treats with cranberry'], url: 'https://link.amazon/B0irPlSwg'},
  {match: ['mazuri mouse & rat food'], url: 'https://link.amazon/B03PuBET5'},
  {match: ['science selective rat food'], url: 'https://link.amazon/B04vSuUsc'},
  {match: ['harlan teklad lab blocks'], url: 'https://link.amazon/B00kwjfGu'},
  {match: ['carefresh complete bedding'], url: 'https://link.amazon/B0auxZUJz'},
  {match: ['lixit 64 oz water bottles'], url: 'https://link.amazon/B0aLoRXbK'},
  {match: ['lixit critter hollow hideout'], url: 'https://link.amazon/B07FJubYF'},
  {match: ['niteangel hamster wheels'], url: 'https://link.amazon/B096UDLt6'},
  {match: ['hound & gatos 98% gamebird poultry'], url: 'https://link.amazon/B0e67yZim'},
  {match: ['hound & gatos 98% chicken & liver'], url: 'https://link.amazon/B0bQLW6fD'},
  {match: ['hound & gatos 98% salmon, mackerel & sardine'], url: 'https://link.amazon/B0a0Cb1JX'},
  {match: ['purina pro plan bright mind'], url: 'https://link.amazon/B0h317Ydx'},
  {match: ["nature's miracle small animal cage cleaner"], url: 'https://link.amazon/B08QaGCOW'},
  {match: ["simply nature's miracle pet stain & odor remover", "nature's miracle pet stain and odor remover"], url: 'https://link.amazon/B08lukA7w'},
  {match: ["nature's miracle advanced stain & odor eliminator"], url: 'https://link.amazon/B0j5RO7y7'},
  {match: ['purina pro plan sensitive skin & stomach salmon'], url: 'https://link.amazon/B0ca44jwe'},
  {match: ['purina pro plan advantedge digestive support'], url: 'https://link.amazon/B08BQ99aJ'},
  {match: ['wellness complete health'], url: 'https://link.amazon/B0jlZb41c'},
  {match: ['wellness core'], url: 'https://link.amazon/B0aMOqurE'},
  {match: ['orijen original grain-free dry'], url: 'https://link.amazon/B005yzWec'},
  {match: ['orijen amazing grains'], url: 'https://link.amazon/B02BxqEYz'},
  {match: ["dr. elsey's cleanprotein turkey recipe wet"], url: 'https://link.amazon/B0b5NmxMi'},
  {match: ["dr. elsey's cleanprotein chicken kibble"], url: 'https://link.amazon/B0fugkl0w'},
  {match: ["dr. elsey's ultra unscented cat litter"], url: 'https://link.amazon/B074xY7ZG'},
  {match: ['purina pro plan sensitive skin and stomach lamb'], url: 'https://link.amazon/B0eK9OGB4'},
  {match: ['tiki cat after dark chicken & beef'], url: 'https://link.amazon/B016IIuJ2'},
  {match: ['tiki cat after dark chicken & quail egg'], url: 'https://link.amazon/B0hoCr9ZC'},
  {match: ['tiki cat after dark variety pack'], url: 'https://link.amazon/B0f45JfBQ'},
  {match: ['tiki cat aloha friends tuna with pumpkin'], url: 'https://link.amazon/B09PzQmmY'},
  {match: ['tiki cat aloha friends variety pack'], url: 'https://link.amazon/B0f8gjomx'},
  {match: ['tiki cat luau variety pack'], url: 'https://link.amazon/B0bZ4hvFu'},
  {match: ['midwest critter nation deluxe small animal cage'], url: 'https://link.amazon/B0dwH9bSx'},
  {match: ['higgins sunburst gourmet blend gerbil & hamster'], url: 'https://link.amazon/B00yVeoVo'},
  {match: ['blue mountain hay high altitude orchard grass'], url: 'https://link.amazon/B0g1BtOJA'},
  {match: ['blue mountain hay high altitude timothy hay'], url: 'https://link.amazon/B0gAIjQKs'},
  {match: ['sweet meadow farm timothy hay small pet food'], url: 'https://link.amazon/B0jgq2vLv'},
];

export function amazonUrlForProduct(productName) {
  const name = productName.toLowerCase();
  const entry = AMAZON_LINKS.find(({match}) => match.some((phrase) => name.includes(phrase)));
  return entry?.url;
}

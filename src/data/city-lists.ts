import { CityId } from './city-meta';

export interface CityListBusiness {
  name: string;
  description: string;
}

export interface CityList {
  id: string;
  cityId: CityId;
  title: string;
  emoji: string;
  source: string;
  businesses: CityListBusiness[];
}

export const CITY_LISTS: CityList[] = [
  // Los Angeles
  {
    id: 'la-hottest-new',
    cityId: 'la',
    title: 'Hottest New Restaurants',
    emoji: '🔥',
    source: 'Eater LA',
    businesses: [
      { name: 'Perse Restaurant', description: 'Upscale Persian dishes like wagyu kebabs, tart fesenjoon and sour cherry-dotted rice served in a sleek setting.' },
      { name: 'Lielle', description: 'Chef Jernmark offers a 4-course seasonal menu with aged squab in an intimate 42-seat space.' },
      { name: 'Picala', description: 'West Adams destination pairing a Spanish-California vibe with dishes like paella and rib-eye.' },
      { name: 'Harun Coffee', description: 'Specialty drinks like coconut cappuccino paired with biscuit sandwiches.' },
      { name: 'Lapaba', description: 'Infuses Italian classics with Korean flavors, like galbi jjim pasta made in their dedicated room.' },
      { name: 'Vandell', description: 'Sleek cocktail bar serving up 27 cocktails like their house gin martini laced with tarragon vinegar.' },
      { name: 'The Holloway', description: 'This reopened sports bar pairs a game-day vibe with shuffleboard, easy cocktails, and a classic burger.' },
    ],
  },
  {
    id: 'la-best-pizza',
    cityId: 'la',
    title: 'Best Pizzas in LA',
    emoji: '🍕',
    source: 'Infatuation',
    businesses: [
      { name: "Sonny's", description: 'This hype-fueled pizzeria pairs a chaotic sell-out vibe with perfect, smoky 18-inch burrata pies.' },
      { name: 'Wallflour Pizza', description: 'This counter-service sourdough pizzeria pairs a casual vibe with thin, crackly hot-honey pepperoni pies.' },
      { name: 'Not No Bar', description: 'This buzzy, walk-in counter spot pairs a high-energy vibe with regular rotating pesto and white pies.' },
      { name: 'Oste', description: 'This Roman flatbread spot pairs an easy, shareable vibe with crisp, airy potato raclette pinses.' },
      { name: 'Quarter Sheets', description: 'This small, rabidly popular spot pairs a hyped neighborhood vibe with crispy, thick-crusted Detroit pies.' },
    ],
  },
  {
    id: 'la-cheap-eats',
    cityId: 'la',
    title: 'Top Cheap Eats',
    emoji: '💰',
    source: 'Eater LA',
    businesses: [
      { name: 'K Pasa', description: 'This counter-service spot pairs a casual taco-shop vibe with a crunchy, copycat wrap and beef birria taquitos.' },
      { name: "Liu's Cafe", description: 'This cozy Taiwanese spot serves up under-$15 eats like spicy wontons and rich beef noodle soup.' },
      { name: 'Borjstar Shawarma Shop', description: 'This South Bay spot pairs a casual counter vibe with Arabic-style lamb-blended beef and chicken shawarma wraps.' },
      { name: 'Supamu Okinawa Onigiri', description: 'This under-$15 counter spot pairs a quick, casual vibe with kimchi-Spam onigiri and crispy curry croquettes.' },
      { name: 'mala class', description: 'Comfy Sichuan spot serving spicy beef noodle soup, chile dry rub wings, and plenty of mala spice.' },
    ],
  },

  // San Francisco
  {
    id: 'sf-hottest-new',
    cityId: 'sf',
    title: 'Hottest New Restaurants',
    emoji: '🔥',
    source: 'Infatuation',
    businesses: [
      { name: 'TUR', description: 'Pairs an inventive Thai brunch vibe with a wagyu pad krapow sandwich and shrimp cake waffles.' },
      { name: 'Rose Pizzeria', description: 'Natural-wine date-night vibe meets sourdough thin-crust broccoli rabe pies.' },
      { name: 'Maillards - Noriega', description: 'This takeout counter pairs a lively brewery-line vibe with crispy smashburgers and cookie-studded soft serve.' },
      { name: 'TBD izakaya', description: 'This dimly lit spot pairs a lively, sake-fueled date-night vibe with theatrical clawed chicken karaage.' },
      { name: 'GADA', description: 'This counter spot pairs a heavy, indulgent vibe with scraped raclette and charred Tunisian melawi bread.' },
      { name: 'JouJou', description: 'This candlelit, romantic brasserie spot pairs a cozy date-night vibe with petrale sole and a raw bar.' },
      { name: 'The Happy Crane', description: 'This warm, low-lit destination pairs a hyped, exclusive vibe with butter-grilled mousse bao.' },
    ],
  },
  {
    id: 'sf-best-burritos',
    cityId: 'sf',
    title: 'Best Burritos in SF',
    emoji: '🌯',
    source: 'Infatuation',
    businesses: [
      { name: 'El Farolito', description: 'This cash-only institution pairs a late-night, high-energy line vibe with massive, baby-sized super burritos.' },
      { name: 'El Metate', description: 'This taqueria pairs a casual outdoor dining vibe with long, thin super burritos and smoky salsa.' },
      { name: 'El Castillito', description: 'This neighborhood spot pairs a sunny, casual park-adjacent vibe with melty, crispy al pastor burritos.' },
      { name: 'La Espiga De Oro', description: 'This convenience-store hybrid pairs a casual, quick-stop vibe with griddled, crackling chicharron burritos.' },
      { name: 'Taqueria El Buen Sabor', description: 'This park-adjacent spot pairs a convenient grab-and-go vibe with a chorizo and egg breakfast burrito.' },
    ],
  },
  {
    id: 'sf-cheap-eats',
    cityId: 'sf',
    title: 'Top Cheap Eats',
    emoji: '💰',
    source: 'Eater SF',
    businesses: [
      { name: "Yo Yo's", description: 'This tiny kitchen pairs a quick, bargain-priced Financial District weekday vibe with delicious udon and takeaway soba.' },
      { name: 'Hot Sauce and Panko To Go', description: 'This takeout-only retail shop pairs a quick, hot-sauce-browsing vibe with succulent, internationally-inspired $8 chicken wings.' },
      { name: 'Kusina Ni Tess', description: 'This friendly steam-table spot pairs a welcoming, budget-friendly weekday vibe with daily changing Filipino adobo and $11 silog plates.' },
      { name: 'Saigon Sandwich', description: 'This Tenderloin staple pairs an ultra-simple, budget-friendly vibe with cheap, loaded $5.50 pork and pate banh mi.' },
      { name: 'Falletti Foods', description: 'This Lower Haight mainstay pairs a budget-friendly, savvy shopper vibe with a $4.49 "Poor Boy" rotating meat and cheese sandwich.' },
    ],
  },

  // Toronto
  {
    id: 'to-hottest-new',
    cityId: 'toronto',
    title: 'Hottest New Restaurants',
    emoji: '🔥',
    source: 'Toronto Life',
    businesses: [
      { name: 'Seahorse', description: 'This cozy, station-adjacent spot pairs a convivial, neighborhood-shifting vibe with expertly shucked oysters and fresh seafood.' },
      { name: 'Brasserie Cote', description: 'This lively Annex tavern pairs a Parisian vibe with vol-au-vent, hanger steak, and classic sauces.' },
      { name: 'PUNCH', description: 'This ritzy Entertainment District spot pairs a playful Indo-British vibe with butter chicken pot pies.' },
      { name: 'The Onda', description: 'This intimate Wychwood counter pairs a lively dinner-party vibe with Korean-fused 20-course omakase.' },
      { name: 'Radici Project', description: 'This cozy Little Italy gem pairs a personal, family-run vibe with cacio e pepe takoyaki and itameshi fusion.' },
      { name: 'SAMMARCO', description: 'This sleek St. Lawrence bisteccheria pairs an opulent, art-filled vibe with 60-day dry-aged steaks.' },
      { name: "Mozy's", description: 'This Liberty Village counter pairs a fast-casual, live-fire vibe with fine-dining-caliber charcoal chicken.' },
    ],
  },
  {
    id: 'to-best-poutine',
    cityId: 'toronto',
    title: 'The Best Poutine',
    emoji: '🍟',
    source: 'Time Out',
    businesses: [
      { name: "Smoke's Poutinerie Adelaide", description: 'This Canada-wide counter pairs a quick grab-and-go vibe with inventive, topping-heavy poutine mashups.' },
      { name: 'Utopia', description: 'This Little Italy gem pairs a budget-friendly, streetcar-accessible vibe with customizable, topping-heavy poutine.' },
      { name: 'ODDSEOUL', description: 'This Ossington snack bar pairs a trendy, original vibe with non-traditional, curry-and-kimchi Korean poutine.' },
      { name: 'NomNomNom Poutine', description: 'This shipping-container market pairs a casual, open-air summer vibe with authentic Montreal smoked meat poutine.' },
      { name: "Sneaky Dee's", description: 'This iconic College Street dive pairs a legendary, late-night music-venue vibe with massive nacho-topped poutine.' },
    ],
  },
  {
    id: 'to-cheap-eats',
    cityId: 'toronto',
    title: 'Top Cheap Eats',
    emoji: '💰',
    source: 'Eater Toronto',
    businesses: [
      { name: 'Hopper Hut', description: 'This Ellesmere Road spot pairs a casual, Dining on a Dime vibe with traditional hoppers and banana-leaf lamprais.' },
      { name: 'Torteria San Cosme', description: 'This Kensington Market spot pairs a vibrant, street-food-inspired vibe with elevated, Mexico City-style tortas.' },
      { name: 'Manpuku Modern Japanese Eatery', description: 'This downtown food court hole-in-the-wall pairs a quick, bustling vibe with $8.30 curry beef udon.' },
      { name: 'Itacate', description: 'This St. Clair West counter pairs a casual, street-taco vibe with a standout $8 steak and mozzarella Volcan.' },
      { name: 'Banh Mi Huy-Ky', description: 'This cash-only, no-website gem pairs an old-school, no-frills vibe with a $5 lemongrass-garlic pork banh mi.' },
    ],
  },
];

export function getListsForCity(cityId: CityId): CityList[] {
  return CITY_LISTS.filter((l) => l.cityId === cityId);
}

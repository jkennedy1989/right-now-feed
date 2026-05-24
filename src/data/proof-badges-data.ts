import { CityId } from '@/data/city-meta';

export const YELP_TOP_100: Record<CityId, string[]> = {
  la: [
    "Howlin' Ray's", "Bavel", "Bestia", "Republique", "Guelaguetza",
    "Langer's Delicatessen", "Jitlada", "Pizzeria Mozza", "Night + Market",
    "Guerrilla Tacos", "Petit Trois", "Broken Spanish", "Sushi Gen",
    "Bay Cities Italian Deli", "Philippe The Original", "Porto's Bakery",
    "Musso & Frank Grill", "Canter's Deli", "Grand Central Market",
    "Sugarfish", "Din Tai Fung", "Tsujita LA", "Mariscos Jalisco",
  ],
  sf: [
    "House of Prime Rib", "Swan Oyster Depot", "Tartine Bakery",
    "Zuni Cafe", "Burma Superstar", "La Taqueria", "Gary Danko",
    "Hog Island Oyster", "Bi-Rite Creamery", "Kokkari Estiatorio",
    "State Bird Provisions", "Chez Panisse", "Flour + Water",
    "Nopalito", "Tony's Pizza Napoletana", "Delfina", "Brenda's French Soul Food",
    "El Farolito", "Nopa", "Rich Table",
  ],
  toronto: [
    "Pai Northern Thai", "Richmond Station", "Canoe", "Byblos",
    "Alo", "Edulis", "DaiLo", "Scaramouche", "Lee",
    "Bao Bei", "Sushi Kaji", "Canis", "Dandylion",
    "Bar Isabel", "Momofuku Noodle Bar", "Buca", "Taverne Gaspar",
    "La Banane", "Piano Piano", "Grey Gardens",
  ],
};

export const JAMES_BEARD: Record<CityId, { name: string; award: string }[]> = {
  la: [
    { name: "Bestia", award: "James Beard Semifinalist" },
    { name: "Republique", award: "James Beard Outstanding Restaurant" },
    { name: "Providence", award: "James Beard Outstanding Chef" },
    { name: "Bavel", award: "James Beard Best New Restaurant" },
    { name: "Petit Trois", award: "James Beard Semifinalist" },
    { name: "Guelaguetza", award: "James Beard America's Classics" },
  ],
  sf: [
    { name: "Zuni Cafe", award: "James Beard Outstanding Restaurant" },
    { name: "State Bird Provisions", award: "James Beard Best New Restaurant" },
    { name: "Chez Panisse", award: "James Beard Outstanding Restaurant" },
    { name: "Gary Danko", award: "James Beard Outstanding Service" },
    { name: "Atelier Crenn", award: "James Beard Outstanding Chef" },
    { name: "Mister Jiu's", award: "James Beard Best Chef West" },
  ],
  toronto: [
    { name: "Alo", award: "Canada's Best Restaurant" },
    { name: "Canoe", award: "James Beard Outstanding Restaurant" },
    { name: "Edulis", award: "James Beard Semifinalist" },
  ],
};

export const TOP_50_BEST: string[] = [
  "Atelier Crenn", "SingleThread", "Benu", "Somni", "Providence",
  "Alo", "Canoe",
];

export const MOCK_FRIENDS = [
  { name: 'Alex', initial: 'A' },
  { name: 'Jordan', initial: 'J' },
  { name: 'Sam', initial: 'S' },
];

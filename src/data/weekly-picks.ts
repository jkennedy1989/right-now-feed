import { Business } from "./lists";

export interface WeeklyPick extends Business {
  tags: string[];
  videoUrl?: string;
}

export const weeklyPicks: WeeklyPick[] = [
  { id: "alo-pick", name: "Alo", rating: 4.6, description: "Flawless French-inspired tasting menu", imageUrl: "https://canadas100best.com/wp-content/uploads/2025/05/Alo-Toronto-2025-Canadas100Best_feat_1-1440x900.jpg", videoUrl: "https://stream.mux.com/P901iAl23GQiy1GUMcwrePQy02i4SP3wrbj4Ud01zD6WlI/high.mp4", tags: ["Fine Dining🍽️", "Splurge💎"] },
  { id: "burger-drops-pick", name: "Burger Drops", rating: 4.6, description: "Single Smashburger ($9.50) side of curly fries ($6.50)", imageUrl: "https://blogto-production2-baselayer-display.blogto.com/uploads/2020/10/13/1602609339-20201009-BurgerDrops8.jpg", videoUrl: "https://stream.mux.com/T25BWLpPdbTvKY5q6D32003Trs1qh9JkOCCq02N7Xjj6w/high.mp4", tags: ["Casual🎒", "Affordable💰"] },
  { id: "bar-raval-pick", name: "Bar Raval", rating: 4.4, description: "Gorgeous carved wood standing only bar", imageUrl: "https://images.adsttc.com/media/images/552d/b694/e58e/ce2c/fd00/02c2/large_jpg/portada_Bar_Raval_01.jpg?1429059212", tags: ["Moody🕯️", "Tapas🍷"] },
  { id: "cry-baby-pick", name: "Cry Baby Gallery", rating: 4.5, description: "Walk through a secret door at the back of an art gallery", imageUrl: "https://canadas100best.com/wp-content/uploads/2024/05/CryBabyGallery-2024-feat.jpg", tags: ["Hidden🔑", "Speakeasy🍸"] },
  { id: "mothers-pick", name: "Mother's Dumplings", rating: 4.1, description: "The undisputed classic. Incredible handmade, thick-skinned northern style.", imageUrl: "https://blogto-production2-baselayer-display.blogto.com/listings/20181008-JuicyDumplings1.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto", videoUrl: "https://stream.mux.com/Kcqoq3OiO13uvm4Fgp2L1AdnHBYvBN9005em401Y4F5uc/high.mp4", tags: ["Chinatown🏮", "Classic🏆"] },
  { id: "rom-pick", name: "Royal Ontario Museum", rating: 4.7, description: "Dramatic, sharp glass shards hit heritage", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Royal_Ontario_Museum2.jpg/1280px-Royal_Ontario_Museum2.jpg", videoUrl: "https://stream.mux.com/yd9w9hYBACKnOyCapjGVBoZOYeRI0002LlH014QxEQPO8w/high.mp4", tags: ["Cultural🎭", "Iconic🏛️"] },
  { id: "paradise-pick", name: "Paradise Theatre", rating: 4.8, description: "Stunning restored 1937 Art Deco gem", imageUrl: "https://torontolife.mblycdn.com/tl/resized/2019/12/900x900/TS_Paradise-49.jpg", tags: ["Art Deco✨", "Indie🎬"] },
  { id: "moore-park-pick", name: "Moore Park Ravine", rating: 4.6, description: "Gorgeous snake through canopy of ancient trees", imageUrl: "https://blogto-production2-baselayer-display.blogto.com/uploads/2018/09/22/20180921-moore-park-ravine-8.jpg", videoUrl: "https://stream.mux.com/A5XQP1CrLyebSr4Wf1FdTPzgCyOSsSPRE1cgSbI02rUU/high.mp4", tags: ["Nature🌲", "Serene🧘"] },
  { id: "paris-paris-pick", name: "Paris Paris", rating: 3.9, description: "Lively Ossington favorite: great energy and bottles by the glass.", imageUrl: "https://blogto-production2-baselayer-display.blogto.com/uploads/2018/03/09/20180308-2048-ParisParis6.jpg", tags: ["Wine🍷", "Trendy🔥"] },
  { id: "monkeys-paw-pick", name: "The Monkey's Paw", rating: 4.8, description: "Novelty book vending machine dispenses random vintage reads.", imageUrl: "https://img1.wsimg.com/isteam/ip/e7133917-f57d-4653-bbb0-39f9e1d0517f/monkeys-paw-5c01807046e0fb0001642d9a.jpg", tags: ["Hidden Gem💎", "Quirky🎪"] },
];

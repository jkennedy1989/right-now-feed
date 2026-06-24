export interface Business {
  id: string;
  name: string;
  address?: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  location?: string;
  friendActivity?: string;
  lat?: number;
  lng?: number;
  rating?: number;
  price?: string;
}

export interface SingleItem {
  id: string;
  name: string;
  authorActivity: string;
  description: string;
  mediaUrls: string[];
  location: string;
  rating?: number;
}

export const singleItems: SingleItem[] = [
  { id: "single-prime-seafood", name: "Prime Seafood Palace", rating: 4.4, authorActivity: "Brittney B. ranked this in their Top 10", description: "Stunning, wood-vaulted maple design pairing steak & fish", mediaUrls: ["https://stream.mux.com/cM9cEbB00r8Gwt0085xPiZu017uXjao02xcyn3UV00IgtIAs/high.mp4", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ31IPNqo_zLdaTBR1zmYlZ4D0WuTepH5_CgJt-OfKrW_UNDvoszFHs3k&s=10", "https://canadas100best.com/wp-content/uploads/2024/05/Prime-Seafood-Palace-2024-feat-vert-390x657.jpg"], location: "https://maps.app.goo.gl/Ncmfeedynuh1A73E7" },
  { id: "single-tilt-arcade", name: "Tilt Arcade Bar", rating: 4.6, authorActivity: "Andrew R. has Been Here", description: "Retro neon-lit alley loaded with vintage pinball and games", mediaUrls: ["https://blogto-production2-baselayer-display.blogto.com/uploads/2023/09/19/1695135983-20230913-TiltArcade-21.jpg", "https://cdn.corner.inc/place-photo/ATJ83zgdOGI8AtmAGHQI6THrVpz9QXUCxHzzKejCs4_WGLfTl4J3MbsfRmgEzPjNl0EjNsSiT24fViKH_0r30XfTfFEwFvG73WWoiwWRYAqyjwr64LAL-IQHI6rpuUrQBunM5Lz5kFyOjti-J1LA_Y3Zv26xdwF647UsRtfsK5LherI7nnav.jpeg", "https://media.kineticist.com/locations/tilt-arcade-bar/670709af5a83dca3e6b83998_tilt-ontario-canada-london.webp"], location: "https://maps.app.goo.gl/6Y8Sgq53MnwT5SNY9" },
  { id: "single-lee", name: "Lee", rating: 4.5, authorActivity: "Jimmy Y. gave this 5 Stars", description: "Iconic Asian-French fusion famous for its massive signature salad", mediaUrls: ["https://stream.mux.com/p7DuH52SgPuu4uW6oe9NqgvJXblBmz901qv00xSLCNny00/high.mp4", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWl69JIdpRB-lC0VmBI96KrfeXjmuYGB37c67qO3bA5IWFIkDjEpWAl8_o&s=10", "https://stream.mux.com/N6wFckCHw8lKpKqBzWEUAkNg01fnvsEAwuGJPQxb139U/high.mp4"], location: "https://maps.app.goo.gl/XpLGnQ1HfuvH59zM9" },
  { id: "single-ago", name: "Art Gallery of Ontario", rating: 4.7, authorActivity: "Karen D. has Been Here", description: "Frank Gehry-designed venue with an iconic spiral glass roof", mediaUrls: ["https://stream.mux.com/PG4wWMKkYQMtuxCG9jZ568W2BTZoeqziKw9x1JRGq5I/high.mp4", "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/39/8b/1f/exterior-view-grange.jpg?w=1200&h=-1&s=1", "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,g_xy_center,h_640,q_80,w_640,x_953,y_915/v1/clients/toronto/167_3_1451_jpeg_large72_ec376690-90e7-4328-b3d4-c3101f28ebea.jpg"], location: "https://maps.app.goo.gl/psR3q4ZRcBY3pcZb7" },
  { id: "single-chicas", name: "Chica's Chicken", rating: 4.5, authorActivity: "Adam C. (Elite) added to their Wishlist", description: "Michelin Bib Gourmand Nashville hot chicken in the Junction", mediaUrls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf56fHdHFww7JdmzJ9wbHljnvT-pLGm064YHuK7fOdyQSlrrfUYAVx_1g&s=10", "https://www.insauga.com/wp-content/uploads/2024/10/chicas-chicken-2.jpg", "https://torontolife.mblycdn.com/tl/resized/2018/05/w1280/toronto-restaurants-chicas-chicken-the-junction-nashville-hot-three-piece.jpg"], location: "https://maps.app.goo.gl/SwtpaJSq4W8GrtEy5" },
  { id: "single-tiflisi", name: "Tiflisi", rating: 4.7, authorActivity: "Katherine A. ranked in their Top 10", description: "Cozy Beaches spot serving comforting Georgian cheese bread & stews", mediaUrls: ["https://stream.mux.com/XB8en7L4llthyF5jMNdvPk8Kp2JtTiJ4VXxEHwb3qS8/high.mp4"], location: "https://maps.app.goo.gl/FjrcN3B7DhsFaCvM8" },
  { id: "single-quetzal", name: "Quetzal", rating: 4.6, authorActivity: "Yelp added to Top 100", description: "Michelin-starred upscale Mexican fare cooked over an open fire", mediaUrls: ["https://stream.mux.com/hgJF11iliBdT9yj00700Fbi5ybMEd8Lkm1FeRKAlgfOY4/high.mp4", "https://s3-media0.fl.yelpcdn.com/bphoto/L62DqwUsrWmoZkiz8rkhAg/o.jpg", "https://www.theworlds50best.com/restaurants/best-in-north-america/filestore/jpg/NA50BR26-List-Quetzal2.jpg"], location: "https://maps.app.goo.gl/L81DfnniAQmMHLou9" },
  { id: "single-prehistoria", name: "Prehistoria Museum & SkullStore", rating: 4.8, authorActivity: "Albert V. added to their Wishlist", description: "Wild retail museum packed with real fossils, skulls & oddities", mediaUrls: ["https://torontolife.mblycdn.com/uploads/tl/2023/08/LL-2992-scaled.jpg", "https://torontolife.mblycdn.com/tl/resized/2023/08/w1280/LL-3091-scaled.jpg", "https://www.vmcdn.ca/f/files/torontotoday/images/feature-stories/skull-museum/02-09-2025-skullstoreprehistoriamuseumdowntowntoronto-af-01.JPG"], location: "https://maps.app.goo.gl/qpYLptCEC3rWztaH9" },
  { id: "single-pizzeria-badialdi", name: "Pizzeria Badialdi", rating: 4.7, authorActivity: "Michael T. ranked in their Top 10 Pizzas", description: "Hype-worthy West End spot tossing elite New York-style slices", mediaUrls: ["https://stream.mux.com/DNIUzfgDHvrCq3G5AWnOS9G02b1OEe6gpcE9RSHWDhsk/high.mp4", "https://ambassador-media-library-assets.s3.amazonaws.com/24c64e1b-c532-4d2d-85b9-5c08f40b3c0e.jpg", "https://images.prismic.io/taste/5bd43aa4-84b8-428b-acbc-9fe96712d2f3_2X8A7501.jpg?auto=compress,format"], location: "https://maps.app.goo.gl/KRUWrrLc6FVdB1HQ7" },
  { id: "single-piggys-island", name: "Piggy's Island", rating: 4.4, authorActivity: "Moe K. has Been Here", description: "Buzzing Korean BBQ joint serving endless grilled meat & soju", mediaUrls: ["https://stream.mux.com/m027mJmzfvP6xb64x8XduaDb00M7rZ3e01dPWwJq00CKHCk/high.mp4", "https://torontolife.mblycdn.com/tl/resized/2024/03/w1280/toronto-restaurants-piggys-island-thornhill-korean-barbecue-ssambap-2-scaled.jpg", "https://s3-media0.fl.yelpcdn.com/bphoto/tpmvzcPlg87dwaF2onwLJA/o.jpg"], location: "https://maps.app.goo.gl/wDVkQ4QYiuJDXu6v7" },
  { id: "single-aloette", name: "Aloette", rating: 4.5, authorActivity: "Joel K. added this to their Wishlist", description: "Chic, French-leaning diner serving an elite burger and pie", mediaUrls: ["https://stream.mux.com/Z8nMTmyra2c4uvHZaZ4iird01djjLeJkxJzMIwkEyIfI/high.mp4", "https://images.squarespace-cdn.com/content/v1/662aac1f0c81fb403e647fed/ba472aca-fe1b-47df-b82b-5081e4632509/2.png", "https://images.squarespace-cdn.com/content/v1/662aac1f0c81fb403e647fed/e406e881-2393-48ea-9db2-827d8639184b/DSC_0628.jpg", "https://platform.eater.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24915297/Aloette.jpg?quality=90&strip=all&crop=0%2C0%2C100%2C100&w=1440"], location: "https://maps.app.goo.gl/CSiFqV1tX4NWHsYf7" },
  { id: "single-takja-bbq", name: "Takja BBQ House", rating: 4.7, authorActivity: "James L. ranked this in their Top 10", description: "Upscale Korean BBQ with dry-aged beef grilled tableside", mediaUrls: ["https://stream.mux.com/yagLBw1mLvEltJovXRGoslp76zNLrmO6UAazw332A7s/high.mp4", "https://torontolife.mblycdn.com/tl/resized/2024/04/w1280/toronto-restaurants-takja-bbq-korean-litte-italy-grilling-4-scaled.jpg", "https://canadas100best.com/wp-content/uploads/2025/04/TakjaBBQ-Toronto-2025-Canadas100Best_feat-1440x900.jpg"], location: "https://maps.app.goo.gl/HyrJ4w58N6Ha3idd7" },
];

export interface CuratedList {
  id: string;
  title: string;
  description?: string;
  moduleType: "ranked" | "list" | "award" | "celebrity" | "saved" | "friends" | "guide";
  author?: string;
  category: FeedCategory;
  businesses: Business[];
}

export type FeedCategory = "all" | "restaurants" | "things-to-do" | "events" | "guides" | "services";

export const lists: CuratedList[] = [
  {
    id: "iconic-toronto-dishes",
    title: "🍽️ Top 5 Iconic Toronto Dishes",
    description: "Classics you have to try",
    moduleType: "ranked",
    author: "Yelp",
    category: "restaurants",
    businesses: [
      { id: "poutine", name: "Poutine", description: "Adopted from Quebec, it became the ultimate late-night fuel for TO students.", imageUrl: "https://platform.detroit.eater.com/wp-content/uploads/sites/13/chorus/uploads/chorus_asset/file/8545309/Smoke_s_Poutinerie.2.jpg?quality=90&strip=all&crop=0,10.732984293194,100,78.534031413613", location: "Nom Nom Nom" },
      { id: "peameal-bacon", name: "Peameal Bacon Sandwich", description: "Born at St. Lawrence Market, it defines Hogtown's early meatpacking history.", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStM8uj6GdeAvYbmZbXWvafp0psyChe2JykguzvkETd5FpAVP8K9pOcKzO6&s=10", location: "When The Pig Came Home" },
      { id: "butter-chicken-roti", name: "Butter Chicken Roti", description: "Created in TO, fusing vibrant South Asian flavors with Caribbean roti shops.", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGPqGKQiM1J-ydXdQcyMey6UEaUAcWnadMrW9ZyCNfVHLNTQlUlf5bFPde&s=10", location: "Roti Mahal" },
      { id: "sushi-pizza", name: "Sushi Pizza", description: "Invented by a Toronto chef in 1992, showcasing the city's dynamic food fusion.", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVQ_LD-7CJpJZHhTTzLbyQcir126pmMxVwVpeQ2xefVsnvplpd8RqU3gQ&s=10", location: "JaBistro" },
      { id: "butter-tarts", name: "Butter Tarts", description: "A classic Ontario pastry central to local bakeries and seasonal road trips.", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwsTMK-hJ5aK5_qIlh6880NZ7ulbpaOSmKwXPrRT4SKNngNzr3auus8uXl&s=10", location: "Circles & Squares Bakery" },
    ],
  },
  {
    id: "secret-speakeasies",
    title: "🚪 Top Speakeasies & How to Get In",
    description: "Special speakeasies and the secret to getting in",
    moduleType: "list",
    author: "Toronto Life",
    category: "restaurants",
    businesses: [
      { id: "bar-404", name: "Bar 404", description: "Tell the cashier at a faux candle shop you are there", rating: 4.4, imageUrl: "https://404toronto.com/wp-content/uploads/2024/07/IMG_1788-scaled.jpg" },
      { id: "bar-after-seven", name: "Bar After Seven", description: "Push through a fake vending machine inside a yogurt shop", rating: 4.4, imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH7o7V5u4Py4Lne7TfzxzgvWj2DMTpwQf0bbIYTCmYKzGwdkdr74hK2AS0aq8gi2mALduGHIr4Q452yEYNSZFnHyXJH5z_HzES0C3Yy56K0-rQoe14MYF6hL_E7G29wkx-P_Hzr=s1360-w1360-h1020-rw" },
      { id: "cry-baby-gallery-speak", name: "Cry Baby Gallery", description: "Walk through a secret door at the back of an art gallery", rating: 4.5, imageUrl: "https://canadas100best.com/wp-content/uploads/2024/05/CryBabyGallery-2024-feat.jpg" },
      { id: "mahjong-bar-speak", name: "Mahjong Bar", description: "Head to Dundas West and find the hidden pink bodega door", rating: 4.2, imageUrl: "https://torontolife.mblycdn.com/tl/resized/2017/10/w1280/toronto-bars-mahjong-bar-cocktails-little-portugal-hidden-keyhole-door.jpg" },
      { id: "vatican-gift-shop", name: "Vatican Gift Shop", description: "Push past the religious souvenir shop's corner door", rating: 4.3, imageUrl: "https://blogto-production2-baselayer-display.blogto.com/listings/20181005-VaticanGiftShop10.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto" },
    ],
  },
  {
    id: "dumpling-crawls-chinatown",
    title: "🥟 Top 5 Chinatown Dumplings",
    description: "Top-rated Chinatown spots for handmade dumplings",
    moduleType: "list",
    author: "Terrene H. (Elite)",
    category: "restaurants",
    businesses: [
      { id: "mothers-dumplings", name: "Mother's Dumplings", description: "The undisputed classic. Incredible handmade, thick-skinned northern style.", rating: 4.1, imageUrl: "https://stream.mux.com/Kcqoq3OiO13uvm4Fgp2L1AdnHBYvBN9005em401Y4F5uc/high.mp4", videoUrl: "https://stream.mux.com/Kcqoq3OiO13uvm4Fgp2L1AdnHBYvBN9005em401Y4F5uc/high.mp4" },
      { id: "juicy-dumpling-new", name: "Juicy Dumpling", description: "Fast, remarkably cheap, and always packed for a reason.", rating: 4.5, imageUrl: "https://blogto-production2-baselayer-display.blogto.com/listings/20181008-JuicyDumplings1.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto" },
      { id: "dumpling-house", name: "Dumpling House Restaurant", description: "A cozy, no-nonsense gem right on the Spadina strip.", rating: 4.1, imageUrl: "https://blogto-production2-baselayer-display.blogto.com/listings/20210903-DumplingHouse7.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto" },
      { id: "rol-san-new", name: "Rol San Restaurant", description: "Iconic Chinatown mainstay famous for all-day dim sum.", rating: 4.0, imageUrl: "https://stream.mux.com/gYVlDB8XIjDVK9o4wBa7xJ02CYrp56x00L6rdSChIMzS00/high.mp4", videoUrl: "https://stream.mux.com/gYVlDB8XIjDVK9o4wBa7xJ02CYrp56x00L6rdSChIMzS00/high.mp4" },
      { id: "swatow", name: "Swatow Restaurant", description: "Late-night legendary institution that has fed generations", rating: 4.2, imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/b4d775b9ed0d41763f611d416c7e3d25/8a42ee7a692dfa4155879820804a277f.jpeg" },
    ],
  },
  {
    id: "eats-under-20-new",
    title: "💰 Eats under $20",
    description: "Top spots for quick, budget-friendly meals",
    moduleType: "list",
    category: "restaurants",
    businesses: [
      { id: "logas-new", name: "Loga's Corner", description: "Steaming 10-piece order of beef momos", price: "$9", rating: 4.7, imageUrl: "https://s3-media0.fl.yelpcdn.com/bphoto/cRVFnVkUlSKkw4EfzCYr7w/o.jpg" },
      { id: "banh-mi-nguyen", name: "Banh Mi Nguyen Hong", description: "Assorted Cold Cut Banh Mi", price: "$13", rating: 4.4, imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/57d5eb1b6530412f9fa486a06b57cf04/50446f64f31cbefe66558fc47f50a9d6.jpeg" },
      { id: "burger-drops-new", name: "Burger Drops", description: "Single Smashburger side of curly fries", price: "$16", rating: 4.6, imageUrl: "https://blogto-production2-baselayer-display.blogto.com/uploads/2020/10/13/1602609339-20201009-BurgerDrops8.jpg" },
      { id: "tropical-joes", name: "Tropical Joe's", description: "Massive Jerk Chicken Meal", price: "$15", imageUrl: "https://blogto-production2-baselayer-display.blogto.com/listings/20192103-TropicalJoes-9.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto" },
      { id: "sang-ji", name: "Sang-Ji Fried Bao", description: "4-piece Shanghai Style Pan-Fried Pork Baos", price: "$8", rating: 4.5, imageUrl: "https://i.cbc.ca/ais/1.6395267,1648076592000/full/max/0/default.jpg?im=Crop%2Crect%3D%280%2C0%2C1200%2C800%29%3BResize%3D1280" },
    ],
  },
  {
    id: "michelin-on-a-dime-new",
    title: "💸 Michelin on a Dime",
    description: "Fine dining standouts that won't break the bank.",
    moduleType: "award",
    author: "Michelin Guide",
    category: "restaurants",
    businesses: [
      { id: "mhel", name: "Mhel", description: "Korean-Japanese eats, classic vinyl tunes", rating: 4.5, imageUrl: "https://torontolife.mblycdn.com/tl/resized/2023/11/w2560/toronto-restaurants-mhel-japanese-korean-bloorcourt-dashi-scaled.jpg" },
      { id: "bar-raval-new", name: "Bar Raval", description: "Gorgeous carved wood standing only bar", rating: 4.4, imageUrl: "https://images.adsttc.com/media/images/552d/b694/e58e/ce2c/fd00/02c2/large_jpg/portada_Bar_Raval_01.jpg?1429059212", videoUrl: "https://stream.mux.com/S01RxN8OAIAObGQKwQwsa007WrNR2UC02DOYOOAse27Qfk/high.mp4" },
      { id: "sunnys-new", name: "Sunny's Chinese", description: "Bold, regional Chinese eats hidden deep inside a neon-lit mall", imageUrl: "https://sunnyschinese.com/cdn/shop/files/027_SUNNY_Schinese_Gabriel_Li_3785GL.jpg?v=1665619393&width=2048" },
      { id: "bbs-new", name: "BB's", description: "Vibrant pastel vibes and epic Filipino brunch", imageUrl: "https://torontolife.mblycdn.com/tl/resized/2022/04/w2560/BBsDINER10.jpg" },
      { id: "white-lily", name: "White Lily Diner", description: "Next-level scratch-made diner classics", rating: 4.7, imageUrl: "https://cdn.foodism.ca/gallery_landscape_screen/665623d7a8d66.jpg", videoUrl: "https://stream.mux.com/Mn2JcZJ2fFEkWs3NEyMR2YtXacY1VUi8tjb49gXnqX8/high.mp4" },
    ],
  },
  {
    id: "michelin-starred-new",
    title: "⭐ Michelin-Starred",
    description: "Restaurant stars you simply can't miss.",
    moduleType: "award",
    author: "Michelin Guide",
    category: "restaurants",
    businesses: [
      { id: "sushi-masaki", name: "Sushi Masaki Saito", description: "Insane multi-course high-end sushi", rating: 4.6, imageUrl: "https://canadas100best.com/wp-content/uploads/2024/05/Sushi-Masaki-Saito-2024-feat.jpg" },
      { id: "alo-new", name: "Alo", description: "Flawless French-inspired tasting menu", rating: 4.6, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR21uQDSIfcpNB-GMfkEZsYk3pgKOt2F8Am2MMTJuKw4vWI5MbKmk5IW9g&s=10", videoUrl: "https://stream.mux.com/P901iAl23GQiy1GUMcwrePQy02i4SP3wrbj4Ud01zD6WlI/high.mp4" },
      { id: "edulis-new", name: "Edulis", description: "Cozy hidden gem for seasonal plates", rating: 4.6, imageUrl: "https://canadas100best.com/wp-content/uploads/2026/04/Edulis-Toronto-2026-Canadas100Best-1-610x813.jpg" },
      { id: "quetzal-new", name: "Quetzal", description: "Almost everything cooked over live fire", rating: 4.6, imageUrl: "https://www.theworlds50best.com/discovery/filestore/jpg/Quetzal-dish.jpg", videoUrl: "https://stream.mux.com/a8weluSjuSY00b101g01h7WHneSm4hqAkWp2C6jg4uVek8/high.mp4" },
      { id: "akin", name: "aKin", description: "Wildly creative modern Chinese tasting.", rating: 4.7, imageUrl: "https://torontolife.mblycdn.com/tl/resized/2024/12/w2560/toronto-restaurants-akin-st-lawrence-congee.jpg" },
    ],
  },
  {
    id: "kensington-tacos",
    title: "🌮 Kensington Market Tacos",
    description: "Must-try taco spots in Kensington Market",
    moduleType: "list",
    category: "restaurants",
    businesses: [
      { id: "seven-lives-new", name: "Seven Lives Tacos y Mariscos", description: "Legendary market staple: massive, iconic Baja fish tacos.", rating: 4.6, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb_OAdP_1Ox7pJ4_r7i-mz2ZaV14QvM5tAt31Vg-Qbxf1S_QI6F0VIDBMV&s=10" },
      { id: "gus-tacos-new", name: "Gus Tacos", description: "Casual neighborhood favorite: stellar handmade tortillas.", rating: 4.5, imageUrl: "https://gustacos.com/wp-content/uploads/2024/05/Untitled-design.png" },
      { id: "tacos-101", name: "Tacos 101 and Fruta Libre", description: "Vibrant Baldwin spot: incredible al pastor with pineapple.", rating: 4.4, imageUrl: "https://torontolife.mblycdn.com/tl/resized/2021/07/w1280/TACOS101_15.jpg" },
      { id: "la-chilaca", name: "La Chilaca Taqueria", description: "Hidden inside the mall: amazing street-style carnitas.", rating: 4.5, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIQlSCW0lgeYZZDS9zck-N2yxrJgedzH7GH7F37A2Qb46N6hwphZf64JGi&s=10" },
      { id: "el-trompo", name: "El Trompo", description: "Bustling Augusta patio: classic tacos and great margaritas.", rating: 4.4, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWUuvq-blNcGtmsBtzJk2fR0LmcMkcyNJtPznv26JUlShYwT9jDd8ikQw&s=10" },
    ],
  },
  {
    id: "ossington-bakeries",
    title: "🥐 Ossington Bakeries Worth It",
    description: "Must-visit Ossington bakeries for croissants and sweets",
    moduleType: "list",
    author: "Brian S. (Bakery Expert)",
    category: "restaurants",
    businesses: [
      { id: "dear-grain", name: "Dear Grain", description: "Worth it: Classic Sourdough Croissant", rating: 4.6, imageUrl: "https://s3-media0.fl.yelpcdn.com/bphoto/AWyEyb780jy11eCaHay4iw/o.jpg" },
      { id: "cuervo-marquis", name: "Cuervo y Marquis", description: "Worth it: Kouign-Amann", rating: 4.4, imageUrl: "https://blogto-production2-baselayer-display.blogto.com/uploads/2024/04/19/1713541663-20240123-CuervoYMarquis-10.jpg" },
      { id: "bang-bang", name: "Bang Bang Ice Cream & Bakery", description: "Worth it: Everything Cookie ice cream sandwich", rating: 4.6, imageUrl: "https://images.happycow.net/venues/1024/58/54/hcmp58542_2145239.jpeg" },
      { id: "la-boulangerie", name: "La Boulangerie", description: "Worth it: Classic Pain au Chocolat", rating: 4.6, imageUrl: "https://popmenucloud.com/cdn-cgi/image/width=1920,height=1920,format=auto,fit=scale-down/oufpimxd/7f031138-3672-4783-aa81-bfa05916d4c9.jpg" },
      { id: "sugar-daddy", name: "Sugar Daddy Doughnuts", description: "Worth it: made-to-order Mini Doughnuts & Dunkaroo Dip", rating: 4.6, imageUrl: "https://blogto-production2-baselayer-display.blogto.com/listings/20231005-SugarDaddyDonuts-13.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto" },
    ],
  },
  {
    id: "indie-movie-theatres",
    title: "🍿 Cool Indie Movie Theatres",
    description: "Explore the city's iconic, historic indie theaters",
    moduleType: "list",
    author: "Yelp",
    category: "things-to-do",
    businesses: [
      { id: "revue-cinema", name: "Revue Cinema", description: "Canada's oldest standing cinema", rating: 4.7, imageUrl: "https://static.where-e.com/Canada/Ontario/Toronto/Cinema-Review_7ecd6a9fd8973274c9d6eeac56f32ba2.jpg" },
      { id: "fox-theatre", name: "Fox Theatre", description: "City's oldest continuously running cinema", rating: 4.7, imageUrl: "https://www.torontojourney416.com/wp-content/uploads/2022/04/fox-theatre-2025-1024x768.jpg" },
      { id: "paradise-theatre", name: "Paradise Theatre", description: "Stunning restored 1937 Art Deco gem", rating: 4.8, imageUrl: "https://torontolife.mblycdn.com/tl/resized/2019/12/900x900/TS_Paradise-49.jpg" },
      { id: "the-royal", name: "The Royal", description: "Hosts live comedy, indies, and Q&As", rating: 4.6, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/The_Royal_in_Little_Italy_2023.JPG" },
      { id: "carlton-cinema", name: "Carlton Cinema", description: "Underground hub playing offbeat indies", rating: 4.4, imageUrl: "https://www.torontojourney416.com/wp-content/uploads/2022/04/carlton-cinema-2020-785x1024.jpg" },
    ],
  },
  {
    id: "architectural-gems",
    title: "🏛️ Architectural Gems",
    description: "Toronto's most iconic architectural landmarks and buildings",
    moduleType: "list",
    author: "Yelp",
    category: "things-to-do",
    businesses: [
      { id: "allen-lambert", name: "Allen Lambert Galleria", description: "Breathtaking, soaring white steel arches", rating: 4.6, imageUrl: "https://live.staticflickr.com/3633/3313191718_952701809a_c.jpg" },
      { id: "gooderham-new", name: "Gooderham Building", description: "Striking, narrow red-brick wedge shape", rating: 4.6, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Gooderham_Building%2C_Toronto%2C_East_view_20170417_1.jpg" },
      { id: "rom-new", name: "Royal Ontario Museum", description: "Dramatic, sharp glass shards hit heritage", rating: 4.7, imageUrl: "https://images.adsttc.com/media/images/65e1/154f/d898/3c7e/7fa8/2de5/newsletter/hariri-pontarini-architects-unveil-royal-ontario-museum-transformation_8.jpg?1709249883" },
      { id: "ago-new", name: "Art Gallery of Ontario", description: "Gorgeous, massive curved wood-and-glass hull", rating: 4.7, imageUrl: "https://d1l57x9nwbbkz.cloudfront.net/files/s3fs-public/styles/article_masthead/public/2026-02/interior-atrium-art-gallery-ontario.jpg.webp?VersionId=Xr8v4gFiqlXqwdLFTL.KLkLZ_aGKCgj_&h=09424e2b&itok=rN2Mzza-" },
      { id: "city-hall-new", name: "Toronto City Hall", description: "Futuristic, twin curved concrete towers", rating: 4.4, imageUrl: "https://live.staticflickr.com/65535/52100261328_1543c7ea6d_b.jpg" },
    ],
  },
  {
    id: "nature-escapes",
    title: "🌲 Nature Escapes in the city",
    description: "Discover Toronto's lush ravines and serene nature walks",
    moduleType: "list",
    author: "Catherine B. (Elite)",
    category: "things-to-do",
    businesses: [
      { id: "moore-park", name: "Moore Park Ravine", description: "Gorgeous snake through canopy of ancient trees", rating: 4.6, imageUrl: "https://blogto-production2-baselayer-display.blogto.com/uploads/2018/09/22/20180921-moore-park-ravine-8.jpg" },
      { id: "glen-stewart", name: "Glen Stewart Ravine", description: "Like a miniature, forested Narnia", rating: 4.7, imageUrl: "https://photos.smugmug.com/Canada/Ontario/Toronto-Hiking-Trails-2020/i-xHscKLR/1/XL/Toronto-GlenStewartPark05-XL.jpg" },
      { id: "cedarvale", name: "Cedarvale Ravine", description: "Scenic trail through a protected wetland", rating: 4.7, imageUrl: "https://bloximages.newyork1.vip.townnews.com/toronto.com/content/tncms/assets/v3/editorial/f/ab/fab5c676-2221-57ee-bac5-f7314618c109/63d8871963556.image.jpg?resize=374%2C500" },
      { id: "sherwood-park", name: "Sherwood Park", description: "Boardwalks trail through 150-year-old trees", rating: 4.7, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeWLvGrUCG23q7H23EU_6e9LWG1KNTjfUy1kKK2-MYefs-AcBtNPM47wBD&s=10" },
      { id: "rosedale-ravine", name: "Rosedale Ravine Trail", description: "Hidden staircase drops you into a tranquil, forest floor", rating: 4.5, imageUrl: "https://static01.nyt.com/images/2024/10/19/travel/09toronto-ravines-mjfq/09toronto-ravines-mjfq-mediumSquareAt3X.jpg" },
    ],
  },
  {
    id: "bourdains-faves-new",
    title: "Bourdain's Toronto Faves",
    description: "Anthony Bourdain's favorite local destinations",
    moduleType: "celebrity",
    category: "restaurants",
    businesses: [
      { id: "carousel-bakery-new", name: "Carousel Bakery", description: "Tony's go-to for peameal bacon sandwiches and butter tarts", rating: 4.0, imageUrl: "https://wellfedfoodieblog.wordpress.com/wp-content/uploads/2019/07/peameal.jpg" },
      { id: "porchetta-new", name: "Porchetta & Co.", description: "Tony was a fan of the incredible porchetta – juicy meat with ultra-crispy skin.", rating: 3.9, imageUrl: "https://porchettaco.com/wp-content/uploads/sb-instagram-feed-images/441889886_18437053786048472_6007855991753966054_nfull.jpg" },
      { id: "drake-hotel-new", name: "Drake Hotel", description: "Tony's top pick for catching live music and boutique hotel and arts culture", rating: 4.3, imageUrl: "https://thedrake.ca/uploads/2025/03/TDH_FACADE_423-scaled.jpg" },
      { id: "wvrst", name: "WVRST", description: "Tony praised the no-fuss, communal beer-hall atmosphere.", rating: 4.5, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrORG7BxEUQ3KqvEX2r2iVqppweVGKCyXg01KAg_F8IZ2Ijstu4g-7yTf&s=10" },
    ],
  },
  {
    id: "drakes-haunts",
    title: "Drake's Hometown Haunts",
    description: "Iconic Toronto spots favored by hometown legend Drake",
    moduleType: "celebrity",
    author: "Drake",
    category: "things-to-do",
    businesses: [
      { id: "sotto-sotto", name: "Ristorante Sotto Sotto", description: "Go-to for traditional Roman-Italian fare", rating: 4.3, imageUrl: "https://sottosotto.ca/wp-content/uploads/2021/03/SOTTO-MAY-29-NEW-MENU-DINADSC09883-1-scaled-2-wide.jpg" },
      { id: "josos", name: "Joso's", description: "Famously graced the cover of his 2011 album", rating: 4.7, imageUrl: "https://resizer.otstatic.com/v3/photos/25150940-1" },
      { id: "spin-toronto", name: "Spin", description: "Drake's spot for sharpening his table tennis kills", rating: 4.4, imageUrl: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/toronto/DSC03696-1-_5FACEB61-A544-4494-AAB96E21470F613A_7f0bca80-cee0-41f1-acd01471c0ded948.jpg" },
      { id: "sher-club", name: "Sher Club", description: "Drake's own exclusive club set inside the ACC", rating: 4.3, imageUrl: "https://assets3.sportsnet.ca/wp-content/uploads/2015/05/sherclub.jpg" },
      { id: "new-ho-king", name: "New Ho King", description: "Famously featured in Drake and Kendrick \"beef\" songs", imageUrl: "https://i.guim.co.uk/img/media/890ca0c8552158813859e03eeb1f293eed1e5766/0_136_7933_4762/master/7933.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3e8a4f2828d4ccd7e8a43548112de5fe" },
    ],
  },
  {
    id: "check-off-wishlist-new",
    title: "Check off your wishlist ✨",
    description: "Book a spot at one of your saves",
    moduleType: "saved",
    category: "restaurants",
    businesses: [
      { id: "seahorse-new", name: "Seahorse", description: "Cozy station spot: great vibe, fresh seafood & oysters.", rating: 4.7, imageUrl: "https://torontolife.mblycdn.com/tl/resized/2025/12/w1280/toronto-restaurants-seahorse-summerhill-seafood-fish.jpg" },
      { id: "brasserie-cote-new", name: "Brasserie Côte", description: "Lively Annex tavern: Parisian vibe, steak & classic sauces.", rating: 4.7, imageUrl: "https://torontolife.mblycdn.com/tl/resized/2026/03/w2560/toronto-restaurants-brasserie-cote-french-annex-spread.jpg" },
      { id: "punch-new", name: "PUNCH", description: "Ritzy spot: playful Indo-British vibe & butter chicken pies.", rating: 4.6, imageUrl: "https://punchtoronto.com/wp-content/uploads/2025/09/250909_Le_Germain_0091-2-1024x683.jpg" },
      { id: "onda-new", name: "The Onda", description: "Intimate counter: lively party vibe & 20-course Korean omakase.", rating: 5.0, imageUrl: "https://torontolife.mblycdn.com/tl/resized/2026/03/w2560/toronto-restaurants-the-onda-japanese-korean-omakase-fish-closeup.jpg" },
      { id: "radici-new", name: "Radici Project", description: "Cozy Little Italy gem: family vibe & cacio e pepe takoyaki.", rating: 4.9, imageUrl: "https://torontolife.mblycdn.com/tl/resized/2025/05/w2560/toronto-restaurants-radici-project-italian-japanese-little-italy-spread.jpg" },
      { id: "sammarco-new", name: "SAMMARCO", description: "Sleek, opulent St. Lawrence spot: 60-day dry-aged steaks.", rating: 4.6, imageUrl: "https://axwwgrkdco.cloudimg.io/v7/__gmpics3__/9e7c598ecfe74df59cb9dd9daa0f94df.jpeg?w=1100&h=1100&org_if_sml=1" },
      { id: "mozys-new", name: "Mozy's", description: "Liberty Village counter: live-fire vibe & charcoal chicken.", imageUrl: "https://sharpmagazine.com/wp-content/uploads/2026/02/Mozys-Credit-Exceptional-Films-2-2026-Grilled-Chicken.jpg" },
    ],
  },
  {
    id: "latest-from-friends",
    title: "Latest from Friends 💛",
    description: "See what your friends are up to",
    moduleType: "friends",
    category: "restaurants",
    businesses: [
      { id: "hoppers-hut-new", name: "Hopper's Hut", description: "Casual Ellesmere spot: hoppers & banana-leaf lamprais.", imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/100e44658938965e507934aad4b1ee79/fb86662148be855d931b37d6c1e5fcbe.jpeg", friendActivity: "Jamie R. left a 4-star review" },
      { id: "torteria-new", name: "Tortería San Cosme", description: "Kensington Market spot: vibrant vibe & elevated CDMX tortas.", rating: 4.2, imageUrl: "https://assets.bonappetit.com/photos/59edfff383b5a033fb6b9b7f/16:9/w_2240,c_limit/TORTERIASANCOSME_LEAD_TorontoCityGuide.jpg", friendActivity: "Richard R. bookmarked this" },
      { id: "manpuku-new", name: "Manpuku Modern Japanese Eatery", description: "Bustling downtown food court spot: $8.30 curry beef udon.", rating: 4.5, imageUrl: "https://cdn.corner.inc/place-photo/AUacShhs4fskWn6Env8jaXjr3TCBdu-n3FOjq_ZyO12j4gUFogNTcLTK_YaXpwLIP7zmop3JPCbeITi_kml2hB82zjQE8nUleKNMIfOlykg3AH9H4b-8PU33PKX8RuRMGO_nJ7I0CS_rQbu9rYOC65oBbnUu4VBR0NxP4btiCJpw-tOPyJW_.jpeg", friendActivity: "Pita S. bookmarked this" },
      { id: "itacate-new", name: "Itacate", description: "St. Clair West counter: casual vibe & $8 steak Volcans.", rating: 4.5, imageUrl: "https://michaeleats.com/wp-content/uploads/2024/11/ita1.jpg", friendActivity: "Ida I. posted a photo" },
      { id: "banh-mi-new", name: "Banh Mi Huy-Ky", description: "No-frills, cash-only gem: $5 lemongrass-garlic pork bánh mì.", rating: 4.7, imageUrl: "https://torontolife.mblycdn.com/tl/resized/2024/02/w2560/CHEAP_EATS_bahmi.jpg", friendActivity: "Spencer R. has been here" },
    ],
  },
  {
    id: "moody-wine-bars",
    title: "🍷 Moody Wine Bars",
    description: "Toronto's top moody and intimate wine bars",
    moduleType: "list",
    category: "restaurants",
    businesses: [
      { id: "bar-piquette", name: "Bar Piquette", description: "Cozy, candlelit Queen West hub: amazing skin-contact bottles.", rating: 4.5, imageUrl: "https://images.squarespace-cdn.com/content/v1/69a6ac2cb8d9b86e02492c77/3a3c9544-ff5b-4c8b-a736-ca763cd4b702/879CB8C7-3A44-4CAB-813E-64D9D0193249.jpeg" },
      { id: "archive-wine-new", name: "Archive Wine Bar", description: "Snug, dim Dundas West gem: incredible European small plates.", rating: 4.6, imageUrl: "https://images.squarespace-cdn.com/content/v1/50fc4658e4b000014e7a4304/1735832214078-TRBOUKU54D9ZKJ75ANDS/Archive_Toronto-1662.jpg" },
      { id: "paris-paris-new", name: "Paris Paris", description: "Lively Ossington favorite: great energy and bottles by the glass.", rating: 3.9, imageUrl: "https://blogto-production2-baselayer-display.blogto.com/uploads/2018/03/09/20180308-2048-ParisParis6.jpg" },
      { id: "grape-witches", name: "Grape Witches", description: "Moody, artistic space: wild and dynamic natural wine pours.", rating: 4.6, imageUrl: "https://www.waterworksfoodhall.com/_next/image?url=https%3A%2F%2Fadmin.waterworksfoodhall.com%2Fwp-content%2Fuploads%2F2024%2F04%2FInterior-Shot.jpg&w=3840&q=75" },
      { id: "paradise-grapevine-new", name: "Paradise Grapevine", description: "Low-key Bloor Court staple: fantastic local cider and wine taps.", rating: 4.5, imageUrl: "https://paradisegrapevine.com/cdn/shop/files/paradise_grapevine_patio_toronto_2.jpg?v=1702595624&width=2000" },
    ],
  },
  {
    id: "dog-friendly-patios",
    title: "🐶 Dog-Friendly Patios",
    description: "Top Toronto patios for dog owners: welcoming, pup-friendly",
    moduleType: "list",
    category: "things-to-do",
    businesses: [
      { id: "black-lab", name: "Black Lab Brewing", description: "Pure dog heaven: ultra-welcoming space made for pups.", rating: 4.8, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR42v3HDE5Q7JiP2ppZwyGHb4d8zA0MufztpEyFenCT6lLjSPh0cOpnDsU&s=10" },
      { id: "goodman-pub", name: "The Goodman Pub and Kitchen", description: "Lakeside boardwalk gem: features an actual custom dog menu.", rating: 4.3, imageUrl: "https://i.weddinghero.ca/gallery/1832/preview_1832_ZIPLzByW.jpg" },
      { id: "stackt-market", name: "Stackt Market", description: "Outdoor shipping container hub with a dedicated dog yard.", rating: 4.2, imageUrl: "https://stacktmarket.com/app/uploads/2024/08/stackt-ottawa.jpg" },
      { id: "local-public", name: "Local Public Eatery - Liberty Village", description: "Massive, high-energy patio packed with puppy perks.", rating: 4.5, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwe4-wyCyaPd2VNq-Erf3JH9HY1YN9JTU3v6toxZlWJe0JGzO8GQDVomt&s=10" },
      { id: "stone-lion", name: "The Stone Lion", description: "Great Beaches patio: cozy, covered, and heated for pups.", rating: 4.2, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwksZToaccpGp_F6dO75ppYyl3JsEid5UdAxvGa2lyn_NZB95mRGp4-fY&s=10" },
    ],
  },
  {
    id: "toronto-24-hours",
    title: "⏰ Toronto in 24 hours",
    description: "Toronto day trip: market eats, island views, and top dining",
    moduleType: "guide",
    author: "Yelp",
    category: "guides",
    businesses: [
      { id: "st-lawrence-guide", name: "St. Lawrence Market", description: "Start your morning by grabbing a peameal bacon sandwich", rating: 4.6, imageUrl: "https://oldtowntoronto.ca/wp-content/uploads/2020/02/st-lawrence-market-toronto-background1.jpg" },
      { id: "ferry-terminal", name: "Jack Layton Ferry Terminal", description: "Soak up the harbor views and ferry over to Ward's Island", rating: 4.4, imageUrl: "https://cdn.prod.website-files.com/680cf47a50b560d2048b4e70/6826a07baa384199bf6377ca_news.jpg" },
      { id: "kensington-guide", name: "Kensington Market", description: "Explore the vintage shops, indie cafes, and food stalls", rating: 4.2, imageUrl: "https://www.heritagetrust.on.ca/uploads/Articles/14-18-Kensington-3-web.jpg" },
      { id: "alo-guide", name: "Alo", description: "Settle in for a meticulously curated multi-course tasting", imageUrl: "https://s3-media0.fl.yelpcdn.com/bphoto/QqlHh_6cll2BSX1j8m6FNA/o.jpg" },
      { id: "bar-raval-guide", name: "Bar Raval", description: "Wind down with a crafted cocktail in this Gaudi-esque mahogany bar", imageUrl: "https://blogto-production2-baselayer-display.blogto.com/listings/20171026-2048-BarRaval12.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto" },
    ],
  },
  {
    id: "stunning-desserts",
    title: "🍰5 Stunning Desserts",
    description: "Beautiful Toronto dessert spots for artistic treats",
    moduleType: "list",
    category: "restaurants",
    businesses: [
      { id: "delysees", name: "Delysées Luxury Desserts", description: "Get the Ruby Red Lips cake; it's a sleek, glossy work of art.", rating: 4.4, imageUrl: "https://luxemagazineottawa.com/wp-content/uploads/2024/03/12.png" },
      { id: "cake-it", name: "Cake It Toronto", description: "Order the hyper-realistic Peach mousse cake—it looks picked from a tree.", rating: 4.8, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS653hQQ_tvhhMrJt0IKsFRUp_nrEuQBmGAew&s" },
      { id: "daan-go", name: "Daan Go Cake Lab", description: "Get the 24K Mango cake topped with gorgeous, shining gold leaf.", rating: 4.7, imageUrl: "https://daango.com/cdn/shop/files/cake_style_4_to_3.jpg?height=900&v=1681440769" },
      { id: "roselle-new", name: "Roselle Desserts", description: "Order the Earl Grey Cake Cup for beautiful, delicate layers.", rating: 4.7, imageUrl: "https://blogto-production2-baselayer-display.blogto.com/uploads/2018/07/27/20180726-2048-Roselle13.jpg" },
      { id: "asters", name: "Asters Patisserie", description: "Grab the Exotic Passion mini cake—a flawless geometric dome.", rating: 4.7, imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/30b9e2ca5b894d17f29559e547e7cf5b/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg" },
    ],
  },
  {
    id: "toronto-hidden-gems",
    title: "💎 Toronto Hidden Gems",
    description: "Curation of unique, underrated Toronto spots",
    moduleType: "guide",
    author: "Yelp",
    category: "guides",
    businesses: [
      { id: "monkeys-paw", name: "The Monkey's Paw", description: "Novelty book vending machine dispenses random vintage reads.", imageUrl: "https://img1.wsimg.com/isteam/ip/e7133917-f57d-4653-bbb0-39f9e1d0517f/monkeys-paw-5c01807046e0fb0001642d9a.jpg" },
      { id: "hanmoto", name: "Hanmoto", description: "Secret alley entrance opens to rowdy, killer Japanese eats.", rating: 4.7, imageUrl: "https://torontolife.mblycdn.com/tl/resized/2015/01/w2560/hanmotoleadimage.jpg" },
      { id: "winter-garden", name: "Winter Garden Theatre", description: "Last active double-decker theater feels like a dream forest.", rating: 4.8, imageUrl: "https://img.atlasobscura.com/Xi4h1r3m1tm4-oD6Nlh6UUsouh0umJux8VVGV2FmzHk/rt:fit/w:1200/q:80/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS9h/cHBfdXBsb2Fkcy9w/bGFjZV9pbWFnZXMv/dXNlcl8zMzg0MjQ5/XzE2YmUwZjQ5LWQy/NmQtNDY3MS1iNmM0/LTI2Zjk0NzdlZmYz/NA.jpg" },
      { id: "logas-gem", name: "Loga's Corner", description: "Massive, handmade Tibetan momos for under ten bucks.", imageUrl: "https://blogto-production2-baselayer-display.blogto.com/listings/0cad-20150319-logascorner590-11.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto" },
      { id: "lower-bay", name: "Lower Bay Station", description: "Ghost subway platform frozen in time right below the city.", rating: 4.3, imageUrl: "https://cdn.inkspire.org/wp-content/uploads/2021/04/city-hall-station-1024x683.jpg" },
    ],
  },
  {
    id: "street-art-beyond-graffiti",
    title: "🎨 Street Art Beyond Graffiti Alley",
    description: "Discover hidden massive murals and public art",
    moduleType: "list",
    author: "Anna B. (Elite)",
    category: "things-to-do",
    businesses: [
      { id: "underpass-park", name: "Underpass Park", description: "Concrete overpass pillars turned into vibrant urban canvas", rating: 4.6, imageUrl: "https://www.waterfrontoronto.ca/sites/default/files/styles/contextual_banner_sm/public/2022-05/Underpass%20Park%20-%20skate%20park-crop.jpg?itok=SPPHO1m8" },
      { id: "keele-wall", name: "The Keele Wall", description: "Massive, block-long murals visible right from the subway", rating: 4.1, imageUrl: "https://i0.wp.com/bretkelly.com/wp-content/uploads/2020/05/Keele-IMG_7485.jpg?resize=1200%2C900&ssl=1" },
      { id: "cabbagetown-murals", name: "Cabbagetown Murals", description: "Striking lane murals tracing the deep history of the area", rating: 4.1, imageUrl: "https://www.artsatl.org/wp-content/uploads/Forward-Warrior-Mural-Wall.jpg" },
      { id: "regent-park-banners", name: "Regent Park Banners & Blocks", description: "Stunning portrait series and colorful community-led art", rating: 3.9, imageUrl: "https://gvalighting.com/media/2020/04/Block-24-1.jpg" },
      { id: "lawrence-west-mural", name: "Lawrence West Mural", description: "Incredible multi-story artwork highlighting local roots", rating: 4.2, imageUrl: "https://mcfcrandall.blog/wp-content/uploads/2015/11/blog_essencia_mural_house_stairs.jpg" },
    ],
  },
  {
    id: "essential-toronto-landmarks",
    title: "🏛️ Essential Landmarks",
    description: "Iconic Toronto sites and history",
    moduleType: "guide",
    author: "Yelp",
    category: "guides",
    businesses: [
      { id: "cn-tower-landmark", name: "CN Tower", description: "Icon defining the skyline with radical city views and walks", rating: 4.6, imageUrl: "https://media.cntraveler.com/photos/5b2c0684a98055277ea83e26/master/pass/CN-Tower_GettyImages-615764386.jpg" },
      { id: "rom-landmark", name: "Royal Ontario Museum", description: "World-class artifacts inside a striking, geometric design", imageUrl: "https://images.adsttc.com/media/images/65e1/154f/d898/3c7e/7fa8/2de5/newsletter/hariri-pontarini-architects-unveil-royal-ontario-museum-transformation_8.jpg?1709249883" },
      { id: "casa-loma-landmark", name: "Casa Loma", description: "A grand, historic Gothic revival castle right in Midtown", rating: 4.5, imageUrl: "https://media.eventective.com/4370082_lg.jpg" },
      { id: "distillery-landmark-new", name: "The Distillery District", description: "Historic Victorian brick lanes packed with modern boutiques", rating: 4.6, imageUrl: "https://spiritofyork.com/cdn/shop/articles/shutterstock_1040915752.jpg?v=1695242860" },
      { id: "st-lawrence-landmark", name: "St. Lawrence Market", description: "Legendary massive food hall feeding locals since over a century", imageUrl: "https://d1l57x9nwbbkz.cloudfront.net/files/s3fs-public/styles/webp/public/2024-04/st-lawrence-market-interior.jpg.webp?VersionId=xTtvrtdjhWcGvGQpSVc1x9usloxd2.PW&itok=-oqqMq2_" },
    ],
  },
  {
    id: "neon-karaoke-rooms",
    title: "🎤 Neon-Lit Karaoke Rooms",
    description: "Belt out your favorite tracks in these retro glowing rooms",
    moduleType: "list",
    author: "Yelp",
    category: "things-to-do",
    businesses: [
      { id: "bar-mordecai", name: "Bar Mordecai", description: "Immersive, beautifully styled retro spaces with top-tier drinks", rating: 4.2, imageUrl: "https://images.squarespace-cdn.com/content/v1/5bc29f3bab1a6270c382e22c/814c11a2-1021-4e53-b621-bd84a44f68a4/DSCF0163.jpeg?format=2500w" },
      { id: "echo-karaoke", name: "Echo Karaoke", description: "Classic neon-soaked private spaces with huge song catalogs", rating: 4.0, imageUrl: "https://d2l4kn3pfhqw69.cloudfront.net/wp-content/uploads/2023/10/gfunk.jpeg" },
      { id: "dasha", name: "Dasha", description: "High-energy, futuristic vibes alongside upscale pan-Asian food", rating: 4.0, imageUrl: "https://torontolife.mblycdn.com/tl/resized/2019/11/w1280/toronto-restaurants-dasha-king-west-chinese-room-1.jpg" },
      { id: "su-karaoke", name: "Su Karaoke Bar", description: "A local spot perfect for private karaoke sessions", rating: 4.7, imageUrl: "https://sukaraoke.com/wp-content/uploads/2025/05/su2.webp" },
    ],
  },
  {
    id: "yelps-top-10",
    title: "🥇 Yelp's Top 10",
    description: "Top 10 Toronto spots as picked by Yelp",
    moduleType: "award",
    author: "Yelp",
    category: "restaurants",
    businesses: [
      { id: "bar-sugo", name: "Bar Sugo", description: "Worth-the-wait red sauce gem for elite pies & bolognese", rating: 4.8, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0UcgtKJs_Yw_PioYVIAGz861MW2fUr8CSwHUrbqzOQkUzhCm1XHp7N_c&s=10" },
      { id: "lunch-lady", name: "Lunch Lady", description: "Hype Ossington spot serving upscale Vietnamese flavor bombs", rating: 4.6, imageUrl: "https://images.squarespace-cdn.com/content/v1/5e44592cc9053c29286d8beb/10ac2d33-6abe-443a-a654-704b4eef5a20/The+Lunch+Lady+of+Saigon+-+Photographer+Credit_+Sherman+Chong.jpg", videoUrl: "https://stream.mux.com/5SEiTxhqPnxIZFA95onukvkRio00KE01bHRD1HRlj699E/high.mp4" },
      { id: "maven", name: "Maven", description: "Contemporary Jewish comfort food in Harbord Village", rating: 4.8, imageUrl: "https://torontolife.mblycdn.com/uploads/tl/2024/11/toronto-restaurants-maven-jewish-eastern-european-harbord-village-spread.jpg" },
      { id: "famiglia-baldassarre", name: "Famiglia Baldassarre", description: "Cult-favorite fresh handmade pasta lunch spot", rating: 4.6, imageUrl: "https://canadas100best.com/wp-content/uploads/2024/05/FamigliaBaldassarre-2024-feat.jpg" },
      { id: "good-behaviour", name: "Good Behaviour", description: "Gourmet sub sandwiches and small-batch custard ice cream", rating: 4.8, imageUrl: "https://torontolife.mblycdn.com/uploads/tl/2021/03/GOODBEHAVIOUR_icecream6_resize.jpg" },
    ],
  },
];

export interface ServiceItem {
  id: string;
  title: string;
  contractor: string;
  imageUrl: string;
}

export const serviceItems: ServiceItem[] = [
  { id: "svc-japandi", title: "Japandi Perfection Found Here", contractor: "Homeview Reno", imageUrl: "https://i.pinimg.com/1200x/9c/ca/a6/9ccaa6394c364c262d5080a236508042.jpg" },
  { id: "svc-organic", title: "Organic Modern Finds a Home", contractor: "Oval Oak Renovations", imageUrl: "https://i.pinimg.com/1200x/28/19/f9/2819f9f3e3d0152579c1ea0cdf1e22eb.jpg" },
  { id: "svc-monochrome", title: "Monochromatic Makeover", contractor: "Global Contractors", imageUrl: "https://i.pinimg.com/1200x/c1/f0/0e/c1f00e2c734c0d42362a9592fbf8b331.jpg" },
  { id: "svc-earthy", title: "Earthy Serene Redesign", contractor: "Murdock Enterprise", imageUrl: "https://i.pinimg.com/1200x/3b/73/4e/3b734ec9aa2d1e658c6207964a687c01.jpg" },
  { id: "svc-minimal", title: "Peak Sleeky, Airy Minimalism", contractor: "Plumpton Sons Construction", imageUrl: "https://i.pinimg.com/1200x/3a/fa/a7/3afaa7f67e9e7acefbca1ca7f0bbbca4.jpg" },
];

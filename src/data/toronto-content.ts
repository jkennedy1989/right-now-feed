export interface ContentBusiness {
  name: string;
  rating: number;
  description: string;
  imageUrl: string;
  googleMapsUrl: string;
  location: { lat: number; lng: number };
  friendActivity?: string;
}

export type ModuleType = 'ranked-list' | 'list' | 'award-list' | 'celebrity-list' | 'guide' | 'friends-activity' | 'previously-saved' | 'single' | 'services';

export interface ContentModule {
  id: string;
  type: ModuleType;
  title: string;
  description: string;
  author: string;
  emoji: string;
  businesses: ContentBusiness[];
}

export const TORONTO_MODULES: ContentModule[] = 
[
  {
    "id": "module-0",
    "type": "ranked-list",
    "title": "Top 5 Iconic Toronto Dishes",
    "description": "Classics you have to try",
    "author": "Yelp",
    "emoji": "\ud83c\udf7d\ufe0f",
    "businesses": [
      {
        "name": "Poutine",
        "rating": 0,
        "description": "Adopted from Quebec, it became the ultimate late-night fuel for TO students.",
        "imageUrl": "https://platform.detroit.eater.com/wp-content/uploads/sites/13/chorus/uploads/chorus_asset/file/8545309/Smoke_s_Poutinerie.2.jpg?quality=90&strip=all&crop=0,10.732984293194,100,78.534031413613",
        "googleMapsUrl": "https://maps.app.goo.gl/B4iQHNwMjuDSTvcf9",
        "location": {
          "lat": 43.6519983,
          "lng": -79.4048188
        }
      },
      {
        "name": "Peameal Bacon Sandwich",
        "rating": 0,
        "description": "Born at St. Lawrence Market, it defines Hogtown's early meatpacking history.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStM8uj6GdeAvYbmZbXWvafp0psyChe2JykguzvkETd5FpAVP8K9pOcKzO6&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/CaNe8jCd5hsCv8vx6",
        "location": {
          "lat": 43.6657619,
          "lng": -79.4648335
        }
      },
      {
        "name": "Butter Chicken Roti",
        "rating": 0,
        "description": "Created in TO, fusing vibrant South Asian flavors with Caribbean roti shops.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGPqGKQiM1J-ydXdQcyMey6UEaUAcWnadMrW9ZyCNfVHLNTQlUlf5bFPde&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/TLLLEY1GfJXKvgys7",
        "location": {
          "lat": 43.6475509,
          "lng": -79.4031207
        }
      },
      {
        "name": "Sushi Pizza",
        "rating": 0,
        "description": "Invented by a Toronto chef in 1992, showcasing the city's dynamic food fusion.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVQ_LD-7CJpJZHhTTzLbyQcir126pmMxVwVpeQ2xefVsnvplpd8RqU3gQ&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/1vGDo579eUnYoXv27",
        "location": {
          "lat": 43.6497813,
          "lng": -79.38815980000001
        }
      },
      {
        "name": "Butter Tarts",
        "rating": 0,
        "description": "A classic Ontario pastry central to local bakeries and seasonal road trips.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwsTMK-hJ5aK5_qIlh6880NZ7ulbpaOSmKwXPrRT4SKNngNzr3auus8uXl&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/gbFNrxkdprdpePA5A",
        "location": {
          "lat": 43.6479598,
          "lng": -79.38239949999999
        }
      }
    ]
  },
  {
    "id": "module-1",
    "type": "list",
    "title": "Top Speakeasies & How to Get In",
    "description": "Special speakeasies and the secret to getting in",
    "author": "Toronto Life",
    "emoji": "\ud83d\udeaa",
    "businesses": [
      {
        "name": "Bar 404",
        "rating": 4.4,
        "description": "Tell the cashier at a faux candle shop you are there",
        "imageUrl": "https://404toronto.com/wp-content/uploads/2024/07/IMG_1788-scaled.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/9pYABHSNGjbAfzTA7",
        "location": {
          "lat": 43.6468626,
          "lng": -79.38971049999999
        }
      },
      {
        "name": "Bar After Seven",
        "rating": 4.4,
        "description": "Push through a fake vending machine inside a yogurt shop",
        "imageUrl": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH7o7V5u4Py4Lne7TfzxzgvWj2DMTpwQf0bbIYTCmYKzGwdkdr74hK2AS0aq8gi2mALduGHIr4Q452yEYNSZFnHyXJH5z_HzES0C3Yy56K0-rQoe14MYF6hL_E7G29wkx-P_Hzr=s1360-w1360-h1020-rw",
        "googleMapsUrl": "https://maps.app.goo.gl/96YgtsEue3RgeZZL7",
        "location": {
          "lat": 43.6515189,
          "lng": -79.390672
        }
      },
      {
        "name": "Cry Baby Gallery",
        "rating": 4.5,
        "description": "Walk through a secret door at the back of an art gallery",
        "imageUrl": "https://canadas100best.com/wp-content/uploads/2024/05/CryBabyGallery-2024-feat.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/BMZEJiv5MEXPVtLc7",
        "location": {
          "lat": 43.6497207,
          "lng": -79.4309869
        }
      },
      {
        "name": "Mahjong Bar",
        "rating": 4.2,
        "description": "Head to Dundas West and find the hidden pink bodega door",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2017/10/w1280/toronto-bars-mahjong-bar-cocktails-little-portugal-hidden-keyhole-door.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/CZThHbq9AMqHqtme8",
        "location": {
          "lat": 43.64956369999999,
          "lng": -79.4251249
        }
      },
      {
        "name": "Vatican Gift Shop",
        "rating": 4.3,
        "description": "Push past the religious souvenir shop's corner door",
        "imageUrl": "https://blogto-production2-baselayer-display.blogto.com/listings/20181005-VaticanGiftShop10.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto",
        "googleMapsUrl": "https://maps.app.goo.gl/9Ro4rHca3HwCtSmc7",
        "location": {
          "lat": 43.6689393,
          "lng": -79.3362819
        }
      }
    ]
  },
  {
    "id": "module-2",
    "type": "list",
    "title": "Top 5 Chinatown Dumplings",
    "description": "Top-rated Chinatown spots for handmade dumplings",
    "author": "Terrene H. (Elite)",
    "emoji": "\ud83e\udd5f",
    "businesses": [
      {
        "name": "Mother's Dumplings",
        "rating": 4.1,
        "description": "The undisputed classic. Incredible handmade, thick-skinned northern style.",
        "imageUrl": "https://stream.mux.com/Kcqoq3OiO13uvm4Fgp2L1AdnHBYvBN9005em401Y4F5uc/high.mp4",
        "googleMapsUrl": "https://maps.app.goo.gl/XCqKRjXm15KTVTgeA",
        "location": {
          "lat": 43.6571167,
          "lng": -79.3994361
        }
      },
      {
        "name": "Juicy Dumpling",
        "rating": 4.5,
        "description": "Fast, remarkably cheap, and always packed for a reason.",
        "imageUrl": "https://blogto-production2-baselayer-display.blogto.com/listings/20181008-JuicyDumplings1.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto",
        "googleMapsUrl": "https://maps.app.goo.gl/s7KQNC7FcSQTDnzE6",
        "location": {
          "lat": 43.6525773,
          "lng": -79.3987057
        }
      },
      {
        "name": "Dumpling House Restaurant",
        "rating": 4.1,
        "description": "A cozy, no-nonsense gem right on the Spadina strip.",
        "imageUrl": "https://blogto-production2-baselayer-display.blogto.com/listings/20210903-DumplingHouse7.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto",
        "googleMapsUrl": "https://maps.app.goo.gl/5yDZwgUz14zqSthd6",
        "location": {
          "lat": 43.6538027,
          "lng": -79.3986812
        }
      },
      {
        "name": "Rol San Restaurant",
        "rating": 4.0,
        "description": "Iconic Chinatown mainstay famous for all-day dim sum.",
        "imageUrl": "https://stream.mux.com/gYVlDB8XIjDVK9o4wBa7xJ02CYrp56x00L6rdSChIMzS00/high.mp4",
        "googleMapsUrl": "https://maps.app.goo.gl/VFaPmt3aa3iUWX4h6",
        "location": {
          "lat": 43.6554704,
          "lng": -79.3994153
        }
      },
      {
        "name": "Swatow Restaurant",
        "rating": 4.2,
        "description": "Late-night legendary institution that has fed generations",
        "imageUrl": "https://tb-static.uber.com/prod/image-proc/processed_images/b4d775b9ed0d41763f611d416c7e3d25/8a42ee7a692dfa4155879820804a277f.jpeg",
        "googleMapsUrl": "https://maps.app.goo.gl/kVtDdurMd7odTBzm6",
        "location": {
          "lat": 43.653836,
          "lng": -79.3981091
        }
      }
    ]
  },
  {
    "id": "module-3",
    "type": "list",
    "title": "Eats under $20",
    "description": "Top spots for quick, budget-friendly meals",
    "author": "",
    "emoji": "\ud83d\udcb0",
    "businesses": [
      {
        "name": "Loga\u2019s Corner",
        "rating": 4.7,
        "description": "Steaming 10-piece order of beef momos ($9)",
        "imageUrl": "https://s3-media0.fl.yelpcdn.com/bphoto/cRVFnVkUlSKkw4EfzCYr7w/o.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/aZEp8mKF9zSogGY58",
        "location": {
          "lat": 43.6404185,
          "lng": -79.4359673
        }
      },
      {
        "name": "Banh Mi Nguyen Hong",
        "rating": 4.4,
        "description": "Assorted Cold Cut Banh Mi ($13)",
        "imageUrl": "https://tb-static.uber.com/prod/image-proc/processed_images/57d5eb1b6530412f9fa486a06b57cf04/50446f64f31cbefe66558fc47f50a9d6.jpeg",
        "googleMapsUrl": "https://maps.app.goo.gl/Cq7HWsUY9T27XATD6",
        "location": {
          "lat": 43.6537025,
          "lng": -79.3986604
        }
      },
      {
        "name": "Burger Drops",
        "rating": 4.6,
        "description": "Single Smashburger ($9.50) side of curly fries ($6.50)",
        "imageUrl": "https://blogto-production2-baselayer-display.blogto.com/uploads/2020/10/13/1602609339-20201009-BurgerDrops8.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/FK97hVN26uWt635V7",
        "location": {
          "lat": 43.6395249,
          "lng": -79.4213106
        }
      },
      {
        "name": "Tropical Joe\u2019s",
        "rating": 4.6,
        "description": "Massive Jerk Chicken Meal ($15)",
        "imageUrl": "https://blogto-production2-baselayer-display.blogto.com/listings/20192103-TropicalJoes-9.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto",
        "googleMapsUrl": "https://maps.app.goo.gl/YbacBUNDhP1KJUJu6",
        "location": {
          "lat": 43.6698852,
          "lng": -79.3755173
        }
      },
      {
        "name": "Sang-Ji Fried Bao",
        "rating": 4.5,
        "description": "4-piece Shanghai Style Pan-Fried Pork Baos ($8)",
        "imageUrl": "https://i.cbc.ca/ais/1.6395267,1648076592000/full/max/0/default.jpg?im=Crop%2Crect%3D%280%2C0%2C1200%2C800%29%3BResize%3D1280",
        "googleMapsUrl": "https://maps.app.goo.gl/z1quNFXuhPV8Xvzh6",
        "location": {
          "lat": 43.7776181,
          "lng": -79.414684
        }
      }
    ]
  },
  {
    "id": "module-4",
    "type": "award-list",
    "title": "Michelin on a Dime",
    "description": "Michelin-recommended spots for affordable dining",
    "author": "Michelin Guide",
    "emoji": "\ud83d\udcb8",
    "businesses": [
      {
        "name": "Mhel",
        "rating": 4.5,
        "description": "Korean-Japanese eats, classic vinyl tunes",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2023/11/w2560/toronto-restaurants-mhel-japanese-korean-bloorcourt-dashi-scaled.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/pbVtK9ZFbHtceA6H9",
        "location": {
          "lat": 43.6601852,
          "lng": -79.43243489999999
        }
      },
      {
        "name": "Bar Raval",
        "rating": 4.4,
        "description": "Gorgeous carved wood standing only bar",
        "imageUrl": "https://stream.mux.com/S01RxN8OAIAObGQKwQwsa007WrNR2UC02DOYOOAse27Qfk/high.mp4",
        "googleMapsUrl": "https://maps.app.goo.gl/yMnp9nf2C1VCwZTy7",
        "location": {
          "lat": 43.6558235,
          "lng": -79.40991489999999
        }
      },
      {
        "name": "Sunny\u2019s Chinese",
        "rating": 4.4,
        "description": "Bold, regional Chinese eats hidden deep inside a neon-lit mall",
        "imageUrl": "https://sunnyschinese.com/cdn/shop/files/027_SUNNY_Schinese_Gabriel_Li_3785GL.jpg?v=1665619393&width=2048",
        "googleMapsUrl": "https://maps.app.goo.gl/RGrCVGqqTzLsS88w6",
        "location": {
          "lat": 43.6542118,
          "lng": -79.4009609
        }
      },
      {
        "name": "BB\u2019s",
        "rating": 4.3,
        "description": "Vibrant pastel vibes and epic Filipino brunch",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2022/04/w2560/BBsDINER10.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/SEXWVxLrvMjrRes77",
        "location": {
          "lat": 43.6419944,
          "lng": -79.43240329999999
        }
      },
      {
        "name": "White Lily Diner",
        "rating": 4.7,
        "description": "Next-level scratch-made diner classics",
        "imageUrl": "https://stream.mux.com/Mn2JcZJ2fFEkWs3NEyMR2YtXacY1VUi8tjb49gXnqX8/high.mp4",
        "googleMapsUrl": "https://maps.app.goo.gl/NmTQwZm6Vb5PndA97",
        "location": {
          "lat": 43.6588111,
          "lng": -79.3511779
        }
      }
    ]
  },
  {
    "id": "module-5",
    "type": "award-list",
    "title": "Michelin-Starred",
    "description": "Must-try Michelin-starred spots you can\u2019t miss",
    "author": "Michelin Guide",
    "emoji": "\u2b50",
    "businesses": [
      {
        "name": "Sushi Masaki Saito",
        "rating": 4.6,
        "description": "Insane multi-course high-end sushi",
        "imageUrl": "https://canadas100best.com/wp-content/uploads/2024/05/Sushi-Masaki-Saito-2024-feat.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/K7be4LBiggGwd8rV8",
        "location": {
          "lat": 43.6722929,
          "lng": -79.39582089999999
        }
      },
      {
        "name": "Alo",
        "rating": 4.6,
        "description": "Flawless French-inspired tasting menu",
        "imageUrl": "https://stream.mux.com/P901iAl23GQiy1GUMcwrePQy02i4SP3wrbj4Ud01zD6WlI/high.mp4",
        "googleMapsUrl": "https://maps.app.goo.gl/aUPJYGGoFvZXweak9",
        "location": {
          "lat": 43.6484905,
          "lng": -79.39594149999999
        }
      },
      {
        "name": "Edulis",
        "rating": 4.6,
        "description": "Cozy hidden gem for seasonal plates",
        "imageUrl": "https://canadas100best.com/wp-content/uploads/2026/04/Edulis-Toronto-2026-Canadas100Best-1-610x813.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/mzbrJb9etG1s9JF56",
        "location": {
          "lat": 43.6419583,
          "lng": -79.4065778
        }
      },
      {
        "name": "Quetzal",
        "rating": 4.6,
        "description": "Almost everything cooked over live fire",
        "imageUrl": "https://stream.mux.com/a8weluSjuSY00b101g01h7WHneSm4hqAkWp2C6jg4uVek8/high.mp4",
        "googleMapsUrl": "https://maps.app.goo.gl/hyoEWRtMoaAkS81B6",
        "location": {
          "lat": 43.65633810000001,
          "lng": -79.4068264
        }
      },
      {
        "name": "aKin",
        "rating": 4.7,
        "description": "Wildly creative modern Chinese tasting.",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2024/12/w2560/toronto-restaurants-akin-st-lawrence-congee.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/wc4Wt7nXXvgSHoSJ9",
        "location": {
          "lat": 43.6489723,
          "lng": -79.3747873
        }
      }
    ]
  },
  {
    "id": "module-6",
    "type": "award-list",
    "title": "Yelp\u2019s Top 10",
    "description": "Top 10 Toronto spots as picked by Yelp",
    "author": "Yelp",
    "emoji": "\ud83e\udd47",
    "businesses": [
      {
        "name": "Bar Sugo",
        "rating": 4.8,
        "description": "Worth-the-wait red sauce gem for elite pies & bolognese",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0UcgtKJs_Yw_PioYVIAGz861MW2fUr8CSwHUrbqzOQkUzhCm1XHp7N_c&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/LzqBoE4cdR7dvmx26",
        "location": {
          "lat": 43.6583303,
          "lng": -79.4423637
        }
      },
      {
        "name": "Lunch Lady",
        "rating": 4.6,
        "description": "Hype Ossington spot serving upscale Vietnamese flavor bombs",
        "imageUrl": "https://stream.mux.com/5SEiTxhqPnxIZFA95onukvkRio00KE01bHRD1HRlj699E/high.mp4",
        "googleMapsUrl": "https://maps.app.goo.gl/VSMExRx2WFg6vXPp6",
        "location": {
          "lat": 43.6462872,
          "lng": -79.4194612
        }
      },
      {
        "name": "Maven",
        "rating": 4.8,
        "description": "Contemporary Jewish comfort food in Harbord Village",
        "imageUrl": "https://torontolife.mblycdn.com/uploads/tl/2024/11/toronto-restaurants-maven-jewish-eastern-european-harbord-village-spread.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/5P4Y7xc3yGRriDsv6",
        "location": {
          "lat": 43.662852,
          "lng": -79.403746
        }
      },
      {
        "name": "Famiglia Baldassarre",
        "rating": 4.6,
        "description": "Cult-favorite fresh handmade pasta lunch spot",
        "imageUrl": "https://canadas100best.com/wp-content/uploads/2024/05/FamigliaBaldassarre-2024-feat.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/U11YA3kR9Fq4WUEf6",
        "location": {
          "lat": 43.6704531,
          "lng": -79.4349792
        }
      },
      {
        "name": "Good Behaviour",
        "rating": 4.8,
        "description": "Gourmet sub sandwiches and small-batch custard ice cream",
        "imageUrl": "https://torontolife.mblycdn.com/uploads/tl/2021/03/GOODBEHAVIOUR_icecream6_resize.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/5YTbtQqHBoms9V6p6",
        "location": {
          "lat": 43.6494377,
          "lng": -79.3920668
        }
      }
    ]
  },
  {
    "id": "module-7",
    "type": "list",
    "title": "Kensington Market Tacos",
    "description": "Must-try taco spots in Kensington Market",
    "author": "",
    "emoji": "\ud83c\udf2e",
    "businesses": [
      {
        "name": "Seven Lives Tacos y Mariscos",
        "rating": 4.6,
        "description": "Legendary market staple: massive, iconic Baja fish tacos.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb_OAdP_1Ox7pJ4_r7i-mz2ZaV14QvM5tAt31Vg-Qbxf1S_QI6F0VIDBMV&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/r3VZEvcwSAj8cbav9",
        "location": {
          "lat": 43.6544782,
          "lng": -79.4008249
        }
      },
      {
        "name": "Gus Tacos",
        "rating": 4.5,
        "description": "Casual neighborhood favorite: stellar handmade tortillas.",
        "imageUrl": "https://gustacos.com/wp-content/uploads/2024/05/Untitled-design.png",
        "googleMapsUrl": "https://maps.app.goo.gl/rZyK5XP88iJEAWVk8",
        "location": {
          "lat": 43.6543632,
          "lng": -79.4018301
        }
      },
      {
        "name": "Tacos 101 and Fruta Libre",
        "rating": 4.4,
        "description": "Vibrant Baldwin spot: incredible al pastor with pineapple.",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2021/07/w1280/TACOS101_15.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/CeVQpTJZhEL8fAEn9",
        "location": {
          "lat": 43.6548196,
          "lng": -79.400876
        }
      },
      {
        "name": "La Chilaca Taqueria",
        "rating": 4.5,
        "description": "Hidden inside the mall: amazing street-style carnitas.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIQlSCW0lgeYZZDS9zck-N2yxrJgedzH7GH7F37A2Qb46N6hwphZf64JGi&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/nh8YYox8Mhoa3f9q9",
        "location": {
          "lat": 43.6546767,
          "lng": -79.4023373
        }
      },
      {
        "name": "El Trompo",
        "rating": 4.4,
        "description": "Bustling Augusta patio: classic tacos and great margaritas.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWUuvq-blNcGtmsBtzJk2fR0LmcMkcyNJtPznv26JUlShYwT9jDd8ikQw&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/8fqS3X6H2X9zXcit7",
        "location": {
          "lat": 43.6558485,
          "lng": -79.4024282
        }
      }
    ]
  },
  {
    "id": "module-8",
    "type": "list",
    "title": "Ossington Bakeries Worth It",
    "description": "Must-visit Ossington bakeries for croissants and sweets",
    "author": "Brian S. (Bakery Expert)",
    "emoji": "\ud83e\udd50",
    "businesses": [
      {
        "name": "Dear Grain",
        "rating": 4.6,
        "description": "Worth it: Classic Sourdough Croissant",
        "imageUrl": "https://s3-media0.fl.yelpcdn.com/bphoto/AWyEyb780jy11eCaHay4iw/o.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/hDfWqqSrJeViLAqNA",
        "location": {
          "lat": 43.645292,
          "lng": -79.4194131
        }
      },
      {
        "name": "Cuervo y Marquis",
        "rating": 4.4,
        "description": "Worth it: Kouign-Amann",
        "imageUrl": "https://blogto-production2-baselayer-display.blogto.com/uploads/2024/04/19/1713541663-20240123-CuervoYMarquis-10.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/XGj3ecgvzHzT2HW79",
        "location": {
          "lat": 43.64719059999999,
          "lng": -79.4201365
        }
      },
      {
        "name": "Bang Bang Ice Cream & Bakery",
        "rating": 4.6,
        "description": "Worth it: Everything Cookie ice cream sandwich",
        "imageUrl": "https://images.happycow.net/venues/1024/58/54/hcmp58542_2145239.jpeg",
        "googleMapsUrl": "https://maps.app.goo.gl/hg1JcvAqVEdaDAwK7",
        "location": {
          "lat": 43.6462759,
          "lng": -79.4194492
        }
      },
      {
        "name": "La Boulangerie",
        "rating": 4.6,
        "description": "Worth it: Classic Pain au Chocolat",
        "imageUrl": "https://popmenucloud.com/cdn-cgi/image/width=1920,height=1920,format=auto,fit=scale-down/oufpimxd/7f031138-3672-4783-aa81-bfa05916d4c9.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/6Aak3eVyiF34ouWTA",
        "location": {
          "lat": 43.6495264,
          "lng": -79.4204148
        }
      },
      {
        "name": "Sugar Daddy Doughnuts",
        "rating": 4.6,
        "description": "Worth it: made-to-order Mini Doughnuts & Dunkaroo Dip",
        "imageUrl": "https://blogto-production2-baselayer-display.blogto.com/listings/20231005-SugarDaddyDonuts-13.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto",
        "googleMapsUrl": "https://maps.app.goo.gl/Q6dr225EtuSqVaRHA",
        "location": {
          "lat": 43.6492987,
          "lng": -79.42296619999999
        }
      }
    ]
  },
  {
    "id": "module-9",
    "type": "list",
    "title": "Cool Indie Movie Theatres",
    "description": "Explore the city\u2019s iconic, historic indie theaters",
    "author": "Yelp",
    "emoji": "\ud83c\udf7f",
    "businesses": [
      {
        "name": "Revue Cinema",
        "rating": 4.7,
        "description": "Canada's oldest standing cinema",
        "imageUrl": "https://static.where-e.com/Canada/Ontario/Toronto/Cinema-Review_7ecd6a9fd8973274c9d6eeac56f32ba2.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/gqdH24F4963GSW9t5",
        "location": {
          "lat": 43.6510959,
          "lng": -79.4510567
        }
      },
      {
        "name": "Fox Theatre",
        "rating": 4.7,
        "description": "City's oldest continuously running cinema",
        "imageUrl": "https://www.torontojourney416.com/wp-content/uploads/2022/04/fox-theatre-2025-1024x768.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/CKxagGArhPY377Lm9",
        "location": {
          "lat": 43.672886,
          "lng": -79.2873109
        }
      },
      {
        "name": "Paradise Theatre",
        "rating": 4.8,
        "description": "Stunning restored 1937 Art Deco gem",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2019/12/900x900/TS_Paradise-49.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/FozSJcmaL8mkY5Zr7",
        "location": {
          "lat": 43.6611596,
          "lng": -79.43072889999999
        }
      },
      {
        "name": "The Royal",
        "rating": 4.6,
        "description": "Hosts live comedy, indies, and Q&As",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f2/The_Royal_in_Little_Italy_2023.JPG",
        "googleMapsUrl": "https://maps.app.goo.gl/GaDQ9s2h2gV6DT7X9",
        "location": {
          "lat": 43.6552077,
          "lng": -79.4144814
        }
      },
      {
        "name": "Carlton Cinema",
        "rating": 4.4,
        "description": "Underground hub playing offbeat indies",
        "imageUrl": "https://www.torontojourney416.com/wp-content/uploads/2022/04/carlton-cinema-2020-785x1024.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/sxDrzorg3eqCQihz6",
        "location": {
          "lat": 43.6615227,
          "lng": -79.3815788
        }
      }
    ]
  },
  {
    "id": "module-10",
    "type": "list",
    "title": "Architectural Gems",
    "description": "Toronto's most iconic architectural landmarks and buildings",
    "author": "Yelp",
    "emoji": "\ud83c\udfdb\ufe0f",
    "businesses": [
      {
        "name": "Allen Lambert Galleria",
        "rating": 4.6,
        "description": "Breathtaking, soaring white steel arches",
        "imageUrl": "https://live.staticflickr.com/3633/3313191718_952701809a_c.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/quGHL2k4pYvz8cvi6",
        "location": {
          "lat": 43.6471109,
          "lng": -79.37813709999999
        }
      },
      {
        "name": "Gooderham Building",
        "rating": 4.6,
        "description": "Striking, narrow red-brick wedge shape",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Gooderham_Building%2C_Toronto%2C_East_view_20170417_1.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/cci9A26KXXnMZkc97",
        "location": {
          "lat": 43.6483816,
          "lng": -79.374301
        }
      },
      {
        "name": "Royal Ontario Museum",
        "rating": 4.7,
        "description": "Dramatic, sharp glass shards hit heritage",
        "imageUrl": "https://images.adsttc.com/media/images/65e1/154f/d898/3c7e/7fa8/2de5/newsletter/hariri-pontarini-architects-unveil-royal-ontario-museum-transformation_8.jpg?1709249883",
        "googleMapsUrl": "https://maps.app.goo.gl/JUNUjJzuCwWxkVn58",
        "location": {
          "lat": 43.6677097,
          "lng": -79.3947771
        }
      },
      {
        "name": "Art Gallery of Ontario",
        "rating": 4.7,
        "description": "Gorgeous, massive curved wood-and-glass hull",
        "imageUrl": "https://d1l57x9nwbbkz.cloudfront.net/files/s3fs-public/styles/article_masthead/public/2026-02/interior-atrium-art-gallery-ontario.jpg.webp?VersionId=Xr8v4gFiqlXqwdLFTL.KLkLZ_aGKCgj_&h=09424e2b&itok=rN2Mzza-",
        "googleMapsUrl": "https://maps.app.goo.gl/LTBHuphe6vfJ77e36",
        "location": {
          "lat": 43.6536066,
          "lng": -79.39251229999999
        }
      },
      {
        "name": "Toronto City Hall",
        "rating": 4.4,
        "description": "Futuristic, twin curved concrete towers",
        "imageUrl": "https://live.staticflickr.com/65535/52100261328_1543c7ea6d_b.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/tq9aKyBHbNBuqkg59",
        "location": {
          "lat": 43.6534399,
          "lng": -79.3840901
        }
      }
    ]
  },
  {
    "id": "module-11",
    "type": "list",
    "title": "Nature Escapes in the city",
    "description": "Discover Toronto's lush ravines and serene nature walks",
    "author": "Catherine B. (Elite)",
    "emoji": "\ud83c\udf32",
    "businesses": [
      {
        "name": "Moore Park Ravine",
        "rating": 4.6,
        "description": "Gorgeous snake through canopy of ancient trees",
        "imageUrl": "https://blogto-production2-baselayer-display.blogto.com/uploads/2018/09/22/20180921-moore-park-ravine-8.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/5zeyAWjKFivork4S9",
        "location": {
          "lat": 43.6946806,
          "lng": -79.3803306
        }
      },
      {
        "name": "Glen Stewart Ravine",
        "rating": 4.7,
        "description": "Like a miniature, forested Narnia",
        "imageUrl": "https://photos.smugmug.com/Canada/Ontario/Toronto-Hiking-Trails-2020/i-xHscKLR/1/XL/Toronto-GlenStewartPark05-XL.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/J4ZSrgezBsJv6ircA",
        "location": {
          "lat": 43.6777062,
          "lng": -79.2933318
        }
      },
      {
        "name": "Cedarvale Ravine",
        "rating": 4.7,
        "description": "Scenic trail through a protected wetland",
        "imageUrl": "https://bloximages.newyork1.vip.townnews.com/toronto.com/content/tncms/assets/v3/editorial/f/ab/fab5c676-2221-57ee-bac5-f7314618c109/63d8871963556.image.jpg?resize=374%2C500",
        "googleMapsUrl": "https://maps.app.goo.gl/23YrdWiSveVY2Aua7",
        "location": {
          "lat": 43.690158,
          "lng": -79.4223949
        }
      },
      {
        "name": "Sherwood Park",
        "rating": 4.7,
        "description": "Boardwalks trail through 150-year-old trees",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeWLvGrUCG23q7H23EU_6e9LWG1KNTjfUy1kKK2-MYefs-AcBtNPM47wBD&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/gLwPNxfocsxwStWH9",
        "location": {
          "lat": 43.7143309,
          "lng": -79.3944199
        }
      },
      {
        "name": "Rosedale Ravine Trail",
        "rating": 4.5,
        "description": "Hidden staircase drops you into a tranquil, forest floor",
        "imageUrl": "https://static01.nyt.com/images/2024/10/19/travel/09toronto-ravines-mjfq/09toronto-ravines-mjfq-mediumSquareAt3X.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/f7GMTZmTihX1wLbs9",
        "location": {
          "lat": 43.6727384,
          "lng": -79.3751052
        }
      }
    ]
  },
  {
    "id": "module-12",
    "type": "celebrity-list",
    "title": "Bourdain\u2019s Toronto Faves",
    "description": "Anthony Bourdain\u2019s favorite local destinations",
    "author": "",
    "emoji": "\ud83d\udc68\u200d\ud83c\udf73",
    "businesses": [
      {
        "name": "Carousel Bakery",
        "rating": 4.0,
        "description": "Tony\u2019s go-to for peameal bacon sandwiches and butter tarts",
        "imageUrl": "https://wellfedfoodieblog.wordpress.com/wp-content/uploads/2019/07/peameal.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/K7ouEQgiP6TtnaWCA",
        "location": {
          "lat": 43.6486864,
          "lng": -79.3717956
        }
      },
      {
        "name": "Porchetta & Co.",
        "rating": 3.9,
        "description": "Tony was a fan of the incredible porchetta \u2013 juicy meat with ultra-crispy skin.",
        "imageUrl": "https://porchettaco.com/wp-content/uploads/sb-instagram-feed-images/441889886_18437053786048472_6007855991753966054_nfull.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/1RZ9SczKwLNfG2nc9",
        "location": {
          "lat": 43.6484319,
          "lng": -79.3828456
        }
      },
      {
        "name": "Drake Hotel",
        "rating": 4.3,
        "description": "Tony\u2019s top pick for catching live music and boutique hotel and arts culture",
        "imageUrl": "https://thedrake.ca/uploads/2025/03/TDH_FACADE_423-scaled.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/4N5M2azzQC6cHFBH7",
        "location": {
          "lat": 43.6432497,
          "lng": -79.4246963
        }
      },
      {
        "name": "WVRST",
        "rating": 4.5,
        "description": "Tony praised the no-fuss, communal beer-hall atmosphere.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrORG7BxEUQ3KqvEX2r2iVqppweVGKCyXg01KAg_F8IZ2Ijstu4g-7yTf&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/5otFNaNjSyEZJrgbA",
        "location": {
          "lat": 43.6441663,
          "lng": -79.40072099999999
        }
      }
    ]
  },
  {
    "id": "module-13",
    "type": "celebrity-list",
    "title": "Drake\u2019s Hometown Haunts",
    "description": "Iconic Toronto spots favored by hometown legend Drake",
    "author": "",
    "emoji": "\ud83c\udf41",
    "businesses": [
      {
        "name": "Ristorante Sotto Sotto",
        "rating": 4.3,
        "description": "Go-to for traditional Roman-Italian fare",
        "imageUrl": "https://sottosotto.ca/wp-content/uploads/2021/03/SOTTO-MAY-29-NEW-MENU-DINADSC09883-1-scaled-2-wide.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/ksrSof3Z3junCtx77",
        "location": {
          "lat": 43.6734814,
          "lng": -79.3963052
        }
      },
      {
        "name": "Joso's",
        "rating": 4.7,
        "description": "Famously graced the cover of his 2011 album",
        "imageUrl": "https://resizer.otstatic.com/v3/photos/25150940-1",
        "googleMapsUrl": "https://maps.app.goo.gl/ofcwVKD74QhW1ggSA",
        "location": {
          "lat": 43.6749958,
          "lng": -79.39603749999999
        }
      },
      {
        "name": "Spin",
        "rating": 4.4,
        "description": "Drake\u2019s spot for sharpening his table tennis kills",
        "imageUrl": "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/toronto/DSC03696-1-_5FACEB61-A544-4494-AAB96E21470F613A_7f0bca80-cee0-41f1-acd01471c0ded948.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/Dx7TfVBNwceyKoP98",
        "location": {
          "lat": 43.6444688,
          "lng": -79.3961022
        }
      },
      {
        "name": "Sher Club",
        "rating": 4.3,
        "description": "Drake\u2019s own exclusive club set inside the ACC",
        "imageUrl": "https://assets3.sportsnet.ca/wp-content/uploads/2015/05/sherclub.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/warvGwDmn5obLbSK9",
        "location": {
          "lat": 43.6438987,
          "lng": -79.3794719
        }
      },
      {
        "name": "New Ho King",
        "rating": 3.8,
        "description": "Famously featured in Drake and Kendrick \u201cbeef\u201d songs",
        "imageUrl": "https://i.guim.co.uk/img/media/890ca0c8552158813859e03eeb1f293eed1e5766/0_136_7933_4762/master/7933.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3e8a4f2828d4ccd7e8a43548112de5fe",
        "googleMapsUrl": "https://maps.app.goo.gl/ApWaY43E2VqJ5abt8",
        "location": {
          "lat": 43.6561548,
          "lng": -79.3996914
        }
      }
    ]
  },
  {
    "id": "module-14",
    "type": "previously-saved",
    "title": "Check off your wishlist \u2728",
    "description": "Grab a spot at one of your wishlist spots",
    "author": "",
    "emoji": "",
    "businesses": [
      {
        "name": "Seahorse",
        "rating": 4.7,
        "description": "Cozy station spot: great vibe, fresh seafood & oysters.",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2025/12/w1280/toronto-restaurants-seahorse-summerhill-seafood-fish.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/fatzw8CUUTVrFmMZ7",
        "location": {
          "lat": 43.6823145,
          "lng": -79.3919954
        }
      },
      {
        "name": "Brasserie C\u00f4te",
        "rating": 4.7,
        "description": "Lively Annex tavern: Parisian vibe, steak & classic sauces.",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2026/03/w2560/toronto-restaurants-brasserie-cote-french-annex-spread.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/RM4GfMaHfQNMheWc9",
        "location": {
          "lat": 43.66605209999999,
          "lng": -79.40776029999999
        }
      },
      {
        "name": "PUNCH",
        "rating": 4.6,
        "description": "Ritzy spot: playful Indo-British vibe & butter chicken pies.",
        "imageUrl": "https://punchtoronto.com/wp-content/uploads/2025/09/250909_Le_Germain_0091-2-1024x683.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/ioPVmLC9YpHEpR3q9",
        "location": {
          "lat": 43.6458563,
          "lng": -79.3909517
        }
      },
      {
        "name": "The Onda",
        "rating": 5.0,
        "description": "Intimate counter: lively party vibe & 20-course Korean omakase.",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2026/03/w2560/toronto-restaurants-the-onda-japanese-korean-omakase-fish-closeup.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/to1zzPeJBBEfrM9d9",
        "location": {
          "lat": 43.6813993,
          "lng": -79.4281209
        }
      },
      {
        "name": "Radici Project",
        "rating": 4.9,
        "description": "Cozy Little Italy gem: family vibe & cacio e pepe takoyaki.",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2025/05/w2560/toronto-restaurants-radici-project-italian-japanese-little-italy-spread.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/ZD3Xnkxdxg7iTJkU9",
        "location": {
          "lat": 43.6553998,
          "lng": -79.4135591
        }
      },
      {
        "name": "SAMMARCO",
        "rating": 4.6,
        "description": "Sleek, opulent St. Lawrence spot: 60-day dry-aged steaks.",
        "imageUrl": "https://axwwgrkdco.cloudimg.io/v7/__gmpics3__/9e7c598ecfe74df59cb9dd9daa0f94df.jpeg?w=1100&h=1100&org_if_sml=1",
        "googleMapsUrl": "https://maps.app.goo.gl/sPpvG429gRf3Z8cS9",
        "location": {
          "lat": 43.64753,
          "lng": -79.3764351
        }
      },
      {
        "name": "Mozy\u2019s",
        "rating": 4.9,
        "description": "Liberty Village counter: live-fire vibe & charcoal chicken.",
        "imageUrl": "https://sharpmagazine.com/wp-content/uploads/2026/02/Mozys-Credit-Exceptional-Films-2-2026-Grilled-Chicken.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/wnx3BbsJmLUUwU149",
        "location": {
          "lat": 43.639447,
          "lng": -79.421232
        }
      }
    ]
  },
  {
    "id": "module-15",
    "type": "list",
    "title": "Latest from Friends \ud83d\udc9b",
    "description": "See what your friends are up to",
    "author": "",
    "emoji": "",
    "businesses": [
      {
        "name": "Hopper\u2019s Hut",
        "rating": 3.9,
        "description": "Casual Ellesmere spot: hoppers & banana-leaf lamprais.",
        "imageUrl": "https://tb-static.uber.com/prod/image-proc/processed_images/100e44658938965e507934aad4b1ee79/fb86662148be855d931b37d6c1e5fcbe.jpeg",
        "googleMapsUrl": "https://maps.app.goo.gl/MykJWpq7bvJnKJcX9",
        "location": {
          "lat": 43.7669411,
          "lng": -79.2825063
        },
        "friendActivity": "Jamie R. left a 4-star review"
      },
      {
        "name": "Torter\u00eda San Cosme",
        "rating": 4.2,
        "description": "Kensington Market spot: vibrant vibe & elevated CDMX tortas.",
        "imageUrl": "https://assets.bonappetit.com/photos/59edfff383b5a033fb6b9b7f/16:9/w_2240,c_limit/TORTERIASANCOSME_LEAD_TorontoCityGuide.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/dDbiD3kj91jBiDSaA",
        "location": {
          "lat": 43.6457685,
          "lng": -79.38979669999999
        },
        "friendActivity": "Richard R. bookmarked this"
      },
      {
        "name": "Manpuku Modern Japanese Eatery",
        "rating": 4.5,
        "description": "Bustling downtown food court spot: $8.30 curry beef udon.",
        "imageUrl": "https://cdn.corner.inc/place-photo/AUacShhs4fskWn6Env8jaXjr3TCBdu-n3FOjq_ZyO12j4gUFogNTcLTK_YaXpwLIP7zmop3JPCbeITi_kml2hB82zjQE8nUleKNMIfOlykg3AH9H4b-8PU33PKX8RuRMGO_nJ7I0CS_rQbu9rYOC65oBbnUu4VBR0NxP4btiCJpw-tOPyJW_.jpeg",
        "googleMapsUrl": "https://maps.app.goo.gl/WdQYBwy7wqnqu4eVA",
        "location": {
          "lat": 43.653698,
          "lng": -79.390967
        },
        "friendActivity": "Pita S. bookmarked this"
      },
      {
        "name": "Itacate",
        "rating": 4.5,
        "description": "St. Clair West counter: casual vibe & $8 steak Volcans.",
        "imageUrl": "https://michaeleats.com/wp-content/uploads/2024/11/ita1.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/ZQjhJESkFJdjnJ7V7",
        "location": {
          "lat": 43.6794276,
          "lng": -79.4372021
        },
        "friendActivity": "Ida I. posted a photo"
      },
      {
        "name": "Banh Mi Huy-Ky",
        "rating": 4.7,
        "description": "No-frills, cash-only gem: $5 lemongrass-garlic pork b\u00e1nh m\u00ec.",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2024/02/w2560/CHEAP_EATS_bahmi.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/CjcCgw1wkwb3nKNG9",
        "location": {
          "lat": 43.6691575,
          "lng": -79.336406
        },
        "friendActivity": "Spencer R. has been here"
      }
    ]
  },
  {
    "id": "module-16",
    "type": "list",
    "title": "Moody Wine Bars",
    "description": "Toronto's top moody and intimate wine bars",
    "author": "",
    "emoji": "\ud83c\udf77",
    "businesses": [
      {
        "name": "Bar Piquette",
        "rating": 4.5,
        "description": "Cozy, candlelit Queen West hub: amazing skin-contact bottles.",
        "imageUrl": "https://images.squarespace-cdn.com/content/v1/69a6ac2cb8d9b86e02492c77/3a3c9544-ff5b-4c8b-a736-ca763cd4b702/879CB8C7-3A44-4CAB-813E-64D9D0193249.jpeg",
        "googleMapsUrl": "https://maps.app.goo.gl/stHchgqwGnYiHPN6A",
        "location": {
          "lat": 43.6436898,
          "lng": -79.421971
        }
      },
      {
        "name": "Archive Wine Bar",
        "rating": 4.6,
        "description": "Snug, dim Dundas West gem: incredible European small plates.",
        "imageUrl": "https://images.squarespace-cdn.com/content/v1/50fc4658e4b000014e7a4304/1735832214078-TRBOUKU54D9ZKJ75ANDS/Archive_Toronto-1662.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/LWcSQ9EDCRRWc25o9",
        "location": {
          "lat": 43.6508867,
          "lng": -79.4124614
        }
      },
      {
        "name": "Paris Paris",
        "rating": 3.9,
        "description": "Lively Ossington favorite: great energy and bottles by the glass.",
        "imageUrl": "https://blogto-production2-baselayer-display.blogto.com/uploads/2018/03/09/20180308-2048-ParisParis6.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/19WUUSbWEV5Ja7tz6",
        "location": {
          "lat": 43.6473659,
          "lng": -79.4203792
        }
      },
      {
        "name": "Grape Witches",
        "rating": 4.6,
        "description": "Moody, artistic space: wild and dynamic natural wine pours.",
        "imageUrl": "https://www.waterworksfoodhall.com/_next/image?url=https%3A%2F%2Fadmin.waterworksfoodhall.com%2Fwp-content%2Fuploads%2F2024%2F04%2FInterior-Shot.jpg&w=3840&q=75",
        "googleMapsUrl": "https://maps.app.goo.gl/niiC2PVKBoPy7A7BA",
        "location": {
          "lat": 43.64922259999999,
          "lng": -79.4238226
        }
      },
      {
        "name": "Paradise Grapevine",
        "rating": 4.5,
        "description": "Low-key Bloor Court staple: fantastic local cider and wine taps.",
        "imageUrl": "https://paradisegrapevine.com/cdn/shop/files/paradise_grapevine_patio_toronto_2.jpg?v=1702595624&width=2000",
        "googleMapsUrl": "https://maps.app.goo.gl/V8vtwGKXWduRAhfB9",
        "location": {
          "lat": 43.6698101,
          "lng": -79.43849820000001
        }
      }
    ]
  },
  {
    "id": "module-17",
    "type": "list",
    "title": "Dog-Friendly Patios",
    "description": "Top Toronto patios for dog owners: welcoming, pup-friendly",
    "author": "",
    "emoji": "\ud83d\udc36",
    "businesses": [
      {
        "name": "Black Lab Brewing",
        "rating": 4.8,
        "description": "Pure dog heaven: ultra-welcoming space made for pups.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR42v3HDE5Q7JiP2ppZwyGHb4d8zA0MufztpEyFenCT6lLjSPh0cOpnDsU&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/wLzggyda5anPoReB8",
        "location": {
          "lat": 43.661795,
          "lng": -79.3290919
        }
      },
      {
        "name": "The Goodman Pub and Kitchen",
        "rating": 4.3,
        "description": "Lakeside boardwalk gem: features an actual custom dog menu.",
        "imageUrl": "https://i.weddinghero.ca/gallery/1832/preview_1832_ZIPLzByW.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/hZ8WRiZtzn8mxKNd7",
        "location": {
          "lat": 43.63835479999999,
          "lng": -79.3801917
        }
      },
      {
        "name": "Stackt Market",
        "rating": 4.2,
        "description": "Outdoor shipping container hub with a dedicated dog yard.",
        "imageUrl": "https://stacktmarket.com/app/uploads/2024/08/stackt-ottawa.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/pVZteFxtJsiq71t57",
        "location": {
          "lat": 43.64081849999999,
          "lng": -79.4016875
        }
      },
      {
        "name": "Local Public Eatery - Liberty Village",
        "rating": 4.5,
        "description": "Massive, high-energy patio packed with puppy perks.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwe4-wyCyaPd2VNq-Erf3JH9HY1YN9JTU3v6toxZlWJe0JGzO8GQDVomt&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/4WSEHWFW8T5gevPu8",
        "location": {
          "lat": 43.6383844,
          "lng": -79.41935529999999
        }
      },
      {
        "name": "The Stone Lion",
        "rating": 4.2,
        "description": "Great Beaches patio: cozy, covered, and heated for pups.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwksZToaccpGp_F6dO75ppYyl3JsEid5UdAxvGa2lyn_NZB95mRGp4-fY&s=10",
        "googleMapsUrl": "https://maps.app.goo.gl/UzeyvYQN5MjwAonYA",
        "location": {
          "lat": 43.66967469999999,
          "lng": -79.3024679
        }
      }
    ]
  },
  {
    "id": "module-18",
    "type": "guide",
    "title": "Toronto in 24 hours \u23f0",
    "description": "Toronto day trip: market eats, island views, and top dining",
    "author": "Yelp",
    "emoji": "",
    "businesses": [
      {
        "name": "St. Lawrence Market",
        "rating": 4.6,
        "description": "Start your morning by grabbing a peameal bacon sandwich",
        "imageUrl": "https://oldtowntoronto.ca/wp-content/uploads/2020/02/st-lawrence-market-toronto-background1.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/ixzqyes6m47J32Ai7",
        "location": {
          "lat": 43.6486879,
          "lng": -79.3715454
        }
      },
      {
        "name": "Jack Layton Ferry Terminal",
        "rating": 4.4,
        "description": "Soak up the harbor views and ferry over to Ward\u2019s Island",
        "imageUrl": "https://cdn.prod.website-files.com/680cf47a50b560d2048b4e70/6826a07baa384199bf6377ca_news.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/JJFbt7bRo5HbFAFu7",
        "location": {
          "lat": 43.6400358,
          "lng": -79.3756373
        }
      },
      {
        "name": "Kensington Market",
        "rating": 4.2,
        "description": "Explore the vintage shops, indie cafes, and food stalls",
        "imageUrl": "https://www.heritagetrust.on.ca/uploads/Articles/14-18-Kensington-3-web.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/8Ujcpr6SgTh1H9S18",
        "location": {
          "lat": 43.6545236,
          "lng": -79.4014566
        }
      },
      {
        "name": "Alo",
        "rating": 4.6,
        "description": "Settle in for a meticulously curated multi-course tasting",
        "imageUrl": "https://s3-media0.fl.yelpcdn.com/bphoto/QqlHh_6cll2BSX1j8m6FNA/o.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/Ah5sVFLPXScVmHNp8",
        "location": {
          "lat": 43.6484905,
          "lng": -79.39594149999999
        }
      },
      {
        "name": "Bar Raval",
        "rating": 4.4,
        "description": "Wind down with a crafted cocktail in this Gaudi-esque mahogany bar",
        "imageUrl": "https://blogto-production2-baselayer-display.blogto.com/listings/20171026-2048-BarRaval12.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto",
        "googleMapsUrl": "https://maps.app.goo.gl/7jzftYeedUZxGMcq6",
        "location": {
          "lat": 43.6558235,
          "lng": -79.40991489999999
        }
      }
    ]
  },
  {
    "id": "module-19",
    "type": "list",
    "title": "Stunning Desserts",
    "description": "Beautiful Toronto dessert spots for artistic treats",
    "author": "",
    "emoji": "\ud83c\udf705",
    "businesses": [
      {
        "name": "Delys\u00e9es Luxury Desserts",
        "rating": 4.4,
        "description": "Get the Ruby Red Lips cake; it's a sleek, glossy work of art.",
        "imageUrl": "https://luxemagazineottawa.com/wp-content/uploads/2024/03/12.png",
        "googleMapsUrl": "https://maps.app.goo.gl/ciCuw7hd1mpgyeFr6",
        "location": {
          "lat": 43.6471969,
          "lng": -79.4196377
        }
      },
      {
        "name": "Cake It Toronto",
        "rating": 4.8,
        "description": "Order the hyper-realistic Peach mousse cake\u2014it looks picked from a tree.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS653hQQ_tvhhMrJt0IKsFRUp_nrEuQBmGAew&s",
        "googleMapsUrl": "https://maps.app.goo.gl/HvKe69eZx5Hq67Ry9",
        "location": {
          "lat": 43.8065757,
          "lng": -79.4531054
        }
      },
      {
        "name": "Daan Go Cake Lab",
        "rating": 4.7,
        "description": "Get the 24K Mango cake topped with gorgeous, shining gold leaf.",
        "imageUrl": "https://daango.com/cdn/shop/files/cake_style_4_to_3.jpg?height=900&v=1681440769",
        "googleMapsUrl": "https://maps.app.goo.gl/x5AtBfg3yf9qwREE6",
        "location": {
          "lat": 43.65150620000001,
          "lng": -79.39717089999999
        }
      },
      {
        "name": "Roselle Desserts",
        "rating": 4.7,
        "description": "Order the Earl Grey Cake Cup for beautiful, delicate layers.",
        "imageUrl": "https://blogto-production2-baselayer-display.blogto.com/uploads/2018/07/27/20180726-2048-Roselle13.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/wZ77Lk6QA6b4TWW29",
        "location": {
          "lat": 43.65354240000001,
          "lng": -79.3620492
        }
      },
      {
        "name": "Asters Patisserie",
        "rating": 4.7,
        "description": "Grab the Exotic Passion mini cake\u2014a flawless geometric dome.",
        "imageUrl": "https://tb-static.uber.com/prod/image-proc/processed_images/30b9e2ca5b894d17f29559e547e7cf5b/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
        "googleMapsUrl": "https://maps.app.goo.gl/4guUSTzrePtZU8ke7",
        "location": {
          "lat": 43.6467484,
          "lng": -79.3785852
        }
      }
    ]
  },
  {
    "id": "module-20",
    "type": "guide",
    "title": "Toronto Hidden Gems \ud83d\udc8e",
    "description": "Curation of unique, underrated Toronto spots",
    "author": "Yelp",
    "emoji": "",
    "businesses": [
      {
        "name": "The Monkey\u2019s Paw",
        "rating": 4.8,
        "description": "Novelty book vending machine dispenses random vintage reads.",
        "imageUrl": "https://img1.wsimg.com/isteam/ip/e7133917-f57d-4653-bbb0-39f9e1d0517f/monkeys-paw-5c01807046e0fb0001642d9a.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/k2BeeqvSxT356gdH6",
        "location": {
          "lat": 43.660284,
          "lng": -79.4326545
        }
      },
      {
        "name": "Hanmoto",
        "rating": 4.7,
        "description": "Secret alley entrance opens to rowdy, killer Japanese eats.",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2015/01/w2560/hanmotoleadimage.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/Jbpg6A4WKnKtpSAs5",
        "location": {
          "lat": 43.64960000000001,
          "lng": -79.4230583
        }
      },
      {
        "name": "Winter Garden Theatre",
        "rating": 4.8,
        "description": "Last active double-decker theater feels like a dream forest.",
        "imageUrl": "https://img.atlasobscura.com/Xi4h1r3m1tm4-oD6Nlh6UUsouh0umJux8VVGV2FmzHk/rt:fit/w:1200/q:80/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS9h/cHBfdXBsb2Fkcy9w/bGFjZV9pbWFnZXMv/dXNlcl8zMzg0MjQ5/XzE2YmUwZjQ5LWQy/NmQtNDY3MS1iNmM0/LTI2Zjk0NzdlZmYz/NA.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/dZvNnFFMR5SdEvYU8",
        "location": {
          "lat": 43.6530164,
          "lng": -79.3793958
        }
      },
      {
        "name": "Loga's Corner",
        "rating": 4.7,
        "description": "Massive, handmade Tibetan momos for under ten bucks.",
        "imageUrl": "https://blogto-production2-baselayer-display.blogto.com/listings/0cad-20150319-logascorner590-11.jpg?w=2048&cmd=resize_then_crop&height=1365&format=auto",
        "googleMapsUrl": "https://maps.app.goo.gl/25vzEBpjZcXXQauC7",
        "location": {
          "lat": 43.6404185,
          "lng": -79.4359673
        }
      },
      {
        "name": "Lower Bay Station",
        "rating": 4.3,
        "description": "Ghost subway platform frozen in time right below the city.",
        "imageUrl": "https://cdn.inkspire.org/wp-content/uploads/2021/04/city-hall-station-1024x683.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/EYp4kyKJ6V8PF3Wr5",
        "location": {
          "lat": 43.670238,
          "lng": -79.389793
        }
      }
    ]
  },
  {
    "id": "module-21",
    "type": "list",
    "title": "Street Art Beyond Graffiti Alley",
    "description": "Discover hidden massive murals and public art",
    "author": "Anna B. (Elite)",
    "emoji": "\ud83c\udfa8",
    "businesses": [
      {
        "name": "Underpass Park",
        "rating": 4.6,
        "description": "Concrete overpass pillars turned into vibrant urban canvas",
        "imageUrl": "https://www.waterfrontoronto.ca/sites/default/files/styles/contextual_banner_sm/public/2022-05/Underpass%20Park%20-%20skate%20park-crop.jpg?itok=SPPHO1m8",
        "googleMapsUrl": "https://maps.app.goo.gl/5gN38XumAyVwYjxEA",
        "location": {
          "lat": 43.6552522,
          "lng": -79.3555605
        }
      },
      {
        "name": "The Keele Wall",
        "rating": 4.1,
        "description": "Massive, block-long murals visible right from the subway",
        "imageUrl": "https://i0.wp.com/bretkelly.com/wp-content/uploads/2020/05/Keele-IMG_7485.jpg?resize=1200%2C900&ssl=1",
        "googleMapsUrl": "https://maps.app.goo.gl/VmEvduShw9bePLmW6",
        "location": {
          "lat": 43.6481275,
          "lng": -79.39888549999999
        }
      },
      {
        "name": "Cabbagetown Murals",
        "rating": 4.1,
        "description": "Striking lane murals tracing the deep history of the area",
        "imageUrl": "https://www.artsatl.org/wp-content/uploads/Forward-Warrior-Mural-Wall.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/LrLfemz1f1eRgqBs9",
        "location": {
          "lat": 43.6666209,
          "lng": -79.3687283
        }
      },
      {
        "name": "Regent Park Banners & Blocks",
        "rating": 3.9,
        "description": "Stunning portrait series and colorful community-led art",
        "imageUrl": "https://gvalighting.com/media/2020/04/Block-24-1.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/68SBVUAHFKDKGFUL6",
        "location": {
          "lat": 43.6586137,
          "lng": -79.3594348
        }
      },
      {
        "name": "Lawrence West Mural",
        "rating": 4.2,
        "description": "Incredible multi-story artwork highlighting local roots",
        "imageUrl": "https://mcfcrandall.blog/wp-content/uploads/2015/11/blog_essencia_mural_house_stairs.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/FbVyu9esyeJNxksB7",
        "location": {
          "lat": 43.648831,
          "lng": -79.3944546
        }
      }
    ]
  },
  {
    "id": "module-22",
    "type": "guide",
    "title": "Essential Landmarks",
    "description": "Iconic Toronto sites and history",
    "author": "Yelp",
    "emoji": "\ud83c\udfdb\ufe0f",
    "businesses": [
      {
        "name": "CN Tower",
        "rating": 4.6,
        "description": "Icon defining the skyline with radical city views and walks",
        "imageUrl": "https://media.cntraveler.com/photos/5b2c0684a98055277ea83e26/master/pass/CN-Tower_GettyImages-615764386.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/5LiVtEoSYFyzCWLU7",
        "location": {
          "lat": 43.6425662,
          "lng": -79.3870568
        }
      },
      {
        "name": "Royal Ontario Museum",
        "rating": 4.7,
        "description": "World-class artifacts inside a striking, geometric design",
        "imageUrl": "https://travel.usnews.com/dims4/USNEWS/77e110f/2147483647/resize/976x652%5E%3E/crop/976x652/quality/85/format/webp/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2FCourtesy_of_Royal_Ontario_MuseumBuilding-museum-outside.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/zsp9njcQ6Q3Z2LV18",
        "location": {
          "lat": 43.6677097,
          "lng": -79.3947771
        }
      },
      {
        "name": "Casa Loma",
        "rating": 4.5,
        "description": "A grand, historic Gothic revival castle right in Midtown",
        "imageUrl": "https://media.eventective.com/4370082_lg.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/xWt4WSRx3JU1F8mu9",
        "location": {
          "lat": 43.6780371,
          "lng": -79.4094439
        }
      },
      {
        "name": "The Distillery District",
        "rating": 4.6,
        "description": "Historic Victorian brick lanes packed with modern boutiques",
        "imageUrl": "https://spiritofyork.com/cdn/shop/articles/shutterstock_1040915752.jpg?v=1695242860",
        "googleMapsUrl": "https://maps.app.goo.gl/tWJ59DtzkcR87XPn7",
        "location": {
          "lat": 43.65030549999999,
          "lng": -79.35958
        }
      },
      {
        "name": "St. Lawrence Market",
        "rating": 4.6,
        "description": "Legendary massive food hall feeding locals since over a century",
        "imageUrl": "https://d1l57x9nwbbkz.cloudfront.net/files/s3fs-public/styles/webp/public/2024-04/st-lawrence-market-interior.jpg.webp?VersionId=xTtvrtdjhWcGvGQpSVc1x9usloxd2.PW&itok=-oqqMq2_",
        "googleMapsUrl": "https://maps.app.goo.gl/pSTx1Uq4brDZ5ceQ6",
        "location": {
          "lat": 43.6486879,
          "lng": -79.3715454
        }
      }
    ]
  },
  {
    "id": "module-23",
    "type": "list",
    "title": "Neon-Lit Karaoke Rooms",
    "description": "Belt out your favorite tracks in these retro glowing rooms",
    "author": "Yelp",
    "emoji": "\ud83c\udfa4",
    "businesses": [
      {
        "name": "Bar Mordecai",
        "rating": 4.2,
        "description": "Immersive, beautifully styled retro spaces with top-tier drinks",
        "imageUrl": "https://images.squarespace-cdn.com/content/v1/5bc29f3bab1a6270c382e22c/814c11a2-1021-4e53-b621-bd84a44f68a4/DSCF0163.jpeg?format=2500w",
        "googleMapsUrl": "https://maps.app.goo.gl/W59Wnw8JBuv7dDKG9",
        "location": {
          "lat": 43.6495605,
          "lng": -79.4249155
        }
      },
      {
        "name": "Echo Karaoke",
        "rating": 4.0,
        "description": "Classic neon-soaked private spaces with huge song catalogs",
        "imageUrl": "https://d2l4kn3pfhqw69.cloudfront.net/wp-content/uploads/2023/10/gfunk.jpeg",
        "googleMapsUrl": "https://maps.app.goo.gl/Qn6UvZqpwubEhArk7",
        "location": {
          "lat": 43.6636695,
          "lng": -79.4173971
        }
      },
      {
        "name": "Dasha",
        "rating": 4.0,
        "description": "High-energy, futuristic vibes alongside upscale pan-Asian food",
        "imageUrl": "https://torontolife.mblycdn.com/tl/resized/2019/11/w1280/toronto-restaurants-dasha-king-west-chinese-room-1.jpg",
        "googleMapsUrl": "https://maps.app.goo.gl/igy5pXGEpciSy4Sv6",
        "location": {
          "lat": 43.6449862,
          "lng": -79.4006706
        }
      },
      {
        "name": "Su Karaoke Bar",
        "rating": 4.7,
        "description": "A local spot perfect for private karaoke sessions",
        "imageUrl": "https://sukaraoke.com/wp-content/uploads/2025/05/su2.webp",
        "googleMapsUrl": "https://maps.app.goo.gl/33w5JG8BRMJtURLZA",
        "location": {
          "lat": 43.667912,
          "lng": -79.385666
        }
      }
    ]
  },
  {
    "id": "module-24",
    "type": "single",
    "title": "",
    "description": "",
    "author": "",
    "emoji": "",
    "businesses": [
      {
        "name": "Tilt Arcade Bar",
        "rating": 0,
        "description": "",
        "imageUrl": "",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Lee",
        "rating": 0,
        "description": "",
        "imageUrl": "",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Art Gallery of Ontario",
        "rating": 0,
        "description": "",
        "imageUrl": "",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Chica\u2019s Chicken",
        "rating": 0,
        "description": "",
        "imageUrl": "",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Tiflisi",
        "rating": 0,
        "description": "",
        "imageUrl": "",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Quetzal",
        "rating": 0,
        "description": "",
        "imageUrl": "",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Prehistoria Museum & SkullStore Oddity Shop",
        "rating": 0,
        "description": "",
        "imageUrl": "",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Pizzeria Badialdi",
        "rating": 0,
        "description": "",
        "imageUrl": "",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Piggy\u2019s Island",
        "rating": 0,
        "description": "",
        "imageUrl": "",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Aloette",
        "rating": 0,
        "description": "",
        "imageUrl": "",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Takja BBQ House",
        "rating": 0,
        "description": "",
        "imageUrl": "",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      }
    ]
  },
  {
    "id": "module-25",
    "type": "services",
    "title": "Top 5 Kitchen Glow ups \u2728\ud83d\udd28",
    "description": "Author: Yelp",
    "author": "Yelp",
    "emoji": "",
    "businesses": [
      {
        "name": "Japandi Perfection Found Here",
        "rating": 0,
        "description": "",
        "imageUrl": "https://i.pinimg.com/1200x/9c/ca/a6/9ccaa6394c364c262d5080a236508042.jpg",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Organic Modern Finds a Home",
        "rating": 0,
        "description": "",
        "imageUrl": "https://i.pinimg.com/1200x/28/19/f9/2819f9f3e3d0152579c1ea0cdf1e22eb.jpg",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Monochromatic Makeover",
        "rating": 0,
        "description": "",
        "imageUrl": "https://i.pinimg.com/1200x/c1/f0/0e/c1f00e2c734c0d42362a9592fbf8b331.jpg",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Earthy Serene Redesign",
        "rating": 0,
        "description": "",
        "imageUrl": "https://i.pinimg.com/1200x/3b/73/4e/3b734ec9aa2d1e658c6207964a687c01.jpg",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      },
      {
        "name": "Peak Sleeky, Airy Minimalism",
        "rating": 0,
        "description": "",
        "imageUrl": "https://i.pinimg.com/1200x/3a/fa/a7/3afaa7f67e9e7acefbca1ca7f0bbbca4.jpg",
        "googleMapsUrl": "",
        "location": {
          "lat": 43.6532,
          "lng": -79.3832
        }
      }
    ]
  }
];

export const TORONTO_CENTER = { lat: 43.6532, lng: -79.3832 };

export type CategoryFilter = 'all' | 'restaurants' | 'things-to-do' | 'events' | 'services';

const THINGS_TO_DO_MODULES = new Set(['module-9', 'module-10', 'module-11', 'module-21', 'module-23']);

export function getModuleCategory(mod: ContentModule): CategoryFilter {
  if (mod.type === 'services') return 'services';
  if (THINGS_TO_DO_MODULES.has(mod.id)) return 'things-to-do';
  return 'restaurants';
}

export function getBusinessCategory(bizName: string): CategoryFilter {
  for (const mod of TORONTO_MODULES) {
    if (mod.businesses.some((b) => b.name === bizName)) {
      return getModuleCategory(mod);
    }
  }
  return 'restaurants';
}

export function getBusinessEmoji(bizName: string): string {
  for (const mod of TORONTO_MODULES) {
    if (mod.businesses.some((b) => b.name === bizName)) {
      return mod.emoji || '📍';
    }
  }
  return '📍';
}

export function getAllBusinesses(): ContentBusiness[] {
  const seen = new Set<string>();
  const all: ContentBusiness[] = [];
  for (const mod of TORONTO_MODULES) {
    for (const biz of mod.businesses) {
      if (!seen.has(biz.name)) {
        seen.add(biz.name);
        all.push(biz);
      }
    }
  }
  return all;
}

export function getTopBusinesses(count = 20): ContentBusiness[] {
  return getAllBusinesses()
    .filter(b => b.location && b.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}

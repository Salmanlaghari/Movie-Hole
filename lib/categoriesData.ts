import { Movie } from "@/types/movie";

export interface CategoryItem extends Movie {
  category: string;
  videoUrl?: string; // YouTube video or generic streaming
  audioUrl?: string; // Stream/Podcasts/Radio stream URL
  liveStatus?: "live" | "upcoming" | "ended";
  sportSubtype?: "live" | "highlights" | "leagues";
  gamingSubtype?: "reviews" | "gameplay" | "trailers";
  newsSubtype?: "breaking" | "global" | "tech";
  musicSubtype?: "mv" | "concert" | "lofi";
}

// Sports Mock Data
export const MOCK_SPORTS: CategoryItem[] = [
  {
    id: 9001,
    title: "ICC Cricket World Cup Final Thriller",
    overview: "Relive the high-octane final over shootout. Witness spectacular diving catches, majestic centuries, and the match-winning delivery that sealed the historical championship victory.",
    poster_path: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1540747737956-37872404efda?q=80&w=1600&auto=format&fit=crop",
    release_date: "2024-11-15",
    vote_average: 9.2,
    vote_count: 4200,
    popularity: 98.4,
    genre_ids: [1001],
    category: "sports",
    sportSubtype: "highlights",
    videos: {
      results: [{ id: "s1", key: "8S_S0S_Z5j8", name: "Cricket World Cup Highlights", site: "YouTube", type: "Teaser", official: true }]
    }
  },
  {
    id: 9002,
    title: "NBA Finals - Game 7: Legacy Defined",
    overview: "LIVE NOW: The ultimate championship showdown. Watch the league's top superstars clash in a legacy-defining Game 7 filled with buzzer-beaters and high-flying dunks.",
    poster_path: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?q=80&w=1600&auto=format&fit=crop",
    release_date: "2025-01-20",
    vote_average: 9.8,
    vote_count: 8900,
    popularity: 154.2,
    genre_ids: [1001],
    category: "sports",
    sportSubtype: "live",
    liveStatus: "live",
    videos: {
      results: [{ id: "s2", key: "coSOnA8p468", name: "NBA Finals Stream", site: "YouTube", type: "Trailer", official: true }]
    }
  },
  {
    id: 9003,
    title: "Premier League Super Sunday",
    overview: "A historic battle for top-of-the-table supremacy. Arsenal vs Manchester City, featuring tactician masterclasses and a roaring capacity crowd.",
    poster_path: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1600&auto=format&fit=crop",
    release_date: "2025-02-14",
    vote_average: 8.7,
    vote_count: 1250,
    popularity: 76.5,
    genre_ids: [1001],
    category: "sports",
    sportSubtype: "leagues",
    videos: {
      results: [{ id: "s3", key: "28eP3O8r27E", name: "Super Sunday Preview", site: "YouTube", type: "Teaser", official: true }]
    }
  }
];

// Drama Mock Data
export const MOCK_DRAMA: CategoryItem[] = [
  {
    id: 9101,
    title: "Scent of a Whispering Heart",
    overview: "A masterclass in slow-burn romance and existential crisis. An estranged pianist rediscovers inspiration through an enigmatic painter with a dark past in rural Venice.",
    poster_path: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=1600&auto=format&fit=crop",
    release_date: "2024-08-12",
    vote_average: 8.9,
    vote_count: 450,
    popularity: 54.3,
    genre_ids: [18],
    category: "drama",
    videos: {
      results: [{ id: "d1", key: "F708g6y_8m8", name: "Drama Trailer", site: "YouTube", type: "Trailer", official: true }]
    }
  },
  {
    id: 9102,
    title: "Shadows in the Boardroom",
    overview: "A gripping drama of betrayal, extreme corporate greed, and high-stakes financial warfare. When an ambitious associate uncovers an offshore multi-billion dollar coverup, loyalty becomes a liability.",
    poster_path: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    release_date: "2024-11-03",
    vote_average: 8.5,
    vote_count: 812,
    popularity: 62.1,
    genre_ids: [18, 80],
    category: "drama",
    videos: {
      results: [{ id: "d2", key: "9z8uGZ5uLqg", name: "Shadows Trailer", site: "YouTube", type: "Trailer", official: true }]
    }
  }
];

// Cartoons & Anime Mock Data
export const MOCK_CARTOONS: CategoryItem[] = [
  {
    id: 9201,
    title: "Cyber Samurai: Neo-Tokyo 2099",
    overview: "Visually stunning cyberpunk anime. A cybernetically enhanced samurai must battle rogue artificial intelligences holding a high-tech metropolis hostage.",
    poster_path: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
    release_date: "2024-12-01",
    vote_average: 9.3,
    vote_count: 3100,
    popularity: 180.4,
    genre_ids: [16, 878],
    category: "cartoons-anime",
    videos: {
      results: [{ id: "c1", key: "mX2h6n5u_0s", name: "Cyber Samurai Trailer", site: "YouTube", type: "Trailer", official: true }]
    }
  },
  {
    id: 9202,
    title: "Forest of the Whispering Pixels",
    overview: "A whimsical animated cartoon full of heartwarming friendship and magic. Join Pippin as he searches for the lost digital stars that hold the forest's memory.",
    poster_path: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop",
    release_date: "2023-04-18",
    vote_average: 8.8,
    vote_count: 530,
    popularity: 42.6,
    genre_ids: [16, 14, 10751],
    category: "cartoons-anime",
    videos: {
      results: [{ id: "c2", key: "y_vJcl4R4B8", name: "Whispering Pixels Trailer", site: "YouTube", type: "Trailer", official: true }]
    }
  }
];

// Music Mock Data
export const MOCK_MUSIC: CategoryItem[] = [
  {
    id: 9301,
    title: "Lofi Popcorn Beats for Binging",
    overview: "The official Movie Hole relaxing beats channel. Sit back, pop a hot batch of fresh kernels, and study or relax to smooth synth beats and retro vinyl crackles.",
    poster_path: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?q=80&w=1600&auto=format&fit=crop",
    release_date: "2025-01-01",
    vote_average: 9.6,
    vote_count: 12050,
    popularity: 320.1,
    genre_ids: [10402],
    category: "music",
    musicSubtype: "lofi",
    videos: {
      results: [{ id: "m1", key: "jfKfPfyJRdk", name: "Lofi Girl Live", site: "YouTube", type: "Clip", official: true }]
    }
  },
  {
    id: 9302,
    title: "Echoes of the Arena: Live in London",
    overview: "Experience the monumental stadium concert film. Over 80,000 screaming fans singing in perfect unison with the legendary alternative-rock band under spectacular laser shows.",
    poster_path: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop",
    release_date: "2024-09-28",
    vote_average: 9.1,
    vote_count: 980,
    popularity: 45.2,
    genre_ids: [10402],
    category: "music",
    musicSubtype: "concert",
    videos: {
      results: [{ id: "m2", key: "g_S1S7r3G6Q", name: "Live Concert Highlight", site: "YouTube", type: "Trailer", official: true }]
    }
  }
];

// Reels / Shorts Mock Data
export const MOCK_REELS: CategoryItem[] = [
  {
    id: 9401,
    title: "10 Mind-Blowing Cinematography Hacks",
    overview: "Learn how to capture professional-looking cinematic b-roll using just your smartphone, a clever flashlight bounce, and dynamic pan-tilt gestures.",
    poster_path: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop",
    release_date: "2025-02-10",
    vote_average: 8.9,
    vote_count: 14200,
    popularity: 210.5,
    genre_ids: [10770],
    category: "reels-shorts",
    videos: {
      results: [{ id: "r1", key: "eS_P-b8y9Gk", name: "Camera Hacks Short", site: "YouTube", type: "Clip", official: true }]
    }
  },
  {
    id: 9402,
    title: "The Popcorn Cooking Speedrun (World Record)",
    overview: "Can we pop an entire bag of popcorn in less than 45 seconds using state-of-the-art superheated vacuum containers? The results are delightfully explosive.",
    poster_path: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1600&auto=format&fit=crop",
    release_date: "2025-02-13",
    vote_average: 9.4,
    vote_count: 32800,
    popularity: 450.2,
    genre_ids: [10770],
    category: "reels-shorts",
    videos: {
      results: [{ id: "r2", key: "09R8_2nJj6s", name: "Popcorn Speedrun", site: "YouTube", type: "Clip", official: true }]
    }
  }
];

// Social Media Mock Data
export const MOCK_SOCIAL: CategoryItem[] = [
  {
    id: 9501,
    title: "Viral Popcorn Bucket Review Trends",
    overview: "A deep dive into why high-end custom tin popcorn buckets became a massive global collector phenomenon, driving massive viral theater queues.",
    poster_path: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1524749292158-7540c2494485?q=80&w=1600&auto=format&fit=crop",
    release_date: "2024-10-25",
    vote_average: 8.1,
    vote_count: 450,
    popularity: 88.3,
    genre_ids: [99],
    category: "social-media",
    videos: {
      results: [{ id: "sc1", key: "XqZsoesa55w", name: "Social Trend Review", site: "YouTube", type: "Clip", official: true }]
    }
  }
];

// Documentaries Mock Data
export const MOCK_DOCUMENTARIES: CategoryItem[] = [
  {
    id: 9601,
    title: "The Deepest Trench: Life Below 10k Meters",
    overview: "Descend into the absolute unknown. Explore the pitch-black abyss of the Mariana Trench to catalog glowing alien-like organisms thriving under extreme hydrothermal pressures.",
    poster_path: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1513553404607-988bf2703777?q=80&w=1600&auto=format&fit=crop",
    release_date: "2024-05-19",
    vote_average: 9.0,
    vote_count: 2450,
    popularity: 112.5,
    genre_ids: [99],
    category: "documentaries",
    videos: {
      results: [{ id: "doc1", key: "K38G6yX7wFw", name: "Ocean Trench Trailer", site: "YouTube", type: "Trailer", official: true }]
    }
  },
  {
    id: 9602,
    title: "Rise of the Microchips",
    overview: "How raw silicon elements and lasers formed the foundation of modern human civilization. A sweeping technological journey inside dust-free atomic lithography chambers.",
    poster_path: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop",
    release_date: "2024-02-11",
    vote_average: 8.7,
    vote_count: 1100,
    popularity: 92.4,
    genre_ids: [99, 878],
    category: "documentaries",
    videos: {
      results: [{ id: "doc2", key: "g9S5A7w3uGk", name: "Microchips Documentary", site: "YouTube", type: "Trailer", official: true }]
    }
  }
];

// News Mock Data
export const MOCK_NEWS: CategoryItem[] = [
  {
    id: 9701,
    title: "Tech Summit 2025: Quantum Hegemony Reached",
    overview: "LIVE UPDATES: Global researchers have officially demonstrated full-scale room-temperature superconductor computing, instantly rendering classical encryption legacy history.",
    poster_path: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    release_date: "2025-02-14",
    vote_average: 8.5,
    vote_count: 1450,
    popularity: 200.4,
    genre_ids: [10770],
    category: "news",
    newsSubtype: "tech",
    videos: {
      results: [{ id: "n1", key: "28eP3O8r27E", name: "Tech Summit News", site: "YouTube", type: "Clip", official: true }]
    }
  }
];

// Gaming Mock Data
export const MOCK_GAMING: CategoryItem[] = [
  {
    id: 9801,
    title: "Cyberpunk: Phantom Liberty High-Fi Gameplay",
    overview: "Immerse yourself in Night City's spy-thriller expansion rendered at glorious 4K with full path tracing. Stealth-focused dynamic action, sleek cars, and synthetic espionage.",
    poster_path: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
    release_date: "2023-09-26",
    vote_average: 9.4,
    vote_count: 8520,
    popularity: 220.5,
    genre_ids: [878],
    category: "gaming",
    gamingSubtype: "gameplay",
    videos: {
      results: [{ id: "g1", key: "F708g6y_8m8", name: "Gameplay Showcase", site: "YouTube", type: "Clip", official: true }]
    }
  }
];

// Live TV Mock Data
export const MOCK_LIVETV: CategoryItem[] = [
  {
    id: 9901,
    title: "Cinema Classic Stream 24/7",
    overview: "LIVE Broadcast: Cozy black-and-white noir films, golden age adventures, and retro space opera reels streaming live around the clock for night owls.",
    poster_path: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop",
    release_date: "2025-01-01",
    vote_average: 9.7,
    vote_count: 24300,
    popularity: 420.3,
    genre_ids: [10770],
    category: "live-tv",
    liveStatus: "live",
    videos: {
      results: [{ id: "lt1", key: "jfKfPfyJRdk", name: "Lofi Live Stream", site: "YouTube", type: "Clip", official: true }]
    }
  }
];

// Podcasts Mock Data
export const MOCK_PODCASTS: CategoryItem[] = [
  {
    id: 10001,
    title: "The Binge Hole Podcast - Ep. 42: Spielberg vs Nolan",
    overview: "Put your headphones on! This week we settle the ultimate debate on pacing, IMAX sound mixing, film grain, and storytelling scales.",
    poster_path: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1600&auto=format&fit=crop",
    release_date: "2025-02-12",
    vote_average: 9.3,
    vote_count: 310,
    popularity: 84.6,
    genre_ids: [10770],
    category: "podcasts",
    videos: {
      results: [{ id: "p1", key: "g_S1S7r3G6Q", name: "Podcast Episode Highlight", site: "YouTube", type: "Clip", official: true }]
    }
  }
];

// Radio Mock Data
export const MOCK_RADIO: CategoryItem[] = [
  {
    id: 10101,
    title: "Retro Wave Radio - Synthwave Beats",
    overview: "LIVE radio signals bouncing straight out of 1984. Driving drum machines, gorgeous neon soundscapes, and soaring synth solos for your midnight cruise.",
    poster_path: "https://images.unsplash.com/photo-1484755560695-a4c7402a50e5?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1600&auto=format&fit=crop",
    release_date: "2025-01-01",
    vote_average: 9.5,
    vote_count: 520,
    popularity: 110.2,
    genre_ids: [10402],
    category: "radio",
    videos: {
      results: [{ id: "rad1", key: "jfKfPfyJRdk", name: "Synthwave Live", site: "YouTube", type: "Clip", official: true }]
    }
  }
];

// Entertainment Mock Data
export const MOCK_ENTERTAINMENT: CategoryItem[] = [
  {
    id: 10201,
    title: "The Oscars 2025: Cinematic Red Carpet",
    overview: "Full dazzling pre-show coverage, exclusive star interviews, gown deep dives, and early trophy predictions straight from Hollywood Boulevard.",
    poster_path: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop",
    release_date: "2025-02-14",
    vote_average: 8.8,
    vote_count: 3200,
    popularity: 150.4,
    genre_ids: [10770],
    category: "entertainment",
    videos: {
      results: [{ id: "ent1", key: "coSOnA8p468", name: "Red Carpet Live", site: "YouTube", type: "Teaser", official: true }]
    }
  }
];

// Combine everything polymorphic helper
export const ALL_CATEGORIES_DATA: Record<string, CategoryItem[]> = {
  sports: MOCK_SPORTS,
  drama: MOCK_DRAMA,
  "cartoons-anime": MOCK_CARTOONS,
  music: MOCK_MUSIC,
  "reels-shorts": MOCK_REELS,
  "social-media": MOCK_SOCIAL,
  documentaries: MOCK_DOCUMENTARIES,
  news: MOCK_NEWS,
  gaming: MOCK_GAMING,
  "live-tv": MOCK_LIVETV,
  podcasts: MOCK_PODCASTS,
  radio: MOCK_RADIO,
  entertainment: MOCK_ENTERTAINMENT,
};

// Flattened helper for search index lookup
export const ALL_FLATTENED_ITEMS: CategoryItem[] = Object.values(ALL_CATEGORIES_DATA).flat();

export const getCategoryItems = (category: string): CategoryItem[] => {
  return ALL_CATEGORIES_DATA[category] || [];
};

export const getCategoryItemById = (id: number): CategoryItem | undefined => {
  return ALL_FLATTENED_ITEMS.find((item) => item.id === id);
};

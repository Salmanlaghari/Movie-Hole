import { Movie, Genre, Cast, Video, MovieResponse } from "@/types/movie";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
const BASE_URL = "https://api.themoviedb.org/3";

export const GENRES_LIST: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const GENRE_GRADIENTS: Record<number, string> = {
  28: "from-red-600 to-orange-500",      // Action
  12: "from-emerald-600 to-cyan-500",   // Adventure
  16: "from-pink-500 to-purple-500",    // Animation
  35: "from-amber-400 to-orange-500",   // Comedy
  80: "from-slate-800 to-zinc-600",     // Crime
  99: "from-teal-600 to-emerald-400",   // Documentary
  18: "from-indigo-600 to-violet-500",  // Drama
  10751: "from-sky-400 to-blue-500",    // Family
  14: "from-violet-600 to-fuchsia-500", // Fantasy
  36: "from-yellow-700 to-amber-600",   // History
  27: "from-red-950 to-red-700",        // Horror
  10402: "from-rose-500 to-pink-500",   // Music
  9648: "from-neutral-800 to-zinc-900", // Mystery
  10749: "from-pink-600 to-rose-400",   // Romance
  878: "from-cyan-600 to-blue-600",     // Science Fiction
  10770: "from-gray-500 to-slate-600",  // TV Movie
  53: "from-stone-800 to-red-900",      // Thriller
  10752: "from-olive-600 to-stone-700", // War
  37: "from-yellow-800 to-amber-900",   // Western
};

export const getGenreGradient = (id: number): string => {
  return GENRE_GRADIENTS[id] || "from-neutral-700 to-neutral-800";
};

// High-fidelity Movie Mock Data
export const MOCK_MOVIES: Movie[] = [
  {
    id: 157336,
    title: "Interstellar",
    original_title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    release_date: "2014-11-05",
    vote_average: 8.6,
    vote_count: 32450,
    popularity: 145.2,
    genre_ids: [12, 18, 878],
    genres: [
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
      { id: 878, name: "Science Fiction" }
    ],
    runtime: 169,
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    status: "Released",
    videos: {
      results: [
        { id: "1", key: "zSWdZVtXT7U", name: "Interstellar - Trailer", site: "YouTube", type: "Trailer", official: true }
      ]
    },
    credits: {
      cast: [
        { id: 10205, name: "Matthew McConaughey", character: "Cooper", profile_path: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop", order: 0 },
        { id: 1813, name: "Anne Hathaway", character: "Brand", profile_path: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop", order: 1 },
        { id: 3895, name: "Jessica Chastain", character: "Murph", profile_path: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop", order: 2 },
        { id: 2524, name: "Michael Caine", character: "Professor Brand", profile_path: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop", order: 3 }
      ]
    }
  },
  {
    id: 438631,
    title: "Dune",
    original_title: "Dune",
    overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
    poster_path: "https://images.unsplash.com/photo-1547483238-f400e65ccd56?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop",
    release_date: "2021-09-15",
    vote_average: 7.9,
    vote_count: 10231,
    popularity: 120.5,
    genre_ids: [28, 12, 878],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" }
    ],
    runtime: 155,
    tagline: "Beyond fear, destiny awaits.",
    status: "Released",
    videos: {
      results: [
        { id: "2", key: "n9DwoQ7HWvI", name: "Dune - Official Trailer", site: "YouTube", type: "Trailer", official: true }
      ]
    },
    credits: {
      cast: [
        { id: 1190668, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop", order: 0 },
        { id: 505710, name: "Zendaya", character: "Chani", profile_path: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300&auto=format&fit=crop", order: 1 },
        { id: 16851, name: "Rebecca Ferguson", character: "Lady Jessica Atreides", profile_path: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop", order: 2 },
        { id: 1620, name: "Oscar Isaac", character: "Duke Leto Atreides", profile_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop", order: 3 }
      ]
    }
  },
  {
    id: 872585,
    title: "Oppenheimer",
    original_title: "Oppenheimer",
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, showing the tension, genius, and moral conflict that altered history forever.",
    poster_path: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1600&auto=format&fit=crop",
    release_date: "2023-07-19",
    vote_average: 8.4,
    vote_count: 8200,
    popularity: 130.8,
    genre_ids: [18, 36],
    genres: [
      { id: 18, name: "Drama" },
      { id: 36, name: "History" }
    ],
    runtime: 180,
    tagline: "The world forever changes.",
    status: "Released",
    videos: {
      results: [
        { id: "3", key: "uYPbbksJxIg", name: "Oppenheimer - Official Trailer", site: "YouTube", type: "Trailer", official: true }
      ]
    },
    credits: {
      cast: [
        { id: 2037, name: "Cillian Murphy", character: "J. Robert Oppenheimer", profile_path: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop", order: 0 },
        { id: 2038, name: "Emily Blunt", character: "Kitty Oppenheimer", profile_path: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&auto=format&fit=crop", order: 1 },
        { id: 2232, name: "Matt Damon", character: "Leslie Groves", profile_path: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=300&auto=format&fit=crop", order: 2 },
        { id: 3223, name: "Robert Downey Jr.", character: "Lewis Strauss", profile_path: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=300&auto=format&fit=crop", order: 3 }
      ]
    }
  },
  {
    id: 545611,
    title: "Everything Everywhere All at Once",
    original_title: "Everything Everywhere All at Once",
    overview: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
    poster_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?q=80&w=1600&auto=format&fit=crop",
    release_date: "2022-03-24",
    vote_average: 8.1,
    vote_count: 5900,
    popularity: 98.4,
    genre_ids: [28, 12, 878, 35],
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" },
      { id: 35, name: "Comedy" }
    ],
    runtime: 139,
    tagline: "The universe is so much bigger than you realize.",
    status: "Released",
    videos: {
      results: [
        { id: "4", key: "wxN1T1uxQ2g", name: "Everything Everywhere All At Once - Trailer", site: "YouTube", type: "Trailer", official: true }
      ]
    },
    credits: {
      cast: [
        { id: 16201, name: "Michelle Yeoh", character: "Evelyn Wang", profile_path: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=300&auto=format&fit=crop", order: 0 },
        { id: 2124, name: "Ke Huy Quan", character: "Waymond Wang", profile_path: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop", order: 1 },
        { id: 1445, name: "Stephanie Hsu", character: "Joy Wang", profile_path: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?q=80&w=300&auto=format&fit=crop", order: 2 },
        { id: 8903, name: "Jamie Lee Curtis", character: "Deirdre Beaubeirdre", profile_path: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop", order: 3 }
      ]
    }
  },
  {
    id: 680,
    title: "Pulp Fiction",
    original_title: "Pulp Fiction",
    overview: "A burger-loving hitman, his philosophical partner, a drug-addled gangster's moll, and a washed-up boxer converge in this sprawling, iconic pop-culture masterpiece.",
    poster_path: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=1600&auto=format&fit=crop",
    release_date: "1994-09-10",
    vote_average: 8.9,
    vote_count: 26000,
    popularity: 110.2,
    genre_ids: [80, 53],
    genres: [
      { id: 80, name: "Crime" },
      { id: 53, name: "Thriller" }
    ],
    runtime: 154,
    tagline: "Just because you are a character doesn't mean you have character.",
    status: "Released",
    videos: {
      results: [
        { id: "5", key: "s7EdQ4FqbhY", name: "Pulp Fiction - Official Trailer", site: "YouTube", type: "Trailer", official: true }
      ]
    },
    credits: {
      cast: [
        { id: 8891, name: "John Travolta", character: "Vincent Vega", profile_path: "https://images.unsplash.com/photo-1504257401700-1a1204646525?q=80&w=300&auto=format&fit=crop", order: 0 },
        { id: 2231, name: "Samuel L. Jackson", character: "Jules Winnfield", profile_path: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=300&auto=format&fit=crop", order: 1 },
        { id: 139, name: "Uma Thurman", character: "Mia Wallace", profile_path: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop", order: 2 },
        { id: 62, name: "Bruce Willis", character: "Butch Coolidge", profile_path: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop", order: 3 }
      ]
    }
  }
];

// High-fidelity TV Mock Data
export const MOCK_TV_SHOWS: Movie[] = [
  {
    id: 1396,
    title: "Breaking Bad",
    name: "Breaking Bad",
    original_title: "Breaking Bad",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
    poster_path: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop",
    release_date: "2008-01-20",
    first_air_date: "2008-01-20",
    vote_average: 9.5,
    vote_count: 14500,
    popularity: 250.6,
    genre_ids: [18, 80],
    genres: [
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" }
    ],
    runtime: 49,
    tagline: "Respect the chemistry.",
    status: "Ended",
    videos: {
      results: [
        { id: "tv1", key: "HhesaQXLuRY", name: "Breaking Bad - Trailer", site: "YouTube", type: "Trailer", official: true }
      ]
    },
    credits: {
      cast: [
        { id: 17419, name: "Bryan Cranston", character: "Walter White", profile_path: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop", order: 0 },
        { id: 84497, name: "Aaron Paul", character: "Jesse Pinkman", profile_path: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop", order: 1 }
      ]
    }
  },
  {
    id: 66732,
    title: "Stranger Things",
    name: "Stranger Things",
    original_title: "Stranger Things",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    poster_path: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop",
    backdrop_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop",
    release_date: "2016-07-15",
    first_air_date: "2016-07-15",
    vote_average: 8.6,
    vote_count: 16200,
    popularity: 185.3,
    genre_ids: [18, 9648, 878],
    genres: [
      { id: 18, name: "Drama" },
      { id: 9648, name: "Mystery" },
      { id: 878, name: "Science Fiction" }
    ],
    runtime: 50,
    tagline: "One summer can change everything.",
    status: "Returning Series",
    videos: {
      results: [
        { id: "tv2", key: "b9EkMc79ZSU", name: "Stranger Things - Trailer", site: "YouTube", type: "Trailer", official: true }
      ]
    },
    credits: {
      cast: [
        { id: 13240, name: "Millie Bobby Brown", character: "Eleven", profile_path: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop", order: 0 },
        { id: 5530, name: "Finn Wolfhard", character: "Mike Wheeler", profile_path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop", order: 1 }
      ]
    }
  }
];

// Helper to resolve images
export const getImagePath = (path: string | null, size: "poster" | "backdrop" | "profile" = "poster"): string => {
  if (!path) {
    if (size === "profile") return "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop";
    return "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop";
  }
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const baseUrl = "https://image.tmdb.org/t/p";
  const sizePath = size === "poster" ? "/w500" : size === "backdrop" ? "/original" : "/w185";
  return `${baseUrl}${sizePath}${path}`;
};

// Generic Fetcher
const fetchFromTMDB = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  if (!TMDB_API_KEY) {
    throw new Error("No TMDB API Key present");
  }

  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: "en-US",
    ...params,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch TMDB endpoint: ${endpoint}`);
  }

  return response.json();
};

// Main API Export functions
export const tmdb = {
  getTrending: async (): Promise<MovieResponse> => {
    try {
      const data = await fetchFromTMDB<MovieResponse>("/trending/movie/day");
      return data;
    } catch {
      return {
        page: 1,
        results: MOCK_MOVIES,
        total_pages: 1,
        total_results: MOCK_MOVIES.length,
      };
    }
  },

  getPopular: async (): Promise<MovieResponse> => {
    try {
      const data = await fetchFromTMDB<MovieResponse>("/movie/popular");
      return data;
    } catch {
      return {
        page: 1,
        results: [...MOCK_MOVIES].reverse(),
        total_pages: 1,
        total_results: MOCK_MOVIES.length,
      };
    }
  },

  getTopRated: async (): Promise<MovieResponse> => {
    try {
      const data = await fetchFromTMDB<MovieResponse>("/movie/top_rated");
      return data;
    } catch {
      const sorted = [...MOCK_MOVIES].sort((a, b) => b.vote_average - a.vote_average);
      return {
        page: 1,
        results: sorted,
        total_pages: 1,
        total_results: MOCK_MOVIES.length,
      };
    }
  },

  getUpcoming: async (): Promise<MovieResponse> => {
    try {
      const data = await fetchFromTMDB<MovieResponse>("/movie/upcoming");
      return data;
    } catch {
      const filtered = MOCK_MOVIES.filter(m => m.release_date && parseInt(m.release_date.split("-")[0]) >= 2023);
      return {
        page: 1,
        results: filtered.length > 0 ? filtered : MOCK_MOVIES,
        total_pages: 1,
        total_results: filtered.length > 0 ? filtered.length : MOCK_MOVIES.length,
      };
    }
  },

  getNowPlaying: async (): Promise<MovieResponse> => {
    try {
      const data = await fetchFromTMDB<MovieResponse>("/movie/now_playing");
      return data;
    } catch {
      return {
        page: 1,
        results: MOCK_MOVIES.slice(0, 4),
        total_pages: 1,
        total_results: 4,
      };
    }
  },

  getMovieDetail: async (id: number): Promise<Movie> => {
    try {
      const detail = await fetchFromTMDB<Movie>(`/movie/${id}`, {
        append_to_response: "videos,credits",
      });
      return detail;
    } catch {
      const mock = MOCK_MOVIES.find((m) => m.id === id);
      if (mock) return mock;
      // Also look up TV mock
      const mockTv = MOCK_TV_SHOWS.find((m) => m.id === id);
      if (mockTv) return mockTv;
      return MOCK_MOVIES[0];
    }
  },

  getTVShowDetail: async (id: number): Promise<Movie> => {
    try {
      const detail = await fetchFromTMDB<Movie>(`/tv/${id}`, {
        append_to_response: "videos,credits",
      });
      return detail;
    } catch {
      const mockTv = MOCK_TV_SHOWS.find((m) => m.id === id);
      if (mockTv) return mockTv;
      return MOCK_TV_SHOWS[0];
    }
  },

  getTVRecommendations: async (id: number): Promise<MovieResponse> => {
    try {
      const data = await fetchFromTMDB<MovieResponse>(`/tv/${id}/recommendations`);
      return data;
    } catch {
      const filtered = MOCK_TV_SHOWS.filter((m) => m.id !== id);
      return {
        page: 1,
        results: filtered.length > 0 ? filtered : MOCK_TV_SHOWS,
        total_pages: 1,
        total_results: filtered.length,
      };
    }
  },

  getTVSimilar: async (id: number): Promise<MovieResponse> => {
    try {
      const data = await fetchFromTMDB<MovieResponse>(`/tv/${id}/similar`);
      return data;
    } catch {
      const filtered = MOCK_TV_SHOWS.filter((m) => m.id !== id);
      return {
        page: 1,
        results: filtered.length > 0 ? filtered : MOCK_TV_SHOWS,
        total_pages: 1,
        total_results: filtered.length,
      };
    }
  },

  getRecommendations: async (id: number): Promise<MovieResponse> => {
    try {
      const data = await fetchFromTMDB<MovieResponse>(`/movie/${id}/recommendations`);
      return data;
    } catch {
      const filtered = MOCK_MOVIES.filter((m) => m.id !== id);
      return {
        page: 1,
        results: filtered.length > 0 ? filtered : MOCK_MOVIES,
        total_pages: 1,
        total_results: filtered.length,
      };
    }
  },

  getSimilar: async (id: number): Promise<MovieResponse> => {
    try {
      const data = await fetchFromTMDB<MovieResponse>(`/movie/${id}/similar`);
      return data;
    } catch {
      const filtered = MOCK_MOVIES.filter((m) => m.id !== id);
      return {
        page: 1,
        results: filtered.length > 0 ? filtered : MOCK_MOVIES,
        total_pages: 1,
        total_results: filtered.length,
      };
    }
  },

  searchMovies: async (query: string): Promise<MovieResponse> => {
    if (!query) return { page: 1, results: [], total_pages: 0, total_results: 0 };
    try {
      const data = await fetchFromTMDB<MovieResponse>("/search/multi", { query });
      return data;
    } catch {
      const combined = [...MOCK_MOVIES, ...MOCK_TV_SHOWS];
      const filtered = combined.filter(
        (m) => {
          const title = m.title || m.name || "";
          const original = m.original_title || m.original_name || "";
          return title.toLowerCase().includes(query.toLowerCase()) ||
            original.toLowerCase().includes(query.toLowerCase()) ||
            m.overview.toLowerCase().includes(query.toLowerCase());
        }
      );
      return {
        page: 1,
        results: filtered,
        total_pages: 1,
        total_results: filtered.length,
      };
    }
  },

  getMoviesByGenre: async (genreId: number): Promise<MovieResponse> => {
    try {
      const data = await fetchFromTMDB<MovieResponse>("/discover/movie", {
        with_genres: genreId.toString(),
      });
      return data;
    } catch {
      const filtered = MOCK_MOVIES.filter((m) => m.genre_ids.includes(genreId));
      return {
        page: 1,
        results: filtered.length > 0 ? filtered : MOCK_MOVIES,
        total_pages: 1,
        total_results: filtered.length > 0 ? filtered.length : MOCK_MOVIES.length,
      };
    }
  },

  getPersonDetail: async (id: number): Promise<any> => {
    try {
      const detail = await fetchFromTMDB<any>(`/person/${id}`, {
        append_to_response: "movie_credits,tv_credits",
      });
      return detail;
    } catch {
      // Cast member details high-fidelity mock fallback
      return {
        id,
        name: "Bryan Cranston",
        biography: "Bryan Lee Cranston is an American actor, director, and producer. He is best known for portraying Walter White in the AMC crime drama series Breaking Bad, and Hal in the Fox sitcom Malcolm in the Middle.",
        birthday: "1956-03-07",
        place_of_birth: "Hollywood, California, USA",
        profile_path: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
        movie_credits: {
          cast: [
            { id: 157336, title: "Interstellar", character: "Mission Control Voice", release_date: "2014-11-05", vote_average: 8.6, poster_path: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop" },
            { id: 438631, title: "Dune", character: "Arrakis Soldier", release_date: "2021-09-15", vote_average: 7.9, poster_path: "https://images.unsplash.com/photo-1547483238-f400e65ccd56?q=80&w=600&auto=format&fit=crop" }
          ]
        },
        tv_credits: {
          cast: [
            { id: 1396, name: "Breaking Bad", character: "Walter White", first_air_date: "2008-01-20", vote_average: 9.5 }
          ]
        }
      };
    }
  }
};

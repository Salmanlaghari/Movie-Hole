import { tmdb } from "@/lib/tmdb";
import { Hero } from "@/components/movies/Hero";
import { MovieRow } from "@/components/movies/MovieRow";

export const revalidate = 3600; // Cache page data for 1 hour

export default async function Home() {
  // Fetch movie data concurrently on the server
  const [
    trendingResponse,
    popularResponse,
    topRatedResponse,
    upcomingResponse,
    nowPlayingResponse,
  ] = await Promise.all([
    tmdb.getTrending(),
    tmdb.getPopular(),
    tmdb.getTopRated(),
    tmdb.getUpcoming(),
    tmdb.getNowPlaying(),
  ]);

  const trending = trendingResponse.results || [];
  const popular = popularResponse.results || [];
  const topRated = topRatedResponse.results || [];
  const upcoming = upcomingResponse.results || [];
  const nowPlaying = nowPlayingResponse.results || [];

  return (
    <div className="flex flex-col gap-6 md:gap-12 pb-16">
      {/* Cinematic Hero Slider section */}
      <Hero movies={trending} />

      {/* Structured horizontal scrolling categories with peek */}
      <div className="flex flex-col gap-6 -mt-16 md:-mt-24 relative z-20">

        <MovieRow
          title="Trending Now"
          movies={trending}
        />

        <MovieRow
          title="Highest Rated Wormholes"
          movies={topRated}
        />

        <MovieRow
          title="Popular Choices"
          movies={popular}
        />

        <MovieRow
          title="Coming Out of the Hole"
          movies={upcoming}
        />

        <MovieRow
          title="Now Binging"
          movies={nowPlaying}
        />

      </div>
    </div>
  );
}

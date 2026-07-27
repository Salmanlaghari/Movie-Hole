import { tmdb } from "@/lib/tmdb";
import { MovieDetailClient } from "@/components/movies/MovieDetailClient";
import { Metadata } from "next";

interface MoviePageProps {
  params: {
    id: string;
  };
}

// Generate dynamic meta tags for cinematic SEO!
export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return { title: "Movie Hole — Binging" };
  }

  try {
    const movie = await tmdb.getMovieDetail(id);
    return {
      title: `${movie.title} — Discover on Movie Hole`,
      description: movie.overview,
    };
  } catch {
    return {
      title: "Movie Detail — Movie Hole",
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <p className="text-text-secondary font-mono text-sm">
          Oops! The movie ID specified appears to have fallen down an actual hole.
        </p>
      </div>
    );
  }

  // Fetch movie detail, similar, and recommendations in parallel
  const [movie, similarResponse, recommendationsResponse] = await Promise.all([
    tmdb.getMovieDetail(id),
    tmdb.getSimilar(id),
    tmdb.getRecommendations(id),
  ]);

  const similar = similarResponse?.results || [];
  const recommended = recommendationsResponse?.results || [];

  return (
    <MovieDetailClient
      movie={movie}
      similarMovies={similar}
      recommendedMovies={recommended}
    />
  );
}

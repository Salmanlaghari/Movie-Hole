import { tmdb } from "@/lib/tmdb";
import { TVDetailClient } from "@/components/movies/TVDetailClient";
import { Metadata } from "next";

interface TVPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: TVPageProps): Promise<Metadata> {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return { title: "TV Series Discovery — Movie Hole" };
  }

  try {
    const show = await tmdb.getTVShowDetail(id);
    return {
      title: `${show.title} — Discover on Movie Hole`,
      description: show.overview,
    };
  } catch {
    return {
      title: "TV Series Detail — Movie Hole",
    };
  }
}

export default async function TVPage({ params }: TVPageProps) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <p className="text-text-secondary font-mono text-sm">
          Oops! The television ID specified appears to have fallen down an actual hole.
        </p>
      </div>
    );
  }

  // Fetch show details concurrently on server
  const [show, similarResponse, recommendationsResponse] = await Promise.all([
    tmdb.getTVShowDetail(id),
    tmdb.getTVSimilar(id),
    tmdb.getTVRecommendations(id),
  ]);

  const similar = similarResponse?.results || [];
  const recommended = recommendationsResponse?.results || [];

  return (
    <TVDetailClient
      tvShow={show}
      similarShows={similar}
      recommendedShows={recommended}
    />
  );
}

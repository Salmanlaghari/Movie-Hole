import { tmdb } from "@/lib/tmdb";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";
import { CategoryItem } from "@/lib/categoriesData";

export const revalidate = 3600;

export default async function MoviesCategoryPage() {
  let moviesList: CategoryItem[] = [];

  try {
    const popularResponse = await tmdb.getPopular();
    const trendingResponse = await tmdb.getTrending();

    const combined = [...(popularResponse.results || []), ...(trendingResponse.results || [])];
    // De-duplicate items by id and map to CategoryItem
    const uniqueMap = new Map();
    combined.forEach((m) => {
      if (!uniqueMap.has(m.id)) {
        uniqueMap.set(m.id, {
          ...m,
          category: "movies",
        });
      }
    });
    moviesList = Array.from(uniqueMap.values());
  } catch (e) {
    console.error("Failed to load TMDB movies", e);
  }

  return (
    <CategoryPageClient
      title="🎬 Premium Movies"
      description="Step inside our cinematic wormhole. Explore the finest handpicked box office hits, blockbusters, and critically-acclaimed artistic masterpieces."
      items={moviesList}
      themeColor="gold"
    />
  );
}

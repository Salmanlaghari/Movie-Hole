import { tmdb } from "@/lib/tmdb";
import { ALL_FLATTENED_ITEMS, CategoryItem } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export const revalidate = 3600;

export default async function TrendingCategoryPage() {
  let trendingItems: CategoryItem[] = [];

  try {
    // 1. Get real trending movie items
    const response = await tmdb.getTrending();
    const realTrending = (response.results || []).map((item) => ({
      ...item,
      category: "movies",
    }));

    // 2. Mix with high-popularity custom category items
    const popularCustom = ALL_FLATTENED_ITEMS.filter((item) => item.popularity > 150);

    // 3. Combine and sort by popularity desc
    trendingItems = [...realTrending, ...popularCustom].sort((a, b) => b.popularity - a.popularity);
  } catch (e) {
    console.error("Failed to fetch trending mix", e);
    // Fallback to custom database
    trendingItems = ALL_FLATTENED_ITEMS.sort((a, b) => b.popularity - a.popularity);
  }

  return (
    <CategoryPageClient
      title="🔥 Global Hot Trends"
      description="What is binging worldwide right now. Instantly discover the absolute highest-viewed, most discussed, and hyper-popular content on Movie Hole."
      items={trendingItems}
      themeColor="red"
    />
  );
}

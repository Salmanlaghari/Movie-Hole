import { MOCK_TV_SHOWS } from "@/lib/tmdb";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";
import { CategoryItem } from "@/lib/categoriesData";

export const revalidate = 3600;

export default async function TVShowsCategoryPage() {
  const tvList: CategoryItem[] = MOCK_TV_SHOWS.map((tv) => ({
    ...tv,
    category: "tv-shows",
  }));

  return (
    <CategoryPageClient
      title="📺 Prime TV Shows"
      description="The golden age of television is in full effect. Indulge in addictive seasonal series, mind-bending episode runs, and world-class drama series."
      items={tvList}
      themeColor="cyan"
    />
  );
}

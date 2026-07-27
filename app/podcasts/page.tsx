import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function PodcastsCategoryPage() {
  const podcastItems = getCategoryItems("podcasts");

  return (
    <CategoryPageClient
      title="🎤 Popcorn Podcasts"
      description="Put your headphones on. Dive deep into film-reel culture, director face-offs, tech summits, and hilarious cinema-room breakdowns."
      items={podcastItems}
      themeColor="emerald"
    />
  );
}

import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function GamingCategoryPage() {
  const gamingItems = getCategoryItems("gaming");

  const subtypes = [
    { value: "all", label: "All Gaming" },
    { value: "trailers", label: "🎬 Cinematic Game Trailers" },
    { value: "gameplay", label: "🎮 High-Fi Playthroughs" },
    { value: "reviews", label: "⭐ Expert Reviews" },
  ];

  return (
    <CategoryPageClient
      title="🎮 Gaming Headquarters"
      description="Level up your binging. Stream spectacular cinematic game reveals, developer playthrough highlights, and competitive tournament reviews."
      items={gamingItems}
      subtypes={subtypes}
      subtypeKey="gamingSubtype"
      themeColor="cyan"
    />
  );
}

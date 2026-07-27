import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function DocumentariesCategoryPage() {
  const docItems = getCategoryItems("documentaries");

  return (
    <CategoryPageClient
      title="📚 Immersive Documentaries"
      description="Deep investigative journalism, stunning wildlife coverage, and technological retro diaries. Discover real facts about our planet and society."
      items={docItems}
      themeColor="gold"
    />
  );
}

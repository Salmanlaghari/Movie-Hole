import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function DramaCategoryPage() {
  const dramaItems = getCategoryItems("drama");

  return (
    <CategoryPageClient
      title="🎭 Emotional Dramas"
      description="Deep narratives, intense character arcs, and thought-provoking screenplays. Explore stories of survival, betrayal, love, and redemption."
      items={dramaItems}
      themeColor="fuchsia"
    />
  );
}

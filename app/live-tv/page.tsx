import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function LiveTVCategoryPage() {
  const liveTVItems = getCategoryItems("live-tv");

  return (
    <CategoryPageClient
      title="📡 Live TV Broadcasts"
      description="Always on, always active. Tune into curated classic movie networks, global environmental livestreams, and cozy midnight binging channels."
      items={liveTVItems}
      themeColor="red"
    />
  );
}

import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function ReelsShortsCategoryPage() {
  const reelsItems = getCategoryItems("reels-shorts");

  return (
    <CategoryPageClient
      title="🎥 Reels & Shorts"
      description="Quick bites of cinematic flavor. Get access to ultra-fast, engaging movie hacks, cinematic speedruns, and bite-sized stories."
      items={reelsItems}
      themeColor="red"
    />
  );
}

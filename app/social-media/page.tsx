import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function SocialMediaCategoryPage() {
  const socialItems = getCategoryItems("social-media");

  return (
    <CategoryPageClient
      title="📱 Social Hub Trends"
      description="Catch up on what is trending across the global feeds. Watch internet viral videos, creator movie challenges, and cinema culture essays."
      items={socialItems}
      themeColor="emerald"
    />
  );
}

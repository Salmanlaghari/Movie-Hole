import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function NewsCategoryPage() {
  const newsItems = getCategoryItems("news");

  const subtypes = [
    { value: "all", label: "All News" },
    { value: "breaking", label: "🚨 Breaking Bulletins" },
    { value: "global", label: "🌍 Global Affairs" },
    { value: "tech", label: "💻 Tech Innovation" },
  ];

  return (
    <CategoryPageClient
      title="📰 News Broadcasting"
      description="Stay fully updated on worldwide breaking news stories, financial highlights, and technological press release bulletins."
      items={newsItems}
      subtypes={subtypes}
      subtypeKey="newsSubtype"
      themeColor="red"
    />
  );
}

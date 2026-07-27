import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function SportsCategoryPage() {
  const sportsItems = getCategoryItems("sports");

  const subtypes = [
    { value: "all", label: "All Sports" },
    { value: "live", label: "🔴 Live Matches" },
    { value: "highlights", label: "🎥 Game Highlights" },
    { value: "leagues", label: "🏆 Global Leagues" },
  ];

  return (
    <CategoryPageClient
      title="🏏 Live Sports Arena"
      description="Stay on the edge of your seat. Access real-time score feeds, match highlight packages, and comprehensive league standing breakdowns."
      items={sportsItems}
      subtypes={subtypes}
      subtypeKey="sportSubtype"
      themeColor="emerald"
    />
  );
}

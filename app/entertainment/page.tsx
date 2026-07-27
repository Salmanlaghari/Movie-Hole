import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function EntertainmentCategoryPage() {
  const entertainmentItems = getCategoryItems("entertainment");

  return (
    <CategoryPageClient
      title="🎭 Entertainment & Gala"
      description="Lights, camera, award season! Experience the glamour of red carpets, exclusive behind-the-scenes diaries, and major entertainment gala events."
      items={entertainmentItems}
      themeColor="gold"
    />
  );
}

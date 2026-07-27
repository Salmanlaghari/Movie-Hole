import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function CartoonsAnimeCategoryPage() {
  const cartoonsItems = getCategoryItems("cartoons-anime");

  return (
    <CategoryPageClient
      title="🎨 Cartoons & Anime"
      description="Immerse yourself in spectacular handcrafted animation. From legendary Japanese cyberpunk anime sagas to whimsical children's cartoons."
      items={cartoonsItems}
      themeColor="cyan"
    />
  );
}

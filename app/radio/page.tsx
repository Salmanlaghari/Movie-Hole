import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function RadioCategoryPage() {
  const radioItems = getCategoryItems("radio");

  return (
    <CategoryPageClient
      title="📻 Ambient Retro Radio"
      description="Tuning into static. Stream majestic retro synthwave audio signals, space ambient, and chill movie orchestra frequencies live 24/7."
      items={radioItems}
      themeColor="fuchsia"
    />
  );
}

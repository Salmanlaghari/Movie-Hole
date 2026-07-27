import { getCategoryItems } from "@/lib/categoriesData";
import { CategoryPageClient } from "@/components/layout/CategoryPageClient";

export default function MusicCategoryPage() {
  const musicItems = getCategoryItems("music");

  const subtypes = [
    { value: "all", label: "All Music" },
    { value: "lofi", label: "🎧 Lofi Chillroom" },
    { value: "concert", label: "🎸 Live Stadium Concerts" },
    { value: "mv", label: "🎬 Music Videos" },
  ];

  return (
    <CategoryPageClient
      title="🎵 Music & Soundscapes"
      description="Elevate your auditory senses. Sit back with a warm bowl of popcorn and stream legendary concert films, music videos, or relaxing study beats."
      items={musicItems}
      subtypes={subtypes}
      subtypeKey="musicSubtype"
      themeColor="fuchsia"
    />
  );
}

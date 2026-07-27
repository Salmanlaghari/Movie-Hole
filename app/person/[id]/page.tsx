import { tmdb, getImagePath } from "@/lib/tmdb";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, MapPin, Film, Star, ChevronLeft, Award } from "lucide-react";

interface PersonPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PersonPageProps): Promise<Metadata> {
  const id = parseInt(params.id);
  if (isNaN(id)) return { title: "Actor Details — Movie Hole" };

  try {
    const person = await tmdb.getPersonDetail(id);
    return {
      title: `${person.name} — Filmography on Movie Hole`,
      description: person.biography?.substring(0, 150),
    };
  } catch {
    return { title: "Actor Details — Movie Hole" };
  }
}

export default async function PersonPage({ params }: PersonPageProps) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <p className="text-text-secondary font-mono text-sm">
          Oops! The Actor specified appears to have fallen down an actual hole.
        </p>
      </div>
    );
  }

  const person = await tmdb.getPersonDetail(id);

  // Group movie and TV credits and sort by release date chronologically
  const movieCast = person.movie_credits?.cast || [];
  const tvCast = person.tv_credits?.cast || [];

  const timelineItems = [
    ...movieCast.map((c: any) => ({
      ...c,
      type: "movie",
      displayTitle: c.title,
      date: c.release_date || "",
      year: c.release_date ? parseInt(c.release_date.split("-")[0]) : 0,
    })),
    ...tvCast.map((c: any) => ({
      ...c,
      type: "tv",
      displayTitle: c.name,
      date: c.first_air_date || "",
      year: c.first_air_date ? parseInt(c.first_air_date.split("-")[0]) : 0,
    })),
  ].sort((a, b) => b.year - a.year); // Reverse chronological order (newest first)

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 min-h-screen">

      {/* Back button */}
      <div className="mb-8 mt-4">
        <Link href="/">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-accent-gold/30 text-text-secondary hover:text-accent-gold text-xs font-mono font-bold uppercase cursor-pointer transition-all">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to discovery</span>
          </span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Profile Card left */}
        <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 shadow-glowRed bg-white/5">
            <img
              src={getImagePath(person.profile_path, "profile")}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-outfit font-extrabold text-text-primary">
              {person.name}
            </h1>

            {/* Birthday and birthplace */}
            <div className="flex flex-col gap-2.5 text-sm text-text-secondary font-mono border-t border-white/5 pt-4">
              {person.birthday && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent-gold" />
                  <span>Born: {person.birthday}</span>
                </div>
              )}
              {person.place_of_birth && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent-red flex-shrink-0" />
                  <span>{person.place_of_birth}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Credits: {timelineItems.length} productions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Timeline right */}
        <div className="flex-1 flex flex-col gap-10">

          {/* Biography */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-outfit font-extrabold text-text-primary">
              Biography
            </h2>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              {person.biography || `${person.name} is a highly accomplished cinematic figure with works listed in our discovery wormhole.`}
            </p>
          </div>

          {/* Timeline UI */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl md:text-2xl font-outfit font-extrabold text-text-primary">
              Binging Timeline
            </h2>

            {timelineItems.length === 0 ? (
              <p className="text-sm text-text-secondary font-mono italic">
                Actor filmography is currently hiding in the movie hole. Check back soon!
              </p>
            ) : (
              <div className="relative pl-6 md:pl-8 border-l border-white/10 flex flex-col gap-8">
                {timelineItems.map((item, index) => {
                  const itemYear = item.year > 0 ? item.year : "Future";
                  return (
                    <div key={`${item.id}-${index}`} className="relative group">

                      {/* Timeline circle node */}
                      <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-accent-gold bg-background group-hover:border-accent-red group-hover:bg-accent-red transition-all duration-300 z-10" />

                      {/* Content block */}
                      <div className="p-4 rounded-xl bg-surface-elevated/40 border border-white/5 hover:border-accent-gold/20 hover:bg-surface-elevated/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1 min-w-0">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-accent-gold uppercase">
                            {itemYear} &bull; {item.type === "movie" ? "FILM" : "TV SERIES"}
                          </span>
                          <h4 className="font-outfit font-bold text-base md:text-lg text-text-primary leading-tight group-hover:text-accent-gold transition-colors truncate">
                            {item.displayTitle}
                          </h4>
                          {item.character && (
                            <p className="text-xs text-text-secondary">
                              as <span className="font-mono text-accent-red font-semibold">{item.character}</span>
                            </p>
                          )}
                        </div>

                        {/* Direct link trigger */}
                        <Link href={`/${item.type}/${item.id}`}>
                          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 group-hover:border-accent-gold/30 hover:bg-accent-gold text-xs text-text-secondary group-hover:text-background font-bold transition-all text-center whitespace-nowrap cursor-pointer">
                            Binge Out &rarr;
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

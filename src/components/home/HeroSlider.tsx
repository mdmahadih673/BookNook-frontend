"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";

const GREEN = "#205C40";
const MAROON = "#7A2E1D";

const slides = [
  {
    id: 1,
    title: "Unlock Infinite Worlds of Imagination",
    tagline:
      "Dive into thousands of fictional adventures, sci-fi epics, and classic literature.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1600",
    category: "Featured Collection",
    ctaLink: "/books",
  },
  {
    id: 2,
    title: "Share & Borrow Books Seamlessly",
    tagline:
      "Join a vibrant community of book enthusiasts. Borrow what you love, share what you read.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1600",
    category: "Community Driven",
    ctaLink: "/books",
  },
  {
    id: 3,
    title: "Expand Knowledge with Science & History",
    tagline:
      "From astrophysics to ancient civilizations, empower your curiosity with our curated shelves.",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1600",
    category: "Lifelong Learning",
    ctaLink: "/books",
  },
];

const AUTOPLAY_MS = 6000;

/** Split the title like the reference: first words upright green, rest italic maroon. */
function splitTitle(title: string) {
  const words = title.split(" ");
  const splitAt = Math.ceil(words.length / 2);
  return {
    lead: words.slice(0, splitAt).join(" "),
    accent: words.slice(splitAt).join(" "),
  };
}

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    setActive(((index % slides.length) + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      AUTOPLAY_MS
    );
    return () => clearInterval(timer);
  }, [active]);

  return (
    <section
      aria-roledescription="carousel"
      className="w-full bg-[#F6F5F0] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Text side */}
          <div className="min-w-0">
            {/* Slides crossfade */}
            {slides.map((s, index) => {
              const { lead, accent } = splitTitle(s.title);
              const isMaroon = index % 2 === 1;
              const accentColor = isMaroon ? MAROON : GREEN;
              const isActive = index === active;

              return (
                <div
                  key={s.id}
                  aria-hidden={!isActive}
                  className={cn(
                    "transition-opacity duration-500",
                    isActive ? "opacity-100" : "pointer-events-none opacity-0"
                  )}
                >
                  <div
                    className={cn(
                      !isActive && "hidden",
                      isActive && "block"
                    )}
                  >
                    <span
                      className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold"
                      style={{
                        color: accentColor,
                        borderColor: `color-mix(in srgb, ${accentColor} 35%, transparent)`,
                        backgroundColor: `color-mix(in srgb, ${accentColor} 8%, white)`,
                      }}
                    >
                      {s.category}
                    </span>

                    <h2 className="mt-5 font-serif text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
                      {lead}{" "}
                      <em
                        className="font-serif italic"
                        style={{ color: accentColor }}
                      >
                        {accent}
                      </em>
                    </h2>

                    <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600">
                      {s.tagline}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Link
                        href={s.ctaLink}
                        className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ backgroundColor: isMaroon ? MAROON : GREEN }}
                        tabIndex={isActive ? 0 : -1}
                      >
                        Explore Collection
                        <ArrowRight className="size-4" />
                      </Link>
                      <Link
                        href={s.ctaLink}
                        className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-400"
                        tabIndex={isActive ? 0 : -1}
                      >
                        Browse Shelves
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image side — larger, no card frame */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
              {slides.map((s, index) => (
                <Image
                  key={s.id}
                  src={s.image}
                  alt={s.title}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className={cn(
                    "object-cover transition-opacity duration-500",
                    index === active ? "opacity-100" : "opacity-0"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar: pagination pills + arrows */}
        <div className="mt-10 flex items-center justify-between">
          <ol className="flex flex-wrap items-center gap-2">
            {slides.map((s, index) => {
              const isActive = index === active;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Go to slide ${index + 1}: ${s.category}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
                      isActive
                        ? "bg-[#205C40] text-white"
                        : "bg-white text-neutral-600 hover:bg-neutral-100"
                    )}
                  >
                    {`${index + 1}. ${s.title.split(" ").slice(-2).join(" ")}`}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous slide"
              className="rounded-full border border-neutral-300 bg-white p-2 text-neutral-800 transition-colors hover:bg-neutral-100"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next slide"
              className="rounded-full border border-neutral-300 bg-white p-2 text-neutral-800 transition-colors hover:bg-neutral-100"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

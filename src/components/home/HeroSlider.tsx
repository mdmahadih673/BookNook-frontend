"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Unlock Infinite Worlds of Imagination",
    tagline: "Dive into thousands of fictional adventures, sci-fi epics, and classic literature.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1600",
    category: "Featured Collection",
    ctaLink: "/books",
    color: "#205C40",
  },
  {
    id: 2,
    title: "Share & Borrow Books Seamlessly",
    tagline: "Join a vibrant community of book enthusiasts. Borrow what you love, share what you read.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1600",
    category: "Community Driven",
    ctaLink: "/books",
    color: "#7A2E1D",
  },
  {
    id: 3,
    title: "Expand Knowledge with Science & History",
    tagline: "From astrophysics to ancient civilizations, empower your curiosity with our curated shelves.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1600",
    category: "Lifelong Learning",
    ctaLink: "/books",
    color: "#205C40",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    setActive((index + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => setActive((current) => (current + 1) % slides.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section aria-roledescription="carousel" aria-label="Featured books" className="relative w-full overflow-hidden bg-[#F6F5F0]">
      <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {slides.map((slide, index) => {
              const words = slide.title.split(" ");
              const splitAt = Math.ceil(words.length / 2);
              const isActive = index === active;

              return (
                <article key={slide.id} aria-hidden={!isActive} className="relative flex min-h-[520px] w-full shrink-0 items-center overflow-hidden bg-slate-900 sm:min-h-[600px]">
                  <Image src={slide.image} alt="" fill priority={index === 0} sizes="100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
                  <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pb-28 lg:px-12">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {slide.category}
                    </span>
                    <h2 className="mt-5 break-words font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                      {words.slice(0, splitAt).join(" ")} <em className="font-serif italic text-amber-300">{words.slice(splitAt).join(" ")}</em>
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{slide.tagline}</p>
                    <Link href={slide.ctaLink} tabIndex={isActive ? 0 : -1} className="mt-7 inline-flex items-center gap-2 rounded-lg bg-green-800 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-green-700">
                      Explore Collection <ArrowRight className="size-4" />
                    </Link>
                  </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 pb-5 sm:px-8 sm:pb-7 lg:px-12">
          <ol className="flex flex-wrap items-center gap-2">
            {slides.map((slide, index) => (
              <li key={slide.id}>
                <button type="button" onClick={() => goTo(index)} aria-label={`Go to slide ${index + 1}: ${slide.category}`} aria-current={index === active ? "true" : undefined} className={`size-2.5 rounded-full transition-all ${index === active ? "w-8 bg-white" : "bg-white/50 hover:bg-white/80"}`}>
                </button>
              </li>
            ))}
          </ol>

          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous slide" className="rounded-full border border-white/40 bg-black/25 p-2 text-white backdrop-blur transition-colors hover:bg-black/45"><ChevronLeft className="size-4" /></button>
            <button type="button" onClick={() => goTo(active + 1)} aria-label="Next slide" className="rounded-full border border-white/40 bg-black/25 p-2 text-white backdrop-blur transition-colors hover:bg-black/45"><ChevronRight className="size-4" /></button>
          </div>
        </div>
    </section>
  );
}

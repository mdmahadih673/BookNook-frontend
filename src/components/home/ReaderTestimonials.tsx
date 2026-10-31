import Image from "next/image";
import { BadgeCheck, ScanSearch, Star } from "lucide-react";
import { cn } from "cn";

const BRAND_GREEN = "#1D4230";
const QUOTE_GREEN = "#1E5B44";
const BRICK = "#8A4B2F";
const MAROON = "#7A2E1D";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Finding a mint copy of Oliver's poems on the corner of Maple Street felt like finding water in a desert. BookNook has made our block feel human again.",
    name: "Julian Vance",
    neighborhood: "Beacon Hill",
    note: "19 Borrows",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    quote:
      "I dropped off five paperbacks that sat in my storage for years. Within three days, two young neighbors had checked them out and left kind notes.",
    name: "Elena Rostova",
    neighborhood: "River West",
    note: "Community Steward",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 3,
    quote:
      "The monthly reading circle in the courtyard has become the quiet anchor of my month. Tea, cedarwood, and unhurried conversations about literature.",
    name: "Marcus Thorne",
    neighborhood: "Highland Park",
    note: "Circle Member",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
] as const;

export function ReaderTestimonials() {
  return (
    <section className="w-full bg-[#FAF9F5] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: BRICK }}
            >
              <ScanSearch className="size-3.5" />
              Reader Testimonials
            </span>
            <h2
              className="mt-3 font-serif text-4xl font-bold"
              style={{ color: BRAND_GREEN }}
            >
              Notes from the Sanctuary
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
              Reflections written in our guest ledger and left behind on
              bookmark margins across our town.
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-neutral-700">
            <BadgeCheck
              className="size-4"
              style={{ color: QUOTE_GREEN }}
              aria-hidden="true"
            />
            Verified Neighborhood Borrowers
          </span>
        </div>

        {/* Testimonial cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-2xl bg-[#F1F0E9] p-6"
            >
              <div>
                <div
                  className="flex items-center gap-0.5"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="size-3.5 fill-current"
                      style={{ color: MAROON }}
                    />
                  ))}
                </div>

                <blockquote
                  className="mt-4 font-serif text-lg italic leading-relaxed"
                  style={{ color: QUOTE_GREEN }}
                >
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-8 flex items-center gap-3">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  sizes="40px"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {item.name}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs">
                    <span
                      className="rounded-full px-2 py-0.5 font-medium"
                      style={{
                        backgroundColor: "#DDEAD8",
                        color: QUOTE_GREEN,
                      }}
                    >
                      {item.neighborhood}
                    </span>
                    <span className={cn("text-neutral-500")}>&bull;</span>
                    <span className="text-neutral-600">{item.note}</span>
                  </p>
                </div>
              </figcaption>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

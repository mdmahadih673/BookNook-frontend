"use client";

import Image from "next/image";
import { BadgeCheck, ScanSearch, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  {
    id: 4,
    quote:
      "Our street's pantry shelf has seen forty new titles since spring. Watching a stranger smile at a spine is better than any review site.",
    name: "Amara Okafor",
    neighborhood: "Willow Park",
    note: "Book Club Host",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 5,
    quote:
      "I trust this little ledger more than any algorithm. The handwritten slip in my last borrow led me straight to my favorite novel of the decade.",
    name: "Devon Marsh",
    neighborhood: "Oakfield",
    note: "Ledger Keeper",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 6,
    quote:
      "Between the poetry corner and the cedar shelf, my Sunday afternoons finally belong to paper again. No screens, no notifications, just neighbors.",
    name: "Sofia Almeida",
    neighborhood: "Harbor Lane",
    note: "Poetry Corner",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=200",
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

        {/* Testimonial carousel */}
        <Carousel
          opts={{ align: "start", loop: true }}
          className="mt-10"
          aria-label="Reader testimonials"
        >
          <CarouselContent className="items-stretch">
            {TESTIMONIALS.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <article className="flex h-full flex-col justify-between rounded-2xl bg-[#F1F0E9] p-6">
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
                        <span className="text-neutral-500">&bull;</span>
                        <span className="text-neutral-600">{item.note}</span>
                      </p>
                    </div>
                  </figcaption>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-5 hidden border-neutral-300 bg-white shadow-sm md:inline-flex" />
          <CarouselNext className="-right-5 hidden border-neutral-300 bg-white shadow-sm md:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}

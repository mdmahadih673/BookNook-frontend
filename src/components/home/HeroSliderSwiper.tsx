"use client";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Unlock Infinite Worlds of Imagination",
    text: "Dive into thousands of fictional adventures, sci-fi epics, and classic literature.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1600",
    label: "Featured Collection",
  },
  {
    id: 2,
    title: "Share & Borrow Books Seamlessly",
    text: "Join a community of book lovers. Borrow what you love and share what you read.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1600",
    label: "Community Driven",
  },
  {
    id: 3,
    title: "Explore Science & History",
    text: "Discover new ideas, ancient civilizations, and stories from across the world.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1600",
    label: "Lifelong Learning",
  },
];

export default function HeroSliderSwiper() {
  return (
    <section aria-label="Featured books" className="relative">
      <Swiper
        className="booknook-swiper"
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop
        speed={700}
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation
        pagination={{ clickable: true }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <article className="relative flex min-h-[520px] items-center overflow-hidden bg-slate-900 sm:min-h-[600px]">
              <Image src={slide.image} alt="" fill priority={slide.id === 1} sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
              <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
                <div className="max-w-2xl">
                  <span className="inline-flex rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {slide.label}
                  </span>
                  <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{slide.text}</p>
                  <Link href="/books" className="mt-7 inline-flex rounded-lg bg-green-800 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-green-700">
                    Browse Books
                  </Link>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

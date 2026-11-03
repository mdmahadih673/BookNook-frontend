"use client";

import dynamic from "next/dynamic";

const HeroSliderSwiper = dynamic(() => import("./HeroSliderSwiper"), {
  ssr: false,
  loading: () => <div aria-label="Loading featured books" className="min-h-[520px] bg-slate-900 sm:min-h-[600px]" />,
});

export default function HeroSlider() {
  return <HeroSliderSwiper />;
}

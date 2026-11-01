import { Suspense } from "react";
import HeroSlider from "@/components/home/HeroSlider";
import { HowBorrowingWorks } from "@/components/home/HowBorrowingWorks";
import { CtaBanner } from "@/components/home/CtaBanner";
import NewArrivals from "@/components/home/NewArrivals";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <Suspense fallback={<div>Loading...</div>}>
        <NewArrivals />
      </Suspense>
      <HowBorrowingWorks />
      
      <CtaBanner />
    </div>
  );
}

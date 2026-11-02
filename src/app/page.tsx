import { Suspense } from "react";
import HeroSlider from "@/components/home/HeroSlider";
import { HowBorrowingWorks } from "@/components/home/HowBorrowingWorks";
import { CtaBanner } from "@/components/home/CtaBanner";
import NewArrivals from "@/components/home/NewArrivals";
import { NewArrivalsSkeleton } from "@/components/shared/Skeletons";

export const metadata = { title: "Home" };

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <NewArrivals />
      </Suspense>
      <HowBorrowingWorks />
      
      <CtaBanner />
    </div>
  );
}

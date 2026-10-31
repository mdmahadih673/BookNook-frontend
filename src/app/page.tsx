import HeroSlider from "@/components/home/HeroSlider";
import { HowBorrowingWorks } from "@/components/home/HowBorrowingWorks";
import { ReaderTestimonials } from "@/components/home/ReaderTestimonials";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <HowBorrowingWorks />
      <ReaderTestimonials />
    </div>
  );
}

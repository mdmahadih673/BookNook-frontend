import Link from "next/link";
import { Bookmark, BookOpen, Clock, Heart, MapPin, Search } from "lucide-react";
import { cn } from "cn";

const BRAND_GREEN = "#1D4230";
const CARD_GREEN = "#1E5B44";
const BRICK = "#8A4B2F";

const STEPS = [
  {
    number: "1",
    chip: { backgroundColor: "#F8D9C9", color: "#7A2E1D" },
    title: "Discover & Reserve",
    description:
      "Explore catalog shelves online or in person. Place a warm 24-hour hold with just one tap—no login hurdles required.",
    footnote: {
      icon: Search,
      text: "Real-time shelf tracker",
    },
  },
  {
    number: "2",
    chip: { backgroundColor: "#DDEAD8", color: "#1E5B44" },
    title: "Pick Up or Exchange",
    description:
      "Collect from the library vestibule or your nearest neighborhood nook. Stamp the date card inside the rear pocket.",
    footnote: {
      icon: MapPin,
      text: "14 Neighborhood pantries",
    },
  },
  {
    number: "3",
    chip: { backgroundColor: "#A2DCC6", color: "#0E5F4B" },
    title: "Immerse & Enjoy",
    description:
      "Enjoy a peaceful reading cycle. When you finish, return the book for the next reader.",
    footnote: {
      icon: Clock,
      text: "Flexible reading time",
    },
  },
  {
    number: "4",
    chip: { backgroundColor: "#E4E4DF", color: "#3F3F3F" },
    title: "Return for Others",
    description:
      "Drop the volume in any returns slot. Feel free to tuck a handwritten note on the bookmark for the next fellow reader.",
    footnote: {
      icon: Heart,
      text: "Earn community karma",
    },
  },
] as const;

export function HowBorrowingWorks() {
  return (
    <section className="w-full bg-[#F2F3EF] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: BRICK }}
          >
            <BookOpen className="size-3.5" />
            Lending Sanctuary Process
          </span>
          <h2
            className="mt-3 font-serif text-4xl font-bold"
            style={{ color: BRAND_GREEN }}
          >
            How Borrowing Works
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Designed with zero friction, physical book cards, and communal
            respect at every touchpoint.
          </p>
        </div>

        {/* Step cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="flex flex-col rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-sm"
            >
              <span
                className="flex size-10 items-center justify-center rounded-lg text-sm font-semibold"
                style={step.chip}
              >
                {step.number}
              </span>

              <h3
                className="mt-5 text-lg font-semibold"
                style={{ color: CARD_GREEN }}
              >
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {step.description}
              </p>

              <p className="mt-6 flex items-center gap-2 text-xs text-neutral-700">
                <step.footnote.icon
                  className="size-3.5 text-neutral-700"
                  aria-hidden="true"
                />
                {step.footnote.text}
              </p>
            </article>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-10 flex flex-col gap-5 rounded-2xl bg-[#E9EEE7] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-full",
                "bg-[#CFE0CC]"
              )}
            >
              <Bookmark className="size-5" style={{ color: CARD_GREEN }} />
            </span>
            <div>
              <h3
                className="text-base font-semibold"
                style={{ color: BRAND_GREEN }}
              >
                Every Borrow Leaves a Trace
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Read the handwritten slips tucked into the shelves by previous
                borrowers since 2021.
              </p>
            </div>
          </div>

          <Link
            href="/slip-archive"
            className="inline-flex shrink-0 items-center self-start rounded-lg bg-[#D7DDD4] px-5 py-2.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-[#CBD3C9] sm:self-center"
          >
            View Slip Archive
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

const BRAND_GREEN = "#17382E";
const REGISTER_RED = "#7A2E1D";

export function CtaBanner() {
  return (
    <section className="w-full bg-[#F2F2F0] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl px-6 py-12 sm:px-10 sm:py-14 lg:px-12"
          style={{ backgroundColor: BRAND_GREEN }}
        >
          <span className="inline-flex items-center rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            Join the Neighborhood Registry
          </span>

          <h2 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
            Have Books Ready to Journey Onward?
          </h2>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80">
            Register a shelf in your front yard, donate copies to our main
            hall, or sign up to care for a neighborhood pantry box.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/Register"
              className="inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: REGISTER_RED }}
            >
              Register 
            </Link>
            <Link
              href="/books"
              className="inline-flex items-center rounded-lg bg-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/25"
            >
              See All Books
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import {
  Accessibility,
  BookOpen,
  Clock,
  MessageCircleMore,
  BookMarked,
  Share2,
} from "lucide-react";

const BRAND_GREEN = "#2C5143";
const REGISTER_RED = "#7A2E1D";

const FOOTER_COLUMNS = [
  {
    heading: "Library",
    links: [
      { label: "Catalog Shelves", href: "/books" },
      { label: "Recent Arrivals", href: "/books?sort=recent" },
      { label: "Local Authors", href: "/local-authors" },
      { label: "Book Clubs", href: "/book-clubs" },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "Lending Rules", href: "/policies/lending-rules" },
      { label: "Renewals & Holds", href: "/policies/renewals-holds" },
      { label: "Care for Books", href: "/policies/care-for-books" },
      { label: "Accessibility Guide", href: "/policies/accessibility-guide" },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  { label: "Reading log", href: "#", icon: BookOpen },
  { label: "Community chat", href: "#", icon: MessageCircleMore },
  { label: "Bookmarked collections", href: "#", icon: BookMarked },
  { label: "Share BookNook", href: "#", icon: Share2 },
] as const;

export function FooterPage() {
  return (
    <footer style={{ backgroundColor: BRAND_GREEN }} className="text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                BookNook
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">
              A neighborhood sanctuary for book lovers, communal lending, and
              mindful reading. Cherishing physical pages and warm connections.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-white/85">
              <Clock className="size-4" aria-hidden="true" />
              Open Daily &bull; 8:00 AM&ndash;8:00 PM
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/85 transition-colors hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Sanctuary Gazette
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/85">
              Receive handpicked book collections, mindful reading essays, and
              neighborhood events.
            </p>
            <form
              className="mt-5 flex items-center gap-2"
              action="/newsletter/subscribe"
            >
              <input
                type="email"
                required
                placeholder="Your email address..."
                aria-label="Email address"
                className="h-11 w-full min-w-0 flex-1 rounded-lg border border-white/30 bg-white/10 px-4 text-sm text-white placeholder:text-white/60 focus:border-white/60 focus:outline-none"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-lg px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: REGISTER_RED }}
              >
                Subscribe
              </button>
            </form>
            <div className="mt-5 flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white/85 transition-colors hover:text-white"
                >
                  <social.icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2025 BookNook Community Library. Handcrafted for avid readers.</p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Accessibility className="size-4" aria-hidden="true" />
              WCAG AA Compliant
            </span>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

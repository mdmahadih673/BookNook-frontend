"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { cn } from "cn";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "My Borrows", href: "/my-borrows" },
  { label: "Add Book", href: "/add-books" },
] as const;

const BRAND_GREEN = "#205C40";
const REGISTER_RED = "#7A2E1D";

export function NavbarPage() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 flex-col leading-none">
          <span
            className="font-serif text-2xl font-bold tracking-tight"
            style={{ color: BRAND_GREEN }}
          >
            BookNook
          </span>
          <span
            className="text-[10px] font-semibold tracking-[0.35em]"
            style={{ color: BRAND_GREEN }}
          >
            COMMUNITY LIBRARY
          </span>
        </Link>

        {/* Center links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-white"
                      : "text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900"
                  )}
                  style={isActive ? { backgroundColor: BRAND_GREEN } : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-full p-2 text-neutral-800 transition-colors hover:bg-neutral-100"
          >
            <Bell className="size-5" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-600" />
          </button>

          {/* Profile section — intentionally omitted, will be added later */}

          {/* Auth */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-neutral-800 transition-colors hover:text-neutral-950"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: REGISTER_RED }}
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

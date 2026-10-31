"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "cn";
import { Spinner } from "../ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "@/lib/auth-client";
import React from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "My Borrows", href: "/my-borrows" },
  { label: "Add Book", href: "/add-books" },
] as const;

const BRAND_GREEN = "#205C40";

export function NavbarPage() {
  const pathname = usePathname();

  const [signingOut, setSigningOut] = React.useState(false)
  const router = useRouter()
  const { data: session, isPending } = useSession()

  const user = session?.user
  const signedIn = !!user

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
      router.push("/")
      router.refresh()
    } finally {
      setSigningOut(false)
    }
  }

  // Account area while the session is still resolving — keeps layout stable.
  const pendingAccount = (
    <span className="inline-flex size-7 items-center justify-center" aria-hidden="true">
      <Spinner className="text-muted-foreground" />
    </span>
  )

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
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
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
          {isPending ? pendingAccount : signedIn ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/profile"
                className="flex min-w-0 items-center gap-2 rounded-full py-1 pl-1 pr-2 text-sm font-semibold text-green-950 transition hover:bg-green-50"
                aria-label={`Open ${user.name}'s profile`}
              >
                <Avatar size="sm" className="size-9 ring-2 ring-green-100">
                  {user.image && <AvatarImage src={user.image} alt={user.name ?? "Profile photo"} />}
                  <AvatarFallback className="bg-green-100 text-xs font-bold text-green-900">
                    {user.name?.trim().slice(0, 1).toUpperCase() || "B"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden max-w-28 truncate sm:inline">{user.name}</span>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="rounded-lg border border-green-800 px-3 py-2 text-sm font-semibold text-green-900 transition hover:bg-green-50 disabled:cursor-wait disabled:opacity-60 sm:px-4"
              >
                {signingOut ? "Signing out…" : "Sign Out"}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/signIn"
                className="text-sm font-medium text-neutral-800 transition-colors hover:text-green-900"
              >
                Sign In
              </Link>
              <Link
                href="/Register"
                className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: BRAND_GREEN }}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

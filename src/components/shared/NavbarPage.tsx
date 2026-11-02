"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

const links = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "My Books", href: "/my-books", private: true },
  { label: "My Borrows", href: "/my-borrows", private: true },
  { label: "Add Book", href: "/add-books", private: true },
];

export function NavbarPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const logout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-green-950/10 bg-white/95 shadow-sm backdrop-blur">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-3 py-3 sm:px-6 lg:flex-nowrap lg:justify-between">
        <Link href="/" className="shrink-0 font-serif text-2xl font-bold tracking-tight text-green-900 transition hover:text-green-700">BookNook<span className="text-amber-600">.</span></Link>
        <div className="order-3 flex w-full items-center gap-1 overflow-x-auto pb-1 sm:gap-2 lg:order-none lg:w-auto lg:flex-wrap lg:overflow-visible lg:pb-0">
          {links.filter((item) => !item.private || user).map((item) => (
            <Link key={item.href} href={item.href} className={`shrink-0 rounded-lg px-2.5 py-2 text-sm transition sm:px-3 ${pathname === item.href ? "bg-green-50 font-semibold text-green-900" : "text-slate-700 hover:bg-slate-50 hover:text-green-800"}`}>
              {item.label}
            </Link>
          ))}
        </div>
        {user ? (
          <details className="relative ml-auto shrink-0">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition hover:border-green-700/40 hover:bg-green-50/60">
              <span className="relative grid size-7 place-items-center overflow-hidden rounded-full bg-green-100 font-semibold text-green-900">
                {user.image
                  ? <Image src={user.image} alt="" fill unoptimized sizes="28px" className="object-cover" />
                  : user.name.charAt(0)}
              </span>
              <span className="hidden max-w-32 truncate sm:inline">{user.name}</span>
            </summary>
            <div className="absolute right-0 z-50 mt-2 w-40 rounded-lg border bg-white p-2 shadow-lg">
              <Link href="/profile" className="block rounded px-3 py-2 text-sm hover:bg-green-50">My Profile</Link>
              <button onClick={logout} className="w-full rounded px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50">Logout</button>
            </div>
          </details>
        ) : (
          <div className="ml-auto flex shrink-0 items-center gap-2 text-sm sm:gap-3">
            <Link href="/signIn" className="py-2 text-slate-700">Sign in</Link>
            <Link href="/Register" className="rounded-lg bg-green-800 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-green-900">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

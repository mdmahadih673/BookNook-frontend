"use client";

import { BookOpen, LibraryBig } from "lucide-react";
import Link from "next/link";
import type { IBook } from "@/types/book.types";
import BorrowRow from "./BorrowRow";

type BorrowedBook = Partial<IBook> & {
  _id: string;
  bookId?: string;
};

export default function MyBorrowsDesign({
  books,
  userName,
}: {
  books: BorrowedBook[];
  userName?: string;
}) {
  return (
    <main className="min-h-[70vh] bg-[#f4f7f2] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <header className="relative mb-9 overflow-hidden rounded-3xl bg-gradient-to-br from-green-800 via-green-900 to-emerald-950 px-6 py-8 text-white shadow-lg shadow-green-950/15 sm:px-10 sm:py-10">
          <div className="absolute -right-10 -top-24 size-72 rounded-full border border-lime-100/10 bg-lime-100/5" />
          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-lime-100">
                <BookOpen className="size-3.5" /> Your reading shelf
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Active Borrowed Volumes
              </h1>
              <p className="mt-2 text-sm text-green-100 sm:text-base">
                {userName ? `Books you have picked up, ${userName}.` : "Books you have picked up from the community."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                <LibraryBig className="size-5 text-lime-200" />
                <div>
                  <p className="text-2xl font-extrabold leading-none">{books.length}</p>
                  <p className="mt-1 text-xs text-green-100">
                    {books.length === 1 ? "on loan" : "on loan"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {books.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-green-900/20 bg-white px-6 py-16 text-center shadow-sm">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-green-100 text-green-800">
              <BookOpen className="size-6" />
            </span>
            <h2 className="mt-5 text-xl font-bold text-slate-900">Your shelf is waiting</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You have no borrowed books yet. Browse the community collection and add a title to your shelf.
            </p>
            <Link href="/books" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900">
              Explore books <BookOpen className="size-4" />
            </Link>
          </section>
        ) : (
          <section aria-label="Borrowed books" className="overflow-hidden rounded-3xl border border-green-950/10 bg-white shadow-sm">
            {/* Column labels — desktop only */}
            <div className="hidden grid-cols-[minmax(0,2.4fr)_1fr] gap-6 border-b border-green-950/10 bg-[#fafcfa] px-6 py-4 text-sm font-semibold text-slate-500 lg:grid">
              <span>Book Details</span>
              <span className="text-right">Circulation Status</span>
            </div>

            <div className="divide-y divide-green-950/10">
              {books.map((book) => (
                <BorrowRow key={book._id} book={book} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

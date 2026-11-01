"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { IBook } from "@/types/book.types";

type BorrowedBook = Partial<IBook> & {
  _id: string;
  bookId?: string;
};

const ROW_GRID =
  "lg:grid lg:grid-cols-[minmax(0,2.4fr)_1fr] lg:items-center lg:gap-6";

export default function BorrowRow({ book }: { book: BorrowedBook }) {
  const cover = (
    <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-green-50 ring-1 ring-green-950/10">
      {book.image ? (
        <Image
          src={book.image}
          alt={book.title || "Borrowed book cover"}
          fill
          sizes="64px"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-green-800">
          <BookOpen className="size-6" />
        </div>
      )}
    </div>
  );

  const bookHref = book.bookId ? `/books/${book.bookId}` : null;

  return (
    <article className={`${ROW_GRID} flex flex-col gap-4 rounded-2xl border border-green-950/10 bg-white p-4 transition-colors hover:border-green-800/25 sm:p-5`}>
      {/* Book details */}
      <div className="flex min-w-0 items-center gap-4">
        {bookHref ? (
          <Link href={bookHref} className="shrink-0" aria-label={`View ${book.title}`}>
            {cover}
          </Link>
        ) : (
          cover
        )}
        <div className="min-w-0">
          {book.category && (
            <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-1 text-[11px] font-medium text-green-900">
              <span className="font-bold">Shelf</span>
              <span aria-hidden> • </span>
              <span>{book.category}</span>
            </span>
          )}
          <h2 className="mt-1.5 truncate text-lg font-bold text-slate-900">
            {bookHref ? (
              <Link href={bookHref} className="hover:text-green-800">
                {book.title || "Untitled book"}
              </Link>
            ) : (
              book.title || "Untitled book"
            )}
          </h2>
          <p className="truncate text-sm text-slate-600">{book.author || "Unknown author"}</p>
          <p className="mt-1 text-xs font-medium text-slate-400">
            Ref: BN-{(book.bookId ?? book._id).slice(-6).toUpperCase()}
          </p>
        </div>
      </div>

      {/* Borrow status */}
      <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800">
          <span className="size-1.5 rounded-full bg-green-500" />
          Active Loan
        </span>
      </div>
    </article>
  );
}

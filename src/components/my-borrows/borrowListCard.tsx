"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Clock3,
  Loader2,
  RotateCcw,
} from "lucide-react";
import type { IBook } from "@/types/book.types";
import { API_BASE } from "@/lib/api";

type BorrowedBook = Partial<IBook> & {
  _id: string;
  bookId?: string;
  borrowedAt?: string | Date;
  dueAt?: string | Date;
};

const LOAN_DAYS = 14;

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const ROW_GRID =
  "lg:grid lg:grid-cols-[minmax(0,2.4fr)_0.9fr_1.15fr_1fr] lg:items-center lg:gap-6";

function countdown(dueMs: number | null) {
  if (dueMs === null) return null;
  const days = Math.ceil((dueMs - Date.now()) / 86_400_000);
  if (days < 0)
    return { tone: "red" as const, label: `Overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"}` };
  if (days === 0) return { tone: "amber" as const, label: "Due today" };
  if (days <= 3) return { tone: "amber" as const, label: `${days} day${days === 1 ? "" : "s"} left` };
  return { tone: "green" as const, label: `${days} days left` };
}

export default function BorrowListCard({
  books,
}: {
  books: BorrowedBook[];
}) {
  return (
    <section aria-label="Borrowed books" className="overflow-hidden rounded-2xl border border-green-950/10 bg-white shadow-sm">
      {/* Column labels — desktop only */}
      <div className={`${ROW_GRID} hidden border-b border-green-950/10 bg-[#fafcfa] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:grid`}>
        <span>Book Details</span>
        <span>Borrow Date</span>
        <span>Due Date &amp; Remaining</span>
        <span className="text-right">Circulation Status</span>
      </div>

      <div className="divide-y divide-green-950/10">
        {books.map((book) => (
          <Row key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
}

function Row({ book }: { book: BorrowedBook }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const borrowed = book.borrowedAt ? new Date(book.borrowedAt) : null;
  const due = book.dueAt
    ? new Date(book.dueAt)
    : borrowed
      ? new Date(borrowed.getTime() + LOAN_DAYS * 86_400_000)
      : null;
  const c = countdown(due ? due.getTime() : null);
  const isOverdue = c?.tone === "red";

  const handleReturn = async () => {
    setPending(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/my/${book._id}`, { method: "DELETE" });
      if (!res.ok) {
        setError("Return failed. Please try again.");
        return;
      }
      router.refresh();
    } catch {
      setError("Could not reach the library server.");
    } finally {
      setPending(false);
    }
  };

  return (
    <article className={`${ROW_GRID} flex flex-col gap-4 px-5 py-5 transition-colors ${isOverdue ? "bg-red-50/60" : "bg-white hover:bg-[#fafcfa]"}`}>
      {/* Book details */}
      <div className="flex min-w-0 items-center gap-4">
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
        <div className="min-w-0">
          {book.category && (
            <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-medium ${isOverdue ? "bg-red-100 text-red-800" : "bg-green-100 text-green-900"}`}>
              <span className="font-bold">Shelf</span>
              <span aria-hidden> • </span>
              <span>{book.category}</span>
            </span>
          )}
          <h2 className="mt-1.5 truncate text-lg font-bold text-slate-900">
            {book.bookId ? (
              <Link href={`/books/${book.bookId}`} className="hover:text-green-800">
                {book.title || "Untitled book"}
              </Link>
            ) : (
              book.title || "Untitled book"
            )}
          </h2>
          <p className="truncate text-sm text-slate-600">{book.author || "Unknown author"}</p>
          <p className="mt-1 text-xs font-medium text-slate-400">
            Barcode: BN-{(book.bookId ?? book._id).slice(-6).toUpperCase()}
          </p>
        </div>
      </div>

      {/* Borrow date */}
      <div className="flex items-start justify-between gap-3 lg:block">
        <p className="text-sm font-semibold text-slate-900 lg:text-base">
          {borrowed ? dateFmt.format(borrowed) : "—"}
        </p>
        <p className="text-xs text-slate-500 lg:mt-1">{LOAN_DAYS}-day standard tier</p>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 lg:hidden">Borrowed</span>
      </div>

      {/* Due date & remaining */}
      <div className="flex items-start justify-between gap-3 lg:block">
        <div>
          <p className={`text-sm font-semibold lg:text-base ${isOverdue ? "text-red-700" : "text-slate-900"}`}>
            {due ? dateFmt.format(due) : "—"}
          </p>
          {c && (
            <span
              className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                c.tone === "red"
                  ? "bg-red-100 text-red-700"
                  : c.tone === "amber"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-green-100 text-green-800"
              }`}
            >
              {c.tone === "red" ? <AlertTriangle className="size-3.5" /> : <Clock3 className="size-3.5" />}
              {c.label}
            </span>
          )}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 lg:hidden">Due</span>
      </div>

      {/* Status + action */}
      <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
            isOverdue ? "bg-red-100 text-red-700" : "bg-green-100 text-green-800"
          }`}
        >
          <span className={`size-1.5 rounded-full ${isOverdue ? "bg-red-500" : "bg-green-500"}`} />
          {isOverdue ? "Overdue" : "Active Loan"}
        </span>

        <button
          type="button"
          onClick={handleReturn}
          disabled={pending}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${
            isOverdue ? "bg-red-600" : "bg-[#4a2c1a]"
          }`}
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : isOverdue ? (
            <AlertTriangle className="size-4" />
          ) : (
            <RotateCcw className="size-4" />
          )}
          {isOverdue ? "Return Book Now" : "Return Book"}
        </button>

        {error && (
          <p className="w-full text-xs font-medium text-red-600 lg:basis-full lg:text-right" role="alert">
            {error}
          </p>
        )}
      </div>
    </article>
  );
}

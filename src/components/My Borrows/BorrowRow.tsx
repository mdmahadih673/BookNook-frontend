"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { toast } from "@/components/ui/toast";
import type { IBook } from "@/types/book.types";

type BorrowedBook = Partial<IBook> & {
  _id: string;
  bookId?: string;
};

const ROW_GRID =
  "lg:grid lg:grid-cols-[minmax(0,2.4fr)_1fr] lg:items-center lg:gap-6";

const API_BASE = "https://book-nook-backend-two.vercel.app";

export default function BorrowRow({ book }: { book: BorrowedBook }) {
  const router = useRouter();
  const [pending, setPending] = useState<"return" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const act = async () => {
    setPending("return");
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/my-borrows/${book._id}`, { method: "DELETE" });

      if (!res.ok) {
        console.error("Return request failed:", res.status, await res.text());
        setError("Return failed. Please try again.");
        toast.add({
          title: "Return failed",
          description: "Could not return this book. Please try again.",
          type: "error",
        });
        return;
      }
      toast.add({
        title: "Book returned",
        description: "The book is back in the available collection.",
        type: "success",
      });
      router.refresh();
    } catch (error) {
      console.error("Could not connect to the borrow API:", error);
      setError("Could not reach the library server.");
      toast.add({
        title: "Connection failed",
        description: "Could not reach the library server.",
        type: "error",
      });
    } finally {
      setPending(null);
    }
  };

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

      {/* Status + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800">
          <span className="size-1.5 rounded-full bg-green-500" />
          Active Loan
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => act()}
            disabled={pending !== null}
            className="inline-flex items-center gap-2 rounded-lg bg-[#4a2c1a] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending === "return" ? <Loader2 className="size-4 animate-spin" /> : <RotateCcw className="size-4" />}
            Return Book
          </button>
        </div>

        {error && (
          <p className="w-full text-right text-xs font-medium text-red-600 lg:w-auto lg:basis-full" role="alert">
            {error}
          </p>
        )}
      </div>
    </article>
  );
}

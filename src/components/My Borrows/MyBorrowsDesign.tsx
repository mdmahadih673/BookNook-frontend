import Image from "next/image";
import Link from "next/link";
import { BookOpen, LibraryBig } from "lucide-react";
import type { IBook } from "@/types/book.types";

type BorrowedBook = Partial<IBook> & {
  _id: string;
  bookId?: string;
  borrowerName?: string;
};

type MyBorrowsDesignProps = {
  books: BorrowedBook[];
  userName?: string;
  loadError?: string;
};

export default function MyBorrowsDesign({
  books,
  userName,
  loadError,
}: MyBorrowsDesignProps) {
  return (
    <main className="min-h-[65vh] bg-[#f7f8f5] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-9 flex flex-col gap-5 rounded-3xl bg-[#205C40] px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <div>
            <p className="mb-2 text-sm font-medium text-white/75">Your library</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Borrows
            </h1>
            <p className="mt-2 text-sm text-white/80">
              {userName ? `Welcome, ${userName}. ` : ""}
              Books you have added to your reading list.
            </p>
          </div>
          <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10">
            <LibraryBig aria-hidden="true" className="size-7" />
          </div>
        </header>

        {loadError ? (
          <section
            role="alert"
            className="rounded-2xl border border-red-200 bg-white p-8 text-center text-red-700 shadow-sm"
          >
            <h2 className="text-lg font-semibold">Could not load your books</h2>
            <p className="mt-2 text-sm">{loadError}</p>
          </section>
        ) : books.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#edf4ef] text-[#205C40]">
              <BookOpen aria-hidden="true" className="size-7" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-stone-900">
              No books here yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-600">
              Browse the collection and add a book to see it in My Borrows.
            </p>
            <Link
              href="/books"
              className="mt-6 inline-flex rounded-lg bg-[#205C40] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#174a32]"
            >
              Explore books
            </Link>
          </section>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-stone-900">
                Your books
              </h2>
              <span className="rounded-full bg-[#e6efe9] px-3 py-1 text-sm font-medium text-[#205C40]">
                {books.length} {books.length === 1 ? "book" : "books"}
              </span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book, index) => (
                <article
                  key={book._id || book.bookId || `${book.title}-${index}`}
                  className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-stone-100">
                    {book.image ? (
                      <Image
                        src={book.image}
                        alt={book.title ?? "Book cover"}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-stone-400">
                        <BookOpen aria-hidden="true" className="size-12" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#397653]">
                      {book.category ?? "Book"}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-lg font-bold text-stone-900">
                      {book.title ?? "Untitled book"}
                    </h3>
                    <p className="mt-1 text-sm text-stone-600">
                      by {book.author ?? "Unknown author"}
                    </p>
                    {book.description && (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-500">
                        {book.description}
                      </p>
                    )}
                    {book.bookId && (
                      <Link
                        href={`/books/${encodeURIComponent(book.bookId)}`}
                        className="mt-5 inline-flex items-center text-sm font-semibold text-[#205C40] hover:underline"
                      >
                        View book
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

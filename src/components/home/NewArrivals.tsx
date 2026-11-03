import Link from "next/link";
import type { IBook } from "@/types/book.types";
import { BookCard } from "@/components/books/BookCard";

export default async function NewArrivals() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/books?limit=6`, { cache: "no-store" });
  const books: IBook[] = response.ok ? await response.json() : [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900">New Arrivals</h2>
      </div>
      {books.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => <BookCard key={book._id} book={book} />)}
        </div>
      ) : (
        <p className="rounded-xl bg-white p-6 text-slate-600">No books have been added yet.</p>
      )}
      <div className="mt-6 text-center">
        <Link href="/books" className="inline-flex rounded-lg bg-green-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-900">See All Books</Link>
      </div>
    </section>
  );
}

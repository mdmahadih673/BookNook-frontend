"use client";

import { useState } from "react";
import { BookCard } from "@/components/books/BookCard";
import type { IBook } from "@/types/book.types";

export default function BooksCatalog({ books }: { books: IBook[] }) {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  const categories = ["all", ...Array.from(new Set(books.map((book) => book.category)))];
  const filteredBooks = [...books]
    .filter((book) => category === "all" || book.category === category)
    .sort((a, b) =>
      sort === "title"
        ? a.title.localeCompare(b.title)
        : sort === "available"
          ? b.availableCopies - a.availableCopies
          : new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    );

  return (
    <main className="min-h-screen bg-[#f4f7f2] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-800">The collection</p>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900">All Books</h1>
          <p className="mt-2 text-slate-500">Browse <span className="font-semibold text-green-900">{books.length} books</span> in the BookNook collection.</p>
        </header>

        <div className="mb-7 flex flex-wrap gap-3 rounded-xl border border-green-950/10 bg-white/70 p-3 shadow-sm">
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/15">
            {categories.map((item) => <option key={item} value={item}>{item === "all" ? "All Categories" : item}</option>)}
          </select>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/15">
            <option value="newest">Newest</option>
            <option value="title">Title A–Z</option>
            <option value="available">Most Available</option>
          </select>
        </div>

        {filteredBooks.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => <BookCard key={book._id} book={book} />)}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-6 text-slate-600">No books found in this category.</p>
        )}
      </div>
    </main>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookCard } from '@/components/books/BookCard';
import { IBook } from '@/types/book.types';
import { API_BASE } from '@/lib/api';

export default function AllBookPage() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [query, setQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('all');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    fetch(`${API_BASE}/books`)
      .then((r) => r.json())
      .then((d) => setBooks(d));
  }, []);

  const categories = ['all', ...Array.from(new Set(books.map((b) => b.category)))];

  const filtered = books
    .filter((b) => (category === 'all' ? true : b.category === category))
    .filter((b) => (availableOnly ? b.availableCopies > 0 : true))
    .filter((b) =>
      query
        ? b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'available') return b.availableCopies - a.availableCopies;
      return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    });

  return (
    <div className="min-h-screen bg-[#f4f7f2] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-2">SHELF INDEX • UPDATED TODAY</p>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">The Community Collection</h1>
          <p className="text-slate-500 mt-2 max-w-2xl">
            Explore {books.length} curated volumes shared by readers in your neighborhood.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <form onSubmit={(e) => { e.preventDefault(); setQuery(searchInput); }} className="flex flex-1 gap-3">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by title, author, ISBN, or topic..."
              className="flex-1 rounded-xl border border-green-900/15 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-700 focus:ring-4 focus:ring-green-100"
            />
            <button
              type="submit"
              className="rounded-xl bg-green-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900"
            >
              Search
            </button>
          </form>
          <button
            onClick={() => setAvailableOnly((v) => !v)}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${availableOnly ? 'bg-green-800 text-white shadow-sm shadow-green-900/20' : 'border border-green-900/15 bg-white text-green-950 hover:bg-green-50'}`}
          >
            Available Now Only
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 items-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-green-900/15 bg-white px-4 py-2 text-xs font-semibold text-green-950 outline-none focus:border-green-700 focus:ring-4 focus:ring-green-100"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === 'all' ? 'All Genres' : c}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-green-900/15 bg-white px-4 py-2 text-xs font-semibold text-green-950 outline-none focus:border-green-700 focus:ring-4 focus:ring-green-100"
          >
            <option value="newest">Newest</option>
            <option value="title">Title A-Z</option>
            <option value="available">Most Available</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        
      </div>
    </div>
  );
}

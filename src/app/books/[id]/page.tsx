import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  CalendarPlus,
  FileText,
  Library,
  Mail,
  Tag,
  TriangleAlert,
  UserRound,
} from 'lucide-react';
import { IBook } from '@/types/book.types';
import AddToMyBorrowsButton from '@/components/my-borrows/addToMyBorrowsButton';
import { API_BASE } from '@/lib/api';

export const instant = false;

const CATEGORY_TONES: Record<string, string> = {
  Fiction: 'bg-emerald-100 text-emerald-900',
  Science: 'bg-sky-100 text-sky-900',
  History: 'bg-amber-100 text-amber-900',
  Kids: 'bg-pink-100 text-pink-900',
  Others: 'bg-indigo-100 text-indigo-900',
};

const BookDetalisPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(`${API_BASE}/books/${id}`, { cache: 'no-store' });
  const book: IBook = await res.json();

  const total = book.totalCopies ?? 0;
  const available = book.availableCopies ?? 0;
  const borrowed = Math.max(total - available, 0);
  const availabilityPct = total > 0 ? Math.round((available / total) * 100) : 0;
  const allLoaned = total > 0 && available === 0;

  const categoryTone = CATEGORY_TONES[book.category] ?? 'bg-green-100 text-green-900';

  const addedOn = book.addedDate ? new Date(book.addedDate) : null;

  const stats = [
    { label: 'Total copies', value: total, tone: 'text-slate-900' },
    { label: 'Available now', value: available, tone: allLoaned ? 'text-red-600' : 'text-green-700' },
    { label: 'On loan', value: borrowed, tone: 'text-slate-900' },
    { label: 'Shelf availability', value: `${availabilityPct}%`, tone: allLoaned ? 'text-red-600' : 'text-green-700' },
  ];

  const facts: { icon: React.ReactNode; label: string; value: React.ReactNode }[] = [
    {
      icon: <UserRound className="size-4" />,
      label: 'Added by',
      value: (
        <span className="flex flex-wrap items-center gap-2">
          <span>{book.userName || 'Unknown'}</span>
          {book.userEmail && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
              <Mail className="size-3" /> {book.userEmail}
            </span>
          )}
        </span>
      ),
    },
    {
      icon: <CalendarPlus className="size-4" />,
      label: 'Listed on',
      value: (
        <span>
          {addedOn ? addedOn.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
        </span>
      ),
    },
    {
      icon: <Tag className="size-4" />,
      label: 'Genre',
      value: <span>{book.category || 'Uncategorised'}</span>,
    },
    {
      icon: <Library className="size-4" />,
      label: 'Catalogue ID',
      value: `BN-${(book._id ?? '').slice(-6).toUpperCase()}`,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f7f2]">
      {/* soft background accents */}
      <div className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 size-96 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-800 transition hover:text-green-950"
        >
          <ArrowLeft className="size-4" /> Back to all books
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* Cover */}
          <section className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-3xl border border-green-950/10 bg-white p-4 shadow-xl shadow-green-950/10 sm:p-6">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-green-50 ring-1 ring-green-950/5">
                <Image
                  src={book.image}
                  alt={book.title || 'Book cover'}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
                <BookOpen className="size-3.5 text-green-700" />
                BookNook community collection
              </div>
            </div>
          </section>

          {/* Details */}
          <section className="space-y-6">
            {/* Header card */}
            <div className="rounded-3xl border border-green-950/10 bg-white p-6 shadow-lg shadow-green-950/5 sm:p-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${categoryTone}`}>
                  <Tag className="size-3" />
                  {book.category || 'Uncategorised'}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${allLoaned ? 'bg-red-100 text-red-700' : availabilityPct <= 25 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                    }`}
                >
                  {allLoaned ? <TriangleAlert className="size-3" /> : <span className="size-1.5 rounded-full bg-current" />}
                  {total === 0 ? 'No copies registered' : allLoaned ? 'All copies on loan' : `${available} of ${total} available`}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                {book.title || 'Untitled book'}
              </h1>
              <p className="mt-2 text-base text-slate-500 sm:text-lg">
                by <span className="font-medium text-slate-700">{book.author || 'Unknown author'}</span>
              </p>

              {/* Stat tiles */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-green-950/5 bg-[#fafcfa] px-4 py-3">
                    <p className={`text-2xl font-extrabold leading-none ${stat.tone}`}>{stat.value}</p>
                    <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Availability meter */}
              <div className="mt-4">
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-green-950/10">
                  <div
                    className={`h-full rounded-full transition-all ${allLoaned ? 'bg-red-400' : 'bg-gradient-to-r from-green-500 to-green-700'}`}
                    style={{ width: `${Math.max(availabilityPct, 3)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {total === 0
                    ? 'This title has no copies in circulation yet.'
                    : allLoaned
                      ? 'Every copy is currently borrowed — check back soon.'
                      : availabilityPct <= 25
                        ? 'Almost fully borrowed — borrow soon to secure a copy.'
                        : 'Plenty of copies are on the shelf right now.'}
                </p>
              </div>

              {/* Borrow CTA */}
              <div className="mt-6 border-t border-green-950/10 pt-5">
                {available > 0 ? (
                  <AddToMyBorrowsButton book={book} />
                ) : (
                  <p className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    <TriangleAlert className="size-4" />
                    All copies are on loan — borrowing is paused for this title.
                  </p>
                )}
              </div>
            </div>

            {/* Description card */}
            <div className="rounded-3xl border border-green-950/10 bg-white p-6 shadow-lg shadow-green-950/5 sm:p-8">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <FileText className="size-5 text-green-700" /> About this book
              </h2>
              {book.description ? (
                <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-slate-600">{book.description}</p>
              ) : (
                <p className="mt-3 text-sm italic text-slate-400">No summary has been added for this title yet.</p>
              )}
            </div>

            {/* Record card */}
            <div className="rounded-3xl border border-green-950/10 bg-white p-6 shadow-lg shadow-green-950/5 sm:p-8">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Library className="size-5 text-green-700" /> Collection record
              </h2>
              <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-start gap-3 border-b border-green-950/5 pb-4 last:border-none sm:[&:nth-last-child(-n+2)]:border-none"
                  >
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-800">
                      {fact.icon}
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{fact.label}</dt>
                      <dd className="mt-1 text-sm font-medium text-slate-800">{fact.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default BookDetalisPage;

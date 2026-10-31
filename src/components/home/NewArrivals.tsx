import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { IBook } from '@/types/book.types';
import { BookCard } from '../books/BookCard';

const NewArrivals = async () => {

    const res = await fetch('http://localhost:5000/books')
    const data = await res.json()

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
                <div>
                    <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Fresh off the press</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        New Arrivals
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Recently added volumes ready for you to explore and borrow today.
                    </p>
                </div>
                <Link href="/books">
                    <Button variant="outline" className="group">
                        <span>View All Books</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                    <p className="text-slate-500">No books found in the collection yet.</p>
                    <Link href="/add-book" className="inline-block mt-3">
                        <Button size="sm">Be the first to add one</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.slice(0, 6).map((book: IBook) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            )}
        </section>
    );
}
export default NewArrivals;
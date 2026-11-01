import { headers } from 'next/headers';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { auth } from '@/lib/auth';
import type { IBook } from '@/types/book.types';
import BorrowListCard from '../../components/my-borrows/borrowListCard';
import { API_BASE } from '@/lib/api';

export const instant = false;

type BorrowedBook = Partial<IBook> & {
    _id: string;
    bookId?: string;
    borrowedAt?: string | Date;
    dueAt?: string | Date;
};

const MyBorrowsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user

    let books: BorrowedBook[] = [];
    if (user) {
        try {
            const res = await fetch(
                `${API_BASE}/my/${encodeURIComponent(user.email)}`,
                { cache: 'no-store' }
            );
            if (res.ok) {
                books = await res.json();
            } else {
                console.error('Failed to load borrowed books:', res.status, await res.text());
            }
        } catch (error) {
            console.error('Could not connect to the borrow API:', error);
        }
    }

    return (
        <main className="min-h-[70vh] bg-[#f4f7f2] px-4 py-10 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-6xl">
                {/* slim header */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">My Borrows</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            {user ? "Books you have picked up from the community." : "Sign in to see your borrowed books."}
                        </p>
                    </div>
                    {user && books.length > 0 && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800">
                            {books.length} on loan
                        </span>
                    )}
                </div>

                {user && books.length > 0 ? (
                    <BorrowListCard books={books} />
                ) : (
                    <section className="rounded-2xl border border-dashed border-green-900/20 bg-white px-6 py-14 text-center">
                        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-green-100 text-green-800">
                            <BookOpen className="size-5" />
                        </span>
                        <h2 className="mt-4 text-lg font-bold text-slate-900">
                            {user ? "Nothing borrowed yet" : "You are signed out"}
                        </h2>
                        <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                            {user
                                ? "Your borrowed books will show up here once you add one."
                                : "Sign in to view the books you have borrowed."}
                        </p>
                        <Link
                            href="/books"
                            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#205C40] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900"
                        >
                            Explore books <BookOpen className="size-4" />
                        </Link>
                    </section>
                )}
            </div>
        </main>
    );
};

export default MyBorrowsPage;

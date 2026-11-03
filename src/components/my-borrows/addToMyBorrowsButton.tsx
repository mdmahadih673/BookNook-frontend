"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import type { IBook } from '@/types/book.types';
import { notify } from '@/lib/notify';
import { BookPlus, CircleCheck, Loader2, TriangleAlert } from 'lucide-react';

const AddToMyBorrowsButton = ({ book }: { book: IBook }) => {
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const openBorrowModal = () => {
        if (!user) {
            router.push(`/signIn?callbackUrl=${encodeURIComponent(`/books/${book._id}`)}`);
            return;
        }
        setError(null);
        setOpen(true);
    };

    const handleBorrow = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!user) {
            setError('Please sign in first to borrow this book.');
            return;
        }

        setPending(true);
        const token = await getTokenFromClient();
        if (!token) {
            setError('Please sign in again to borrow this book.');
            notify('Please sign in again to borrow this book.', 'error');
            setPending(false);
            return;
        }

        const data = {
            ...book,
            bookId: book._id,
            borrowerName: user.name,
            borrowerEmail: user.email,
            borrowerImage: user.image,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/borrows`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const body = await res.json();
            const message = body?.message || 'Borrow request failed. Please try again.';
            if (res.status >= 500) {
                console.error('Borrow request failed:', res.status);
            }
            setError(message);
            notify(message, 'error');
            setPending(false);
            return;
        }

        setDone(true);
        notify('Book borrowed successfully.', 'success');
        setOpen(false);
        router.refresh();
        setPending(false);
    };

    if (done) {
        return (
            <p className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
                <CircleCheck className="size-4" />
                Added to your borrows — find it on the My Borrows page.
            </p>
        );
    }

    return (
        <div>
            <button
                type="button"
                onClick={openBorrowModal}
                className="inline-flex items-center gap-2 rounded-xl bg-[#205C40] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-green-950/15 transition hover:bg-green-900"
            >
                <BookPlus className="size-4" />
                Borrow This Book
            </button>

            {open && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-3 sm:grid sm:place-items-center sm:p-4">
                    <form onSubmit={handleBorrow} role="dialog" aria-modal="true" aria-labelledby="borrow-title" className="mx-auto my-3 max-h-[calc(100dvh_-_1.5rem)] w-full max-w-md space-y-4 overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:my-0 sm:max-h-[calc(100dvh_-_2rem)] sm:p-6">
                        <div>
                            <h2 id="borrow-title" className="text-xl font-bold text-slate-900">Confirm Borrow</h2>
                            <p className="mt-1 text-sm text-slate-600">Borrow “{book.title}” for 14 days?</p>
                        </div>

                        <label className="block text-sm font-medium text-slate-700">Your name
                            <input value={user?.name ?? ""} readOnly className="mt-1 w-full rounded-lg border bg-slate-50 p-3" />
                        </label>
                        <label className="block text-sm font-medium text-slate-700">Your email
                            <input value={user?.email ?? ""} readOnly className="mt-1 w-full rounded-lg border bg-slate-50 p-3" />
                        </label>

                        {error && <p role="alert" className="inline-flex items-center gap-2 text-sm text-red-700"><TriangleAlert className="size-4" />{error}</p>}

                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button type="button" onClick={() => setOpen(false)} disabled={pending} className="w-full rounded-lg border px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-60 sm:w-auto">Cancel</button>
                            <button type="submit" disabled={pending} className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-green-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 sm:w-auto">
                                {pending && <Loader2 className="size-4 animate-spin" />}
                                {pending ? "Borrowing…" : "Confirm Borrow"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddToMyBorrowsButton;

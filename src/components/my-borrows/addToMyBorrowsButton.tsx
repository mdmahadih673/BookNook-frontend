"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { API_BASE } from '@/lib/api';
import type { IBook } from '@/types/book.types';
import { BookPlus, CircleCheck, Loader2, TriangleAlert } from 'lucide-react';

const AddToMyBorrowsButton = ({ book }: { book: IBook }) => {
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleBorrow = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!user) {
            setError('Please sign in first to borrow this book.');
            return;
        }

        setPending(true);
        try {
            const data = {
                ...book,
                bookId: book._id,
                borrowerName: user.name,
                borrowerEmail: user.email,
                borrowerImage: user.image,
            };

            const res = await fetch(`${API_BASE}/my-borrows`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                let message = 'Borrow request failed. Please try again.';
                try {
                    const body = await res.json();
                    if (body?.message) message = body.message;
                } catch {
                    /* server sent HTML or empty body — keep the fallback */
                }
                if (res.status >= 500) {
                    console.error('Borrow request failed:', res.status);
                }
                setError(message);
                return;
            }

            setDone(true);
            router.refresh();
        } catch {
            setError('Could not connect to the library server.');
        } finally {
            setPending(false);
        }
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
            <form onSubmit={handleBorrow}>
                <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#205C40] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-green-950/15 transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {pending ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            Adding to your borrows...
                        </>
                    ) : (
                        <>
                            <BookPlus className="size-4" />
                            Add to My Borrows
                        </>
                    )}
                </button>
            </form>

            {error && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700" role="alert">
                    <TriangleAlert className="size-3.5 shrink-0" />
                    {error}
                </p>
            )}
        </div>
    );
};

export default AddToMyBorrowsButton;

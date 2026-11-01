import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import type { IBook } from '@/types/book.types';
import MyBorrowsDesign from '@/components/My Borrows/MyBorrowsDesign';

export const instant = false;

type BorrowedBook = Partial<IBook> & {
    _id: string;
    bookId?: string;
    borrowedAt?: string | Date;
};

const MyBorrowsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user

    if (!user) {
        return <MyBorrowsDesign books={[]} />;
    }

    let books: BorrowedBook[] = [];
    let loadError: string | undefined;
    try {
        const res = await fetch(
            `https://book-nook-backend-two.vercel.app/my/${encodeURIComponent(user.email)}`,
            { cache: 'no-store' }
        );
        if (!res.ok) {
            loadError = `Could not load your borrowed books (${res.status}).`;
            console.error('Failed to load borrowed books:', res.status, await res.text());
        } else {
            const data: unknown = await res.json();
            if (Array.isArray(data)) {
                books = data as BorrowedBook[];
            } else {
                loadError = 'The borrow service returned an unexpected response.';
                console.error('Invalid borrowed books response:', data);
            }
        }
    } catch (error) {
        loadError = 'Could not connect to the library server.';
        console.error('Could not connect to the borrow API:', error);
    }

    return (
        <MyBorrowsDesign books={books} userName={user.name} loadError={loadError} />
    );
};

export default MyBorrowsPage;

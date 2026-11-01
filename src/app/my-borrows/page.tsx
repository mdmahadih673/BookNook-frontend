import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const instant = false;
import MyBorrowsDesign from '@/components/My Borrows/MyBorrowsDesign';
import type { IBook } from '@/types/book.types';

type BorrowedBook = Partial<IBook> & {
    _id: string;
    bookId?: string;
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
    try {
        const res = await fetch(
            `https://book-nook-backend-two.vercel.app/my/${encodeURIComponent(user.email)}`,
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

    return (
        <MyBorrowsDesign
            books={books}
            userName={user.name}
        />
    );
};

export default MyBorrowsPage;

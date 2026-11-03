import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { redirect } from "next/navigation";
import BorrowListCard from "@/components/my-borrows/borrowListCard";
import type { IBook } from "@/types/book.types";

export const metadata = { title: "My Borrows" };
export const instant = false;

type BorrowedBook = Partial<IBook> & {
  _id: string;
  bookId?: string;
  bookTitle?: string;
  bookImage?: string;
  borrowDate?: string | Date;
  returnDate?: string | Date;
};

export default async function MyBorrowsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) redirect(`/signIn?callbackUrl=${encodeURIComponent("/my-borrows")}`);
  let books: BorrowedBook[] = [];

  if (user) {
    const token = await getTokenFromServer();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/borrows`,
      { cache: "no-store", headers: { Authorization: `Bearer ${token}` } }
    );
    books = response.ok ? await response.json() : [];
  }

  return (
    <main className="min-h-[70vh] bg-[#f4f7f2] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900">My Borrows</h1>
        <p className="mt-2 text-slate-600">Books you have borrowed from BookNook.</p>
        <div className="mt-6">
          {books.length ? (
            <BorrowListCard books={books} />
          ) : (
            <div className="rounded-xl bg-white p-8 text-center">
              <p className="text-slate-600">{user ? "You have not borrowed any books yet." : "Sign in to see your borrowed books."}</p>
              <Link href="/books" className="mt-4 inline-block text-sm font-semibold text-green-800 underline">Browse books</Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

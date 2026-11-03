"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { IBook } from "@/types/book.types";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { notify } from "@/lib/notify";

type BorrowedBook = Partial<IBook> & {
  _id: string;
  bookId?: string;
  bookTitle?: string;
  bookImage?: string;
  borrowDate?: string | Date;
  returnDate?: string | Date;
};

export default function BorrowListCard({ books }: { books: BorrowedBook[] }) {
  const router = useRouter();

  const returnBook = async (id: string, button: HTMLButtonElement) => {
    button.disabled = true;
    const token = await getTokenFromClient();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/borrows/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      notify("Book returned successfully.", "success");
      router.refresh();
    } else {
      notify("Could not return this book.", "error");
      button.disabled = false;
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-green-950/10 bg-white shadow-sm">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-green-50 text-xs uppercase tracking-wide text-green-950">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Borrow Date</th>
            <th className="px-4 py-3">Return Date</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-green-950/10">
          {books.map((book) => {
            const title = book.bookTitle || book.title || "Untitled book";
            const image = book.bookImage || book.image;
            return (
              <tr key={book._id}>
                <td className="px-4 py-3">
                  <div className="relative h-16 w-12 overflow-hidden rounded bg-green-50">
                    {image && <Image src={image} alt={title} fill unoptimized sizes="48px" className="object-cover" />}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {book.bookId ? <Link href={`/books/${book.bookId}`} className="hover:text-green-800 hover:underline">{title}</Link> : title}
                </td>
                <td className="px-4 py-3 text-slate-600">{book.borrowDate ? new Date(book.borrowDate).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-3 text-slate-600">{book.returnDate ? new Date(book.returnDate).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-3">
                  <button onClick={(event) => void returnBook(book._id, event.currentTarget)} className="whitespace-nowrap rounded-lg bg-green-800 px-3 py-2 text-xs font-semibold text-white hover:bg-green-900 disabled:opacity-60">
                    Return Book
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

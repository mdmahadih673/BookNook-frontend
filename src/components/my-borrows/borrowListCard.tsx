"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { IBook } from "@/types/book.types";

type BorrowedBook = Partial<IBook> & {
  _id: string;
  bookId?: string;
  borrowedAt?: string | Date;
  dueAt?: string | Date;
};

export default function BorrowListCard({ books }: { books: BorrowedBook[] }) {
  return (
    <div className="divide-y divide-green-950/10 overflow-hidden rounded-2xl border border-green-950/10 bg-white">
      {books.map((book) => <BorrowRow key={book._id} book={book} />)}
    </div>
  );
}

function BorrowRow({ book }: { book: BorrowedBook }) {
  const router = useRouter();

  const returnBook = async (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.disabled = true;
    const token = await getTokenFromClient();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/borrows/${book._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    response.ok ? router.refresh() : (button.disabled = false);
  };

  return (
    <article className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-green-50">
          {book.image && <Image src={book.image} alt={book.title || "Book cover"} fill unoptimized sizes="64px" className="object-cover" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-green-800">{book.category}</p>
          <h2 className="mt-1 break-words font-semibold text-slate-900">
            {book.bookId ? <Link href={`/books/${book.bookId}`}>{book.title}</Link> : book.title}
          </h2>
          <p className="text-sm text-slate-600">{book.author}</p>
          <p className="mt-2 flex flex-wrap gap-x-1 text-xs text-slate-500">
            Borrowed: {book.borrowedAt ? new Date(book.borrowedAt).toLocaleDateString() : "—"}
            <span className="mx-2">·</span>
            Due: {book.dueAt ? new Date(book.dueAt).toLocaleDateString() : "—"}
          </p>
        </div>
      </div>
      <button onClick={returnBook} className="w-full rounded-lg cursor-pointer bg-[#205C40] px-4 py-2 text-sm font-semibold text-white sm:w-auto sm:shrink-0">
        Return book
      </button>
    </article>
  );
}

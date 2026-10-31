import React from 'react';
import Image from 'next/image';
import { IBook } from '@/types/book.types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MyBorrowsPage from '@/components/My Borrows/MyBorrows';

export const instant = false;

const BookDetalisPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(`https://book-nook-backend-two.vercel.app/books/${id}`, { cache: 'no-store' });
  const book: IBook = await res.json();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 grid md:grid-cols-2 gap-10">
        <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image src={book.image} alt={book.title} fill className="object-cover" />
        </div>
        <div>
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">{book.category}</p>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">{book.title}</h1>
          <p className="text-slate-500 mb-4">by {book.author}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">{book.description}</p>
          <div className="space-y-2 text-sm mt-6">
            <p><span className="font-semibold">Total copies:</span> {book.totalCopies}</p>
            <p><span className="font-semibold">Available:</span> {book.availableCopies}</p>
            <p><span className="font-semibold">Added by:</span> {book.userName} ({book.userEmail})</p>
            <p><span className="font-semibold">Added on:</span> {new Date(book.addedDate).toLocaleDateString()}</p>
          </div>
          {/* <Link href={''} className="mt-6 rounded-xl bg-[#205C40] text-white px-6 py-3 text-sm font-semibold hover:opacity-90 shadow-lg">
            
          </Link> */}
          <MyBorrowsPage book ={book} />
        </div>
      </div>
    </div>
  );
};

export default BookDetalisPage;
import { IBook } from '@/types/book.types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const MyBorrowsPage = ({ book }: { book: IBook }) => {
    return (
        <div>
            <Link
                href={'/my-borrows'}
                className="inline-flex items-center mt-6 bg-[#205C40] text-white gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
                Add to My Borrows
                <ArrowRight className="size-4" />
            </Link>
        </div>
    );
};

export default MyBorrowsPage;
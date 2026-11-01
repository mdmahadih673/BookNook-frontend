"use client"

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { toast } from '@/components/ui/toast';
import type { IBook } from '@/types/book.types';

const MyBorrowsPage = ({ book }: { book: IBook }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const user = session?.user;

  const handleBorrows = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user?.email) {
      toast.add({
        title: "Sign in required",
        description: "Please sign in before borrowing a book.",
        type: "error",
      });
      return;
    }

    const { _id: bookId, ...bookDetails } = book;
    const data = {
      ...bookDetails,
      bookId,
      borrowerName: user.name,
      borrowerEmail: user.email,
      borrowerImage: user.image,
    };

    setPending(true);
    try {
      const res = await fetch('https://book-nook-backend-two.vercel.app/my-borrows', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const details = await res.text();
        console.error("Borrow request failed:", res.status, details);
        let code: string | undefined;
        try {
          const responseData: unknown = JSON.parse(details);
          if (
            typeof responseData === "object" &&
            responseData !== null &&
            "code" in responseData &&
            typeof responseData.code === "string"
          ) {
            code = responseData.code;
          }
        } catch {
          // Non-JSON responses are logged above and shown with a generic toast.
        }

        toast.add({
          title: "Could not borrow book",
          description:
            code === "account_borrow_limit"
              ? "You can borrow only one book at a time. Return your current book first."
              : code === "book_unavailable"
                ? "There are no available copies of this book."
                : "Please try again in a moment.",
          type: "error",
        });
        return;
      }

      toast.add({
        title: "Book borrowed",
        description: "The book has been added to your borrows.",
        type: "success",
      });
      router.refresh();
    } catch (error) {
      console.error("Could not connect to the backend:", error);
      toast.add({
        title: "Connection failed",
        description: "Could not connect to the library server. Please try again.",
        type: "error",
      });
    } finally {
      setPending(false);
    }
  };

    return (
        <div>
            <form onSubmit={handleBorrows}>

                <button
                    type="submit"
                    disabled={pending || book.availableCopies <= 0}
                    className="inline-flex cursor-pointer items-center mt-6 bg-[#205C40] text-white gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {pending
                      ? "Adding..."
                      : book.availableCopies <= 0
                        ? "Not Available"
                        : "Add to My Borrows"}
                    <ArrowRight className="size-4" />
                </button>
            </form>
        </div>
    );
};

export default MyBorrowsPage;

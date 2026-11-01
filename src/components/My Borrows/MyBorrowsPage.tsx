"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { ArrowRight } from "lucide-react";
import type { IBook } from "@/types/book.types";

const API_BASE = "https://book-nook-backend-two.vercel.app";

type BorrowedBook = Partial<IBook> & { bookId?: string };

export default function MyBorrowsPage({ book }: { book: IBook }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleBorrow(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = session?.user;
    if (!user?.email) {
      toast.add({
        title: "Sign in required",
        description: "Please sign in before borrowing a book.",
        type: "error",
      });
      return;
    }

    setPending(true);
    try {
      const borrowedResponse = await fetch(
        `${API_BASE}/my/${encodeURIComponent(user.email)}`,
        { cache: "no-store" },
      );
      if (!borrowedResponse.ok) {
        toast.add({
          title: "Could not check your books",
          description: `Server returned ${borrowedResponse.status}.`,
          type: "error",
        });
        return;
      }

      const borrowedBooks: unknown = await borrowedResponse.json();
      if (!Array.isArray(borrowedBooks)) {
        toast.add({
          title: "Could not check your books",
          description: "The server returned an invalid response.",
          type: "error",
        });
        return;
      }

      let alreadyBorrowed = false;
      for (const borrowedBook of borrowedBooks as BorrowedBook[]) {
        if (
          borrowedBook.bookId === book._id ||
          (!borrowedBook.bookId &&
            borrowedBook.title === book.title &&
            borrowedBook.author === book.author)
        ) {
          alreadyBorrowed = true;
          break;
        }
      }

      if (alreadyBorrowed) {
        toast.add({
          title: "Already added",
          description: "You have already added this book to My Borrows.",
          type: "error",
        });
        return;
      }

      const { _id: bookId, ...bookDetails } = book;
      const addResponse = await fetch(`${API_BASE}/my-borrows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookDetails,
          bookId,
          borrowerName: user.name,
          borrowerEmail: user.email,
          borrowerImage: user.image,
        }),
      });

      if (!addResponse.ok) {
        toast.add({
          title: "Could not add book",
          description: `Server returned ${addResponse.status}.`,
          type: "error",
        });
        return;
      }

      toast.add({
        title: "Book added",
        description: "The book is now in My Borrows.",
        type: "success",
      });
      router.push("/my-borrows");
    } catch (error) {
      console.error("Borrow request failed:", error);
      toast.add({
        title: "Connection failed",
        description: "Could not connect to the library server. Please try again.",
        type: "error",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleBorrow}>
      <button
        type="submit"
        disabled={pending || Number(book.availableCopies) <= 0}
        className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#205C40] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending
          ? "Adding..."
          : Number(book.availableCopies) <= 0
            ? "Not Available"
            : "Add to My Borrows"}
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}

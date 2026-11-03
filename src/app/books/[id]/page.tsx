import Image from "next/image";
import Link from "next/link";
import type { IBook } from "@/types/book.types";
import AddToMyBorrowsButton from "@/components/my-borrows/addToMyBorrowsButton";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { auth, ensureAuthDatabase } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = { title: "Book Details" };
export const instant = false;

async function getBook(id: string): Promise<IBook | null> {
  const token = await getTokenFromServer();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/books/${id}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.ok ? response.json() : null;
}

export default async function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await ensureAuthDatabase();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect(`/signIn?callbackUrl=${encodeURIComponent(`/books/${id}`)}`);
  const book = await getBook(id);

  return (
    <main className="min-h-screen bg-[#f4f7f2] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/books" className="text-sm font-medium text-green-800 underline">← Back to books</Link>

        {book ? (
          <article className="mt-6 flex flex-col gap-6 rounded-2xl border border-green-950/10 bg-white p-5 shadow-md shadow-green-950/5 sm:flex-row sm:p-7">
            <div className="relative h-72 w-full shrink-0 overflow-hidden rounded-xl bg-green-50 ring-1 ring-green-950/10 sm:h-80 sm:w-56">
              {book.image && <Image src={book.image} alt={book.title} fill unoptimized sizes="224px" className="object-cover" />}
            </div>

            <div className="flex min-w-0 flex-col items-start">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-900">{book.category}</span>
              <h1 className="mt-3 break-words font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{book.title}</h1>
              <p className="mt-1 text-slate-600">by {book.author}</p>
              <p className="mt-5 border-l-2 border-amber-500 pl-4 text-sm leading-6 text-slate-700">{book.description || "No description available."}</p>
              <p className="mt-4 text-sm text-slate-600">Added by {book.userName || "Unknown"}</p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {book.availableCopies > 0
                  ? `${book.availableCopies} of ${book.totalCopies} copies available`
                  : "Not available"}
              </p>
              <div className="mt-5">
                {book.availableCopies > 0
                  ? <AddToMyBorrowsButton book={book} />
                  : <span className="text-sm text-slate-500">All copies are currently borrowed.</span>}
              </div>
            </div>
          </article>
        ) : (
          <p className="mt-6 rounded-xl bg-white p-6 text-slate-600">Book not found.</p>
        )}
      </div>
    </main>
  );
}

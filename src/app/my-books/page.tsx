import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { redirect } from "next/navigation";
import type { IBook } from "@/types/book.types";
import EditBookButton from "@/components/my-books/EditBookButton";
import DeleteBookButton from "@/components/my-books/DeleteBookButton";

export const metadata = { title: "My Books" };
export const instant = false;

export default async function MyBooksPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) redirect(`/signIn?callbackUrl=${encodeURIComponent("/my-books")}`);

  let books: IBook[] = [];

  if (user) {
    const token = await getTokenFromServer();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/books?mine=true`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      books = await response.json();
    } else {
      console.error("Failed to load books:", response.status, await response.text());
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7f2] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-green-800">Your collection</p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900">My Books</h1>
        </header>

        {books.length ? (
          <div className="overflow-hidden rounded-2xl border border-green-950/10 bg-white shadow-md shadow-green-950/5">
            <div className="divide-y divide-green-950/10">
            {books.map((book) => (
              <article key={book._id} className="flex flex-col gap-4 px-5 py-5 transition-colors hover:bg-green-50/40 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-green-50">
                    {book.image && <Image src={book.image} alt={book.title} fill sizes="64px" unoptimized className="object-cover" />}
                  </div>
                  <div className="min-w-0">
                    <span className="inline-flex rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-900">{book.category}</span>
                    <h2 className="mt-1.5 break-words text-lg font-bold text-slate-900">{book.title}</h2>
                    <p className="truncate text-sm text-slate-600">{book.author}</p>
                    <p className="mt-1 text-xs text-slate-500">{book.availableCopies} of {book.totalCopies} copies available</p>
                  </div>
                </div>
                <div className="flex w-full gap-2 sm:w-auto sm:shrink-0">
                  <EditBookButton book={book} />
                  <DeleteBookButton book={book} />
                </div>
              </article>
            ))}
            </div>
          </div>
        ) : (
          <p className="rounded-xl bg-white p-6 text-slate-600">You have not added any books yet.</p>
        )}
      </div>
    </main>
  );
}

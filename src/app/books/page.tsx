import BooksCatalog from "@/components/books/BooksCatalog";
import type { IBook } from "@/types/book.types";

export const metadata = { title: "All Books" };
export const instant = false;

async function getBooks(): Promise<IBook[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/books`, { cache: "no-store" });
  return response.ok ? response.json() : [];
}

export default async function AllBooksPage() {
  const books = await getBooks();
  return <BooksCatalog books={books} />;
}

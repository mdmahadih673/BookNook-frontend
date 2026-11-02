"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { IBook } from "@/types/book.types";

export default function EditBookButton({ book }: { book: IBook }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const editBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const updates = Object.fromEntries(new FormData(form).entries());
    const token = await getTokenFromClient();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/books/${book._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="flex-1 rounded-lg cursor-pointer border border-green-800 px-3 py-2 text-sm font-semibold text-green-800 hover:bg-green-50 sm:flex-none">
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-3 sm:grid sm:place-items-center sm:p-4">
          <form onSubmit={editBook} className="mx-auto my-3 max-h-[calc(100dvh_-_1.5rem)] w-full max-w-md space-y-3 overflow-y-auto rounded-2xl bg-white p-5 sm:my-0 sm:max-h-[calc(100dvh_-_2rem)] sm:p-6">
            <h2 className="text-xl font-bold">Edit book</h2>
            <input name="title" defaultValue={book.title} required placeholder="Book title" className="w-full rounded-lg border p-3" />
            <input name="author" defaultValue={book.author} required placeholder="Author" className="w-full rounded-lg border p-3" />
            <select name="category" defaultValue={book.category} className="w-full rounded-lg border bg-white p-3">
              <option>Fiction</option><option>Science</option><option>History</option><option>Kids</option><option>Others</option>
            </select>
            <input name="image" defaultValue={book.image} placeholder="Image URL" className="w-full rounded-lg border p-3" />
            <textarea name="description" defaultValue={book.description} placeholder="Description" rows={3} className="w-full rounded-lg border p-3" />
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setOpen(false)} className="w-full rounded-lg cursor-pointer border px-4 py-2 sm:w-auto">Cancel</button>
              <button className="w-full rounded-lg cursor-pointer bg-green-800 px-4 py-2 font-semibold text-white sm:w-auto">Save</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { IBook } from "@/types/book.types";

export default function DeleteBookButton({ book }: { book: IBook }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const deleteBook = async () => {
    const token = await getTokenFromClient();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/books/${book._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="flex-1 rounded-lg cursor-pointer bg-[#7A2E1D] px-3 py-2 text-sm font-semibold text-white hover:bg-[#642416] sm:flex-none">
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-3 sm:grid sm:place-items-center sm:p-4">
          <div role="alertdialog" aria-modal="true" className="mx-auto my-3 w-full max-w-sm rounded-2xl bg-white p-5 sm:my-0 sm:p-6">
            <h2 className="text-xl font-bold">Delete this book?</h2>
            <p className="mt-2 text-sm text-slate-600">{book.title} will be removed from your books.</p>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setOpen(false)} className="w-full rounded-lg cursor-pointer border px-4 py-2 sm:w-auto">Cancel</button>
              <button type="button" onClick={deleteBook} className="w-full rounded-lg bg-red-700 px-4 cursor-pointer py-2 font-semibold text-white sm:w-auto">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

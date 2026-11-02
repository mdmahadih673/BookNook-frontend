"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { BookCategory } from "@/types/book.types";
import { AddBookSkeleton } from "@/components/shared/Skeletons";

const categories: BookCategory[] = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [message, setMessage] = useState("");

  const addBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    const form = new FormData(event.currentTarget);
    const totalCopies = Number(form.get("totalCopies"));
    const coverImage = form.get("coverImage");

    if (!(coverImage instanceof File) || !coverImage.size) {
      setMessage("Choose a cover image first.");
      return;
    }

    const imageApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!imageApiKey) {
      setMessage("Add NEXT_PUBLIC_IMGBB_API_KEY to the frontend environment first.");
      return;
    }

    const uploadForm = new FormData();
    uploadForm.append("image", coverImage);
    const uploadResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, {
      method: "POST",
      body: uploadForm,
    });
    const uploadData = await uploadResponse.json();
    if (!uploadResponse.ok || !uploadData.success || !uploadData.data?.url) {
      setMessage(uploadData.error?.message || "Could not upload the cover image.");
      return;
    }

    const token = await getTokenFromClient();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title: form.get("title"),
        author: form.get("author"),
        category: form.get("category"),
        image: uploadData.data.url,
        description: form.get("description"),
        totalCopies,
        availableCopies: totalCopies,
        addedDate: new Date().toISOString(),
        userName: session?.user.name,
        userEmail: session?.user.email,
      }),
    });

    if (response.ok) {
      router.push("/books");
      router.refresh();
    } else {
      setMessage("Could not add the book. Please check the form and try again.");
    }
  };

  if (isPending) return <AddBookSkeleton />;

  return (
    <main className="min-h-screen bg-[#f4f7f2] px-4 py-10">
      <form onSubmit={addBook} className="mx-auto max-w-xl space-y-4 rounded-2xl border border-green-950/10 bg-white p-6 shadow-md shadow-green-950/5 sm:p-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-green-800">Share your shelf</p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900">Add a book</h1>
          <p className="mt-2 text-sm text-slate-600">Share a book with the BookNook community.</p>
        </div>

        <label className="block text-sm font-medium text-slate-700">Book title
          <input name="title" required className="mt-1 w-full rounded-lg border border-slate-200 p-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Author
          <input name="author" required className="mt-1 w-full rounded-lg border border-slate-200 p-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Category
          <select name="category" required className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15">
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">Cover image
          <input name="coverImage" type="file" accept="image/*" required className="mt-1 min-w-0 w-full rounded-lg border border-slate-200 bg-white p-3 text-xs outline-none transition file:mr-2 file:max-w-[45%] file:truncate file:rounded-md file:border-0 file:bg-green-50 file:px-2 file:py-1.5 file:font-medium file:text-green-900 sm:text-sm sm:file:mr-3 sm:file:px-3 focus:border-green-700 focus:ring-2 focus:ring-green-700/15" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Description
          <textarea name="description" required rows={4} className="mt-1 w-full rounded-lg border border-slate-200 p-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Total copies
          <input name="totalCopies" type="number" min="1" required className="mt-1 w-full rounded-lg border border-slate-200 p-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Added by
          <input value={session?.user.name ?? ""} readOnly className="mt-1 w-full rounded-lg border bg-slate-50 p-3" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Email
          <input value={session?.user.email ?? ""} readOnly className="mt-1 w-full rounded-lg border bg-slate-50 p-3" />
        </label>

        {message && <p role="alert" className="text-sm text-red-700">{message}</p>}
        <button className="w-full rounded-lg bg-green-800 p-3 font-semibold text-white shadow-sm transition hover:bg-green-900">Add Book</button>
      </form>
    </main>
  );
}

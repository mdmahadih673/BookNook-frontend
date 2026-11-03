"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { notify } from "@/lib/notify";
import type { BookCategory } from "@/types/book.types";

const categories: BookCategory[] = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookForm({ user }: { user: { name: string; email: string } }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const addBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const coverImage = form.get("coverImage");
    const imageApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!(coverImage instanceof File) || !coverImage.size) {
      notify("Choose a cover image first.", "error");
      return;
    }
    if (!imageApiKey) {
      notify("Image upload is not configured.", "error");
      return;
    }

    setSaving(true);
    try {
      const uploadForm = new FormData();
      uploadForm.append("image", coverImage);
      const uploadResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, {
        method: "POST",
        body: uploadForm,
      });
      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok || !uploadData.success || !uploadData.data?.url) {
        throw new Error(uploadData.error?.message || "Could not upload the cover image.");
      }

      const totalCopies = Number(form.get("totalCopies"));
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
          userName: user.name,
          userEmail: user.email,
        }),
      });
      if (!response.ok) throw new Error("Could not add the book. Please try again.");

      notify("Book added successfully.", "success");
      router.push("/books");
      router.refresh();
    } catch (error) {
      notify(error instanceof Error ? error.message : "Could not add the book.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7f2] px-4 py-10">
      <form onSubmit={addBook} className="mx-auto max-w-xl space-y-4 rounded-2xl border border-green-950/10 bg-white p-6 shadow-md shadow-green-950/5 sm:p-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-green-800">Share your shelf</p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900">Add a book</h1>
          <p className="mt-2 text-sm text-slate-600">Share a book with the BookNook community.</p>
        </div>
        <label className="block text-sm font-medium text-slate-700">Book title
          <input name="title" required className="mt-1 w-full rounded-lg border border-slate-200 p-3" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Author
          <input name="author" required className="mt-1 w-full rounded-lg border border-slate-200 p-3" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Category
          <select name="category" required className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-3">
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">Cover image
          <input name="coverImage" type="file" accept="image/*" required className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Description
          <textarea name="description" required rows={4} className="mt-1 w-full rounded-lg border border-slate-200 p-3" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Total copies
          <input name="totalCopies" type="number" min="1" required className="mt-1 w-full rounded-lg border border-slate-200 p-3" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Added by
          <input value={user.name} readOnly className="mt-1 w-full rounded-lg border bg-slate-50 p-3" />
        </label>
        <label className="block text-sm font-medium text-slate-700">Email
          <input value={user.email} readOnly className="mt-1 w-full rounded-lg border bg-slate-50 p-3" />
        </label>
        <button disabled={saving} className="w-full rounded-lg bg-green-800 p-3 font-semibold text-white disabled:opacity-60">
          {saving ? "Uploading…" : "Add Book"}
        </button>
      </form>
    </main>
  );
}

"use client";

import { BookOpen, CalendarDays, ImagePlus, LibraryBig, Sparkles } from "lucide-react";
import type { BookCategory } from "@/types/book.types";
import type { FormEvent, ReactNode } from "react";

const categories: BookCategory[] = ["Fiction", "Science", "History", "Kids", "Others"];

const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100";

function Field({
    label,
    htmlFor,
    children,
}: {
    label: string;
    htmlFor: string;
    children: ReactNode;
}) {
    return (
        <div>
            <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-700">
                {label}
            </label>
            {children}
        </div>
    );
}

const AddBookPage = () => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const bookData = Object.fromEntries(formData.entries());


        try {
            const response = await fetch(
                "https://book-nook-backend-two.vercel.app/books",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bookData),
                }
            );

            if (!response.ok) {
                console.error("Book save failed:", await response.text());
                return;
            }

            console.log("Book saved:", await response.json());
            event.currentTarget.reset();
        } catch (error) {
            console.error("Could not connect to the server:", error);
        }
    };

    return (
        <main className="min-h-screen bg-[#f4f7f2] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-green-900">
                        <Sparkles className="h-3.5 w-3.5" />
                        Grow the collection
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Add a book
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                        Share a great read with the BookNook community. Add the details below
                        to create its listing.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
                    >
                        <section>
                            <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-800">
                                    <BookOpen className="h-5 w-5" />
                                </span>
                                <div>
                                    <h2 className="font-bold text-slate-900">Book details</h2>
                                    <p className="text-xs text-slate-500">
                                        Tell readers what they can discover.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field label="Book title" htmlFor="title">
                                    <input
                                        id="title"
                                        name="title"
                                        required
                                        placeholder="e.g. The Midnight Library"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Author" htmlFor="author">
                                    <input
                                        id="author"
                                        name="author"
                                        required
                                        placeholder="Author's name"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Category" htmlFor="category">
                                    <select
                                        id="category"
                                        name="category"
                                        required
                                        defaultValue=""
                                        className={`${inputClass} appearance-none`}
                                    >
                                        <option value="" disabled>
                                            Select a category
                                        </option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <Field label="Cover image URL" htmlFor="image">
                                    <div className="relative">
                                        <ImagePlus className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="image"
                                            name="image"
                                            type="url"
                                            required
                                            placeholder="https://example.com/book-cover.jpg"
                                            className={`${inputClass} pl-11`}
                                        />
                                    </div>
                                </Field>

                                <div className="sm:col-span-2">
                                    <Field label="Description" htmlFor="description">
                                        <textarea
                                            id="description"
                                            name="description"
                                            required
                                            rows={4}
                                            placeholder="A short introduction to this book..."
                                            className={`${inputClass} resize-y`}
                                        />
                                    </Field>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <LibraryBig className="h-5 w-5" />
                                </span>
                                <div>
                                    <h2 className="font-bold text-slate-900">Copies & listing</h2>
                                    <p className="text-xs text-slate-500">
                                        Set availability and listing date.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-3">
                                <Field label="Total copies" htmlFor="totalCopies">
                                    <input
                                        id="totalCopies"
                                        name="totalCopies"
                                        type="number"
                                        min="0"
                                        required
                                        placeholder="0"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Available copies" htmlFor="availableCopies">
                                    <input
                                        id="availableCopies"
                                        name="availableCopies"
                                        type="number"
                                        min="0"
                                        required
                                        placeholder="0"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Added date" htmlFor="addedDate">
                                    <div className="relative">
                                        <CalendarDays className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="addedDate"
                                            name="addedDate"
                                            type="date"
                                            required
                                            className={`${inputClass} pl-11`}
                                        />
                                    </div>
                                </Field>
                            </div>
                        </section>

                        <section>
                            <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                    <span className="text-lg font-bold">@</span>
                                </span>
                                <div>
                                    <h2 className="font-bold text-slate-900">Added by</h2>
                                    <p className="text-xs text-slate-500">
                                        Contact details for the book contributor.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field label="Your name" htmlFor="userName">
                                    <input
                                        id="userName"
                                        name="userName"
                                        autoComplete="name"
                                        required
                                        placeholder="Full name"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Email address" htmlFor="userEmail">
                                    <input
                                        id="userEmail"
                                        name="userEmail"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        placeholder="you@example.com"
                                        className={inputClass}
                                    />
                                </Field>
                            </div>
                        </section>

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                            <button
                                type="reset"
                                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                                Clear form
                            </button>
                            <button
                                type="submit"
                                className="rounded-xl bg-green-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-900"
                            >
                                Create book listing
                            </button>
                        </div>
                    </form>

                    <aside className="h-fit overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-800 to-emerald-950 p-6 text-white shadow-lg shadow-green-950/20 lg:sticky lg:top-6">
                        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-200/15 text-lime-100">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-200">
                            A little more to share
                        </p>
                        <h2 className="mt-3 text-2xl font-extrabold leading-tight">
                            Every book opens a new door.
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-green-100">
                            Add a thoughtful description and a clear cover image so readers can
                            find their next favorite.
                        </p>
                        <div className="mt-8 rounded-2xl border border-lime-100/20 bg-green-950/25 p-4">
                            <p className="text-sm font-semibold">Listing checklist</p>
                            <ul className="mt-3 space-y-2 text-sm text-green-100">
                                <li>• Accurate title and author</li>
                                <li>• Correct copy availability</li>
                                <li>• A helpful book description</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default AddBookPage;
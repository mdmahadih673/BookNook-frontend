"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { ArrowRight } from "lucide-react";
import type { IBook } from "@/types/book.types";

const API_BASE = "https://book-nook-backend-two.vercel.app";

async function getErrorMessage(response: Response) {
    const body = await response.text();
    try {
        const data: unknown = JSON.parse(body);
        if (typeof data === "object" && data !== null) {
            if ("message" in data && typeof data.message === "string") return data.message;
            if ("error" in data && typeof data.error === "string") return data.error;
        }
    } catch {
        const message = body.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
        if (message) return message.slice(0, 180);
    }
    return `Request failed (${response.status}). Please try again.`;
}

export default function MyBorrowsPage({ book }: { book: IBook }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [pending, setPending] = useState(false);

    const handleBorrow = async (event: FormEvent<HTMLFormElement>) => {
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
            const existingResponse = await fetch(
                `${API_BASE}/my/${encodeURIComponent(user.email)}`,
                { cache: "no-store" },
            );
            if (!existingResponse.ok) {
                throw new Error(await getErrorMessage(existingResponse));
            }

            const existingBooks: unknown = await existingResponse.json();
            if (!Array.isArray(existingBooks)) {
                throw new Error("The borrow service returned an unexpected response.");
            }
            if (existingBooks.length > 0) {
                toast.add({
                    title: "Borrow limit reached",
                    description: "This account already has a book in My Borrows.",
                    type: "error",
                });
                return;
            }

            const { _id: bookId, ...bookDetails } = book;
            const response = await fetch(`${API_BASE}/my-borrows`, {
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

            if (!response.ok) {
                const message = await getErrorMessage(response);
                console.error("Borrow request failed:", response.status, message);
                toast.add({
                    title: "Could not borrow book",
                    description: message,
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
            console.error("Could not connect to the borrow API:", error);
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

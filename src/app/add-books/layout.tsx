import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Add a Book" };

export default function AddBooksLayout({ children }: { children: ReactNode }) {
  return children;
}

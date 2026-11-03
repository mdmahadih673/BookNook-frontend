import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, ensureAuthDatabase } from "@/lib/auth";
import AddBookForm from "@/components/books/AddBookForm";

export const metadata = { title: "Add a Book" };
export const instant = false;

export default async function AddBookPage() {
  await ensureAuthDatabase();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect(`/signIn?callbackUrl=${encodeURIComponent("/add-book")}`);

  return <AddBookForm user={{ name: session.user.name, email: session.user.email }} />;
}

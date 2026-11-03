import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="bg-[#f4f7f2] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-2xl bg-green-900 p-7 text-white sm:p-10">
        <h2 className="text-2xl font-bold">You Have a book to share?</h2>
        <p className="mt-2 max-w-xl text-sm text-white/80">Add it to BookNook and help someone find their next read.</p>
        <Link href="/add-book" className="mt-5 inline-block rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-green-900">Add a book</Link>
      </div>
    </section>
  );
}

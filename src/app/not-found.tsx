import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[65vh] place-items-center bg-[#f4f7f2] px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-green-950/10 bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-800">404</p>
        <h1 className="mt-3 font-serif text-3xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">We couldn’t find the page you’re looking for.</p>
        <Link href="/" className="mt-6 inline-block rounded-lg bg-green-800 px-5 py-2.5 font-semibold text-white hover:bg-green-900">
          Back to Home
        </Link>
      </section>
    </main>
  );
}

import Link from "next/link";

export function FooterPage() {
  return (
    <footer className="border-t-4 border-amber-500/70 bg-[#24483B] px-4 py-9 text-white sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="font-serif text-xl font-bold tracking-tight">BookNook<span className="text-amber-400">.</span></Link>
          <p className="mt-1 text-sm text-white/80">A small library for sharing good books.</p>
          <a href="mailto:hello@booknook.com" className="mt-1 inline-block text-sm text-white/80 underline">Contact us</a>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <a href="https://x.com" aria-label="X" className="underline">X</a>
          <a href="https://facebook.com" aria-label="Facebook" className="underline">Facebook</a>
          <a href="https://instagram.com" aria-label="Instagram" className="underline">Instagram</a>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-7xl border-t border-white/20 pt-4 text-xs text-white/70">© 2026 BookNook</p>
    </footer>
  );
}

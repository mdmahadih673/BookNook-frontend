function Block({ className }: { className: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />;
}

function BookCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="overflow-hidden rounded-2xl border bg-white p-4">
          <Block className="h-56 w-full" />
          <Block className="mt-4 h-5 w-3/4" />
          <Block className="mt-3 h-4 w-1/2" />
          <Block className="mt-5 h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

export function BooksPageSkeleton() {
  return (
    <main role="status" aria-label="Loading books" className="min-h-screen bg-[#f4f7f2] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Block className="h-9 w-48" />
        <Block className="mt-3 h-4 w-72 max-w-full" />
        <div className="my-7 flex gap-3"><Block className="h-10 w-40" /><Block className="h-10 w-36" /></div>
        <BookCards />
      </div>
      <span className="sr-only">Loading books…</span>
    </main>
  );
}

export function NewArrivalsSkeleton() {
  return (
    <section role="status" aria-label="Loading new arrivals" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Block className="mb-5 h-8 w-48" />
      <BookCards />
      <span className="sr-only">Loading new arrivals…</span>
    </section>
  );
}

export function BookListSkeleton() {
  return (
    <main role="status" aria-label="Loading books" className="min-h-screen bg-[#f4f7f2] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Block className="mb-6 h-9 w-48" />
        <div className="space-y-4 rounded-2xl border bg-white p-5">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 border-b py-4 last:border-0">
              <Block className="h-24 w-16 shrink-0" />
              <div className="flex-1"><Block className="h-5 w-1/3" /><Block className="mt-3 h-4 w-1/4" /></div>
              <Block className="h-9 w-24" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading your books…</span>
    </main>
  );
}

export function BookDetailsSkeleton() {
  return (
    <main role="status" aria-label="Loading book details" className="min-h-screen bg-[#f4f7f2] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Block className="h-5 w-36" />
        <div className="mt-6 flex flex-col gap-6 rounded-2xl border bg-white p-5 sm:flex-row sm:p-7">
          <Block className="h-72 w-full shrink-0 sm:h-80 sm:w-56" />
          <div className="flex-1"><Block className="h-6 w-28" /><Block className="mt-5 h-10 w-3/4" /><Block className="mt-4 h-4 w-1/3" /><Block className="mt-8 h-20 w-full" /><Block className="mt-7 h-11 w-40" /></div>
        </div>
      </div>
      <span className="sr-only">Loading book details…</span>
    </main>
  );
}

export function ProfileSkeleton() {
  return (
    <main role="status" aria-label="Loading profile" className="min-h-[70vh] bg-[#f4f7f2] px-4 py-10">
      <div className="mx-auto max-w-xl rounded-2xl border bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4"><Block className="size-20 rounded-full" /><div><Block className="h-6 w-40" /><Block className="mt-3 h-4 w-52" /></div></div>
        <Block className="mt-7 h-10 w-32" />
      </div>
      <span className="sr-only">Loading profile…</span>
    </main>
  );
}

export function AddBookSkeleton() {
  return (
    <main role="status" aria-label="Loading add book form" className="min-h-screen bg-[#f4f7f2] px-4 py-10">
      <div className="mx-auto max-w-xl space-y-5 rounded-2xl border bg-white p-6 sm:p-8">
        <Block className="h-8 w-44" />
        {[1, 2, 3, 4, 5, 6].map((item) => <Block key={item} className="h-12 w-full" />)}
      </div>
      <span className="sr-only">Loading form…</span>
    </main>
  );
}

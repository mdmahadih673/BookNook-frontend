const steps = [
  { title: "Find a book", text: "Browse the collection and open a book you like." },
  { title: "Borrow it", text: "Sign in and borrow an available copy." },
  { title: "Return it", text: "When you finish, return the book for another reader." },
];

export function HowBorrowingWorks() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-slate-900">How Borrowing Works</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-xl border p-5">
              <p className="text-sm font-semibold text-green-800">Step {index + 1}</p>
              <h3 className="mt-2 font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

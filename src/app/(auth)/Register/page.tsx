"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signIn, signUp } from "@/lib/auth-client";

function getCallbackURL() {
  const requested = new URLSearchParams(window.location.search).get("callbackUrl");
  if (!requested?.startsWith("/")) return "/";

  const destination = new URL(requested, window.location.origin);
  return destination.origin === window.location.origin
    ? `${destination.pathname}${destination.search}${destination.hash}`
    : "/";
}

export default function RegisterPage() {
  const router = useRouter();
  const [state, setState] = useState({ error: "", pending: false });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");
    const image = String(form.get("image") ?? "").trim();

    const validPassword = password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password);
    if (!validPassword) {
      setState({ error: "Password needs uppercase and lowercase letters, and at least 6 characters.", pending: false });
      return;
    }
    if (password !== confirmPassword) {
      setState({ error: "Passwords do not match.", pending: false });
      return;
    }

    setState({ error: "", pending: true });
    const { error } = await signUp.email({ name, email, password, image: image || undefined });

    if (error) {
      setState({ error: error.message || "Could not create your account.", pending: false });
    } else {
      router.push(`/signIn?callbackUrl=${encodeURIComponent(getCallbackURL())}`);
    }
  };

  const handleGoogle = async () => {
    setState({ error: "", pending: true });
    const { error } = await signIn.social({ provider: "google", callbackURL: getCallbackURL() });
    if (error) {
      setState({ error: error.message || "Google sign-in failed.", pending: false });
    }
  };

  const handleGitHub = async () => {
    setState({ error: "", pending: true });
    const { error } = await signIn.social({ provider: "github", callbackURL: getCallbackURL() });
    if (error) {
      setState({ error: error.message || "GitHub sign-in failed.", pending: false });
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f7f2] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-green-950/10 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900">Create account</h1>
        <p className="mt-2 text-sm text-slate-600">Join the BookNook community.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700">Name
            <input name="name" required className="mt-1 w-full rounded-lg border p-3" />
          </label>
          <label className="block text-sm font-medium text-slate-700">Email
            <input name="email" type="email" required className="mt-1 w-full rounded-lg border p-3" />
          </label>
          <label className="block text-sm font-medium text-slate-700">Photo URL
            <input name="image" type="url" className="mt-1 w-full rounded-lg border p-3" />
          </label>
          <label className="block text-sm font-medium text-slate-700">Password
            <input name="password" type="password" required className="mt-1 w-full rounded-lg border p-3" />
          </label>
          <p className="-mt-2 text-xs text-slate-500">At least 6 characters, with uppercase and lowercase letters.</p>
          <label className="block text-sm font-medium text-slate-700">Confirm password
            <input name="confirmPassword" type="password" required className="mt-1 w-full rounded-lg border p-3" />
          </label>
          {state.error && <p role="alert" className="text-sm text-red-700">{state.error}</p>}
          <button disabled={state.pending} className="w-full rounded-lg bg-green-800 p-3 font-semibold text-white disabled:opacity-60">
            {state.pending ? "Creating account…" : "Register"}
          </button>
        </form>

        <button type="button" onClick={handleGoogle} disabled={state.pending} className="mt-3 w-full rounded-lg border p-3 font-semibold text-slate-700 disabled:opacity-60">
          Sign up with Google
        </button>
        <button type="button" onClick={handleGitHub} disabled={state.pending} className="mt-2 w-full rounded-lg border p-3 font-semibold text-slate-700 disabled:opacity-60">
          Sign up with GitHub
        </button>
        <p className="mt-5 text-center text-sm text-slate-600">Already registered? <Link href="/signIn" onClick={(event) => {
          const callbackURL = getCallbackURL();
          if (callbackURL !== "/") {
            event.preventDefault();
            router.push(`/signIn?callbackUrl=${encodeURIComponent(callbackURL)}`);
          }
        }} className="font-semibold text-green-800 underline">Sign in</Link></p>
      </section>
    </main>
  );
}

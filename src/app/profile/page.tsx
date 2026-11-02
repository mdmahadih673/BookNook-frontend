"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import EditProfile from "@/components/profile/EditProfile";
import { ProfileSkeleton } from "@/components/shared/Skeletons";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const user = session?.user;

  const logout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  if (isPending) return <ProfileSkeleton />;
  if (!user) {
    return (
      <main className="mx-auto max-w-md px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">You are signed out</h1>
        <Link href="/signIn" className="mt-4 inline-block text-green-800 underline">Sign in</Link>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#f4f7f2] px-4 py-10">
      <section className="mx-auto max-w-xl rounded-2xl border border-green-950/10 bg-white p-6 shadow-md shadow-green-950/5 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-green-100 ring-4 ring-green-50">
            {user.image
              ? <Image src={user.image} alt={user.name} fill unoptimized className="object-cover" />
              : <span className="grid size-full place-items-center text-2xl font-bold text-green-900">{user.name.charAt(0)}</span>}
          </div>
          <div className="min-w-0">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900">{user.name}</h1>
            <p className="break-all text-sm text-slate-600">{user.email}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <EditProfile
            name={user.name}
            onUpdated={() => void refetch({ query: { disableCookieCache: true } })}
          />
          <button onClick={logout} className="rounded-lg border px-4 py-2 text-sm font-semibold text-slate-700">Sign out</button>
        </div>
      </section>
    </main>
  );
}

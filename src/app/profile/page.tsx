"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { signOut, updateUser, useSession } from "@/lib/auth-client";
import { imageFileToDataUrl } from "@/lib/image-file";
import { BookOpen, CircleCheck, ImagePlus, LogOut, Mail, Pencil, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePending, setProfilePending] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const openProfileEditor = () => {
    setProfileMessage(null);
    setEditingProfile(true);
  };

  const handleProfileUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const imageUrl = String(formData.get("imageUrl") ?? "").trim();
    const imageFile = formData.get("imageFile");

    if (!name) {
      setProfileMessage({ type: "error", text: "Name can't be empty." });
      return;
    }

    setProfilePending(true);
    try {
      // Photo wins if a file is picked; otherwise fall back to the link.
      let image: string | undefined;
      if (imageFile instanceof File && imageFile.size > 0) {
        image = await imageFileToDataUrl(imageFile);
      } else if (imageUrl) {
        image = imageUrl;
      }

      const { error } = await updateUser(image ? { name, image } : { name });
      if (error) {
        setProfileMessage({ type: "error", text: error.message || "Could not update your profile." });
        return;
      }

      form.reset();
      setEditingProfile(false);
      setProfileMessage({ type: "success", text: "Profile updated." });
    } catch (error) {
      setProfileMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Could not update your profile.",
      });
    } finally {
      setProfilePending(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#f4f7f2] px-4">
        <div className="flex items-center gap-3 text-sm font-medium text-green-900">
          <Spinner className="size-5 text-green-800" /> Loading your profile…
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#f4f7f2] px-4 py-12">
        <Card className="w-full max-w-md overflow-hidden rounded-3xl border-green-900/10 shadow-lg shadow-green-950/5">
          <CardContent className="flex flex-col items-center p-8 text-center sm:p-10">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-green-100 text-green-800">
              <UserRound className="size-7" />
            </span>
            <h1 className="mt-5 text-2xl font-extrabold text-slate-900">You&apos;re signed out</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to view your BookNook profile and account details.
            </p>
            <div className="mt-6 flex w-full flex-col gap-3">
              <Button nativeButton={false} render={<Link href="/signIn" />} className="h-11 rounded-xl bg-green-800 font-semibold text-white hover:bg-green-900">
                Sign In
              </Button>
              <Button variant="outline" nativeButton={false} render={<Link href="/Register" />} className="h-11 rounded-xl border-green-800/20 font-semibold text-green-900 hover:bg-green-50">
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-[70vh] bg-[#f4f7f2] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-800">Your BookNook account</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">My Profile</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">Your reader details, all in one place.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <Card className="overflow-hidden rounded-3xl border-green-950/10 bg-white shadow-lg shadow-green-950/5">
            <div className="h-28 bg-gradient-to-r from-green-700 via-green-800 to-emerald-950 sm:h-40" />
            <CardContent className="px-5 pb-7 sm:px-8 sm:pb-9">
              <div className="-mt-20 flex flex-col items-start gap-4 sm:-mt-24 sm:flex-row sm:items-end sm:gap-6">
                <div className="relative size-52 shrink-0 overflow-hidden rounded-full border-4 border-white bg-green-100 shadow-md sm:size-64">
                  {user.image ? (
                    
                    <img
                      src={user.image}
                      alt={`${user.name}'s profile picture`}
                      className="size-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex size-full items-center justify-center text-5xl font-bold text-green-900 sm:text-6xl">
                      {initials || "B"}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="break-words text-3xl font-extrabold text-slate-900 sm:text-4xl">{user.name}</h2>
                    {!editingProfile && (
                      <button
                        type="button"
                        onClick={openProfileEditor}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-green-800/20 bg-white px-3 py-1.5 text-xs font-semibold text-green-900 transition hover:bg-green-50"
                      >
                        <Pencil className="size-3.5" /> Edit Profile
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">BookNook reader</p>

                  {editingProfile && (
                    <form onSubmit={handleProfileUpdate} className="mt-4 rounded-2xl border border-green-900/10 bg-[#f8faf7] p-4 sm:p-5">
                      <div>
                        <label htmlFor="profileName" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Display name
                        </label>
                        <Input
                          id="profileName"
                          name="name"
                          defaultValue={user.name}
                          placeholder="Your name"
                          className="mt-1.5 h-10 rounded-xl border-slate-200"
                          maxLength={80}
                        />
                      </div>

                      {/* Photo controls */}
                      <div className="mt-5 border-t border-green-900/10 pt-4">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-green-950">
                          <ImagePlus className="size-4 text-green-700" /> Update profile photo
                        </h3>
                        <div className="mt-3">
                          <label htmlFor="profileImageUrl" className="text-xs font-semibold text-slate-700">Image link</label>
                          <Input id="profileImageUrl" name="imageUrl" type="url" placeholder="https://example.com/photo.jpg" className="mt-1.5 h-10 rounded-xl border-slate-200" />
                        </div>
                        <div className="mt-3">
                          <label htmlFor="profileImageFile" className="text-xs font-semibold text-slate-700">Or choose a photo from this device</label>
                          <Input id="profileImageFile" name="imageFile" type="file" accept="image/*" className="mt-1.5 h-auto rounded-xl border-slate-200 bg-white px-3 py-2 file:mr-3 file:rounded-lg file:border-0 file:bg-green-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white" />
                          <p className="mt-1.5 text-xs text-slate-500">Images up to 2 MB. If both are entered, the selected file is used. Leave both empty to keep the current photo.</p>
                        </div>
                      </div>

                      {profileMessage && (
                        <p
                          role={profileMessage.type === "error" ? "alert" : "status"}
                          className={`mt-3 text-sm ${profileMessage.type === "success" ? "text-green-800" : "text-red-700"}`}
                        >
                          {profileMessage.text}
                        </p>
                      )}
                      <div className="mt-4 flex gap-2">
                        <button
                          type="submit"
                          disabled={profilePending}
                          className="inline-flex items-center gap-2 rounded-lg bg-green-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {profilePending ? <Spinner className="size-4" /> : <CircleCheck className="size-4" />}
                          {profilePending ? "Saving…" : "Save changes"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProfile(false)}
                          disabled={profilePending}
                          className="rounded-lg border border-green-900/15 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-green-900/10 bg-[#f8faf7] p-5 sm:p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-green-950">Account information</h3>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-800">
                    <Mail className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500">Email address</p>
                    <p className="break-all text-sm font-semibold text-slate-800">{user.email}</p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          <aside className="flex h-fit flex-col rounded-3xl bg-gradient-to-br from-green-800 to-emerald-950 p-6 text-white shadow-lg shadow-green-950/15">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-lime-100">
              <BookOpen className="size-5" />
            </div>
            <h2 className="mt-5 text-xl font-bold">Reader account</h2>
            <p className="mt-2 text-sm leading-6 text-green-100">Your profile helps keep your BookNook activity connected to you.</p>
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-green-50">
              <ShieldCheck className="size-4 shrink-0 text-lime-200" /> Signed in as {user.name}
            </div>
            <Button onClick={handleSignOut} className="mt-6 h-11 w-full rounded-xl bg-white text-sm font-bold text-green-900 hover:bg-green-50">
              <LogOut className="size-4" /> Sign Out
            </Button>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

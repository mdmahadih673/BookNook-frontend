"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { signOut, updateUser, useSession } from "@/lib/auth-client";
import { imageFileToDataUrl } from "@/lib/image-file";
import { BookOpen, ImagePlus, LogOut, Mail, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [imagePending, setImagePending] = useState(false);
  const [imageMessage, setImageMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleImageUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const imageFile = formData.get("imageFile");
    const imageUrl = String(formData.get("imageUrl") ?? "").trim();

    setImageMessage(null);
    setImagePending(true);
    try {
      const image = imageFile instanceof File && imageFile.size > 0
        ? await imageFileToDataUrl(imageFile)
        : imageUrl;

      if (!image) {
        setImageMessage({ type: "error", text: "Choose a photo or enter an image link." });
        return;
      }

      const { error } = await updateUser({ image });
      if (error) {
        setImageMessage({ type: "error", text: error.message || "Could not update your profile photo." });
        return;
      }

      form.reset();
      setImageMessage({ type: "success", text: "Profile photo updated." });
    } catch (error) {
      setImageMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Could not update your profile photo.",
      });
    } finally {
      setImagePending(false);
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
            <div className="h-28 bg-gradient-to-r from-green-700 via-green-800 to-emerald-950 sm:h-36" />
            <CardContent className="px-5 pb-7 sm:px-8 sm:pb-9">
              <div className="-mt-14 flex flex-col items-start gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:gap-5">
                <Avatar size="lg" className="size-28 border-4 border-white bg-green-100 shadow-md sm:size-32">
                  {user.image ? <AvatarImage src={user.image} alt={`${user.name}'s profile picture`} /> : null}
                  <AvatarFallback className="bg-green-100 text-3xl font-bold text-green-900 sm:text-4xl">
                    {initials || "B"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 pb-1">
                  <h2 className="break-words text-2xl font-extrabold text-slate-900 sm:text-3xl">{user.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">BookNook reader</p>
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

              <form onSubmit={handleImageUpdate} className="mt-5 rounded-2xl border border-green-900/10 p-5 sm:p-6">
                <h3 className="flex items-center gap-2 text-sm font-bold text-green-950">
                  <ImagePlus className="size-4 text-green-700" /> Update profile photo
                </h3>
                <div className="mt-4">
                  <label htmlFor="profileImageUrl" className="text-xs font-semibold text-slate-700">Image link</label>
                  <Input id="profileImageUrl" name="imageUrl" type="url" placeholder="https://example.com/photo.jpg" className="mt-1.5 h-10 rounded-xl border-slate-200" />
                </div>
                <div className="mt-3">
                  <label htmlFor="profileImageFile" className="text-xs font-semibold text-slate-700">Or choose a photo from this device</label>
                  <Input id="profileImageFile" name="imageFile" type="file" accept="image/*" className="mt-1.5 h-auto rounded-xl border-slate-200 bg-green-50/50 px-3 py-2 file:mr-3 file:rounded-lg file:border-0 file:bg-green-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white" />
                  <p className="mt-1.5 text-xs text-slate-500">Images up to 2 MB. If both are entered, the selected file is used.</p>
                </div>
                {imageMessage && (
                  <p role={imageMessage.type === "error" ? "alert" : "status"} className={`mt-3 text-sm ${imageMessage.type === "success" ? "text-green-800" : "text-red-700"}`}>
                    {imageMessage.text}
                  </p>
                )}
                <Button type="submit" disabled={imagePending} className="mt-4 h-10 rounded-xl bg-green-800 px-4 font-semibold text-white hover:bg-green-900 disabled:opacity-60">
                  {imagePending ? "Saving photo…" : "Save photo"}
                </Button>
              </form>
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

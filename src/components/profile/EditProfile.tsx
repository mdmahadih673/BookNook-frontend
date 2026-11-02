"use client";

import { useState, type FormEvent } from "react";
import { updateUser } from "@/lib/auth-client";

export default function EditProfile({
  name,
  onUpdated,
}: {
  name: string;
  onUpdated?: () => void;
}) {
  const [message, setMessage] = useState("");

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const newName = String(form.get("name") ?? "").trim();
    const image = String(form.get("image") ?? "").trim();
    const { error } = await updateUser(image ? { name: newName, image } : { name: newName });

    if (error) {
      setMessage(error.message || "Could not save your profile.");
      return;
    }
    setMessage("Profile saved.");
    onUpdated?.();
  };

  return (
    <details>
      <summary className="cursor-pointer rounded-lg border px-4 py-2 text-sm font-semibold text-green-900">Edit profile</summary>
      <form onSubmit={saveProfile} className="mt-3 w-full space-y-3 rounded-xl border bg-white p-4">
        <label className="block text-sm">Name
          <input name="name" defaultValue={name} required className="mt-1 w-full rounded-lg border p-2.5" />
        </label>
        <label className="block text-sm">Photo URL
          <input name="image" type="url" placeholder="https://example.com/photo.jpg" className="mt-1 w-full rounded-lg border p-2.5" />
        </label>
        {message && <p role="status" className="text-sm text-slate-600">{message}</p>}
        <button className="rounded-lg bg-green-800 px-4 py-2 text-sm font-semibold text-white">Save</button>
      </form>
    </details>
  );
}

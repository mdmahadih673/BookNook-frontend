// Single source of truth for the backend API.
// Set NEXT_PUBLIC_API_BASE in .env to point somewhere else
// (e.g. http://localhost:5000 while developing locally).
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://book-nook-backend-two.vercel.app";

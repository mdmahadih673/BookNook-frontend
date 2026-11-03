import { auth, ensureAuthDatabase } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

const authHandler = toNextJsHandler(auth);

export const GET = async (request: Request) => {
  await ensureAuthDatabase();
  return authHandler.GET(request);
};

export const POST = async (request: Request) => {
  await ensureAuthDatabase();
  return authHandler.POST(request);
};

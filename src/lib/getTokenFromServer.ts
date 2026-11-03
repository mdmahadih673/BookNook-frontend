import { headers } from "next/headers";
import { auth, ensureAuthDatabase } from "./auth";

export const getTokenFromServer =async () => {
    await ensureAuthDatabase();
    const jwtToken = await auth.api.getToken({
        headers: await headers(),
    })

    const token = jwtToken?.token;
    return token;
}

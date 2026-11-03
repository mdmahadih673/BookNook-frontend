import { betterAuth } from "better-auth";
import { bearer, jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const globalForMongo = globalThis as typeof globalThis & {
    mongoClient?: MongoClient;
};

const client = globalForMongo.mongoClient ?? new MongoClient(process.env.MONGODB_URL as string);
globalForMongo.mongoClient = client;
const db = client.db("BookNook");

// Check and restore the connection before auth requests use the cached client.
export const ensureAuthDatabase = async () => {
    await client.connect();
};


export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        jwt(),
        bearer(),
    ],
    session: {
        cookieCache: {
            strategy: "jwt",
            enabled: true,
            maxAge: 60 * 60 * 24 * 7,
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            scope: ["user:email"],
        },
    },
    account: {
        accountLinking: {
            trustedProviders: ["google"],
            updateUserInfoOnLink: true,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});

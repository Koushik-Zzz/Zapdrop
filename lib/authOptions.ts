import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

/*
    * This file contains the NextAuth configuration options.
    * It sets up authentication providers, session handling, and callbacks.
    * The Google provider is used for OAuth authentication.
*/


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.sub || "";
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        redirect: async ({ url, baseUrl }) => {
            // Redirect to /upload after successful login
            if (url === baseUrl || url === `${baseUrl}/`) {
                return `${baseUrl}/upload`;
            }
            // Allow callback URLs on the same origin
            if (url.startsWith(baseUrl)) {
                return url;
            }
            return `${baseUrl}/upload`;
        },
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth',
    },
    secret: process.env.NEXTAUTH_SECRET || "HugaBuga",
};

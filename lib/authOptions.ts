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


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ],
    callbacks: {
        session: async ({ session, user }) => {
            if (session?.user) {
                session.user.id = user.id || "";    
            }
            return session;
        },

        redirect: async ({ url, baseUrl }) => {
            if (url.startsWith(baseUrl)) {
                return url.includes("/auth") ? `${baseUrl}/upload` : url;
            }
            return `${baseUrl}/upload`;
        },
    },
    session: {
        strategy: 'database',
    },
    pages: {
        signIn: '/auth',
    },
    secret: process.env.NEXTAUTH_SECRET || "HugaBuga",
};

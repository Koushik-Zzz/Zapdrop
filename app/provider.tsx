"use client"
import { SessionProvider } from "@/node_modules/next-auth/react"

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )

}
"use client"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
type ProtectedRouteProps = {
    children: React.ReactNode;
}

export const ProtectedRoute = ({children} : ProtectedRouteProps) => {
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth");
        }
    }, [ status, router])

    if (status === "loading") {
        return (
            <div className="flex h-screen w-full items-center justify-center">
              <Loader2 className="h-8 text-[#A3004C] w-8 animate-spin" />
            </div>
        );
    }

    if (status === "authenticated") {
        return <>{children}</>;
    }

    return null;
}
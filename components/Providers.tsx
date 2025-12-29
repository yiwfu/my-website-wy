"use client";

import { AiProvider } from "@/context/AiContext";
import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AiProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </AiProvider>
    );
}

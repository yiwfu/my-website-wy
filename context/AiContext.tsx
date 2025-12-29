"use client";

import React, { createContext, useContext, useState } from "react";

interface AiContextType {
    isOpen: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
}

const AiContext = createContext<AiContextType | undefined>(undefined);

export function AiProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen((prev) => !prev);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <AiContext.Provider value={{ isOpen, toggle, open, close }}>
            {children}
        </AiContext.Provider>
    );
}

export function useAi() {
    const context = useContext(AiContext);
    if (context === undefined) {
        throw new Error("useAi must be used within an AiProvider");
    }
    return context;
}

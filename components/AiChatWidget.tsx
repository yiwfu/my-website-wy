"use client";

import { useState, useRef, useEffect } from "react";
import { useAi } from "@/context/AiContext";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function AiChatWidget() {
    const { isOpen, toggle, close } = useAi();
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
        { role: 'ai', content: 'Hello! I am your AI Travel Companion. Ask me anything about local attractions, food, or finding a job!' }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput("");

        // Simulate AI response
        setTimeout(() => {
            let aiResponse = "I can help with that! Here are some recommendations...";
            if (userMsg.toLowerCase().includes("food") || userMsg.toLowerCase().includes("eat")) {
                aiResponse = "For authentic local food, I highly recommend checking out 'Spicy Noodles House'. It's a local favorite!";
            } else if (userMsg.toLowerCase().includes("job") || userMsg.toLowerCase().includes("work")) {
                aiResponse = "Looking for work? The tourism sector is hiring. Check out the 'Recruitment' section for the latest openings.";
            } else if (userMsg.toLowerCase().includes("hotel") || userMsg.toLowerCase().includes("stay")) {
                aiResponse = "We have some great homestays listed. 'Mountain View Villa' is currently trending.";
            }

            setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={toggle}
                className={cn(
                    "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    isOpen && "rotate-90 scale-0 opacity-0"
                )}
            >
                <Sparkles className="h-6 w-6" />
            </button>

            {/* Chat Window */}
            <div
                className={cn(
                    "fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] flex-col rounded-xl border bg-background shadow-2xl bg-white transition-all duration-300 ease-in-out",
                    isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95 pointer-events-none"
                )}
                style={{ height: "600px", maxHeight: "calc(100vh - 2rem)" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b p-4 bg-primary text-primary-foreground rounded-t-xl">
                    <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        <h3 className="font-semibold">AI Assistant</h3>
                    </div>
                    <button onClick={close} className="rounded-full p-1 hover:bg-primary-foreground/20">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-130px)]">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                            <div className={cn(
                                "rounded-lg px-3 py-2 text-sm max-w-[80%]",
                                msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                            )}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background rounded-b-xl">
                    <div className="flex w-full items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about travel, food, jobs..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <button
                            onClick={handleSend}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-primary/90 h-10 w-10 bg-primary text-primary-foreground"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

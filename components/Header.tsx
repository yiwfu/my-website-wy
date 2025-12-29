"use client";

import Link from 'next/link';
import { Bot, MapPin, Sparkles, Menu, X, Search } from 'lucide-react';
import { useAi } from '@/context/AiContext';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import UserMenu from '@/components/UserMenu';

export default function Header() {
    const { open } = useAi();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: '/attractions', label: '景点', icon: MapPin },
        { href: '/food', label: '美食', icon: null },
        { href: '/real-estate', label: '房产', icon: null },
        { href: '/recruitment', label: '招聘', icon: null },
    ];

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'
                }`}>
                <div className="flex justify-center px-4">
                    <header className={`flex w-full max-w-6xl items-center justify-between rounded-full border transition-all duration-500 ${isScrolled
                        ? 'glass border-border/50 shadow-modern pl-4 pr-2 py-2'
                        : 'glass border-border/30 shadow-lg pl-6 pr-2 py-3'
                        }`}>
                        {/* Logo Section */}
                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="relative">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-primary shadow-colored group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="h-5 w-5 text-gradient" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
                                </div>
                                <span className="hidden font-bold tracking-tight sm:inline-block text-xl text-foreground group-hover:text-gradient transition-all duration-300">
                                    文旅门户
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center gap-1">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover-lift ${isActive
                                                ? 'text-primary bg-primary/10 shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                                }`}
                                        >
                                            {item.label}
                                            {isActive && (
                                                <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-10 animate-pulse"></div>
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-2">
                            {/* Search Button - Hidden on small screens */}
                            <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-muted/20 border border-border/30 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:shadow-md group">
                                <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                                <span>搜索...</span>
                                <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border/50 bg-background/50 px-1.5 font-mono text-[10px] text-muted-foreground">
                                    ⌘K
                                </kbd>
                            </button>

                            {/* AI Chat Button - Desktop */}
                            <button
                                onClick={open}
                                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-muted/20 border border-border/30 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:shadow-md group"
                            >
                                <Sparkles className="w-4 h-4 text-primary group-hover:animate-pulse" />
                                <span>问AI...</span>
                            </button>

                            <button
                                onClick={open}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-gradient hover:scale-105 transition-all duration-300 shadow-colored hover:shadow-xl group"
                            >
                                <Bot className="h-5 w-5 group-hover:animate-pulse" />
                            </button>

                            {/* User Menu */}
                            <UserMenu />

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-full glass hover:bg-muted/20 border border-border/30 transition-all duration-300 hover:shadow-md"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-5 w-5 text-foreground" />
                                ) : (
                                    <Menu className="h-5 w-5 text-foreground" />
                                )}
                            </button>
                        </div>
                    </header>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute top-20 left-4 right-4 glass rounded-2xl border border-border/50 shadow-2xl animate-scale-in">
                        <nav className="p-6">
                            <div className="space-y-1">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${isActive
                                                ? 'text-primary bg-primary/10 shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                                }`}
                                        >
                                            {item.icon && <item.icon className="w-5 h-5" />}
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="mt-6 pt-6 border-t border-border/50">
                                <button
                                    onClick={() => {
                                        open();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
                                >
                                    <Search className="w-5 h-5 text-muted-foreground" />
                                    搜索内容
                                </button>
                                <button
                                    onClick={() => {
                                        open();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium text-primary hover:bg-primary/10 transition-all duration-300 mt-1"
                                >
                                    <Sparkles className="w-5 h-5 text-primary" />
                                    AI 助手
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
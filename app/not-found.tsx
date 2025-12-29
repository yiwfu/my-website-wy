"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background font-sans flex items-center justify-center relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="container-modern relative z-10 py-20">
                <div className="max-w-2xl mx-auto text-center animate-fade-in">
                    {/* 404 Number */}
                    <div className="relative mb-8">
                        <h1 className="text-[12rem] md:text-[16rem] font-bold leading-none text-gradient opacity-20 select-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-secondary flex items-center justify-center shadow-modern animate-scale-in">
                                <Compass className="w-16 h-16 md:w-20 md:h-20 text-primary animate-spin-slow" />
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-4 mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                            页面未找到
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
                            抱歉，您访问的页面似乎不存在或已被移除
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/">
                            <Button className="btn-modern text-white px-8 py-6 text-lg hover-lift group">
                                <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                返回首页
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="glass border-border/30 hover:border-primary/30 px-8 py-6 text-lg hover-lift group"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                            返回上一页
                        </Button>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-16 pt-8 border-t border-border/30">
                        <p className="text-sm text-muted-foreground mb-4">您可能想访问</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                { name: "景点推荐", href: "/attractions", icon: Compass },
                                { name: "美食探索", href: "/food", icon: Search },
                                { name: "房产信息", href: "/real-estate", icon: Home },
                                { name: "职位招聘", href: "/recruitment", icon: Search }
                            ].map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.href}
                                    className="px-4 py-2 rounded-full glass border border-border/30 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 hover-lift flex items-center gap-2"
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

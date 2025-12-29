"use client";

import { Card } from "@/components/ui/Card";
import { MasonryGrid } from "@/components/ui/MasonryGrid";
import { Map, Search, SlidersHorizontal, ArrowLeft, Filter, Grid, List, Sparkles } from "lucide-react";
import { getAttractions } from "@/lib/data";
import { useEffect, useState } from "react";
import type { Attraction } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AttractionsPage() {
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        async function loadData() {
            const data = await getAttractions();
            setAttractions(data);
            setLoading(false);
        }
        loadData();
    }, []);

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Modern Hero Section */}
            <section className="relative bg-gradient-hero overflow-hidden pt-24 pb-16">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                </div>

                <div className="container-modern relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">AI 智能推荐</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            发现城市
                            <span className="text-gradient block mt-2">精彩景点</span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            AI 已为您精选 128 个热门打卡地。在这个季节，我们推荐您去海边吹吹风
                        </p>

                        {/* Category Tags */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {["自然风光", "历史古迹", "亲子游乐", "网红打卡", "文化艺术"].map((tag, i) => (
                                <button
                                    key={i}
                                    className="px-4 py-2 rounded-full glass border border-border/30 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 hover-lift"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Search & Filter Bar */}
            <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm">
                <div className="container-modern py-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full lg:w-auto">
                            <Link href="/" className="p-2 rounded-full hover:bg-muted transition-colors">
                                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                            </Link>
                            <h2 className="text-lg font-semibold text-foreground hidden lg:block">景点探索</h2>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-grow max-w-2xl relative">
                            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                placeholder="搜索景点、地标、特色..."
                                className="w-full h-12 pl-12 pr-4 rounded-2xl glass border border-border/30 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm transition-all duration-300"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="glass rounded-xl border-border/30 hover:border-primary/30">
                                <Filter className="w-4 h-4 mr-2" /> 筛选
                            </Button>

                            {/* View Mode Toggle */}
                            <div className="flex items-center glass rounded-xl border border-border/30 p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>

                            <Button className="btn-modern text-white px-6 hover-lift">
                                <Map className="w-4 h-4 mr-2" /> 地图模式
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container-modern section-padding">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                                <Skeleton className="h-80 rounded-2xl" />
                            </div>
                        ))}
                    </div>
                ) : attractions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                        <div className="w-32 h-32 bg-gradient-secondary rounded-full flex items-center justify-center mb-6 shadow-modern">
                            <Map className="w-16 h-16 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">暂无景点数据</h3>
                        <p className="text-muted-foreground max-w-md">
                            数据库似乎为空。请确保您已导入 CSV 数据或尝试重置筛选条件
                        </p>
                        <Button className="btn-modern text-white mt-6 hover-lift">
                            重新加载
                        </Button>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">
                                    找到 <span className="text-gradient">{attractions.length}</span> 个景点
                                </h3>
                                <p className="text-muted-foreground mt-1">为您精心筛选的优质推荐</p>
                            </div>
                        </div>

                        {/* Cards Grid */}
                        {viewMode === 'grid' ? (
                            <MasonryGrid>
                                {attractions.map((item, index) => {
                                    const aspectRatios: ("video" | "square" | "portrait")[] = ['video', 'square', 'portrait', 'portrait', 'square', 'video'];
                                    const aspectRatio = aspectRatios[index % aspectRatios.length];

                                    return (
                                        <Card
                                            key={item.id}
                                            title={item.title}
                                            description={item.description}
                                            image={item.image_url || undefined}
                                            href={`/attractions/${item.id}`}
                                            tag={`${item.ai_score || 95}% 匹配`}
                                            rating={4.5}
                                            views={Math.floor(Math.random() * 5000) + 500}
                                            className="animate-scale-in hover-lift"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                            aspectRatio={aspectRatio}
                                        />
                                    );
                                })}
                            </MasonryGrid>
                        ) : (
                            <div className="space-y-6">
                                {attractions.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl glass border border-border/30 hover:border-primary/20 transition-all duration-300 hover-lift animate-scale-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="w-full md:w-48 h-48 md:h-32 rounded-xl overflow-hidden bg-gradient-secondary">
                                            {item.image_url && (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground mb-4">{item.description}</p>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm text-primary font-medium">95% 匹配</span>
                                                <span className="text-sm text-muted-foreground">4.5★</span>
                                                <span className="text-sm text-muted-foreground">1.2k 浏览</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
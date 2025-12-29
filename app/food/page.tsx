"use client";

import { Card } from "@/components/ui/Card";
import { MasonryGrid } from "@/components/ui/MasonryGrid";
import { Utensils, Search, SlidersHorizontal, ArrowLeft, Filter, Grid, List, Sparkles, Star, MapPin } from "lucide-react";
import { getFood } from "@/lib/data";
import { useEffect, useState } from "react";
import type { Food } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FoodPage() {
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        async function loadData() {
            const data = await getFood();
            setFoods(data);
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
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                </div>

                <div className="container-modern relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <Utensils className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">美食推荐引擎</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            品尝城市
                            <span className="text-gradient block mt-2">地道美食</span>
                        </h1>
                        
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            汇集全城必吃榜单，从街头小吃到米其林星级餐厅，满足您的挑剔味蕾
                        </p>

                        {/* Category Tags */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {["川菜", "粤菜", "日料", "西餐", "小吃", "甜品", "火锅", "烧烤"].map((tag, i) => (
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
                            <h2 className="text-lg font-semibold text-foreground hidden lg:block">美食探索</h2>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-grow max-w-2xl relative">
                            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                placeholder="搜索餐厅、菜系、特色菜..."
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
                                    className={`p-2 rounded-lg transition-all duration-300 ${
                                        viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all duration-300 ${
                                        viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>

                            <Button className="btn-modern text-white px-6 hover-lift">
                                <MapPin className="w-4 h-4 mr-2" /> 附近美食
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
                            <div key={i} className="animate-scale-in" style={{animationDelay: `${i * 0.1}s`}}>
                                <Skeleton className="h-80 rounded-2xl" />
                            </div>
                        ))}
                    </div>
                ) : foods.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                        <div className="w-32 h-32 bg-gradient-secondary rounded-full flex items-center justify-center mb-6 shadow-modern">
                            <Utensils className="w-16 h-16 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">暂无美食数据</h3>
                        <p className="text-muted-foreground max-w-md">
                            未找到美食列表。请配置您的Supabase数据库或尝试重新加载
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
                                    找到 <span className="text-gradient">{foods.length}</span> 家餐厅
                                </h3>
                                <p className="text-muted-foreground mt-1">为您精心筛选的美食推荐</p>
                            </div>
                            
                            {/* Quick Filters */}
                            <div className="hidden md:flex items-center gap-2">
                                <span className="text-sm text-muted-foreground mr-2">快速筛选:</span>
                                {["高评分", "人气推荐", "新店尝鲜"].map((filter, i) => (
                                    <button
                                        key={i}
                                        className="px-3 py-1.5 rounded-full text-xs font-medium glass border border-border/30 hover:border-primary/30 hover:text-primary transition-all duration-300"
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cards Grid */}
                        {viewMode === 'grid' ? (
                            <MasonryGrid>
                                {foods.map((item, index) => (
                                    <Card
                                        key={item.id}
                                        title={item.title}
                                        description={item.description}
                                        image={item.image_url || undefined}
                                        href={`/food/${item.id}`}
                                        tag={item.price_range || item.category}
                                        rating={4.2 + Math.random() * 0.8}
                                        views={Math.floor(Math.random() * 3000) + 200}
                                        likes={Math.floor(Math.random() * 500) + 50}
                                        className="animate-scale-in hover-lift"
                                        style={{animationDelay: `${index * 0.1}s`}}
                                    />
                                ))}
                            </MasonryGrid>
                        ) : (
                            <div className="space-y-6">
                                {foods.map((item, index) => (
                                    <Link
                                        key={item.id}
                                        href={`/food/${item.id}`}
                                        className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl glass border border-border/30 hover:border-primary/20 transition-all duration-300 hover-lift animate-scale-in group"
                                        style={{animationDelay: `${index * 0.1}s`}}
                                    >
                                        <div className="w-full md:w-48 h-48 md:h-32 rounded-xl overflow-hidden bg-gradient-secondary">
                                            {item.image_url && (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                                                    {item.title}
                                                </h3>
                                                {item.price_range && (
                                                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                                        {item.price_range}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span className="text-sm font-medium">4.5</span>
                                                </div>
                                                <span className="text-sm text-muted-foreground">{item.category}</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {Math.floor(Math.random() * 2000) + 500} 人评价
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
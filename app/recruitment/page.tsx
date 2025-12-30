"use client";

import { Card } from "@/components/ui/Card";
import { MasonryGrid } from "@/components/ui/MasonryGrid";
import { Briefcase, Search, SlidersHorizontal, ArrowLeft, Filter, Grid, List, Sparkles, MapPin, Star, Clock, DollarSign } from "lucide-react";
import { getJobs } from "@/lib/data";
import { useEffect, useState } from "react";
import type { Job } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RecruitmentPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        async function loadData() {
            const data = await getJobs();
            setJobs(data);
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
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                </div>

                <div className="container-modern relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <Briefcase className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">职位匹配</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            发现职业
                            <span className="text-gradient block mt-2">新机遇</span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            为您推荐最匹配的职位机会，从初级岗位到高管职位，开启职业新篇章
                        </p>

                        {/* Category Tags */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {["技术开发", "产品运营", "市场营销", "设计创意", "销售管理", "客户服务"].map((tag, i) => (
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
                            <h2 className="text-lg font-semibold text-foreground hidden lg:block">职位探索</h2>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-grow max-w-2xl relative">
                            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                placeholder="搜索职位、公司、技能..."
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
                                <Briefcase className="w-4 h-4 mr-2" /> 发布职位
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
                ) : jobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                        <div className="w-32 h-32 bg-gradient-secondary rounded-full flex items-center justify-center mb-6 shadow-modern">
                            <Briefcase className="w-16 h-16 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">暂无职位数据</h3>
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
                                    找到 <span className="text-gradient">{jobs.length}</span> 个职位
                                </h3>
                                <p className="text-muted-foreground mt-1">为您精心筛选的优质机会</p>
                            </div>

                            {/* Quick Filters */}
                            <div className="hidden md:flex items-center gap-2">
                                <span className="text-sm text-muted-foreground mr-2">快速筛选:</span>
                                {["高薪职位", "热门公司", "远程办公"].map((filter, i) => (
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
                                {jobs.map((item, index) => {
                                    const aspectRatios: ("video" | "square" | "portrait")[] = ['square', 'portrait', 'video', 'square', 'portrait', 'video'];
                                    const aspectRatio = aspectRatios[index % aspectRatios.length];

                                    return (
                                        <Card
                                            key={item.id}
                                            title={item.title}
                                            description={item.description}
                                            image={item.image_url || undefined}
                                            href={`/recruitment/${item.id}`}
                                            tag={item.salary_range || item.category}
                                            rating={4.1 + Math.random() * 0.9}
                                            views={Math.floor(Math.random() * 1500) + 200}
                                            likes={Math.floor(Math.random() * 100) + 10}
                                            className="animate-scale-in hover-lift"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                            aspectRatio={aspectRatio}
                                        />
                                    );
                                })}
                            </MasonryGrid>
                        ) : (
                            <div className="space-y-6">
                                {jobs.map((item, index) => (
                                    <Link
                                        key={item.id}
                                        href={`/recruitment/${item.id}`}
                                        className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl glass border border-border/30 hover:border-primary/20 transition-all duration-300 hover-lift animate-scale-in group"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="w-full md:w-48 h-48 md:h-32 rounded-xl overflow-hidden bg-gradient-secondary flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Briefcase className="w-8 h-8 text-primary" />
                                                </div>
                                                <span className="text-sm text-muted-foreground font-medium">
                                                    {item.category || '职位招聘'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                                                    {item.title}
                                                </h3>
                                                {item.salary_range && (
                                                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium flex items-center gap-1">
                                                        <DollarSign className="w-3 h-3" />
                                                        {item.salary_range}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span className="text-sm font-medium">4.3</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Clock className="w-4 h-4" />
                                                    <span>
                                                        {Math.floor(Math.random() * 7) + 1} 天前发布
                                                    </span>
                                                </div>
                                                <span className="text-sm text-muted-foreground">
                                                    {Math.floor(Math.random() * 500) + 50} 人申请
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
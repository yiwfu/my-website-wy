"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getJobById } from "@/lib/data";
import type { Job } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    ArrowLeft, 
    Star, 
    MapPin, 
    Camera, 
    Share2, 
    Heart, 
    Clock, 
    Users, 
    Sparkles,
    DollarSign,
    Phone,
    Briefcase,
    Building,
    GraduationCap,
    Calendar,
    Award,
    Target,
    CheckCircle,
    Mail,
    Send,
    User
} from "lucide-react";

export default function JobDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadJob() {
            if (params.id) {
                const data = await getJobById(params.id as string);
                setJob(data);
                setLoading(false);
            }
        }
        loadJob();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                {/* Header Skeleton */}
                <div className="relative h-80 bg-gradient-secondary">
                    <Skeleton className="w-full h-full" />
                </div>
                
                {/* Content Skeleton */}
                <div className="container-modern py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-48 w-full rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                        <Briefcase className="w-16 h-16 text-muted-foreground/50" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">职位未找到</h1>
                    <p className="text-muted-foreground mb-6">抱歉，我们找不到您要查看的职位信息</p>
                    <Button onClick={() => router.back()} className="btn-modern text-white">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        返回上页
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-80 lg:h-96 overflow-hidden bg-gradient-hero">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                </div>
                
                {/* Navigation Bar */}
                <div className="absolute top-0 left-0 right-0 z-10 p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.back()}
                            className="glass border-white/20 text-white hover:bg-white/10"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            返回
                        </Button>
                        
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="glass border-white/20 text-white hover:bg-white/10"
                            >
                                <Heart className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="glass border-white/20 text-white hover:bg-white/10"
                            >
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Job Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <div className="container-modern">
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge className="bg-purple-500/20 text-white border-white/20">
                                        {job.category}
                                    </Badge>
                                    {job.salary_range && (
                                        <Badge className="bg-green-500/20 text-white border-white/20 flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
                                            {job.salary_range}
                                        </Badge>
                                    )}
                                </div>
                                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-3">
                                    {job.title}
                                </h1>
                                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6 text-white/90">
                                    {job.company && (
                                        <div className="flex items-center">
                                            <Building className="w-5 h-5 mr-2" />
                                            <span className="text-lg">{job.company}</span>
                                        </div>
                                    )}
                                    {job.location && (
                                        <div className="flex items-center">
                                            <MapPin className="w-5 h-5 mr-2" />
                                            <span className="text-lg">{job.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* AI Match Badge */}
                            <div className="glass rounded-2xl p-4 text-center border-white/20">
                                <div className="flex items-center justify-center mb-1">
                                    <Target className="w-5 h-5 text-purple-400 mr-1" />
                                    <span className="text-2xl font-bold text-white">
                                        {job.ai_score}%
                                    </span>
                                </div>
                                <p className="text-white/80 text-sm">匹配度</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="container-modern py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* AI Recommendation */}
                        <div className="glass rounded-2xl p-6 border border-border/30">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center mr-3">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">AI 职位匹配</h3>
                                    <p className="text-sm text-muted-foreground">
                                        技能匹配度 {job.ai_score}%
                                    </p>
                                </div>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2 mb-3">
                                <div 
                                    className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${job.ai_score}%` }}
                                />
                            </div>
                            <p className="text-muted-foreground">
                                基于您的技能背景和职业发展方向，这个职位非常适合您的职业规划！
                            </p>
                        </div>

                        {/* Job Description */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">职位描述</h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {job.description}
                                </p>
                            </div>
                        </div>

                        {/* Job Requirements */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">职位要求</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="glass rounded-xl p-6 border border-border/30">
                                    <h4 className="font-semibold text-foreground mb-4 flex items-center">
                                        <GraduationCap className="w-5 h-5 text-purple-500 mr-2" />
                                        学历要求
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-muted-foreground flex items-center">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                                            本科及以上学历
                                        </li>
                                        <li className="text-sm text-muted-foreground flex items-center">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                                            计算机相关专业优先
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="glass rounded-xl p-6 border border-border/30">
                                    <h4 className="font-semibold text-foreground mb-4 flex items-center">
                                        <Award className="w-5 h-5 text-purple-500 mr-2" />
                                        工作经验
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="text-sm text-muted-foreground flex items-center">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                                            3-5年相关工作经验
                                        </li>
                                        <li className="text-sm text-muted-foreground flex items-center">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                                            有团队管理经验优先
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Skills Required */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">技能要求</h2>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    "JavaScript", "React", "Node.js", "TypeScript", 
                                    "Python", "SQL", "Git", "Docker", "AWS", "团队协作"
                                ].map((skill, index) => (
                                    <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Company Benefits */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">福利待遇</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    {
                                        title: "薪资福利",
                                        items: ["具有竞争力的薪资", "年终奖金", "股票期权", "绩效奖金"]
                                    },
                                    {
                                        title: "保险福利",
                                        items: ["五险一金", "补充医疗保险", "意外险", "年度体检"]
                                    },
                                    {
                                        title: "假期福利",
                                        items: ["带薪年假", "病假", "婚假产假", "节日福利"]
                                    },
                                    {
                                        title: "发展福利",
                                        items: ["培训机会", "职业发展", "技能提升", "晋升通道"]
                                    }
                                ].map((benefit, index) => (
                                    <div key={index} className="glass rounded-xl p-6 border border-border/30">
                                        <h4 className="font-semibold text-foreground mb-4">{benefit.title}</h4>
                                        <ul className="space-y-2">
                                            {benefit.items.map((item, i) => (
                                                <li key={i} className="text-sm text-muted-foreground flex items-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-3" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Company Info */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">公司介绍</h2>
                            <div className="glass rounded-xl p-6 border border-border/30">
                                <div className="flex items-center mb-4">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mr-4">
                                        <Building className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground">
                                            {job.company || "优秀科技公司"}
                                        </h3>
                                        <p className="text-muted-foreground">互联网 · 1000-5000人</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    我们是一家专注于创新技术的公司，致力于为客户提供最优质的产品和服务。
                                    公司文化开放包容，注重员工的个人发展和团队协作。我们相信每一位员工都是公司最宝贵的财富。
                                </p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                    {[
                                        { label: "成立时间", value: "2015年" },
                                        { label: "公司规模", value: "2000+" },
                                        { label: "融资阶段", value: "C轮" },
                                        { label: "行业领域", value: "互联网" }
                                    ].map((info, index) => (
                                        <div key={index} className="text-center">
                                            <p className="text-2xl font-bold text-purple-500">{info.value}</p>
                                            <p className="text-sm text-muted-foreground">{info.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Application Card */}
                        <div className="glass rounded-2xl p-6 border border-border/30">
                            <h3 className="text-xl font-bold text-foreground mb-4">职位信息</h3>
                            
                            <div className="space-y-4">
                                <div className="text-center p-4 bg-gradient-primary rounded-xl">
                                    <div className="text-2xl font-bold text-white mb-1">
                                        {job.salary_range || "薪资面议"}
                                    </div>
                                    <p className="text-white/90 text-sm">月薪范围</p>
                                </div>
                                
                                <div className="flex items-center">
                                    <Building className="w-5 h-5 text-purple-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">公司名称</p>
                                        <p className="font-medium text-foreground">
                                            {job.company || "优秀科技公司"}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 text-purple-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">工作地点</p>
                                        <p className="font-medium text-foreground">
                                            {job.location || "地点待定"}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 text-purple-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">发布时间</p>
                                        <p className="font-medium text-foreground">3天前</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <Users className="w-5 h-5 text-purple-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">招聘人数</p>
                                        <p className="font-medium text-foreground">2-3人</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <Button className="w-full btn-modern text-white">
                                    <Send className="w-4 h-4 mr-2" />
                                    立即申请
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <User className="w-4 h-4 mr-2" />
                                    联系HR
                                </Button>
                            </div>
                        </div>

                        {/* HR Contact */}
                        <div className="glass rounded-2xl p-6 border border-border/30">
                            <h3 className="text-xl font-bold text-foreground mb-4">联系HR</h3>
                            <div className="flex items-center p-4 rounded-xl bg-muted/30">
                                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mr-4">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-foreground">张小姐</p>
                                    <p className="text-sm text-muted-foreground">人事经理</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <Button variant="outline" className="w-full justify-start">
                                    <Phone className="w-4 h-4 mr-2" />
                                    400-123-4567
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Mail className="w-4 h-4 mr-2" />
                                    hr@company.com
                                </Button>
                            </div>
                        </div>

                        {/* Similar Jobs */}
                        <div className="glass rounded-2xl p-6 border border-border/30">
                            <h3 className="text-xl font-bold text-foreground mb-4">相似职位</h3>
                            <div className="space-y-3">
                                {[1, 2, 3].map((item) => (
                                    <Link
                                        key={item}
                                        href="#"
                                        className="flex items-center p-3 rounded-xl hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center mr-3">
                                            <Briefcase className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-foreground text-sm">
                                                相似职位 {item}
                                            </p>
                                            <p className="text-xs text-muted-foreground">同类型职位</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-purple-500">15-25K</p>
                                            <p className="text-xs text-muted-foreground">3-5年</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
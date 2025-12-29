"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getRealEstateById } from "@/lib/data";
import type { RealEstate } from "@/lib/supabase";
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
    Home,
    Bed,
    Bath,
    Car,
    Ruler,
    TrendingUp,
    Shield,
    Wifi,
    TreePine,
    Calendar
} from "lucide-react";

export default function RealEstateDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [property, setProperty] = useState<RealEstate | null>(null);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        async function loadProperty() {
            if (params.id) {
                const data = await getRealEstateById(params.id as string);
                setProperty(data);
                setLoading(false);
            }
        }
        loadProperty();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                {/* Header Skeleton */}
                <div className="relative h-96 bg-gradient-secondary">
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

    if (!property) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                        <Home className="w-16 h-16 text-muted-foreground/50" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">房产未找到</h1>
                    <p className="text-muted-foreground mb-6">抱歉，我们找不到您要查看的房产信息</p>
                    <Button onClick={() => router.back()} className="btn-modern text-white">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        返回上页
                    </Button>
                </div>
            </div>
        );
    }

    const formatPrice = (price: number | null) => {
        if (!price) return "价格面议";
        if (price >= 10000) {
            return `${(price / 10000).toFixed(1)}万`;
        }
        return `${price.toLocaleString()}元`;
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Image Section */}
            <section className="relative h-96 lg:h-[500px] overflow-hidden">
                {property.image_url ? (
                    <>
                        <Image
                            src={property.image_url}
                            alt={property.title}
                            fill
                            className={`object-cover transition-opacity duration-700 ${
                                imageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                            onLoad={() => setImageLoaded(true)}
                            priority
                        />
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gradient-secondary animate-pulse" />
                        )}
                    </>
                ) : (
                    <div className="w-full h-full bg-gradient-secondary flex items-center justify-center">
                        <Camera className="w-24 h-24 text-muted-foreground/30" />
                    </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
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

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <div className="container-modern">
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Badge className="bg-emerald-500/20 text-white border-white/20">
                                        {property.category}
                                    </Badge>
                                    {property.bedrooms && (
                                        <Badge className="bg-blue-500/20 text-white border-white/20 flex items-center gap-1">
                                            <Bed className="w-3 h-3" />
                                            {property.bedrooms}室
                                        </Badge>
                                    )}
                                </div>
                                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">
                                    {property.title}
                                </h1>
                                {property.location && (
                                    <div className="flex items-center text-white/90">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        <span className="text-lg">{property.location}</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Price Badge */}
                            <div className="glass rounded-2xl p-4 text-center border-white/20">
                                <div className="flex items-center justify-center mb-1">
                                    <DollarSign className="w-5 h-5 text-emerald-400 mr-1" />
                                    <span className="text-2xl font-bold text-white">
                                        {formatPrice(property.price)}
                                    </span>
                                </div>
                                <p className="text-white/80 text-sm">总价</p>
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
                                    <h3 className="font-semibold text-foreground">AI 房产评估</h3>
                                    <p className="text-sm text-muted-foreground">
                                        投资价值评分 {property.ai_score}%
                                    </p>
                                </div>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2 mb-3">
                                <div 
                                    className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${property.ai_score}%` }}
                                />
                            </div>
                            <p className="text-muted-foreground">
                                基于地段价值、配套设施和未来发展潜力，这套房产具有很高的投资价值！
                            </p>
                        </div>

                        {/* Property Info Card */}
                        <div className="glass rounded-2xl p-6 border border-border/30">
                            <h3 className="text-xl font-bold text-foreground mb-4">房产信息</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 text-emerald-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">楼盘地址</p>
                                        <p className="font-medium text-foreground">
                                            {property.location || "地址信息待更新"}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-emerald-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">销售热线</p>
                                        <p className="font-medium text-foreground">400-666-8888</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 text-emerald-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">看房时间</p>
                                        <p className="font-medium text-foreground">周一至周日 9:00-18:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">房产详情</h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {property.description}
                                </p>
                            </div>
                        </div>

                        {/* Property Features Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { 
                                    icon: Bed, 
                                    label: "卧室", 
                                    value: property.bedrooms ? `${property.bedrooms}室` : "N/A" 
                                },
                                { icon: Bath, label: "卫生间", value: "2卫" },
                                { icon: Ruler, label: "建筑面积", value: "120㎡" },
                                { icon: Car, label: "停车位", value: "1个" }
                            ].map((feature, index) => (
                                <div key={index} className="glass rounded-xl p-4 text-center border border-border/30">
                                    <feature.icon className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground mb-1">{feature.label}</p>
                                    <p className="font-semibold text-foreground">{feature.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Investment Analysis */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">投资分析</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    {
                                        title: "升值潜力",
                                        value: "8.5%",
                                        description: "年均预期增长",
                                        color: "text-green-500",
                                        icon: TrendingUp
                                    },
                                    {
                                        title: "租金回报",
                                        value: "4.2%",
                                        description: "年化租金收益",
                                        color: "text-blue-500",
                                        icon: DollarSign
                                    },
                                    {
                                        title: "风险评级",
                                        value: "低风险",
                                        description: "投资安全等级",
                                        color: "text-emerald-500",
                                        icon: Shield
                                    }
                                ].map((metric, index) => (
                                    <div key={index} className="glass rounded-xl p-6 border border-border/30 text-center">
                                        <metric.icon className={`w-8 h-8 ${metric.color} mx-auto mb-3`} />
                                        <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                                            {metric.value}
                                        </div>
                                        <h4 className="font-semibold text-foreground mb-1">{metric.title}</h4>
                                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">周边配套</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    {
                                        category: "交通出行",
                                        items: ["地铁2号线 500米", "公交站 200米", "高速入口 2公里"]
                                    },
                                    {
                                        category: "教育资源",
                                        items: ["重点小学 800米", "知名中学 1.2公里", "国际幼儿园 300米"]
                                    },
                                    {
                                        category: "生活配套",
                                        items: ["大型商场 600米", "三甲医院 1公里", "银行网点 400米"]
                                    },
                                    {
                                        category: "休闲娱乐",
                                        items: ["城市公园 800米", "健身中心 500米", "电影院 1公里"]
                                    }
                                ].map((amenity, index) => (
                                    <div key={index} className="glass rounded-xl p-6 border border-border/30">
                                        <h4 className="font-semibold text-foreground mb-4 flex items-center">
                                            <TreePine className="w-5 h-5 text-emerald-500 mr-2" />
                                            {amenity.category}
                                        </h4>
                                        <ul className="space-y-2">
                                            {amenity.items.map((item, i) => (
                                                <li key={i} className="text-sm text-muted-foreground flex items-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="glass rounded-2xl p-6 border border-border/30 ">
                            <h3 className="text-xl font-bold text-foreground mb-4">联系信息</h3>
                            
                            <div className="space-y-4">
                                <div className="text-center p-4 bg-gradient-primary rounded-xl">
                                    <div className="text-3xl font-bold text-white mb-1">
                                        {formatPrice(property.price)}
                                    </div>
                                    <p className="text-white/90 text-sm">总价</p>
                                </div>
                                
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 text-emerald-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">楼盘地址</p>
                                        <p className="font-medium text-foreground">
                                            {property.location || "地址信息待更新"}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-emerald-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">销售热线</p>
                                        <p className="font-medium text-foreground">400-666-8888</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 text-emerald-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">看房时间</p>
                                        <p className="font-medium text-foreground">周一至周日 9:00-18:00</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <Button className="w-full btn-modern text-white">
                                    <Phone className="w-4 h-4 mr-2" />
                                    立即咨询
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    预约看房
                                </Button>
                            </div>
                        </div>

                        {/* Mortgage Calculator */}
                        <div className="glass rounded-2xl p-6 border border-border/30">
                            <h3 className="text-xl font-bold text-foreground mb-4">贷款计算</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-muted-foreground mb-2 block">首付比例</label>
                                    <div className="flex gap-2">
                                        {["30%", "50%", "70%"].map((ratio) => (
                                            <button
                                                key={ratio}
                                                className="flex-1 py-2 px-3 text-sm rounded-lg border border-border/30 hover:border-primary/30 hover:text-primary transition-colors"
                                            >
                                                {ratio}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="text-sm text-muted-foreground mb-2 block">贷款年限</label>
                                    <div className="flex gap-2">
                                        {["20年", "25年", "30年"].map((year) => (
                                            <button
                                                key={year}
                                                className="flex-1 py-2 px-3 text-sm rounded-lg border border-border/30 hover:border-primary/30 hover:text-primary transition-colors"
                                            >
                                                {year}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t border-border/30">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-muted-foreground">月供参考</span>
                                        <span className="font-bold text-emerald-500">¥8,500</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">首付金额</span>
                                        <span className="font-bold text-foreground">
                                            {property.price ? formatPrice(property.price * 0.3) : "面议"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Similar Properties */}
                        <div className="glass rounded-2xl p-6 border border-border/30">
                            <h3 className="text-xl font-bold text-foreground mb-4">相似房源</h3>
                            <div className="space-y-3">
                                {[1, 2, 3].map((item) => (
                                    <Link
                                        key={item}
                                        href="#"
                                        className="flex items-center p-3 rounded-xl hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-gradient-secondary mr-3" />
                                        <div className="flex-1">
                                            <p className="font-medium text-foreground text-sm">
                                                相似房源 {item}
                                            </p>
                                            <p className="text-xs text-muted-foreground">同小区 · 3室2厅</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-emerald-500">280万</p>
                                            <p className="text-xs text-muted-foreground">120㎡</p>
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
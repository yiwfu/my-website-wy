"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getFoodById } from "@/lib/data";
import type { Food } from "@/lib/supabase";
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
    Utensils,
    ChefHat,
    Award,
    Flame,
    Coffee
} from "lucide-react";

export default function FoodDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [food, setFood] = useState<Food | null>(null);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        async function loadFood() {
            if (params.id) {
                const data = await getFoodById(params.id as string);
                setFood(data);
                setLoading(false);
            }
        }
        loadFood();
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

    if (!food) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                        <Utensils className="w-16 h-16 text-muted-foreground/50" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">美食未找到</h1>
                    <p className="text-muted-foreground mb-6">抱歉，我们找不到您要查看的美食信息</p>
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
            {/* Hero Image Section */}
            <section className="relative h-96 lg:h-[500px] overflow-hidden">
                {food.image_url ? (
                    <>
                        <Image
                            src={food.image_url}
                            alt={food.title}
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
                                    <Badge className="bg-orange-500/20 text-white border-white/20">
                                        {food.category}
                                    </Badge>
                                    {food.price_range && (
                                        <Badge className="bg-green-500/20 text-white border-white/20 flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
                                            {food.price_range}
                                        </Badge>
                                    )}
                                </div>
                                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">
                                    {food.title}
                                </h1>
                                {food.location && (
                                    <div className="flex items-center text-white/90">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        <span className="text-lg">{food.location}</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Rating Badge */}
                            <div className="glass rounded-2xl p-4 text-center border-white/20">
                                <div className="flex items-center justify-center mb-1">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                                    <span className="text-2xl font-bold text-white">
                                        {food.rating.toFixed(1)}
                                    </span>
                                </div>
                                <p className="text-white/80 text-sm">美食评分</p>
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
                                    <h3 className="font-semibold text-foreground">AI 美食推荐</h3>
                                    <p className="text-sm text-muted-foreground">
                                        口味匹配度 {food.ai_score}%
                                    </p>
                                </div>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2 mb-3">
                                <div 
                                    className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${food.ai_score}%` }}
                                />
                            </div>
                            <p className="text-muted-foreground">
                                根据您的口味偏好和用餐习惯，这道美食非常适合您的味蕾！
                            </p>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">美食介绍</h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {food.description}
                                </p>
                            </div>
                        </div>

                        {/* Food Features Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: ChefHat, label: "主厨推荐", value: "招牌菜品" },
                                { icon: Flame, label: "口味特色", value: "香辣可口" },
                                { icon: Users, label: "适合人群", value: "2-4人" },
                                { icon: Coffee, label: "用餐时段", value: "全天候" }
                            ].map((feature, index) => (
                                <div key={index} className="glass rounded-xl p-4 text-center border border-border/30">
                                    <feature.icon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground mb-1">{feature.label}</p>
                                    <p className="font-semibold text-foreground">{feature.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Menu Highlights */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">推荐菜品</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    {
                                        name: "招牌主菜",
                                        price: "¥68",
                                        description: "精选食材，独特调味，口感丰富",
                                        popular: true
                                    },
                                    {
                                        name: "特色小食",
                                        price: "¥28",
                                        description: "开胃爽口，搭配完美",
                                        popular: false
                                    },
                                    {
                                        name: "经典汤品",
                                        price: "¥38",
                                        description: "营养丰富，温润滋补",
                                        popular: false
                                    },
                                    {
                                        name: "精美甜品",
                                        price: "¥25",
                                        description: "甜而不腻，回味无穷",
                                        popular: true
                                    }
                                ].map((dish, index) => (
                                    <div key={index} className="glass rounded-xl p-4 border border-border/30 relative">
                                        {dish.popular && (
                                            <div className="absolute -top-2 -right-2">
                                                <Badge className="bg-red-500 text-white">
                                                    <Flame className="w-3 h-3 mr-1" />
                                                    热销
                                                </Badge>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-foreground">{dish.name}</h4>
                                            <span className="text-lg font-bold text-orange-500">{dish.price}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{dish.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">食客评价</h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        name: "美食达人",
                                        rating: 5,
                                        comment: "味道非常棒！环境也很好，服务态度一流，强烈推荐！",
                                        date: "2024-12-20",
                                        dishes: ["招牌主菜", "特色小食"]
                                    },
                                    {
                                        name: "吃货小王",
                                        rating: 4,
                                        comment: "口味很正宗，分量足够，性价比很高。下次还会再来！",
                                        date: "2024-12-18",
                                        dishes: ["经典汤品"]
                                    }
                                ].map((review, index) => (
                                    <div key={index} className="glass rounded-xl p-6 border border-border/30">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center mr-3">
                                                    <span className="text-sm font-semibold">
                                                        {review.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground">{review.name}</p>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${
                                                                    i < review.rating
                                                                        ? "text-yellow-400 fill-current"
                                                                        : "text-gray-300"
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-sm text-muted-foreground">{review.date}</span>
                                        </div>
                                        <p className="text-muted-foreground mb-3">{review.comment}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {review.dishes.map((dish, i) => (
                                                <Badge key={i} variant="outline" className="text-xs">
                                                    {dish}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Restaurant Info Card */}
                        <div className="glass rounded-2xl p-6 border border-border/30">
                            <h3 className="text-xl font-bold text-foreground mb-4">餐厅信息</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 text-orange-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">地址</p>
                                        <p className="font-medium text-foreground">
                                            {food.location || "地址信息待更新"}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 text-orange-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">营业时间</p>
                                        <p className="font-medium text-foreground">10:00 - 22:00</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-orange-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">订餐电话</p>
                                        <p className="font-medium text-foreground">400-888-9999</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <DollarSign className="w-5 h-5 text-orange-500 mr-3" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">人均消费</p>
                                        <p className="font-medium text-foreground">
                                            {food.price_range || "¥50-80"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <Button className="w-full btn-modern text-white">
                                    <Phone className="w-4 h-4 mr-2" />
                                    立即订餐
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    查看位置
                                </Button>
                            </div>
                        </div>

                        {/* Special Offers */}
                        <div className="glass rounded-2xl p-6 border border-border/30">
                            <h3 className="text-xl font-bold text-foreground mb-4">优惠活动</h3>
                            <div className="space-y-3">
                                {[
                                    {
                                        title: "新客专享",
                                        description: "首次消费立减20元",
                                        color: "bg-red-500"
                                    },
                                    {
                                        title: "双人套餐",
                                        description: "两人用餐享8.5折优惠",
                                        color: "bg-orange-500"
                                    },
                                    {
                                        title: "会员特权",
                                        description: "会员积分兑换免费甜品",
                                        color: "bg-purple-500"
                                    }
                                ].map((offer, index) => (
                                    <div key={index} className="flex items-center p-3 rounded-xl hover:bg-muted/50 transition-colors">
                                        <div className={`w-3 h-3 rounded-full ${offer.color} mr-3`} />
                                        <div className="flex-1">
                                            <p className="font-medium text-foreground text-sm">{offer.title}</p>
                                            <p className="text-xs text-muted-foreground">{offer.description}</p>
                                        </div>
                                        <Award className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Related Foods */}
                        <div className="glass rounded-2xl p-6 border border-border/30">
                            <h3 className="text-xl font-bold text-foreground mb-4">相关推荐</h3>
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
                                                推荐美食 {item}
                                            </p>
                                            <p className="text-xs text-muted-foreground">同类型美食</p>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                                            <span className="text-xs font-medium">4.6</span>
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
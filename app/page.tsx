"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, MapPin, Building, Briefcase, Coffee, Star, TrendingUp, Users, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background text-foreground overflow-hidden">

      {/* Modern Hero Section with Gradient Background */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero pt-24 pb-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 container-modern text-center animate-fade-in">
          <div className="max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
              探索城市的
              <span className="text-gradient block mt-2">无限可能</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              城市生活指南，为您提供最权威的景点推荐、地道美食地图、优质房产信息及高薪职场机会
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="btn-modern text-white px-8 py-4 text-lg font-semibold shadow-colored hover-lift">
                开始探索
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="glass px-8 py-4 text-lg font-semibold hover-lift">
                了解更多
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">10K+</div>
                <div className="text-sm text-muted-foreground mt-1">精选景点</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">5K+</div>
                <div className="text-sm text-muted-foreground mt-1">美食推荐</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">2K+</div>
                <div className="text-sm text-muted-foreground mt-1">优质房源</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">1K+</div>
                <div className="text-sm text-muted-foreground mt-1">职位机会</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Modern Feature Grid */}
      <section className="section-padding bg-background relative">
        <div className="container-modern">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              发现城市生活的
              <span className="text-gradient">每一个精彩切面</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              无论您是游客、居民还是求职者，我们为您精选了城市中最有价值的信息资源
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group relative p-8 rounded-2xl gradient-card border border-border/50 hover-lift animate-scale-in">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-colored">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-all duration-300">热门景点</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  探索城市地标与隐秘角落。从历史古迹到现代艺术街区，发现不一样的城市风景。
                </p>
                <Link href="/attractions" className="inline-flex items-center text-primary font-semibold hover:gap-3 transition-all duration-300">
                  浏览景点 <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative p-8 rounded-2xl gradient-card border border-border/50 hover-lift animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-colored">
                  <Coffee className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-all duration-300">地道美食</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  汇集全城必吃榜单。无论是街头小吃还是米其林星级餐厅，满足您的挑剔味蕾。
                </p>
                <Link href="/food" className="inline-flex items-center text-primary font-semibold hover:gap-3 transition-all duration-300">
                  寻味美食 <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative p-8 rounded-2xl gradient-card border border-border/50 hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-colored">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-all duration-300">职场机遇</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  连接城市最具潜力的企业与人才。实时更新的高薪职位，助您职业发展更进一步。
                </p>
                <Link href="/recruitment" className="inline-flex items-center text-primary font-semibold hover:gap-3 transition-all duration-300">
                  查看职位 <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Properties Section */}
      <section className="section-padding bg-gradient-secondary relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-primary/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary/20 rounded-full"></div>
        </div>

        <div className="container-modern relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">精选房源</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-lg">
                为您找到理想的居住空间，每一处都经过精心筛选
              </p>
            </div>
            <Link href="/real-estate" className="btn-modern text-white px-8 py-4 font-semibold hover-lift">
              查看全部房源
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              title="湖畔花园公寓"
              description="直面中心湖景，3室2厅，包含智能车位，租房季特惠。"
              image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop"
              href="/real-estate"
              tag="New"
              views={1200}
              className="hover-lift animate-scale-in"
            />
            <Card
              title="市中心Loft"
              description="步行至商业中心仅需5分钟，精装修拎包入住，适合年轻白领。"
              image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop"
              href="/real-estate"
              tag="Hot"
              views={3400}
              className="hover-lift animate-scale-in"
              style={{ animationDelay: '0.1s' }}
            />
            <Card
              title="艺术家工作室"
              description="位于创意园区，超高层高，带有独立花园，灵感迸发的理想空间。"
              image="https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop"
              href="/real-estate"
              views={890}
              className="hover-lift animate-scale-in"
              style={{ animationDelay: '0.2s' }}
            />
            <Card
              title="学区房整租"
              description="紧邻重点小学，环境安静，配套设施完善，家庭居住首选。"
              image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop"
              href="/real-estate"
              views={2100}
              className="hover-lift animate-scale-in"
              style={{ animationDelay: '0.3s' }}
            />
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container-modern relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">加入我们的社区</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              准备好开始探索了吗？
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              注册账号即可收藏您心仪的景点、职位和房源，并获取个性化推荐服务
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button className="btn-modern text-white px-8 py-4 text-lg font-semibold shadow-colored hover-lift">
                免费注册
                <Users className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="glass px-8 py-4 text-lg font-semibold hover-lift">
                联系客服
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">100% 免费使用</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">实时数据更新</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
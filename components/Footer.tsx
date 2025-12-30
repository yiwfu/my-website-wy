"use client";

import Link from 'next/link';
import { MapPin, Mail, Phone, Github, Twitter, Instagram, Youtube, ArrowUp, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-gradient-secondary border-t border-border/50 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-20 h-20 border border-primary/20 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 border border-primary/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-primary/20 rounded-full"></div>
            </div>

            <div className="container-modern relative z-10">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-colored">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-foreground">滃缘网</span>
                            </div>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                智能城市生活指南，为您提供最权威的景点推荐、地道美食地图、优质房产信息及高薪职场机会。
                            </p>
                            <div className="flex items-center gap-4">
                                {[
                                    { icon: Github, href: '#', label: 'GitHub' },
                                    { icon: Twitter, href: '#', label: 'Twitter' },
                                    { icon: Instagram, href: '#', label: 'Instagram' },
                                    { icon: Youtube, href: '#', label: 'YouTube' }
                                ].map((social, i) => (
                                    <Link
                                        key={i}
                                        href={social.href}
                                        className="w-10 h-10 rounded-full glass border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 hover-lift"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                快速导航
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    { label: '热门景点', href: '/attractions' },
                                    { label: '地道美食', href: '/food' },
                                    { label: '精选房源', href: '/real-estate' },
                                    { label: '职场机遇', href: '/recruitment' },
                                    { label: '个人中心', href: '#' }
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-6">服务支持</h3>
                            <ul className="space-y-4">
                                {[
                                    { label: '帮助中心', href: '#' },
                                    { label: '用户指南', href: '#' },
                                    { label: '常见问题', href: '#' },
                                    { label: '意见反馈', href: '#' },
                                    { label: '商务合作', href: '#' },
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-6">联系我们</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <div className="w-8 h-8 rounded-lg glass border border-border/30 flex items-center justify-center">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span>contact@example.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <div className="w-8 h-8 rounded-lg glass border border-border/30 flex items-center justify-center">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span>400-123-4567</span>
                                </div>
                                {/* <div className="flex items-start gap-3 text-muted-foreground">
                                    <div className="w-8 h-8 rounded-lg glass border border-border/30 flex items-center justify-center mt-0.5">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span>创新大厦 A 座 12 层</span>
                                </div> */}
                            </div>

                            {/* Newsletter */}
                            <div className="mt-8">
                                <h4 className="text-sm font-semibold text-foreground mb-3">订阅更新</h4>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="输入邮箱地址"
                                        className="flex-1 px-3 py-2 rounded-lg glass border border-black border-border/30 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm transition-all duration-300"
                                    />
                                    <button className="px-4 py-2 rounded-lg bg-gradient-primary border border-black text-black text-sm font-medium hover:scale-105 transition-transform duration-300 shadow-colored">
                                        订阅
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border/50 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
                            <p className="flex items-center gap-1">
                                © {currentYear} 滃缘网
                            </p>
                            <div className="flex items-center gap-4">
                                <Link href="#" className="hover:text-primary transition-colors duration-300">隐私政策</Link>
                                <span>•</span>
                                <Link href="#" className="hover:text-primary transition-colors duration-300">服务条款</Link>
                                <span>•</span>
                                <Link href="#" className="hover:text-primary transition-colors duration-300">Cookie 政策</Link>
                            </div>
                        </div>

                        {/* Back to Top */}
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/30 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 hover-lift group"
                        >
                            <span>回到顶部</span>
                            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </button>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="border-t border-border/50 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                        <div className="flex flex-wrap items-center gap-4">
                            <span>ICP备案号：京ICP备12345678号</span>
                            <span>•</span>
                            <span>网络文化经营许可证：京网文[2023]1234-567号</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
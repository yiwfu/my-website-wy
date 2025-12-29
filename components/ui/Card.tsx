"use client";

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Eye, Heart, Star, ArrowUpRight, ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface CardProps {
    title: string;
    description: string;
    image?: string;
    href: string;
    tag?: string;
    likes?: number;
    views?: number;
    rating?: number;
    className?: string;
    aspectRatio?: "video" | "square" | "portrait";
    style?: React.CSSProperties;
}

export function Card({
    title,
    description,
    image,
    href,
    tag,
    likes,
    views,
    rating,
    className,
    aspectRatio = "video",
    style
}: CardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Link
            href={href}
            className={cn(
                "group relative flex flex-col bg-background border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 hover-lift shadow-modern hover:shadow-colored",
                "hover:border-primary/20 hover:bg-gradient-card",
                className
            )}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Header with Overlay Effects */}
            <div className={cn(
                "relative w-full bg-gradient-secondary overflow-hidden",
                aspectRatio === "video" && "aspect-video",
                aspectRatio === "square" && "aspect-square",
                aspectRatio === "portrait" && "aspect-[3/4]"
            )}>
                {image ? (
                    <>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className={cn(
                                "object-cover transition-all duration-700 group-hover:scale-110",
                                imageLoaded ? "opacity-100" : "opacity-0"
                            )}
                            onLoad={() => setImageLoaded(true)}
                        />
                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Loading Skeleton */}
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gradient-secondary animate-pulse" />
                        )}
                    </>
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-gradient-secondary">
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <span className="text-sm">暂无图片</span>
                        </div>
                    </div>
                )}

                {/* Floating Action Button */}
                <div className={cn(
                    "absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-300",
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
                )}>
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>

                {/* Tag Badge */}
                {tag && (
                    <div className="absolute top-4 left-4">
                        <Badge 
                            variant="secondary" 
                            className="glass text-foreground backdrop-blur-md shadow-sm border-border/50 font-medium px-3 py-1"
                        >
                            {tag}
                        </Badge>
                    </div>
                )}

                {/* Rating */}
                {rating && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-1 glass rounded-full px-3 py-1.5">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-foreground">{rating}</span>
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gradient transition-all duration-300 line-clamp-2">
                    {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
                    {description}
                </p>

                {/* Stats Footer */}
                {(likes !== undefined || views !== undefined) && (
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {views !== undefined && (
                                <div className="flex items-center gap-1.5">
                                    <Eye className="w-4 h-4" />
                                    <span>{views.toLocaleString()}</span>
                                </div>
                            )}
                            {likes !== undefined && (
                                <div className="flex items-center gap-1.5">
                                    <Heart className="w-4 h-4" />
                                    <span>{likes}</span>
                                </div>
                            )}
                        </div>
                        
                        {/* Hover Indicator */}
                        <div className={cn(
                            "w-2 h-2 rounded-full bg-primary transition-all duration-300",
                            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
                        )} />
                    </div>
                )}
            </div>

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/20 transition-all duration-500 pointer-events-none" />
            
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />
        </Link>
    );
}
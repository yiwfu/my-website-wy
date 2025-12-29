"use client";

import { ReactNode } from 'react';
import Masonry from 'react-masonry-css';

interface MasonryGridProps {
    children: ReactNode;
    className?: string;
    columns?: {
        default?: number;
        1536?: number;  // 2xl
        1280?: number;  // xl
        1024?: number;  // lg
        768?: number;   // md
        640?: number;   // sm
        480?: number;   // xs
    };
}

export function MasonryGrid({ 
    children, 
    className = '',
    columns
}: MasonryGridProps) {
    // 增强的响应式断点配置
    const defaultBreakpointColumns = {
        default: 4,      // 默认4列，适合大屏幕
        1536: 4,         // 2xl: 4列
        1280: 3,         // xl: 3列
        1024: 3,         // lg: 3列
        768: 2,          // md: 2列
        640: 2,          // sm: 2列
        480: 1           // xs: 1列，适合手机
    };

    // 合并用户自定义配置
    const breakpointColumns = columns ? { ...defaultBreakpointColumns, ...columns } : defaultBreakpointColumns;

    return (
        <Masonry
            breakpointCols={breakpointColumns}
            className={`masonry-grid ${className}`}
            columnClassName="masonry-grid-column"
        >
            {children}
        </Masonry>
    );
}
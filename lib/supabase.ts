import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Debug logging
console.log('Supabase URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
console.log('Supabase Key:', supabaseAnonKey ? '✓ Set' : '✗ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase credentials missing!');
    console.error('Please set these in .env.local:');
    console.error('  NEXT_PUBLIC_SUPABASE_URL=your-project-url');
    console.error('  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Attraction {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string | null;
    image_url: string | null;
    rating: number;
    ai_score: number;
    created_at: string;
    updated_at: string;
}

export interface Food {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string | null;
    image_url: string | null;
    rating: number;
    ai_score: number;
    price_range: string | null;
    created_at: string;
    updated_at: string;
}

export interface RealEstate {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string | null;
    image_url: string | null;
    price: number | null;
    bedrooms: number | null;
    ai_score: number;
    created_at: string;
    updated_at: string;
}

export interface Job {
    image_url: string | null;
    id: string;
    title: string;
    description: string;
    category: string;
    company: string | null;
    location: string | null;
    salary_range: string | null;
    ai_score: number;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    created_at: string;
    updated_at: string;
}

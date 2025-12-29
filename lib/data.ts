import { supabase, Attraction, Food, RealEstate, Job } from './supabase';

// Attractions
export async function getAttractions(limit?: number) {
    let query = supabase
        .from('attractions')
        .select('*')
        .order('ai_score', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching attractions:', error);
        return [];
    }

    return data as Attraction[];
}

export async function getAttractionById(id: string) {
    const { data, error } = await supabase
        .from('attractions')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching attraction:', error);
        return null;
    }

    return data as Attraction;
}

// Food
// Food
export async function getFood(limit?: number) {
    try {
        console.log('🔍 Fetching food data...');

        let query = supabase
            .from('food')
            .select('*')
            .order('ai_score', { ascending: false });

        console.log('🔍 Fetching food data...', query);

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
            console.error('❌ Error fetching food:', error);
            console.error('Error details:', {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
            });
            return [];
        }

        console.log(`✅ Successfully fetched ${data?.length || 0} food items`);
        return data as Food[];
    } catch (err) {
        console.error('❌ Unexpected error in getFood:', err);
        return [];
    }
}

export async function getFoodById(id: string) {
    const { data, error } = await supabase
        .from('food')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching food item:', error);
        return null;
    }

    return data as Food;
}

// Real Estate
export async function getRealEstate(limit?: number) {
    let query = supabase
        .from('real_estate')
        .select('*')
        .order('ai_score', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching real estate:', error);
        return [];
    }

    return data as RealEstate[];
}

export async function getRealEstateById(id: string) {
    const { data, error } = await supabase
        .from('real_estate')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching real estate item:', error);
        return null;
    }

    return data as RealEstate;
}

// Jobs
export async function getJobs(limit?: number) {
    let query = supabase
        .from('jobs')
        .select('*')
        .order('ai_score', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }

    return data as Job[];
}

export async function getJobById(id: string) {
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching job:', error);
        return null;
    }

    return data as Job;
}

// Get top recommendations across all categories
export async function getTopRecommendations() {
    const [attractions, food, realEstate] = await Promise.all([
        getAttractions(1),
        getFood(1),
        getRealEstate(1)
    ]);

    return {
        attraction: attractions[0] || null,
        food: food[0] || null,
        realEstate: realEstate[0] || null
    };
}

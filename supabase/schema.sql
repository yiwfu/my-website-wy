-- Cultural Tourism Portal Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Attractions Table (景点)
CREATE TABLE attractions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- 'historic', 'nature', 'cultural', 'art', 'lifestyle'
  location TEXT,
  image_url TEXT,
  rating DECIMAL(2,1) DEFAULT 0.0,
  ai_score INTEGER DEFAULT 0, -- AI recommendation score 0-100
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real Estate Table (房产)
CREATE TABLE real_estate (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- 'for_rent', 'homestay', 'for_sale', 'rental', 'vacation', 'long_term'
  location TEXT,
  image_url TEXT,
  price DECIMAL(10,2),
  bedrooms INTEGER,
  ai_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recruitment/Jobs Table (招聘)
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- 'full_time', 'management', 'marketing', 'kitchen', 'events', 'remote'
  company TEXT,
  location TEXT,
  salary_range TEXT,
  ai_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users/Profiles Table (用户)
-- This table extends Supabase Auth users with profile information
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE food ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access for attractions" ON attractions FOR SELECT USING (true);
CREATE POLICY "Public read access for food" ON food FOR SELECT USING (true);
CREATE POLICY "Public read access for real_estate" ON real_estate FOR SELECT USING (true);
CREATE POLICY "Public read access for jobs" ON jobs FOR SELECT USING (true);

-- Users table policies
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Sample Data for Attractions
INSERT INTO attractions (title, description, category, location, ai_score) VALUES
('Ancient City Wall', 'Walk through history on the best-preserved city walls in the region. Beautiful sunset views.', 'historic', 'Old Town District', 98),
('Cloud Mountain', 'Breathtaking views and hiking trails.', 'nature', 'North District', 95),
('Grand Temple', 'Peaceful spiritual center with ancient architecture.', 'cultural', 'Temple Quarter', 92),
('Night Market Street', 'Vibrant street life and local crafts.', 'lifestyle', 'Downtown', 88),
('Botanical Garden', 'Rare plants and serene walking paths.', 'nature', 'West Park', 85),
('Art Museum', 'Contemporary and traditional local art.', 'art', 'Cultural District', 90);

-- Sample Data for Food
INSERT INTO food (title, description, category, location, ai_score, price_range) VALUES
('Spicy Noodles House', 'The city''s most famous noodle dish. Authentic local flavors.', 'local_favorite', 'Food Street', 96, '$$'),
('Golden Duck Restaurant', 'Traditional roast duck with a modern twist.', 'fine_dining', 'Riverside', 94, '$$$'),
('Sweet Alley Snacks', 'Desserts and street snacks you can''t miss.', 'street_food', 'Old Quarter', 89, '$'),
('Tea House Pavilion', 'Experience the local tea culture.', 'beverage', 'Garden District', 87, '$$'),
('Midnight BBQ', 'Perfect spot for late-night cravings.', 'nightlife', 'Entertainment Zone', 85, '$$'),
('Seafood Harbor', 'Fresh catches served daily.', 'seafood', 'Harbor Area', 91, '$$$');

-- Sample Data for Real Estate
INSERT INTO real_estate (title, description, category, location, price, bedrooms, ai_score) VALUES
('Mountain View Villa', '3BR villa with panoramic mountain views. Private pool included.', 'vacation', 'Mountain District', 2500.00, 3, 97),
('Old Town Courtyard', 'Restored historic courtyard home.', 'homestay', 'Historic Center', 1800.00, 2, 93),
('Lakefront Apartment', 'Modern apartment near the city lake.', 'for_sale', 'Lakeside', 450000.00, 2, 88),
('Artist Studio Loft', 'Creative space in the art district.', 'rental', 'Art Quarter', 1200.00, 1, 85),
('Bamboo Grove Cottage', 'Secluded retreat surrounded by nature.', 'vacation', 'Rural Area', 1500.00, 2, 90),
('City Center Condo', 'Conveniently located near all attractions.', 'long_term', 'Downtown', 2000.00, 2, 86);

-- Sample Data for Jobs
INSERT INTO jobs (title, description, category, company, location, salary_range, ai_score) VALUES
('Tour Guide Coordinator', 'Manage tour schedules and guide assignments.', 'full_time', 'City Tours Inc', 'Tourist Center', '$3000-$4000', 92),
('Hotel Front Desk Manager', 'Luxury hotel seeking experienced manager.', 'management', 'Grand Hotel', 'Downtown', '$4500-$6000', 95),
('Social Media Specialist', 'Promote local tourism on social platforms.', 'marketing', 'Tourism Board', 'Remote', '$3500-$5000', 88),
('Traditional Chef', 'Specializing in local cuisine.', 'kitchen', 'Heritage Restaurant', 'Old Town', '$3000-$4500', 90),
('Event Planner', 'Organize cultural festivals and events.', 'events', 'Cultural Center', 'City Center', '$3200-$4800', 87),
('Travel Photographer', 'Capture the beauty of our city for marketing.', 'remote', 'Tourism Agency', 'Flexible', '$2500-$4000', 85);

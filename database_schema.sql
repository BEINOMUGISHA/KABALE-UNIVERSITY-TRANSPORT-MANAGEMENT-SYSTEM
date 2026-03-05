
-- KABALE UNIVERSITY TRANSPORT SYSTEM (KUTS)
-- Database Schema for Supabase (PostgreSQL)

-- 1. PROFILES (Extends Supabase Auth Users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('STUDENT', 'STAFF', 'ADMIN', 'TRANSPORT_MANAGER', 'SECURITY')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. BUSES (Fleet Management)
CREATE TABLE buses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plate_number TEXT UNIQUE NOT NULL,
  model TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 60,
  status TEXT NOT NULL CHECK (status IN ('OPERATIONAL', 'MAINTENANCE', 'BREAKDOWN')) DEFAULT 'OPERATIONAL',
  fuel_level INTEGER NOT NULL CHECK (fuel_level >= 0 AND fuel_level <= 100) DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. DRIVERS
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  phone_number TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'OFF_DUTY')) DEFAULT 'ACTIVE',
  avatar_url TEXT,
  rating NUMERIC(3,2) DEFAULT 5.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ROUTES
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  stops TEXT[] NOT NULL,
  duration_minutes INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('CAMPUS_TO_TOWN', 'MEDICAL_SCHOOL', 'HOSTEL_SHUTTLE')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. SCHEDULES (Route Assignments)
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
  bus_id UUID REFERENCES buses(id) ON DELETE SET NULL,
  driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL,
  departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
  available_seats INTEGER NOT NULL,
  total_seats INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ON_TIME', 'DELAYED')) DEFAULT 'ON_TIME',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ENROLLMENTS (Transport Service Subscriptions)
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')) DEFAULT 'PENDING',
  application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. BOOKINGS (Seat Reservations)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE,
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
  booking_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  seat_number TEXT,
  status TEXT NOT NULL CHECK (status IN ('CONFIRMED', 'CANCELLED')) DEFAULT 'CONFIRMED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Example Policy: Profiles are viewable by everyone, but only editable by the owner
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Example Policy: Bookings are viewable by the owner and admins
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all bookings" ON bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('ADMIN', 'TRANSPORT_MANAGER'))
);

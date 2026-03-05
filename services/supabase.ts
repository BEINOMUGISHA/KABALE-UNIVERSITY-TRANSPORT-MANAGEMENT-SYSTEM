
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

// Lazy initialization to prevent crashes if keys are missing
let supabaseClient: any = null;

export const getSupabase = () => {
  if (!supabaseClient) {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials missing. Using local storage fallback.');
      return null;
    }
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
};

// Database table names
export const TABLES = {
  BUSES: 'buses',
  DRIVERS: 'drivers',
  ROUTES: 'routes',
  SCHEDULES: 'schedules',
  BOOKINGS: 'bookings',
  ENROLLMENTS: 'enrollments',
  USERS: 'users',
};

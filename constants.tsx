
import { 
  LayoutDashboard, 
  Bus as BusIcon, 
  Users, 
  Route, 
  Calendar, 
  Map, 
  Image, 
  History, 
  User as UserIcon, 
  Settings, 
  Bell, 
  Search, 
  Sparkles, 
  ArrowRight, 
  FileCheck, 
  FileText, 
  Scan,
  Phone,
  Star
} from 'lucide-react';
import { Bus, BusRoute, Driver, Schedule, User, UserRole, Enrollment } from './types';

export const ICONS = {
  Dashboard: LayoutDashboard,
  Bus: BusIcon,
  Users,
  Route,
  Calendar,
  Map,
  Image,
  History,
  User: UserIcon,
  Settings,
  Bell,
  Search,
  Sparkles,
  ArrowRight,
  FileCheck,
  FileText,
  Scanner: Scan,
  Phone,
  Star
};

export const ASSET_PATHS = {
  LOGO: 'https://www.kab.ac.ug/wp-content/uploads/2021/08/kab-logo.png',
  USER_PROFILE: 'https://picsum.photos/seed/kuts/200/200'
};

export const ROUTES: BusRoute[] = [
  { id: 'r1', name: 'Main Campus - Town', stops: ['Main Gate', 'Library', 'Town Center'], durationMinutes: 20, type: 'CAMPUS_TO_TOWN' },
  { id: 'r2', name: 'Main Campus - Medical School', stops: ['Main Gate', 'Science Block', 'Medical School'], durationMinutes: 30, type: 'MEDICAL_SCHOOL' },
  { id: 'r3', name: 'Hostel Shuttle', stops: ['Hall A', 'Hall B', 'Main Gate'], durationMinutes: 15, type: 'HOSTEL_SHUTTLE' },
];

export const BUSES: Bus[] = [
  { id: 'b1', plateNumber: 'UBA 123X', model: 'Isuzu Coaster', capacity: 30, status: 'OPERATIONAL', fuelLevel: 85 },
  { id: 'b2', plateNumber: 'UBB 456Y', model: 'Toyota Hiace', capacity: 14, status: 'OPERATIONAL', fuelLevel: 45 },
  { id: 'b3', plateNumber: 'UBC 789Z', model: 'Isuzu Coaster', capacity: 30, status: 'MAINTENANCE', fuelLevel: 10 },
];

export const DRIVERS: Driver[] = [
  { id: 'd1', name: 'Mugisha John', licenseNumber: 'DL12345', phoneNumber: '+256 701 000001', status: 'ACTIVE', avatarUrl: 'https://i.pravatar.cc/150?u=d1', rating: 4.8 },
  { id: 'd2', name: 'Atwine Sarah', licenseNumber: 'DL67890', phoneNumber: '+256 701 000002', status: 'ACTIVE', avatarUrl: 'https://i.pravatar.cc/150?u=d2', rating: 4.9 },
];

export const SCHEDULES: Schedule[] = [
  { id: 's1', routeId: 'r1', busId: 'b1', driverId: 'd1', departureTime: '08:00 AM', availableSeats: 12, totalSeats: 30, status: 'ON_TIME' },
  { id: 's2', routeId: 'r2', busId: 'b2', driverId: 'd2', departureTime: '09:30 AM', availableSeats: 5, totalSeats: 14, status: 'ON_TIME' },
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Innocent Beinomugisha',
  email: 'beinomugishainnocent2001@gmail.com',
  role: UserRole.STUDENT,
  avatarUrl: 'https://i.pravatar.cc/150?u=u1'
};

export const MOCK_ENROLLMENTS: Enrollment[] = [
  { id: 'e1', userId: 'u1', status: 'APPROVED', applicationDate: '2025-01-15' }
];

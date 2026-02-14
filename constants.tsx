
import React from 'react';
import { BusRoute, Schedule, User, UserRole, Driver, Bus, Enrollment, BoardingLog } from './types';

export const UNIVERSITY_COLORS = {
  primary: '#1a5f2b', // Kabale Green
  secondary: '#d4af37', // Gold
  accent: '#1e293b' // Dark Slate
};

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Amanya Derrick',
  email: 'amanya.derrick@kab.ac.ug',
  role: UserRole.STUDENT,
  registrationNumber: '22/U/1234/PS',
  department: 'Department of Computing',
  enrollmentStatus: 'APPROVED'
};

export const BUSES: Bus[] = [
  { id: 'b1', plateNumber: 'UBA 123X', model: 'Isuzu Bus', capacity: 60, status: 'OPERATIONAL', lastServiceDate: '2024-04-15', fuelLevel: 85 },
  { id: 'b2', plateNumber: 'UBB 456Y', model: 'Coaster', capacity: 30, status: 'MAINTENANCE', lastServiceDate: '2024-05-01', fuelLevel: 40 },
  { id: 'b3', plateNumber: 'UBC 789Z', model: 'Isuzu Bus', capacity: 60, status: 'OPERATIONAL', lastServiceDate: '2024-04-20', fuelLevel: 92 },
  { id: 'b4', plateNumber: 'UBD 001A', model: 'Shuttle Van', capacity: 14, status: 'OPERATIONAL', lastServiceDate: '2024-05-10', fuelLevel: 65 }
];

export const DRIVERS: Driver[] = [
  {
    id: 'd1',
    name: 'Mugisha Paul',
    phoneNumber: '+256 701 123456',
    licenseNumber: 'DL-KAB-001',
    rating: 4.8,
    avatarUrl: 'https://i.pravatar.cc/150?u=d1',
    status: 'ACTIVE'
  },
  {
    id: 'd2',
    name: 'Tumukunde Sarah',
    phoneNumber: '+256 772 654321',
    licenseNumber: 'DL-KAB-002',
    rating: 4.9,
    avatarUrl: 'https://i.pravatar.cc/150?u=d2',
    status: 'ACTIVE'
  },
  {
    id: 'd3',
    name: 'Byaruhanga John',
    phoneNumber: '+256 750 987654',
    licenseNumber: 'DL-KAB-003',
    rating: 4.5,
    avatarUrl: 'https://i.pravatar.cc/150?u=d3',
    status: 'OFF_DUTY'
  }
];

export const ROUTES: BusRoute[] = [
  {
    id: 'r1',
    name: 'Town - Main Campus Express',
    origin: 'Kabale Town (Post Office)',
    destination: 'Main Campus',
    type: 'MORNING',
    stops: [
      { id: 'st1', name: 'Post Office', estimatedArrivalTime: '07:30' },
      { id: 'st2', name: 'Town Hall', estimatedArrivalTime: '07:35' },
      { id: 'st3', name: 'Kikungiri Crossing', estimatedArrivalTime: '07:40' },
      { id: 'st4', name: 'University Gate', estimatedArrivalTime: '07:45' }
    ],
    durationMinutes: 15
  },
  {
    id: 'r2',
    name: 'Campus - Medical School',
    origin: 'Main Campus',
    destination: 'Medical School (Makanga)',
    type: 'CIRCULAR',
    stops: [
      { id: 'st5', name: 'Main Library', estimatedArrivalTime: '08:15' },
      { id: 'st6', name: 'Lower Campus', estimatedArrivalTime: '08:20' },
      { id: 'st7', name: 'Regional Referral', estimatedArrivalTime: '08:30' },
      { id: 'st8', name: 'Medical School', estimatedArrivalTime: '08:35' }
    ],
    durationMinutes: 20
  },
  {
    id: 'r3',
    name: 'Kikungiri Hostels Shuttle',
    origin: 'Kikungiri Hostels',
    destination: 'Main Campus',
    type: 'CIRCULAR',
    stops: [
      { id: 'st9', name: 'Hostel Block A', estimatedArrivalTime: '07:45' },
      { id: 'st10', name: 'White House', estimatedArrivalTime: '07:50' },
      { id: 'st11', name: 'Main Library', estimatedArrivalTime: '07:55' }
    ],
    durationMinutes: 10
  }
];

export const SCHEDULES: Schedule[] = [
  { id: 's1', routeId: 'r1', busId: 'b1', departureTime: '07:30', driverId: 'd1', availableSeats: 12, totalSeats: 60, status: 'ON_TIME', semester: 'Semester II 2024' },
  { id: 's2', routeId: 'r1', busId: 'b3', departureTime: '08:00', driverId: 'd2', availableSeats: 45, totalSeats: 60, status: 'ON_TIME', semester: 'Semester II 2024' },
  { id: 's3', routeId: 'r2', busId: 'b2', departureTime: '08:15', driverId: 'd1', availableSeats: 5, totalSeats: 30, status: 'DELAYED', semester: 'Semester II 2024' },
  { id: 's4', routeId: 'r3', busId: 'b4', departureTime: '07:45', driverId: 'd2', availableSeats: 2, totalSeats: 14, status: 'ON_TIME', semester: 'Semester II 2024' },
  { id: 's5', routeId: 'r1', busId: 'b1', departureTime: '09:00', driverId: 'd3', availableSeats: 40, totalSeats: 60, status: 'ON_TIME', semester: 'Semester II 2024' },
];

export const MOCK_ENROLLMENTS: Enrollment[] = [
  { id: 'e1', userId: 'u1', routeId: 'r1', appliedDate: '2024-05-01', status: 'APPROVED', priorityReason: 'Resides in Kabale Town' },
  { id: 'e2', userId: 'u2', routeId: 'r2', appliedDate: '2024-05-02', status: 'PENDING', priorityReason: 'Medical student' },
  { id: 'e3', userId: 'u3', routeId: 'r1', appliedDate: '2024-05-03', status: 'PENDING', priorityReason: 'Evening class student' },
];

export const MOCK_BOARDING_LOGS: BoardingLog[] = [
  { id: 'l1', userId: 'u1', scheduleId: 's1', boardingTime: '07:28', location: 'Post Office' },
  { id: 'l2', userId: 'u4', scheduleId: 's1', boardingTime: '07:29', location: 'Post Office' },
];

export const ICONS = {
  Bus: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s1-1 1-2V7a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v9c0 1 1 2 1 2h3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>,
  Route: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  History: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Dashboard: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Bell: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Users: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Scanner: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></svg>,
  FileCheck: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>,
  Wrench: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  FileText: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
};


export enum UserRole {
  STUDENT = 'STUDENT',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
  TRANSPORT_MANAGER = 'TRANSPORT_MANAGER',
  SECURITY = 'SECURITY'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Bus {
  id: string;
  plateNumber: string;
  model: string;
  capacity: number;
  status: 'OPERATIONAL' | 'MAINTENANCE' | 'BREAKDOWN';
  fuelLevel: number;
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  phoneNumber: string;
  status: 'ACTIVE' | 'OFF_DUTY';
  avatarUrl: string;
  rating: number;
}

export interface BusRoute {
  id: string;
  name: string;
  stops: string[];
  durationMinutes: number;
  type: 'CAMPUS_TO_TOWN' | 'MEDICAL_SCHOOL' | 'HOSTEL_SHUTTLE';
}

export interface Schedule {
  id: string;
  routeId: string;
  busId: string;
  driverId: string;
  departureTime: string;
  availableSeats: number;
  totalSeats: number;
  status: 'ON_TIME' | 'DELAYED';
}

export interface Enrollment {
  id: string;
  userId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  applicationDate: string;
}

export interface Booking {
  id: string;
  userId: string;
  scheduleId: string;
  routeId: string;
  bookingTime: string;
  seatNumber: string;
  status: 'CONFIRMED' | 'CANCELLED';
}

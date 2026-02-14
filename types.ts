
export enum UserRole {
  STUDENT = 'STUDENT',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
  TRANSPORT_MANAGER = 'MANAGER',
  SECURITY = 'SECURITY'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  registrationNumber?: string;
  department?: string;
  enrollmentStatus?: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface Driver {
  id: string;
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  rating: number;
  avatarUrl: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'OFF_DUTY';
}

export interface Bus {
  id: string;
  plateNumber: string;
  model: string;
  capacity: number;
  status: 'OPERATIONAL' | 'MAINTENANCE' | 'BREAKDOWN';
  lastServiceDate: string;
  fuelLevel: number; // Percentage
}

export interface RouteStop {
  id: string;
  name: string;
  estimatedArrivalTime?: string;
}

export interface BusRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  stops: RouteStop[];
  durationMinutes: number;
  type: 'MORNING' | 'EVENING' | 'CIRCULAR';
}

export interface Schedule {
  id: string;
  routeId: string;
  busId: string;
  departureTime: string;
  driverId: string;
  availableSeats: number;
  totalSeats: number;
  status: 'ON_TIME' | 'DELAYED' | 'DEPARTED';
  semester?: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  routeId: string;
  appliedDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  priorityReason: string;
}

export interface BoardingLog {
  id: string;
  userId: string;
  scheduleId: string;
  boardingTime: string;
  location: string;
}

export interface Booking {
  id: string;
  userId: string;
  scheduleId: string;
  routeId: string;
  bookingTime: string;
  seatNumber: string;
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

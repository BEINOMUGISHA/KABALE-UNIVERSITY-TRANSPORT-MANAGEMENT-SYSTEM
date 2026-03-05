
import { Bus, BusRoute, Driver, Schedule, User, UserRole, Enrollment, Booking } from '../types';
import { BUSES, ROUTES, DRIVERS, SCHEDULES, MOCK_USER, MOCK_ENROLLMENTS } from '../constants';
import { getSupabase, TABLES } from './supabase';

const STORAGE_KEY = 'kuts_data_v1';

interface AppState {
  users: User[];
  buses: Bus[];
  routes: BusRoute[];
  drivers: Driver[];
  schedules: Schedule[];
  enrollments: Enrollment[];
  bookings: Booking[];
}

class Store {
  private state: AppState;
  private supabase = getSupabase();

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.state = JSON.parse(saved);
    } else {
      this.state = {
        users: [MOCK_USER],
        buses: BUSES,
        routes: ROUTES,
        drivers: DRIVERS,
        schedules: SCHEDULES,
        enrollments: MOCK_ENROLLMENTS,
        bookings: []
      };
      this.save();
    }

    // Try to sync with Supabase if available
    this.syncWithSupabase();
  }

  private async syncWithSupabase() {
    if (!this.supabase) return;

    try {
      // Fetch initial data from Supabase
      const { data: buses } = await this.supabase.from(TABLES.BUSES).select('*');
      const { data: bookings } = await this.supabase.from(TABLES.BOOKINGS).select('*');
      
      if (buses) this.state.buses = buses;
      if (bookings) this.state.bookings = bookings;
      
      this.save();
    } catch (error) {
      console.error('Supabase sync failed:', error);
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    window.dispatchEvent(new CustomEvent('kuts-store-update'));
  }

  // Getters
  getBuses = () => this.state.buses;
  getDrivers = () => this.state.drivers;
  getRoutes = () => this.state.routes;
  getSchedules = () => this.state.schedules;
  getBookings = (userId?: string) => userId ? this.state.bookings.filter(b => b.userId === userId) : this.state.bookings;

  // Fleet Actions
  addBus = async (bus: Omit<Bus, 'id'>) => {
    const newBus = { ...bus, id: 'b' + Date.now() };
    this.state.buses.push(newBus);
    this.save();

    if (this.supabase) {
      await this.supabase.from(TABLES.BUSES).insert([newBus]);
    }
    
    return newBus;
  };

  updateBusStatus = async (id: string, status: Bus['status'], fuelLevel?: number) => {
    const bus = this.state.buses.find(b => b.id === id);
    if (bus) {
      bus.status = status;
      if (fuelLevel !== undefined) bus.fuelLevel = fuelLevel;
      this.save();

      if (this.supabase) {
        await this.supabase.from(TABLES.BUSES).update({ status, fuelLevel }).eq('id', id);
      }
    }
  };

  // Driver Actions
  updateDriverStatus = async (id: string, status: Driver['status']) => {
    const driver = this.state.drivers.find(d => d.id === id);
    if (driver) {
      driver.status = status;
      this.save();

      if (this.supabase) {
        await this.supabase.from(TABLES.DRIVERS).update({ status }).eq('id', id);
      }
    }
  };

  // Booking Actions
  createBooking = async (userId: string, scheduleId: string) => {
    const schedule = this.state.schedules.find(s => s.id === scheduleId);
    if (schedule && schedule.availableSeats > 0) {
      const newBooking: Booking = {
        id: 'bk' + Date.now(),
        userId,
        scheduleId,
        routeId: schedule.routeId,
        bookingTime: new Date().toISOString(),
        seatNumber: (schedule.totalSeats - schedule.availableSeats + 1).toString(),
        status: 'CONFIRMED'
      };
      
      this.state.bookings.push(newBooking);
      schedule.availableSeats -= 1;
      this.save();

      if (this.supabase) {
        await this.supabase.from(TABLES.BOOKINGS).insert([newBooking]);
        await this.supabase.from(TABLES.SCHEDULES).update({ availableSeats: schedule.availableSeats }).eq('id', scheduleId);
      }

      return newBooking;
    }
    return null;
  };

  // Stats Logic
  getStats = () => {
    const totalBuses = this.state.buses.length;
    const operationalBuses = this.state.buses.filter(b => b.status === 'OPERATIONAL').length;
    const totalBookings = this.state.bookings.length;
    const avgFuel = totalBuses > 0 ? this.state.buses.reduce((acc, b) => acc + b.fuelLevel, 0) / totalBuses : 0;

    return { totalBuses, operationalBuses, totalBookings, avgFuel };
  };
}

export const kutsStore = new Store();

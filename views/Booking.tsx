
import React, { useState, useEffect } from 'react';
import { ICONS, ROUTES, DRIVERS, BUSES } from '../constants';
import { kutsStore } from '../services/store';
import { Schedule, UserRole } from '../types';

const Booking: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>(kutsStore.getSchedules());

  useEffect(() => {
    const sync = () => setSchedules([...kutsStore.getSchedules()]);
    window.addEventListener('kuts-store-update', sync);
    return () => window.removeEventListener('kuts-store-update', sync);
  }, []);

  const getSchedulesForRoute = (routeId: string) => {
    return schedules.filter(s => s.routeId === routeId);
  };

  const handleBook = async (scheduleId: string) => {
    const booking = await kutsStore.createBooking('u1', scheduleId); // u1 is MOCK_USER
    if (booking) {
      setShowConfirmation(scheduleId);
      setTimeout(() => setShowConfirmation(null), 3000);
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-6 md:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">Commuter Booking</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium text-sm md:text-base">Verified student bookings are synced directly with university dispatch.</p>
        </div>
        <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2">
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
           Active Server Connection
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2 mb-4">Choose Route</h3>
          {ROUTES.map(route => (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route.id)}
              className={`w-full text-left p-6 rounded-3xl transition-all border-2 ${
                selectedRoute === route.id 
                  ? 'bg-green-700 border-green-700 text-white shadow-xl translate-x-1' 
                  : 'bg-white dark:bg-slate-900 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white'
              }`}
            >
              <p className={`font-black ${selectedRoute === route.id ? 'text-white' : 'text-slate-800 dark:text-white'}`}>{route.name}</p>
              <p className={`text-[10px] font-bold mt-2 uppercase tracking-widest ${selectedRoute === route.id ? 'text-green-100' : 'text-slate-400 dark:text-slate-500'}`}>
                {route.stops.length} Stops • {route.durationMinutes}m
              </p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {!selectedRoute ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400">
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
                <ICONS.Bus />
              </div>
              <p className="font-bold uppercase tracking-widest text-xs">Select a campus route to start</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {getSchedulesForRoute(selectedRoute).map(schedule => {
                const driver = DRIVERS.find(d => d.id === schedule.driverId);
                const bus = BUSES.find(b => b.id === schedule.busId);
                const isFull = schedule.availableSeats === 0;
                
                return (
                  <div key={schedule.id} className={`bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all ${isFull ? 'opacity-50' : 'hover:shadow-xl hover:-translate-y-1'}`}>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <p className="text-4xl font-black text-slate-800 dark:text-white tabular-nums">{schedule.departureTime}</p>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Scheduled Departure</p>
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        schedule.status === 'ON_TIME' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {schedule.status.replace('_', ' ')}
                      </div>
                    </div>

                    <div className="space-y-4 mb-10">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px]">Assigned Bus</span>
                        <span className="font-black text-slate-800 dark:text-white">{bus?.plateNumber}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px]">Live Occupancy</span>
                        <div className="flex items-center gap-2">
                           <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 transition-all duration-500" 
                                style={{ width: `${(1 - schedule.availableSeats / schedule.totalSeats) * 100}%` }}
                              ></div>
                           </div>
                           <span className="font-black text-slate-800 dark:text-white tabular-nums">{schedule.availableSeats} Left</span>
                        </div>
                      </div>
                    </div>

                    <button
                      disabled={isFull || !!showConfirmation}
                      onClick={() => handleBook(schedule.id)}
                      className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-widest transition-all ${
                        showConfirmation === schedule.id
                          ? 'bg-green-600 text-white scale-95'
                          : isFull 
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                            : 'bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 shadow-xl shadow-slate-900/10'
                      }`}
                    >
                      {showConfirmation === schedule.id ? 'Transaction Success ✓' : isFull ? 'Service Full' : 'Secure Seat'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;

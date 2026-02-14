
import React, { useState } from 'react';
import { ICONS, ROUTES, SCHEDULES, DRIVERS, BUSES } from '../constants';
import { Schedule } from '../types';

const Booking: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);

  const getSchedulesForRoute = (routeId: string) => {
    return SCHEDULES.filter(s => s.routeId === routeId);
  };

  const handleBook = (scheduleId: string) => {
    setShowConfirmation(scheduleId);
    setTimeout(() => setShowConfirmation(null), 3000);
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Book Your Seat</h1>
        <p className="text-slate-500">Service is free for all Kabale University students. Secure your spot below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Route Selector */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-slate-700 mb-4 px-2">Popular Routes</h3>
          {ROUTES.map(route => (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route.id)}
              className={`w-full text-left p-4 rounded-2xl transition-all border-2 ${
                selectedRoute === route.id 
                  ? 'bg-green-50 border-green-600 shadow-md' 
                  : 'bg-white border-transparent hover:border-slate-200'
              }`}
            >
              <p className="font-bold text-slate-800">{route.name}</p>
              <p className="text-xs text-slate-500 mt-1">{route.origin.split(' ')[0]} to {route.destination.split(' ')[0]}</p>
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="lg:col-span-3">
          {!selectedRoute ? (
            <div className="h-64 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
              <ICONS.Bus />
              <p className="mt-4 font-medium">Please select a route to view schedules</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">
                  Schedules for {ROUTES.find(r => r.id === selectedRoute)?.name}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getSchedulesForRoute(selectedRoute).map(schedule => {
                   const route = ROUTES.find(r => r.id === schedule.routeId)!;
                   const driver = DRIVERS.find(d => d.id === schedule.driverId);
                   // Fix: Look up the bus by its ID from the BUSES constant
                   const bus = BUSES.find(b => b.id === schedule.busId);
                   const isFull = schedule.availableSeats === 0;
                   return (
                    <div key={schedule.id} className={`glass-card p-6 rounded-2xl relative transition-all ${isFull ? 'opacity-60 grayscale' : 'hover:border-green-300'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-3xl font-black text-slate-800">{schedule.departureTime}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Departure</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          schedule.status === 'ON_TIME' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {schedule.status.replace('_', ' ')}
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <span className="p-1.5 bg-slate-100 rounded-lg text-slate-500"><ICONS.Bus /></span>
                          {/* Fix: Display bus plateNumber instead of non-existent busNumber property */}
                          <span className="font-medium">{bus?.plateNumber || 'Unknown Bus'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <span className="p-1.5 bg-slate-100 rounded-lg text-slate-500"><ICONS.User /></span>
                          <span className="font-medium">{schedule.availableSeats} of {schedule.totalSeats} seats left</span>
                        </div>
                        {driver && (
                          <div className="flex items-center gap-3 text-sm text-slate-600 mt-2 p-2 bg-slate-50 rounded-xl">
                            <img src={driver.avatarUrl} alt="" className="w-8 h-8 rounded-full border border-white" />
                            <div>
                               <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Driver</p>
                               <p className="font-bold text-slate-700">{driver.name}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded">FREE</span>
                        <button
                          disabled={isFull || showConfirmation === schedule.id}
                          onClick={() => handleBook(schedule.id)}
                          className={`px-6 py-2 rounded-xl font-bold transition-all ${
                            showConfirmation === schedule.id
                              ? 'bg-green-600 text-white'
                              : isFull 
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}
                        >
                          {showConfirmation === schedule.id ? 'Confirmed ✓' : isFull ? 'Full' : 'Reserve Spot'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;

import React, { useState } from 'react';
import { Search, Bell, HelpCircle, Menu, ChevronDown } from 'lucide-react';

export function HRHeader({ setMobileOpen }: { setMobileOpen: (v: boolean) => void }) {
  const [showProfileDrop, setShowProfileDrop] = useState(false);
  const [showNotificationDrop, setShowNotificationDrop] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden text-gray-500 hover:text-gray-900"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={24} />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            Good morning, Priya <span className="text-2xl">👋</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">Here&apos;s what&apos;s happening across your workforce today.</p>
          <p className="text-xs font-medium text-gray-400 mt-1">Monday, 7 September 2026</p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search employees..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <HelpCircle size={20} />
          </button>
          
          <div className="relative">
            <button 
              className="text-gray-400 hover:text-gray-600 transition-colors relative"
              onClick={() => {
                setShowNotificationDrop(!showNotificationDrop);
                setShowProfileDrop(false);
              }}
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            {showNotificationDrop && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-50 font-semibold text-sm text-gray-800">Notifications</div>
                <div className="px-4 py-3 text-sm text-gray-500 text-center">No new notifications</div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

          <div className="relative">
            <button 
              className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-lg transition-colors text-left"
              onClick={() => {
                setShowProfileDrop(!showProfileDrop);
                setShowNotificationDrop(false);
              }}
            >
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                PS
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 leading-tight">Priya Sharma</p>
                <p className="text-xs text-gray-500">HR Manager</p>
              </div>
              <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
            </button>
            
            {showProfileDrop && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</button>
                <div className="h-px bg-gray-100 my-1"></div>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Log out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

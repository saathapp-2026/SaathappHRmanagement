'use client';
import React, { useState } from 'react';
import { Edit2, Check } from 'lucide-react';

export function PersonalDetails() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Personal Details</h3>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5"
            >
              <Edit2 size={14} /> Edit Personal Details
            </button>
          )}
        </div>
        
        {isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
              <input type="text" defaultValue="Anjali Rao" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Date of Birth</label>
              <input type="text" defaultValue="12 March 1998" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Gender</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Mobile Number</label>
              <input type="text" defaultValue="+91 98765 43210" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Personal Email</label>
              <input type="email" defaultValue="anjali.rao@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Full Name</p>
              <p className="text-sm font-semibold text-gray-900">Anjali Rao</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Date of Birth</p>
              <p className="text-sm font-semibold text-gray-900">12 March 1998</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Gender</p>
              <p className="text-sm font-semibold text-gray-900">Female</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Mobile Number</p>
              <p className="text-sm font-semibold text-gray-900">+91 98765 43210</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Personal Email</p>
              <p className="text-sm font-semibold text-gray-900">anjali.rao@example.com</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 border-b border-gray-100 pb-4">Address</h3>
        {isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Address Line</label>
              <input type="text" defaultValue="Indiranagar" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
              <input type="text" defaultValue="Bengaluru" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">State</label>
              <input type="text" defaultValue="Karnataka" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Postal Code</label>
              <input type="text" defaultValue="560038" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Country</label>
              <input type="text" defaultValue="India" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <div className="sm:col-span-2">
              <p className="text-xs font-medium text-gray-500 mb-1">Address Line</p>
              <p className="text-sm font-semibold text-gray-900">Indiranagar</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">City</p>
              <p className="text-sm font-semibold text-gray-900">Bengaluru</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">State</p>
              <p className="text-sm font-semibold text-gray-900">Karnataka</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Postal Code</p>
              <p className="text-sm font-semibold text-gray-900">560038</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Country</p>
              <p className="text-sm font-semibold text-gray-900">India</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 border-b border-gray-100 pb-4">Emergency Contact</h3>
        {isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Contact Name</label>
              <input type="text" defaultValue="Ramesh Rao" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Relationship</label>
              <input type="text" defaultValue="Father" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Mobile</label>
              <input type="text" defaultValue="+91 98765 00000" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Alternate Phone</label>
              <input type="text" placeholder="Optional" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Contact Name</p>
              <p className="text-sm font-semibold text-gray-900">Ramesh Rao</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Relationship</p>
              <p className="text-sm font-semibold text-gray-900">Father</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Mobile</p>
              <p className="text-sm font-semibold text-gray-900">+91 98765 00000</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Alternate Phone</p>
              <p className="text-sm font-semibold text-gray-900">—</p>
            </div>
          </div>
        )}
      </div>
      
      {isEditing && (
        <div className="flex justify-end gap-3 sticky bottom-4 bg-white p-4 border border-gray-200 rounded-xl shadow-lg z-10">
          <button 
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Check size={16} /> Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

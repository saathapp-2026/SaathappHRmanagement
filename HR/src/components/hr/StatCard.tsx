import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
}

export function StatCard({ title, value, subtitle, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
          <Icon size={22} />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          {trend === 'up' && <TrendingUp size={16} className="text-emerald-500" />}
          {trend === 'down' && <TrendingDown size={16} className="text-rose-500" />}
        </div>
        <p className="text-xs text-gray-500 mt-2 font-medium">{subtitle}</p>
      </div>
    </div>
  );
}

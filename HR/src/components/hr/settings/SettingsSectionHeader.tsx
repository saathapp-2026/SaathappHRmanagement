import React from 'react';

export function SettingsSectionHeader({ title, description }: { title: string, description: string }) {
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}

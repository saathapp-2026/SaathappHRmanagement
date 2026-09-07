import React from 'react';

interface PayrollTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function PayrollTabs({ activeTab, onTabChange }: PayrollTabsProps) {
  const tabs = [
    'Overview',
    'Employees',
    'Attendance Inputs',
    'Adjustments',
    'Exceptions',
    'Payslips',
    'Salary Revisions'
  ];

  return (
    <div className="flex border-b overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors
            ${activeTab === tab 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

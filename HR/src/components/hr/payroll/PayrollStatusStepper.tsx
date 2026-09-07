import React from 'react';
import { PayrollPeriodStatus } from '@/data/hr/payroll';
import { Check } from 'lucide-react';

interface PayrollStatusStepperProps {
  status: PayrollPeriodStatus;
}

export function PayrollStatusStepper({ status }: PayrollStatusStepperProps) {
  const steps = [
    { id: 'Draft', label: 'Draft' },
    { id: 'Inputs Pending', label: 'Collect Inputs' },
    { id: 'Under Review', label: 'Validate' },
    { id: 'Ready', label: 'Ready' },
    { id: 'Processed', label: 'Processed' },
    { id: 'Locked', label: 'Locked' },
  ];

  const getStepIndex = (s: string) => {
    if (s === 'Reopened') return 2; // Treat reopened like Under Review
    return steps.findIndex(step => step.id === s);
  };

  const currentIndex = getStepIndex(status);

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          
          return (
            <div key={step.id} className="flex flex-col items-center relative z-10 w-full group">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 
                  ${isCompleted ? 'bg-primary border-primary text-primary-foreground' : 
                    isCurrent ? 'bg-background border-primary text-primary' : 
                    'bg-background border-muted-foreground/30 text-muted-foreground'}`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <div className={`text-xs mt-2 font-medium ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.label}
              </div>
              
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div 
                  className={`absolute top-4 left-[50%] right-[-50%] h-0.5 -z-10
                    ${idx < currentIndex ? 'bg-primary' : 'bg-muted'}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

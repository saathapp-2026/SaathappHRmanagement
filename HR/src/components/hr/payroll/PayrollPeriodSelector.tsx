import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PayrollPeriod } from '@/data/hr/payroll';

interface PayrollPeriodSelectorProps {
  currentPeriod: PayrollPeriod;
  onPrevious: () => void;
  onNext: () => void;
  onCurrent: () => void;
}

export function PayrollPeriodSelector({ currentPeriod, onPrevious, onNext, onCurrent }: PayrollPeriodSelectorProps) {
  return (
    <div className="flex items-center space-x-4 bg-card px-4 py-2 rounded-lg border shadow-sm">
      <Button variant="ghost" size="icon" onClick={onPrevious} title="Previous Month">
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <div className="flex flex-col items-center justify-center min-w-[140px]">
        <div className="text-sm font-semibold flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          {currentPeriod.month} {currentPeriod.year}
        </div>
      </div>
      
      <Button variant="ghost" size="icon" onClick={onNext} title="Next Month">
        <ChevronRight className="h-5 w-5" />
      </Button>
      
      <div className="pl-4 border-l">
        <Button variant="outline" size="sm" onClick={onCurrent}>
          Current Month
        </Button>
      </div>
    </div>
  );
}

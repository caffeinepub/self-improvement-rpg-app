import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showNumbers?: boolean;
  className?: string;
  barClassName?: string;
}

export function ProgressBar({
  current,
  max,
  label,
  showNumbers = true,
  className,
  barClassName,
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className={cn('w-full', className)}>
      {(label || showNumbers) && (
        <div className="mb-2 flex items-center justify-between text-sm">
          {label && <span className="font-medium text-foreground">{label}</span>}
          {showNumbers && (
            <span className="text-muted-foreground">
              {current} / {max}
            </span>
          )}
        </div>
      )}
      <div className="relative h-6 overflow-hidden rounded-full border-2 border-rpg-gold/30 bg-rpg-dark/50 shadow-inner">
        <div
          className={cn(
            'h-full rounded-full bg-gradient-to-r from-rpg-gold via-rpg-gold-light to-rpg-gold transition-all duration-500 ease-out',
            'shadow-[0_0_20px_rgba(255,215,0,0.5)]',
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}

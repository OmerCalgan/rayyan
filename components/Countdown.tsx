'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetTime: Date;
  label: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetTime: Date): TimeLeft {
  const now = new Date().getTime();
  const target = targetTime.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

function formatTimeUnit(value: number): string {
  return value.toString().padStart(2, '0');
}

export default function Countdown({ targetTime, label }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetTime));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p 
          className="text-sm mb-4 font-medium tracking-wider uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </p>
        <div 
          className="text-6xl md:text-7xl font-bold tabular-nums tracking-tight"
          style={{ 
            color: 'var(--text-primary)',
            filter: 'drop-shadow(0 2px 10px rgba(251, 191, 36, 0.2))'
          }}
        >
          00:00:00
        </div>
      </div>
    );
  }

  const { hours, minutes, seconds } = timeLeft;

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <p 
        className="text-sm mb-4 font-medium tracking-widest uppercase"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>
      <div 
        className="text-6xl md:text-7xl font-black tabular-nums tracking-tight"
        style={{ 
          color: 'var(--text-primary)',
          filter: 'drop-shadow(0 2px 15px rgba(251, 191, 36, 0.25))'
        }}
      >
        <span style={{ color: 'var(--accent-primary)' }}>{formatTimeUnit(hours)}</span>
        <span style={{ color: 'var(--text-muted)' }} className="mx-1">:</span>
        <span style={{ color: 'var(--accent-primary)' }}>{formatTimeUnit(minutes)}</span>
        <span style={{ color: 'var(--text-muted)' }} className="mx-1">:</span>
        <span style={{ color: 'var(--accent-primary)' }}>{formatTimeUnit(seconds)}</span>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

export interface KazaPerformed {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  witr: number;
}

export interface TrackerHook {
  performed: KazaPerformed;
  addPerformance: (prayer: keyof KazaPerformed) => void;
  removePerformance: (prayer: keyof KazaPerformed) => void;
  resetAll: () => void;
  totalPerformed: number;
  isHydrated: boolean;
}

const STORAGE_KEY = 'ramadan-kaza-performed-v1';
const OLD_STORAGE_KEY = 'ramadan-kaza-tracker-v1';

const defaultPerformed: KazaPerformed = {
  fajr: 0,
  dhuhr: 0,
  asr: 0,
  maghrib: 0,
  isha: 0,
  witr: 0,
};

export function useTracker(): TrackerHook {
  const [performed, setPerformed] = useState<KazaPerformed>(defaultPerformed);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount + migrate/cleanup old data
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Clean up old storage key to avoid confusion
    try {
      localStorage.removeItem(OLD_STORAGE_KEY);
    } catch {
      // Ignore cleanup errors
    }
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPerformed({ ...defaultPerformed, ...parsed });
      }
    } catch {
      // Ignore parsing errors
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(performed));
    } catch {
      // Ignore storage errors
    }
  }, [performed, isHydrated]);

  const addPerformance = useCallback((prayer: keyof KazaPerformed) => {
    setPerformed(prev => ({
      ...prev,
      [prayer]: prev[prayer] + 1,
    }));
  }, []);

  const removePerformance = useCallback((prayer: keyof KazaPerformed) => {
    setPerformed(prev => ({
      ...prev,
      [prayer]: Math.max(0, prev[prayer] - 1),
    }));
  }, []);

  const resetAll = useCallback(() => {
    setPerformed(defaultPerformed);
  }, []);

  const totalPerformed = useMemo(() => {
    return Object.values(performed).reduce((sum, count) => sum + count, 0);
  }, [performed]);

  return {
    performed,
    addPerformance,
    removePerformance,
    resetAll,
    totalPerformed,
    isHydrated,
  };
}

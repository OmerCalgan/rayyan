'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'kadir' | 'medine' | 'kabe' | 'hicret';

export interface ThemeConfig {
  id: Theme;
  nameTR: string;
  nameEN: string;
  icon: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: ThemeConfig[];
  isHydrated: boolean;
}

const themes: ThemeConfig[] = [
  { id: 'kadir', nameTR: 'Kadir Gecesi', nameEN: 'Night of Power', icon: 'Moon' },
  { id: 'medine', nameTR: 'Medine Sabahı', nameEN: 'Morning of Medina', icon: 'Sun' },
  { id: 'kabe', nameTR: 'Teheccüd Vakti', nameEN: 'Tahajjud Time', icon: 'Square' },
  { id: 'hicret', nameTR: 'Hicret Yolu', nameEN: 'Path of Hijra', icon: 'Mountain' },
];

const STORAGE_KEY = 'ramadan-theme-preference';
const DEFAULT_THEME: Theme = 'kadir';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate theme from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && themes.some(t => t.id === stored)) {
        setThemeState(stored as Theme);
      }
    } catch {
      // Ignore storage errors
    }
    setIsHydrated(true);
  }, []);

  // Apply theme to document and persist
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, newTheme);
      } catch {
        // Ignore storage errors
      }
    }
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, isHydrated }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { themes };

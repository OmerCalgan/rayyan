'use client';

import { useState, useRef, useEffect } from 'react';
import { Palette, Check, Moon, Sun, Square, Mountain } from 'lucide-react';
import { useTheme, Theme } from '@/context/ThemeContext';
import { Language } from '@/lib/i18n';

interface ThemeSwitcherProps {
  language: Language;
}

const iconMap = {
  Moon: Moon,
  Sun: Sun,
  Square: Square,
  Mountain: Mountain,
};

export default function ThemeSwitcher({ language }: ThemeSwitcherProps) {
  const { theme, setTheme, themes: themeList, isHydrated } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (themeId: Theme) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  if (!isHydrated) {
    return (
      <div className="p-2.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--accent-primary)]">
        <Palette className="w-5 h-5" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 min-w-[44px] min-h-[44px] rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--accent-primary)] hover:scale-105 transition-transform active:scale-95 touch-manipulation flex items-center justify-center"
        aria-label="Change theme"
      >
        <Palette className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-2xl overflow-hidden z-50">
          <div className="py-2">
            {themeList.map((t) => {
              const isActive = theme === t.id;
              const label = language === 'tr' ? t.nameTR : t.nameEN;

              return (
                <button
                  key={t.id}
                  onClick={() => handleSelect(t.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 min-h-[44px] hover:bg-[var(--glass-bg)] transition-colors text-left touch-manipulation"
                >
                  {/* Color Preview */}
                  <div 
                    className="w-4 h-4 rounded-full border border-[var(--glass-border)]"
                    style={{
                      background: t.id === 'kadir' 
                        ? 'linear-gradient(135deg, #064e3b, #0d9488)'
                        : t.id === 'medine'
                        ? 'linear-gradient(135deg, #fff7ed, #ffe4e6)'
                        : t.id === 'kabe'
                        ? 'linear-gradient(135deg, #000000, #262626)'
                        : 'linear-gradient(135deg, #431407, #7c2d12)'  // Hicret: Deep terracotta
                    }}
                  />
                  
                  {/* Theme Name */}
                  <span className="flex-1 text-[var(--text-primary)] font-medium text-sm">
                    {label}
                  </span>

                  {/* Checkmark for active */}
                  {isActive && (
                    <Check className="w-4 h-4 text-[var(--accent-primary)]" strokeWidth={2} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

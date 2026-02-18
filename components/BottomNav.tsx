'use client';

import { Home, ClipboardList } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface BottomNavProps {
  activeTab: 'home' | 'tracker';
  onTabChange: (tab: 'home' | 'tracker') => void;
  language: Language;
}

export default function BottomNav({ activeTab, onTabChange, language }: BottomNavProps) {
  const tabs = [
    {
      id: 'home' as const,
      icon: Home,
      label: language === 'tr' ? 'Ana Sayfa' : 'Home',
    },
    {
      id: 'tracker' as const,
      icon: ClipboardList,
      label: language === 'tr' ? 'Kaza Takibi' : 'Missed Prayers',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div 
        className="border-t"
        style={{ 
          backgroundColor: 'rgba(var(--bg-primary), 0.9)',
          backdropFilter: 'blur(16px)',
          borderColor: 'var(--glass-border)'
        }}
      >
        <div className="max-w-md mx-auto h-16 flex items-center justify-around px-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center justify-center gap-1 px-6 py-2 min-w-[44px] min-h-[44px] rounded-2xl transition-all duration-300 active:scale-95 touch-manipulation"
                style={{
                  backgroundColor: isActive ? 'var(--glass-bg)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)'
                }}
              >
                <Icon 
                  className="w-5 h-5" 
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <span className="text-xs font-medium tracking-wide">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

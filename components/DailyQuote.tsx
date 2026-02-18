'use client';

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { getRandomQuote } from '@/lib/quotes';

interface DailyQuoteProps {
  language: Language;
  title?: string;
}

export default function DailyQuote({ language, title }: DailyQuoteProps) {
  const [quote, setQuote] = useState<{ text: string; source: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setQuote(getRandomQuote(language));
  }, [language]);

  if (!mounted || !quote) {
    return (
      <div 
        className="mt-6 rounded-2xl p-6 border"
        style={{ 
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--glass-border)'
        }}
      >
        {/* Hardcoded Title - Loading State */}
        <h2 
          className="text-lg font-semibold tracking-wide border-b pb-2 mb-3"
          style={{ 
            color: 'var(--accent-primary)',
            borderColor: 'var(--glass-border)'
          }}
        >
          {language === 'tr' ? "GÜNÜN AYET / HADİSİ" : "VERSE / HADITH OF THE DAY"}
        </h2>
        <div 
          className="h-16 rounded-lg animate-pulse"
          style={{ backgroundColor: 'var(--glass-bg)' }}
        />
      </div>
    );
  }

  return (
    <div 
      className="mt-6 rounded-2xl p-6 border"
      style={{ 
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--glass-border)'
      }}
    >
      {/* HARDCODED TITLE - BRUTAL OVERRIDE */}
      <h2 
        className="text-lg font-semibold tracking-wide border-b pb-2 mb-3"
        style={{ 
          color: 'var(--accent-primary)',
          borderColor: 'var(--glass-border)'
        }}
      >
        {language === 'tr' ? "GÜNÜN AYET / HADİSİ" : "VERSE / HADITH OF THE DAY"}
      </h2>
      
      <blockquote className="text-center px-1">
        <p 
          className="italic text-sm sm:text-base leading-relaxed mb-3 break-words"
          style={{ color: 'var(--text-secondary)' }}
        >
          &ldquo;{quote.text}&rdquo;
        </p>
        <footer 
          className="text-xs font-medium tracking-wide"
          style={{ color: 'var(--accent-primary)' }}
        >
          — {quote.source}
        </footer>
      </blockquote>
    </div>
  );
}

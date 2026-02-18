'use client';

import { useState } from 'react';
import { 
  Sunrise, 
  Sun, 
  CloudSun, 
  Moon, 
  Star, 
  Sparkles, 
  Plus, 
  Minus, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { Language } from '@/lib/i18n';
import { TrackerHook, KazaPerformed } from '@/hooks/useTracker';

interface TrackerViewProps {
  language: Language;
  tracker: TrackerHook;
}

interface PrayerRow {
  key: keyof KazaPerformed;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  color: string;
}

export default function TrackerView({ language, tracker }: TrackerViewProps) {
  const { performed, addPerformance, removePerformance, resetAll, totalPerformed, isHydrated } = tracker;
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [animatingKey, setAnimatingKey] = useState<string | null>(null);

  // Translations for tracker
  const trackerLabels = {
    title: language === 'tr' ? 'Kılınan Kaza Namazları' : 'Performed Missed Prayers',
    total: language === 'tr' ? 'Toplam Kaza' : 'Total Made Up',
    prayers: language === 'tr' ? 'namaz' : 'prayers',
    emptyState: language === 'tr' 
      ? 'Bugün kaza namazı kılmaya başlayın' 
      : 'Start making up missed prayers today',
    footerNote: language === 'tr'
      ? 'Kaza namazlarınızı takip edin ve gün içinde telafi edin'
      : 'Track your missed prayers and make them up during the day',
    resetConfirm: language === 'tr'
      ? 'Sıfırlamak istediğinize emin misiniz?'
      : 'Are you sure you want to reset?',
  };

  const prayerNames: Record<keyof KazaPerformed, { tr: string; en: string }> = {
    fajr: { tr: 'Sabah', en: 'Fajr' },
    dhuhr: { tr: 'Öğle', en: 'Dhuhr' },
    asr: { tr: 'İkindi', en: 'Asr' },
    maghrib: { tr: 'Akşam', en: 'Maghrib' },
    isha: { tr: 'Yatsı', en: 'Isha' },
    witr: { tr: 'Vitir', en: 'Witr' },
  };

  const prayerRows: PrayerRow[] = [
    { key: 'fajr', icon: Sunrise, color: 'text-[var(--accent-primary)]' },
    { key: 'dhuhr', icon: Sun, color: 'text-[var(--accent-secondary)]' },
    { key: 'asr', icon: CloudSun, color: 'text-[var(--accent-primary)]' },
    { key: 'maghrib', icon: Moon, color: 'text-[var(--accent-secondary)]' },
    { key: 'isha', icon: Star, color: 'text-[var(--accent-primary)]' },
    { key: 'witr', icon: Sparkles, color: 'text-[var(--accent-secondary)]' },
  ];

  const handleAdd = (key: keyof KazaPerformed) => {
    setAnimatingKey(key);
    addPerformance(key);
    setTimeout(() => setAnimatingKey(null), 150);
  };

  const handleRemove = (key: keyof KazaPerformed) => {
    if (performed[key] > 0) {
      setAnimatingKey(key);
      removePerformance(key);
      setTimeout(() => setAnimatingKey(null), 150);
    }
  };

  const handleReset = () => {
    if (showResetConfirm) {
      resetAll();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 3000);
    }
  };

  if (!isHydrated) {
    return (
      <div className="px-4 py-6 space-y-6">
        <div className="h-8 bg-[var(--glass-bg)] rounded-lg animate-pulse" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-20 bg-[var(--glass-bg)] rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            {trackerLabels.title}
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            {trackerLabels.total}: <span className="text-[var(--accent-primary)] font-bold">{totalPerformed}</span> {trackerLabels.prayers}
          </p>
        </div>
        
        {/* Reset Button */}
        {totalPerformed > 0 && (
          <button
            onClick={handleReset}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 active:scale-95 ${
              showResetConfirm
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'text-[var(--accent-primary)]/70 hover:text-[var(--accent-primary)] bg-[var(--glass-bg)] hover:bg-[var(--glass-bg)]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
            {showResetConfirm 
              ? (language === 'tr' ? 'Onayla' : 'Confirm')
              : (language === 'tr' ? 'Sıfırla' : 'Reset')
            }
          </button>
        )}
      </div>

      {/* Confirmation Message */}
      {showResetConfirm && (
        <div className="text-center text-red-300/80 text-xs bg-red-500/10 px-4 py-3 rounded-xl border border-red-500/20">
          {trackerLabels.resetConfirm}
        </div>
      )}

      {/* Empty State */}
      {totalPerformed === 0 && (
        <div className="text-center py-4">
          <CheckCircle2 className="w-12 h-12 text-[var(--accent-primary)]/30 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-[var(--text-muted)] text-sm">
            {trackerLabels.emptyState}
          </p>
        </div>
      )}

      {/* Prayer Rows */}
      <div className="space-y-3">
        {prayerRows.map((row) => {
          const count = performed[row.key];
          const Icon = row.icon;
          const isAnimating = animatingKey === row.key;
          const name = prayerNames[row.key];

          return (
            <div
              key={row.key}
              className="flex items-center justify-between p-4 rounded-2xl bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--glass-border)] transition-all duration-200"
            >
              {/* Left: Icon + Name */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className={`w-11 h-11 flex-shrink-0 rounded-2xl bg-[var(--glass-bg)] flex items-center justify-center ${row.color}`}>
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-[var(--text-primary)] font-medium text-base sm:text-lg leading-tight truncate">
                    {name.tr}
                  </p>
                  <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider">
                    {name.en}
                  </p>
                </div>
              </div>

              {/* Center: Counter - Emerald color for positive progress */}
              <div 
                className={`text-3xl font-bold tabular-nums text-[var(--accent-primary)] transition-transform duration-150 ${
                  isAnimating ? 'scale-110' : 'scale-100'
                }`}
              >
                {count}
              </div>

              {/* Right: Controls */}
              <div className="flex gap-2">
                {/* Minus Button - subdued for corrections */}
                <button
                  onClick={() => handleRemove(row.key)}
                  disabled={count === 0}
                  className={`w-12 h-12 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all duration-200 border touch-manipulation ${
                    count === 0
                      ? 'bg-[var(--glass-bg)] text-[var(--text-muted)] border-[var(--glass-border)] cursor-not-allowed opacity-30'
                      : 'bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] border-[var(--glass-border)] active:scale-95'
                  }`}
                >
                  <Minus className="w-5 h-5" strokeWidth={2} />
                </button>

                {/* Plus Button - Primary action with amber highlight */}
                <button
                  onClick={() => handleAdd(row.key)}
                  className="w-12 h-12 min-w-[44px] min-h-[44px] rounded-full bg-[var(--accent-primary)]/20 hover:bg-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-primary)] transition-all duration-200 active:scale-95 border border-[var(--accent-primary)]/30 touch-manipulation"
                >
                  <Plus className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <p className="text-center text-[var(--text-muted)] text-xs px-8 leading-relaxed">
        {trackerLabels.footerNote}
      </p>
    </div>
  );
}

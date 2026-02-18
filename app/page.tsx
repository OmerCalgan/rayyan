'use client';

import { useState, useEffect, useMemo } from 'react';
import { Moon, Sun, MapPin, Clock, Navigation } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { useLocation } from '@/hooks/useLocation';
import { useTracker } from '@/hooks/useTracker';
import { fetchPrayerTimes, PrayerTimes } from '@/lib/api';
import { Language, translations, detectLanguage } from '@/lib/i18n';
import { useTheme } from '@/context/ThemeContext';
import Countdown from '@/components/Countdown';
import ManualLocationInput from '@/components/ManualLocationInput';
import DailyQuote from '@/components/DailyQuote';
import BottomNav from '@/components/BottomNav';
import TrackerView from '@/components/TrackerView';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import DivineMotifs from '@/components/DivineMotifs';
import AudioPlayer from '@/components/AudioPlayer';

type CountdownTarget = {
  time: Date;
  label: string;
  type: 'iftar' | 'sahur';
  timeLabel: string;
};

function parseTimeToDate(timeStr: string, baseDate: Date = new Date()): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function getNextDay(date: Date): Date {
  return addDays(date, 1);
}

function determineCountdownTarget(
  times: PrayerTimes,
  now: Date,
  t: typeof translations['en']
): CountdownTarget {
  const fajrTime = parseTimeToDate(times.fajr, now);
  const maghribTime = parseTimeToDate(times.maghrib, now);
  const nextFajrTime = parseTimeToDate(times.fajr, getNextDay(now));

  // Sahur ends at Fajr (Imsak - start of fasting)
  if (now < fajrTime) {
    return {
      time: fajrTime,
      label: t.countdown.sahurEnds,
      type: 'sahur',
      timeLabel: `${t.countdown.sahurEndsAt} ${times.fajr}`,
    };
  }

  if (now >= fajrTime && now < maghribTime) {
    return {
      time: maghribTime,
      label: t.countdown.iftarIn,
      type: 'iftar',
      timeLabel: `${t.countdown.iftarAt} ${times.maghrib}`,
    };
  }

  // After Maghrib, countdown to next day's Fajr
  return {
    time: nextFajrTime,
    label: t.countdown.sahurEnds,
    type: 'sahur',
    timeLabel: `${t.countdown.sahurEndsAt} ${times.fajr}`,
  };
}

function getActivePrayer(times: PrayerTimes, now: Date): string | null {
  const fajr = parseTimeToDate(times.fajr, now);
  const sunrise = parseTimeToDate(times.sunrise, now);
  const dhuhr = parseTimeToDate(times.dhuhr, now);
  const asr = parseTimeToDate(times.asr, now);
  const maghrib = parseTimeToDate(times.maghrib, now);
  const isha = parseTimeToDate(times.isha, now);

  if (now >= fajr && now < sunrise) return 'fajr';
  if (now >= sunrise && now < dhuhr) return 'sunrise';
  if (now >= dhuhr && now < asr) return 'dhuhr';
  if (now >= asr && now < maghrib) return 'asr';
  if (now >= maghrib && now < isha) return 'maghrib';
  if (now >= isha || now < fajr) return 'isha';
  
  return null;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'home' | 'tracker'>('home');
  const [mounted, setMounted] = useState(false);
  const { isHydrated: themeHydrated } = useTheme();

  const tracker = useTracker();

  useEffect(() => {
    setMounted(true);
    setLanguage(detectLanguage());
  }, []);

  const t = translations[language];

  const {
    coordinates,
    locationName,
    loading: locationLoading,
    error: locationError,
    isManualMode,
    setManualLocation,
    enableManualMode,
    retryGeolocation,
    clearLocation,
  } = useLocation(language);

  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState<string>('');
  const [timesLoading, setTimesLoading] = useState(false);
  const [timesError, setTimesError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!coordinates) return;

    const loadPrayerTimes = async () => {
      setTimesLoading(true);
      setTimesError(null);
      try {
        const data = await fetchPrayerTimes(coordinates.latitude, coordinates.longitude);
        setPrayerTimes(data.times);
        setHijriDate(data.hijriDate);
      } catch {
        setTimesError(t.errors.fetchPrayerTimes);
      } finally {
        setTimesLoading(false);
      }
    };

    loadPrayerTimes();
  }, [coordinates, t.errors.fetchPrayerTimes]);

  useEffect(() => {
    if (isManualMode) {
      setShowManualInput(true);
    }
  }, [isManualMode]);

  const countdownTarget = useMemo(() => {
    if (!prayerTimes) return null;
    return determineCountdownTarget(prayerTimes, currentTime, t);
  }, [prayerTimes, currentTime, t]);

  const activePrayer = useMemo(() => {
    if (!prayerTimes) return null;
    return getActivePrayer(prayerTimes, currentTime);
  }, [prayerTimes, currentTime]);

  const handleManualLocationSubmit = (lat: number, lng: number, name?: string) => {
    setManualLocation(lat, lng, name);
    setShowManualInput(false);
  };

  const prayerTimeItems = useMemo(() => {
    if (!prayerTimes) return [];
    return [
      // Fajr (labeled as İmsak) - Fasting starts at Fajr time in Method 13
      { key: 'fajr', name: language === 'tr' ? 'İmsak' : 'Imsak', time: prayerTimes.fajr, icon: Moon, label: t.prayerLabels.fajrImsak },
      // Sunrise - purely informational
      { key: 'sunrise', name: t.prayerNames.sunrise, time: prayerTimes.sunrise, icon: Sun, label: t.prayerLabels.sunriseOnly },
      { key: 'dhuhr', name: t.prayerNames.dhuhr, time: prayerTimes.dhuhr, icon: Sun, label: t.prayerLabels.noonPrayer },
      { key: 'asr', name: t.prayerNames.asr, time: prayerTimes.asr, icon: Sun, label: t.prayerLabels.afternoonPrayer },
      // Maghrib is Iftar time
      { key: 'maghrib', name: t.prayerNames.maghrib, time: prayerTimes.maghrib, icon: Moon, label: t.prayerLabels.iftarTime },
      { key: 'isha', name: t.prayerNames.isha, time: prayerTimes.isha, icon: Moon, label: t.prayerLabels.nightPrayer },
    ];
  }, [prayerTimes, t, language]);

  const isLoading = locationLoading || timesLoading;
  const hasError = locationError || timesError;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'tr' : 'en');
  };

  if (!mounted || !themeHydrated) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-body)' }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-[var(--glass-border)] border-t-[var(--accent-primary)] rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden relative" style={{ backgroundColor: 'var(--bg-body)' }}>
      {/* Divine Motifs - Background Decorations */}
      <DivineMotifs />
      
      {/* Main Content - z-10 to stay above motifs */}
      <div className="relative z-10">
      {/* Header with Theme Variables - Semi-transparent with backdrop blur */}
      <header 
        className="border-b-0 shadow-lg z-40 pt-safe relative"
        style={{ 
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'var(--glass-border)',
          boxShadow: `0 10px 15px -3px var(--shadow-color)`
        }}
      >
        {/* Texture Layer - Geometric Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5' fill-opacity='0.4'%3E%3Cpath d='M20 0L40 20L20 40L0 20L20 0z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Golden Gradient Border */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(to right, transparent, var(--accent-primary), transparent)',
            opacity: 0.5
          }}
        />
        
        {/* Header Content */}
        <div className="relative z-10 max-w-md mx-auto px-4 py-6 pt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl backdrop-blur-md border flex items-center justify-center"
                style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
              >
                <Moon 
                  className="w-5 h-5 drop-shadow-lg" 
                  style={{ color: 'var(--accent-primary)' }} 
                  strokeWidth={1.5} 
                />
              </div>
              <h1 
                className="text-xl font-bold tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {t.appTitle}
              </h1>
            </div>
            
            {/* Controls: Audio, Theme, Language, Location */}
            <div className="flex items-center gap-2">
              <AudioPlayer />
              <ThemeSwitcher language={language} />
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 rounded-2xl backdrop-blur-md border font-medium tracking-wide text-sm hover:scale-105 transition-all active:scale-95"
                style={{ 
                  backgroundColor: 'var(--glass-bg)', 
                  borderColor: 'var(--glass-border)',
                  color: 'var(--text-primary)'
                }}
                aria-label="Toggle language"
              >
                {language === 'en' ? 'TR' : 'EN'}
              </button>
              <button
                onClick={clearLocation}
                className="p-2.5 rounded-2xl backdrop-blur-md border hover:scale-105 transition-all active:scale-95"
                style={{ 
                  backgroundColor: 'var(--glass-bg)', 
                  borderColor: 'var(--glass-border)',
                  color: 'var(--accent-primary)'
                }}
                aria-label="Change location"
              >
                <MapPin className="w-5 h-5 drop-shadow-lg" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Location */}
          {locationName && (
            <div 
              className="flex items-center gap-2 mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              <Navigation 
                className="w-4 h-4 flex-shrink-0" 
                style={{ color: 'var(--accent-primary)' }} 
                strokeWidth={1.5} 
              />
              <span className="font-medium text-lg tracking-tight truncate max-w-[200px] sm:max-w-[280px]">{locationName}</span>
            </div>
          )}

          {/* Hijri Date */}
          <div className="flex flex-col gap-1">
            {hijriDate && (
              <p 
                className="font-light tracking-widest text-xs uppercase"
                style={{ color: 'var(--accent-primary)' }}
              >
                {hijriDate}
              </p>
            )}
            <p 
              className="text-sm font-light tracking-wide"
              style={{ color: 'var(--text-secondary)' }}
            >
              {format(currentTime, 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
        </div>
      </header>

      {/* Home View */}
      {activeTab === 'home' && (
        <div className="max-w-md mx-auto px-4 py-6 pb-24">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div 
                className="w-12 h-12 border-4 rounded-full animate-spin mb-4"
                style={{ 
                  borderColor: 'var(--glass-border)',
                  borderTopColor: 'var(--accent-primary)'
                }}
              />
              <p 
                className="text-sm tracking-wide"
                style={{ color: 'var(--text-muted)' }}
              >
                {locationLoading ? t.loading.location : t.loading.prayerTimes}
              </p>
            </div>
          )}

          {/* Error State */}
          {!isLoading && hasError && (
            <div 
              className="rounded-2xl p-6 text-center border"
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'rgba(239, 68, 68, 0.3)'
              }}
            >
              <p className="text-red-300 mb-4 text-sm">{locationError || timesError}</p>
              <div className="flex gap-3 justify-center">
                {locationError && (
                  <button
                    onClick={retryGeolocation}
                    className="px-4 py-2 rounded-xl text-sm font-medium active:scale-95 transition-colors"
                    style={{ 
                      backgroundColor: 'rgba(239, 68, 68, 0.2)',
                      color: '#fca5a5'
                    }}
                  >
                    {t.errors.retry}
                  </button>
                )}
                <button
                  onClick={enableManualMode}
                  className="px-4 py-2 rounded-xl text-sm font-medium active:scale-95 transition-colors"
                  style={{ 
                    backgroundColor: 'var(--glass-bg)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {t.errors.setLocationManually}
                </button>
              </div>
            </div>
          )}

          {/* Countdown Section */}
          {!isLoading && !hasError && countdownTarget && (
            <div 
              className="rounded-3xl shadow-2xl mb-6 overflow-hidden border"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--glass-border)',
                backdropFilter: 'blur(12px)',
                boxShadow: `0 25px 50px -12px var(--shadow-color)`
              }}
            >
              <div
                className="h-1.5"
                style={{
                  background: countdownTarget.type === 'iftar' 
                    ? 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))'
                    : 'linear-gradient(to right, var(--bg-secondary), var(--accent-primary))'
                }}
              />
              <div className="p-8">
                <Countdown
                  targetTime={countdownTarget.time}
                  label={countdownTarget.label}
                />
                <div className="text-center mt-6">
                  <span
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-sm border"
                    style={{
                      backgroundColor: countdownTarget.type === 'iftar' 
                        ? 'rgba(251, 191, 36, 0.2)'
                        : 'rgba(16, 185, 129, 0.2)',
                      color: countdownTarget.type === 'iftar' 
                        ? 'var(--accent-primary)'
                        : 'var(--text-secondary)',
                      borderColor: countdownTarget.type === 'iftar'
                        ? 'rgba(251, 191, 36, 0.3)'
                        : 'rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    {countdownTarget.type === 'iftar' ? (
                      <>
                        <Moon className="w-4 h-4" strokeWidth={1.5} />
                        {countdownTarget.timeLabel}
                      </>
                    ) : (
                      <>
                        <Sun className="w-4 h-4" strokeWidth={1.5} />
                        {countdownTarget.timeLabel}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Daily Quote */}
          {!isLoading && !hasError && (
            <DailyQuote language={language} title={t.verseOfDay} />
          )}

          {/* Prayer Times Grid */}
          {!isLoading && !hasError && prayerTimes && (
            <div 
              className="mt-6 rounded-3xl shadow-xl overflow-hidden border"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--glass-border)',
                backdropFilter: 'blur(12px)',
                boxShadow: `0 20px 25px -5px var(--shadow-color)`
              }}
            >
              <div 
                className="px-6 py-4 border-b"
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--glass-bg)' }}
                  >
                    <Clock 
                      className="w-4 h-4" 
                      style={{ color: 'var(--accent-primary)' }} 
                      strokeWidth={1.5} 
                    />
                  </div>
                  <h2 
                    className="font-semibold tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {t.dailyPrayerTimes}
                  </h2>
                </div>
              </div>
              <div style={{ borderColor: 'var(--glass-border)' }}>
                {prayerTimeItems.map((item, index) => {
                  const isActive = activePrayer === item.key;
                  return (
                    <div
                      key={item.key}
                      className={`px-6 py-4 flex items-center justify-between transition-all duration-200 active:scale-[0.98] ${
                        index !== prayerTimeItems.length - 1 ? 'border-b' : ''
                      }`}
                      style={{
                        backgroundColor: isActive ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
                        borderLeftWidth: isActive ? '2px' : '0',
                        borderLeftColor: isActive ? 'var(--accent-primary)' : 'transparent',
                        borderColor: 'var(--glass-border)'
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-11 h-11 rounded-2xl flex items-center justify-center"
                          style={{ 
                            backgroundColor: isActive 
                              ? 'rgba(251, 191, 36, 0.2)' 
                              : 'var(--glass-bg)'
                          }}
                        >
                          <item.icon 
                            className="w-5 h-5" 
                            style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)' }} 
                            strokeWidth={1.5} 
                          />
                        </div>
                        <div>
                          <p 
                            className="font-semibold tracking-tight"
                            style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-primary)' }}
                          >
                            {item.name}
                          </p>
                          <p 
                            className="text-xs uppercase tracking-wider"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {item.label}
                          </p>
                        </div>
                      </div>
                      <span 
                        className="text-lg font-bold tabular-nums tracking-tight"
                        style={{ 
                          color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                          filter: isActive ? 'drop-shadow(0 2px 10px rgba(251, 191, 36, 0.3))' : 'none'
                        }}
                      >
                        {item.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Manual Location Button */}
          {!isLoading && !hasError && (
            <button
              onClick={enableManualMode}
              className="w-full mt-6 py-4 px-4 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 active:scale-95 text-sm font-medium tracking-wide transition-all duration-300"
              style={{ 
                borderColor: 'var(--glass-border)',
                color: 'var(--text-muted)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.color = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              {t.changeLocation}
            </button>
          )}
        </div>
      )}

      {/* Tracker View */}
      {activeTab === 'tracker' && (
        <div className="max-w-md mx-auto">
          <TrackerView language={language} tracker={tracker} />
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        language={language}
      />

      {/* Manual Location Modal */}
      {showManualInput && (
        <ManualLocationInput
          language={language}
          onSubmit={handleManualLocationSubmit}
          onCancel={() => {
            setShowManualInput(false);
            if (!coordinates) {
              retryGeolocation();
            }
          }}
        />
      )}
      
      </div>{/* End of z-10 content wrapper */}
    </main>
  );
}

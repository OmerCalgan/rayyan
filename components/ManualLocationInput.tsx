'use client';

import { useState } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';

interface ManualLocationInputProps {
  language: Language;
  onSubmit: (lat: number, lng: number, name?: string) => void;
  onCancel: () => void;
}

export default function ManualLocationInput({ language, onSubmit, onCancel }: ManualLocationInputProps) {
  const t = translations[language].manualLocation;
  
  const [inputType, setInputType] = useState<'city' | 'coordinates'>('city');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const geocodeCity = async (city: string, country: string): Promise<{ lat: number; lng: number } | null> => {
    try {
      const query = country ? `${city},${country}` : city;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      }
      return null;
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (inputType === 'city') {
        if (!city.trim()) {
          setError(t.cityRequired);
          setLoading(false);
          return;
        }
        const result = await geocodeCity(city, country);
        if (result) {
          const locationName = country ? `${city}, ${country}` : city;
          onSubmit(result.lat, result.lng, locationName);
        } else {
          setError(t.locationNotFound);
        }
      } else {
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
          setError(t.invalidCoordinates);
          setLoading(false);
          return;
        }
        onSubmit(lat, lng);
      }
    } catch {
      setError(t.errorOccurred);
    } finally {
      setLoading(false);
    }
  };

  const cityLabel = language === 'tr' ? 'Şehir' : 'City';
  const coordinatesLabel = language === 'tr' ? 'Koordinatlar' : 'Coordinates';

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
    >
      <div 
        className="rounded-3xl p-6 w-full max-w-md shadow-2xl border"
        style={{ 
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--glass-border)',
          backdropFilter: 'blur(16px)'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}
            >
              <MapPin 
                className="w-5 h-5" 
                style={{ color: 'var(--accent-primary)' }} 
                strokeWidth={1.5} 
              />
            </div>
            <h2 
              className="text-xl font-bold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {t.title}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl transition-colors active:scale-95"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--glass-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <div 
          className="flex gap-2 mb-6 p-1 rounded-2xl"
          style={{ backgroundColor: 'var(--glass-bg)' }}
        >
          <button
            type="button"
            onClick={() => setInputType('city')}
            className="flex-1 py-2.5 px-4 rounded-xl font-medium transition-all duration-300 text-sm"
            style={{
              backgroundColor: inputType === 'city' ? 'var(--glass-bg)' : 'transparent',
              color: inputType === 'city' ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: inputType === 'city' ? '0 4px 6px -1px var(--shadow-color)' : 'none'
            }}
          >
            {cityLabel}
          </button>
          <button
            type="button"
            onClick={() => setInputType('coordinates')}
            className="flex-1 py-2.5 px-4 rounded-xl font-medium transition-all duration-300 text-sm"
            style={{
              backgroundColor: inputType === 'coordinates' ? 'var(--glass-bg)' : 'transparent',
              color: inputType === 'coordinates' ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: inputType === 'coordinates' ? '0 4px 6px -1px var(--shadow-color)' : 'none'
            }}
          >
            {coordinatesLabel}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {inputType === 'city' ? (
            <>
              <div>
                <label 
                  className="block text-xs font-medium mb-2 uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {cityLabel} *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={t.cityPlaceholder}
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2"
                  style={{ 
                    backgroundColor: 'var(--glass-bg)',
                    borderColor: 'var(--glass-border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label 
                  className="block text-xs font-medium mb-2 uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {t.countryOptional}
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder={t.countryPlaceholder}
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2"
                  style={{ 
                    backgroundColor: 'var(--glass-bg)',
                    borderColor: 'var(--glass-border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label 
                  className="block text-xs font-medium mb-2 uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {t.latLabel}
                </label>
                <input
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder={t.latPlaceholder}
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2"
                  style={{ 
                    backgroundColor: 'var(--glass-bg)',
                    borderColor: 'var(--glass-border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label 
                  className="block text-xs font-medium mb-2 uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {t.lngLabel}
                </label>
                <input
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder={t.lngPlaceholder}
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2"
                  style={{ 
                    backgroundColor: 'var(--glass-bg)',
                    borderColor: 'var(--glass-border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </>
          )}

          {error && (
            <p 
              className="text-sm px-4 py-3 rounded-xl border"
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#fca5a5',
                borderColor: 'rgba(239, 68, 68, 0.2)'
              }}
            >
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-4 rounded-xl font-medium transition-all active:scale-95"
              style={{ 
                backgroundColor: 'var(--glass-bg)',
                color: 'var(--text-muted)'
              }}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--bg-primary)'
              }}
            >
              {loading ? (
                <span className="animate-spin">⟳</span>
              ) : (
                <Search className="w-4 h-4" strokeWidth={2} />
              )}
              {loading ? t.searching : t.setLocation}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

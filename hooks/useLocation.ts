'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language, translations } from '@/lib/i18n';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface StoredLocation {
  city: string;
  lat: number;
  lng: number;
  timestamp: number;
}

export interface UseLocationReturn {
  coordinates: Coordinates | null;
  locationName: string | null;
  loading: boolean;
  error: string | null;
  isManualMode: boolean;
  setManualLocation: (lat: number, lng: number, name?: string) => void;
  enableManualMode: () => void;
  retryGeolocation: () => void;
  clearLocation: () => void;
}

const STORAGE_KEY = 'rayyan_user_location';

const getStoredLocation = (): StoredLocation | null => {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  
  try {
    const parsed = JSON.parse(saved);
    // Validate data integrity
    if (parsed.lat && parsed.lng && parsed.city) {
      return parsed as StoredLocation;
    }
    return null;
  } catch (e) {
    console.error('Corrupted location data', e);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

const saveLocationToStorage = (location: StoredLocation): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
};

const clearLocationFromStorage = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

export function useLocation(language: Language): UseLocationReturn {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isManualMode, setIsManualMode] = useState<boolean>(false);
  const [hasAttemptedHydration, setHasAttemptedHydration] = useState<boolean>(false);

  const t = translations[language];

  const fetchLocationName = useCallback(async (lat: number, lng: number): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
      );
      const data = await response.json();
      if (data.display_name) {
        const parts = data.display_name.split(',');
        return parts.slice(0, 2).join(',').trim();
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  const getCurrentPosition = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError(t.errors.locationUnsupported);
      setLoading(false);
      setIsManualMode(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
        
        const name = await fetchLocationName(latitude, longitude);
        setLocationName(name);
        
        // Save to localStorage
        saveLocationToStorage({
          city: name || `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
          lat: latitude,
          lng: longitude,
          timestamp: Date.now(),
        });
        
        setLoading(false);
      },
      (err) => {
        let errorMessage = t.errors.locationUnavailable;
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = t.errors.locationDenied;
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = t.errors.locationUnavailable;
            break;
          case err.TIMEOUT:
            errorMessage = t.errors.locationTimeout;
            break;
        }
        setError(errorMessage);
        setIsManualMode(true);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [fetchLocationName, t.errors]);

  // Hydration: Check localStorage on mount
  useEffect(() => {
    if (hasAttemptedHydration) return;
    
    const stored = getStoredLocation();
    if (stored) {
      setCoordinates({ latitude: stored.lat, longitude: stored.lng });
      setLocationName(stored.city);
      setLoading(false);
      setHasAttemptedHydration(true);
    } else {
      // No stored location, trigger geolocation
      setHasAttemptedHydration(true);
      getCurrentPosition();
    }
  }, [hasAttemptedHydration, getCurrentPosition]);

  const setManualLocation = useCallback((lat: number, lng: number, name?: string) => {
    const locationName = name || `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
    setCoordinates({ latitude: lat, longitude: lng });
    setLocationName(locationName);
    setIsManualMode(false);
    setError(null);
    setLoading(false);
    
    // Save to localStorage
    saveLocationToStorage({
      city: locationName,
      lat,
      lng,
      timestamp: Date.now(),
    });
  }, []);

  const enableManualMode = useCallback(() => {
    setIsManualMode(true);
    setError(null);
  }, []);

  const retryGeolocation = useCallback(() => {
    setIsManualMode(false);
    getCurrentPosition();
  }, [getCurrentPosition]);

  const clearLocation = useCallback(() => {
    clearLocationFromStorage();
    setCoordinates(null);
    setLocationName(null);
    setIsManualMode(true);
    setError(null);
  }, []);

  return {
    coordinates,
    locationName,
    loading,
    error,
    isManualMode,
    setManualLocation,
    enableManualMode,
    retryGeolocation,
    clearLocation,
  };
}

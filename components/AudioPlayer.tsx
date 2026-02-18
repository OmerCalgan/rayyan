'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Music, VolumeX } from 'lucide-react';

/**
 * ⚠️ USER ACTION REQUIRED:
 * Place your MP3 file named exactly 'sufi-music.mp3' in the 'public/' folder before building.
 * The app expects this path: /sufi-music.mp3
 * 
 * Audio Specifications:
 * - Format: MP3 (most compatible)
 * - Filename: sufi-music.mp3 (case-sensitive)
 * - Location: public/sufi-music.mp3
 * - Behavior: Starts paused, 20% volume, loops infinitely
 */

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/sufi-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2; // 20% volume - subtle background
    audioRef.current.preload = 'auto';
    
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });

    // Auto-start policy: Browsers block autoplay, so we initialize paused
    // User must click to start (which is preferred UX for religious audio)
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current || !isLoaded) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.error('Audio playback failed:', err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={togglePlayback}
      disabled={!isLoaded}
      className={`
        relative p-2 rounded-full transition-all duration-300 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center
        ${isPlaying 
          ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]' 
          : 'bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }
        ${!isLoaded ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
      `}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <Music className="w-5 h-5 animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
      
      {/* Visual indicator dot when playing */}
      {isPlaying && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-ping" />
      )}
    </button>
  );
};

export default AudioPlayer;

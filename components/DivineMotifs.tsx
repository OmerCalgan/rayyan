'use client';

import { Lamp, Moon, Star, Sparkles } from 'lucide-react';
import { CustomMosque } from './CustomMosque';

export default function DivineMotifs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* Geometric Islamic Pattern Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          opacity: 0.015
        }}
      />

      {/* Alternative radial pattern for depth */}
      <div 
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `radial-gradient(circle at center, var(--accent-primary) 0.5px, transparent 0.5px)`,
          backgroundSize: '50px 50px',
          opacity: 0.02
        }}
      />

      {/* Hanging Lanterns - Top Right Cluster */}
      {/* Lantern 1 - Rightmost (hidden on mobile) */}
      <div 
        className="absolute top-0 right-4 animate-swing hidden sm:block"
        style={{ transformOrigin: 'top center' }}
      >
        <div 
          className="w-px h-24 mx-auto"
          style={{ 
            backgroundColor: 'var(--accent-primary)', 
            opacity: 0.3 
          }} 
        />
        <div className="relative -mt-1">
          <Lamp 
            className="w-10 h-10 fill-current"
            style={{ 
              color: 'var(--accent-primary)', 
              opacity: 0.4 
            }}
            strokeWidth={1}
          />
          <div 
            className="absolute inset-0 blur-xl -z-10"
            style={{ 
              backgroundColor: 'var(--accent-primary)', 
              opacity: 0.15,
              transform: 'scale(1.5)'
            }}
          />
        </div>
      </div>

      {/* Lantern 2 - Middle */}
      <div 
        className="absolute top-0 right-20 animate-swing"
        style={{ 
          transformOrigin: 'top center',
          animationDelay: '700ms'
        }}
      >
        <div 
          className="w-px h-20 mx-auto"
          style={{ 
            backgroundColor: 'var(--accent-primary)', 
            opacity: 0.25 
          }} 
        />
        <div className="relative -mt-1">
          <Lamp 
            className="w-8 h-8 fill-current"
            style={{ 
              color: 'var(--accent-primary)', 
              opacity: 0.35 
            }}
            strokeWidth={1}
          />
          <div 
            className="absolute inset-0 blur-lg -z-10"
            style={{ 
              backgroundColor: 'var(--accent-primary)', 
              opacity: 0.12,
              transform: 'scale(1.3)'
            }}
          />
        </div>
      </div>

      {/* Lantern 3 - Leftmost (smaller) */}
      <div 
        className="absolute top-0 right-36 animate-swing hidden sm:block"
        style={{ 
          transformOrigin: 'top center',
          animationDelay: '1200ms'
        }}
      >
        <div 
          className="w-px h-16 mx-auto"
          style={{ 
            backgroundColor: 'var(--accent-primary)', 
            opacity: 0.2 
          }} 
        />
        <div className="relative -mt-1">
          <Sparkles 
            className="w-6 h-6 fill-current"
            style={{ 
              color: 'var(--accent-primary)', 
              opacity: 0.3 
            }}
            strokeWidth={1}
          />
        </div>
      </div>

      {/* ============================================
          DIVINE FRAME LAYOUT - LEFT/RIGHT SYMMETRY
          ============================================ */}

      {/* LEFT: Giant Crescent Moon (Bottom-Left) */}
      <div 
        className="absolute"
        style={{ 
          bottom: '-10%',
          left: '-5%',
          zIndex: -1
        }}
      >
        <Moon 
          className="w-96 h-96 fill-current"
          style={{ 
            color: 'var(--text-primary)', 
            opacity: 0.03,
            transform: 'rotate(-15deg)'
          }}
          strokeWidth={0.5}
        />
      </div>

      {/* Mobile-optimized crescent position */}
      <div 
        className="absolute sm:hidden"
        style={{ 
          bottom: '-15%',
          left: '-10%',
          zIndex: -1
        }}
      >
        <Moon 
          className="w-64 h-64 fill-current"
          style={{ 
            color: 'var(--text-primary)', 
            opacity: 0.025,
            transform: 'rotate(-15deg)'
          }}
          strokeWidth={0.5}
        />
      </div>

      {/* RIGHT: Custom SVG Mosque Architecture (Bottom-Right) - Mobile Optimized */}
      <div 
        className="absolute bottom-0 right-[-20px] pointer-events-none z-[-1] hidden sm:block overflow-visible"
        style={{ color: 'var(--text-primary)' }}
      >
        <CustomMosque className="w-64 h-64 md:w-96 md:h-96 opacity-[0.15]" />
      </div>

      {/* Mobile mosque - negative positioning for visibility, higher opacity */}
      <div 
        className="absolute bottom-0 right-[-10px] pointer-events-none z-[-1] sm:hidden overflow-visible"
        style={{ color: 'var(--text-primary)' }}
      >
        <CustomMosque className="w-48 h-48 opacity-[0.15]" />
      </div>

      {/* Additional Crescent Accents - Scattered */}
      {/* Crescent 1 - Top right area */}
      <div 
        className="absolute top-[20%] right-[10%]"
      >
        <Moon 
          className="w-12 h-12"
          style={{ 
            color: 'var(--accent-primary)', 
            opacity: 0.1
          }}
          strokeWidth={1}
        />
      </div>

      {/* Crescent 2 - Center left (subtle) */}
      <div 
        className="absolute top-[45%] left-[8%] hidden md:block"
      >
        <Moon 
          className="w-6 h-6"
          style={{ 
            color: 'white', 
            opacity: 0.06
          }}
          strokeWidth={1}
        />
      </div>

      {/* Crescent 3 - Upper right */}
      <div 
        className="absolute top-[8%] right-[25%] hidden lg:block"
      >
        <Moon 
          className="w-8 h-8"
          style={{ 
            color: 'var(--accent-primary)', 
            opacity: 0.08
          }}
          strokeWidth={1}
        />
      </div>

      {/* Starry Dust Field - Enhanced with 15 stars */}
      {/* Row 1 - Top area (8-10%) */}
      <div className="absolute top-[8%] left-[12%] animate-twinkle" style={{ animationDelay: '100ms', animationDuration: '3s' }}>
        <Star className="w-3 h-3 fill-current" style={{ color: 'var(--accent-primary)', opacity: 0.35 }} strokeWidth={0} />
      </div>
      <div className="absolute top-[10%] left-[45%] animate-twinkle" style={{ animationDelay: '500ms', animationDuration: '4s' }}>
        <Star className="w-2 h-2 fill-current" style={{ color: 'white', opacity: 0.25 }} strokeWidth={0} />
      </div>
      <div className="absolute top-[6%] right-[18%] animate-twinkle" style={{ animationDelay: '900ms', animationDuration: '2s' }}>
        <Star className="w-4 h-4 fill-current" style={{ color: 'var(--accent-primary)', opacity: 0.3 }} strokeWidth={0} />
      </div>

      {/* Row 2 - Upper-middle area (25-35%) */}
      <div className="absolute top-[25%] left-[5%] animate-twinkle hidden sm:block" style={{ animationDelay: '1200ms', animationDuration: '5s' }}>
        <Star className="w-2 h-2 fill-current" style={{ color: 'white', opacity: 0.2 }} strokeWidth={0} />
      </div>
      <div className="absolute top-[30%] right-[8%] animate-twinkle" style={{ animationDelay: '1500ms', animationDuration: '3.5s' }}>
        <Star className="w-3 h-3 fill-current" style={{ color: 'var(--accent-primary)', opacity: 0.4 }} strokeWidth={0} />
      </div>
      <div className="absolute top-[35%] left-[25%] animate-twinkle" style={{ animationDelay: '1800ms', animationDuration: '2.5s' }}>
        <Sparkles className="w-3 h-3 fill-current" style={{ color: 'white', opacity: 0.3 }} strokeWidth={0} />
      </div>

      {/* Row 3 - Middle area (40-50%) */}
      <div className="absolute top-[42%] right-[20%] animate-twinkle hidden md:block" style={{ animationDelay: '2200ms', animationDuration: '4s' }}>
        <Star className="w-2 h-2 fill-current" style={{ color: 'var(--accent-primary)', opacity: 0.25 }} strokeWidth={0} />
      </div>
      <div className="absolute top-[48%] left-[15%] animate-twinkle" style={{ animationDelay: '2500ms', animationDuration: '3s' }}>
        <Star className="w-4 h-4 fill-current" style={{ color: 'white', opacity: 0.35 }} strokeWidth={0} />
      </div>

      {/* Row 4 - Lower-middle area (60-70%) - North Star prominent */}
      <div className="absolute top-[60%] right-[12%] animate-twinkle" style={{ animationDelay: '3000ms', animationDuration: '6s' }}>
        <Star className="w-6 h-6 fill-current" style={{ color: 'var(--accent-primary)', opacity: 0.25 }} strokeWidth={0} />
      </div>
      <div className="absolute top-[65%] left-[8%] animate-twinkle hidden sm:block" style={{ animationDelay: '3300ms', animationDuration: '2.8s' }}>
        <Star className="w-2 h-2 fill-current" style={{ color: 'white', opacity: 0.2 }} strokeWidth={0} />
      </div>
      <div className="absolute top-[68%] left-[50%] animate-twinkle" style={{ animationDelay: '3600ms', animationDuration: '4.5s' }}>
        <Sparkles className="w-3 h-3 fill-current" style={{ color: 'var(--accent-primary)', opacity: 0.3 }} strokeWidth={0} />
      </div>

      {/* Row 5 - Bottom area (80-90%) */}
      <div className="absolute bottom-[15%] left-[20%] animate-twinkle" style={{ animationDelay: '4000ms', animationDuration: '3.2s' }}>
        <Star className="w-3 h-3 fill-current" style={{ color: 'white', opacity: 0.3 }} strokeWidth={0} />
      </div>
      <div className="absolute bottom-[12%] right-[25%] animate-twinkle hidden sm:block" style={{ animationDelay: '4300ms', animationDuration: '5.5s' }}>
        <Star className="w-2 h-2 fill-current" style={{ color: 'var(--accent-primary)', opacity: 0.2 }} strokeWidth={0} />
      </div>
      <div className="absolute bottom-[18%] right-[5%] animate-twinkle" style={{ animationDelay: '4600ms', animationDuration: '2.2s' }}>
        <Star className="w-4 h-4 fill-current" style={{ color: 'var(--accent-primary)', opacity: 0.35 }} strokeWidth={0} />
      </div>

      {/* Mobile-only stars */}
      <div className="absolute top-[55%] left-[3%] animate-twinkle sm:hidden" style={{ animationDelay: '1100ms', animationDuration: '3s' }}>
        <Star className="w-2 h-2 fill-current" style={{ color: 'var(--accent-primary)', opacity: 0.3 }} strokeWidth={0} />
      </div>
      <div className="absolute bottom-[25%] left-[35%] animate-twinkle sm:hidden" style={{ animationDelay: '2800ms', animationDuration: '4s' }}>
        <Star className="w-2 h-2 fill-current" style={{ color: 'white', opacity: 0.25 }} strokeWidth={0} />
      </div>

      {/* Decorative corner accent - Top left crescent hint */}
      <div 
        className="absolute -top-8 -left-8 opacity-[0.04] hidden lg:block"
      >
        <Moon 
          className="w-32 h-32"
          style={{ color: 'var(--accent-primary)' }}
          strokeWidth={1}
        />
      </div>
    </div>
  );
}

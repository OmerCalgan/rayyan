import React from 'react';

interface CustomMosqueProps {
  className?: string;
}

export const CustomMosque: React.FC<CustomMosqueProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 240 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Left Minaret - Perfect Vertical, Gap: 20px from dome (ends at 50, dome starts at 70) */}
      <g opacity="0.9">
        <rect x="36" y="50" width="14" height="110" rx="1" fill="currentColor"/>
        <rect x="33" y="75" width="20" height="3" rx="0.5" fill="currentColor" opacity="0.8"/>
        <rect x="31" y="115" width="24" height="4" rx="0.5" fill="currentColor" opacity="0.8"/>
        <rect x="42" y="40" width="2" height="10" fill="currentColor"/>
        <circle cx="43" cy="38" r="2.5" fill="currentColor"/>
      </g>

      {/* Main Building Base */}
      <rect x="70" y="110" width="100" height="50" rx="2" fill="currentColor" opacity="0.6"/>

      {/* Central Dome - Perfect Semicircle, Center: 120 */}
      <path 
        d="M 70 110 A 50 50 0 0 1 170 110 Z" 
        fill="currentColor" 
        opacity="0.85"
      />
      
      {/* Dome Crescent - Bolder stroke for mobile visibility */}
      <g transform="translate(120, 58)" opacity="0.95">
        <path 
          d="M -3 0 A 3.5 3.5 0 1 1 3 0 A 2.5 2.5 0 1 0 -3 0" 
          fill="currentColor"
        />
        <rect x="-0.5" y="-8" width="1" height="5" fill="currentColor"/>
        <circle cx="0" cy="-9" r="1.5" fill="currentColor"/>
      </g>

      {/* Right Minaret - Perfect Vertical, Gap: 20px from dome (starts at 190, dome ends at 170) */}
      <g opacity="0.9">
        <rect x="190" y="50" width="14" height="110" rx="1" fill="currentColor"/>
        <rect x="187" y="75" width="20" height="3" rx="0.5" fill="currentColor" opacity="0.8"/>
        <rect x="185" y="115" width="24" height="4" rx="0.5" fill="currentColor" opacity="0.8"/>
        <rect x="196" y="40" width="2" height="10" fill="currentColor"/>
        <circle cx="197" cy="38" r="2.5" fill="currentColor"/>
      </g>

      {/* Uniform Arched Windows - Centered under dome */}
      <g opacity="0.5">
        <path d="M 95 135 V 125 Q 95 120 100 120 Q 105 120 105 135 Z" fill="currentColor"/>
        <path d="M 115 135 V 125 Q 115 120 120 120 Q 125 120 125 135 Z" fill="currentColor"/>
        <path d="M 135 135 V 125 Q 135 120 140 120 Q 145 120 145 135 Z" fill="currentColor"/>
      </g>

      {/* Base Platform - Full width foundation */}
      <rect x="20" y="160" width="200" height="8" rx="1" fill="currentColor" opacity="0.4"/>
    </svg>
  );
};

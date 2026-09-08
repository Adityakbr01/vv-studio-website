import React from 'react';
import { Link } from 'react-router-dom';

export interface LogoProps {
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  theme = 'light',
  showTagline = false,
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-1.5 group transition-transform duration-200 hover:scale-[1.02] ${className}`}
      aria-label="VV Studio Home"
    >
      {/* Vertical 'SONLY' text from screenshot */}
      <span
        className={`text-[8px] font-bold tracking-[0.25em] uppercase select-none ${
          isDark ? 'text-white/70' : 'text-[#3D003D]/70'
        }`}
        style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
      >
        SONLY
      </span>

      {/* Stylized Double V Monogram & STUDIO text */}
      <div className="flex flex-col items-start">
        <div className="flex items-center">
          <svg
            viewBox="0 0 52 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 sm:h-7 w-auto drop-shadow-sm"
          >
            {/* Left thick V arm */}
            <path
              d="M3 2L17 28H25L11 2H3Z"
              fill={isDark ? '#FFFFFF' : '#3D003D'}
            />
            {/* Center interlocking V */}
            <path
              d="M17 2L31 28H39L25 2H17Z"
              fill={isDark ? '#FFFFFF' : '#3D003D'}
            />
            {/* Right sleek accent V */}
            <path
              d="M31 2L44 28H51L38 2H31Z"
              fill="url(#vv-accent-grad)"
            />
            <defs>
              <linearGradient id="vv-accent-grad" x1="31" y1="2" x2="51" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E8329D" />
                <stop offset="1" stopColor="#D91A8A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span
          className={`text-[9px] sm:text-[10px] font-bold tracking-[0.32em] uppercase pl-0.5 -mt-0.5 ${
            isDark ? 'text-white' : 'text-[#3D003D]'
          }`}
        >
          STUDIO
        </span>
        {showTagline && (
          <span className="font-serif italic text-xs tracking-normal mt-1 text-white/70">
            Adding care to your Beauty
          </span>
        )}
      </div>
    </Link>
  );
};

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
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const isDark = theme === 'dark';

  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' },
  };

  const currentSize = sizeClasses[size];

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02] ${className}`}
      aria-label="VV Studio Home"
    >
      {/* Stylized Double V Monogram from Reference */}
      <div
        className={`${currentSize.icon} shrink-0 relative flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Outer diamond / angular contour */}
          <path
            d="M8 8L24 40L40 8H31L24 26L17 8H8Z"
            fill="url(#vv-grad-1)"
          />
          <path
            d="M17 8L24 23L31 8H26L24 13L22 8H17Z"
            fill={isDark ? '#FFFFFF' : '#3D003D'}
            opacity="0.9"
          />
          <defs>
            <linearGradient
              id="vv-grad-1"
              x1="8"
              y1="8"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D91A8A" />
              <stop offset="0.6" stopColor="#A80086" />
              <stop offset="1" stopColor="#68005F" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col tracking-wider">
        <div className="flex items-baseline gap-1 font-serif">
          <span
            className={`font-extrabold tracking-widest font-sans ${
              isDark ? 'text-white' : 'text-[#3D003D]'
            } ${currentSize.text}`}
          >
            VV
          </span>
          <span
            className={`tracking-[0.25em] font-medium text-xs uppercase ${
              isDark ? 'text-[#F8C1DE]' : 'text-[#85006F]'
            }`}
          >
            STUDIO
          </span>
        </div>
        {showTagline && (
          <span className={`font-serif italic text-xs tracking-normal mt-0.5 text-white/70`}>
            Adding care to your Beauty
          </span>
        )}
      </div>
    </Link>
  );
};

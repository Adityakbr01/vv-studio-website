import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  centered?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  actionText,
  actionHref,
  onActionClick,
  centered = false,
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14 ${
        centered ? 'text-center items-center justify-center' : ''
      } ${className}`}
    >
      <div className={centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}>
        {eyebrow && (
          <p
            className={`text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-2 ${
              isDark ? 'text-[#F06AB9]' : 'text-[#A80086]'
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-display font-medium tracking-tight leading-[1.2] ${
            isDark ? 'text-white' : 'text-[#2C182A]'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-3 text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-white/80' : 'text-[#766A73]'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {actionText && (
        <div className={`shrink-0 ${centered ? 'mt-2' : ''}`}>
          {actionHref ? (
            <Link
              to={actionHref}
              className={`group inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                isDark
                  ? 'text-[#F8C1DE] hover:text-white'
                  : 'text-[#A80086] hover:text-[#3D003D]'
              }`}
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ) : (
            <button
              onClick={onActionClick}
              className={`group inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                isDark
                  ? 'text-[#F8C1DE] hover:text-white'
                  : 'text-[#A80086] hover:text-[#3D003D]'
              }`}
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

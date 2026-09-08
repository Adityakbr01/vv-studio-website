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
  controls?: React.ReactNode;
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
  controls,
  centered = false,
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4 mb-6 md:mb-8 ${
        centered ? 'text-center items-center justify-center' : ''
      } ${className}`}
    >
      <div className={centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}>
        {eyebrow && (
          <p
            className={`text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase mb-1.5 ${
              isDark ? 'text-[#F06AB9]' : 'text-[#D91A8A]'
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`text-[26px] sm:text-[32px] lg:text-[36px] font-display font-semibold tracking-tight leading-[1.15] ${
            isDark ? 'text-white' : 'text-[#2D0A2E]'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-1.5 text-[13px] sm:text-sm leading-relaxed ${
              isDark ? 'text-white/80' : 'text-[#7A6A77]'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {(actionText || controls) && (
        <div className={`shrink-0 flex items-center gap-3 ${centered ? 'mt-2' : 'md:pb-1'}`}>
          {actionText &&
            (actionHref ? (
              <Link
                to={actionHref}
                className={`group inline-flex items-center gap-1 text-[13px] font-semibold transition-colors duration-200 ${
                  isDark
                    ? 'text-[#F8C1DE] hover:text-white'
                    : 'text-[#D91A8A] hover:text-[#A80086]'
                }`}
              >
                <span>{actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ) : (
              <button
                onClick={onActionClick}
                className={`group inline-flex items-center gap-1 text-[13px] font-semibold transition-colors duration-200 cursor-pointer ${
                  isDark
                    ? 'text-[#F8C1DE] hover:text-white'
                    : 'text-[#D91A8A] hover:text-[#A80086]'
                }`}
              >
                <span>{actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            ))}
          {controls}
        </div>
      )}
    </div>
  );
};

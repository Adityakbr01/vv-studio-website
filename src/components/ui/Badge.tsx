import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pink' | 'plum' | 'white' | 'gold';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'pink',
  className = '',
}) => {
  const variantStyles = {
    pink: 'bg-[#FDEAF4] text-[#A80086] border border-[#F8C1DE]/60',
    plum: 'bg-[#3D003D]/80 text-[#F8C1DE] border border-[#68005F]/50',
    white: 'bg-white text-[#40363F] border border-[#E8DCE5] shadow-xs',
    gold: 'bg-[#FFF8E7] text-[#B37400] border border-[#FFE8B3]',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

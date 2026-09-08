import React from 'react';
import { Sparkles, Scissors, Feather, Crown, HeartHandshake, Droplets } from 'lucide-react';
import { CATEGORIES_DATA } from '@/data/salonData';

interface CategoryNavProps {
  onSelectCategory?: (categoryId: string) => void;
  activeCategory?: string;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  onSelectCategory,
  activeCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles':
        return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'scissors':
        return <Scissors className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'feather':
        return <Feather className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'crown':
        return <Crown className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'hand':
        return <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'droplets':
        return <Droplets className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  return (
    <nav
      aria-label="Salon Service Categories"
      className="relative z-20 bg-white border-y border-[#E8DCE5] shadow-[0_4px_25px_rgba(61,0,61,0.03)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-4 sm:py-6 gap-6 sm:gap-8">
          {CATEGORIES_DATA.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <a
                key={cat.id}
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory?.(cat.id);
                  const el = document.getElementById('services');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group shrink-0 flex flex-col items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 cursor-pointer text-center ${
                  isActive
                    ? 'text-[#A80086]'
                    : 'text-[#40363F] hover:text-[#A80086]'
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#FDEAF4] text-[#D91A8A] scale-105 shadow-sm ring-2 ring-[#F06AB9]/50'
                      : 'bg-[#FAF7F9] text-[#C21891] group-hover:bg-[#FDEAF4] group-hover:text-[#D91A8A] group-hover:scale-105 group-hover:shadow-xs'
                  }`}
                >
                  {getIcon(cat.iconName)}
                </div>

                {/* Category Label */}
                <span className="text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap transition-colors">
                  {cat.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

import React from 'react';
import type { ServiceItem } from '@/data/salonData';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(service)}
      className="group cursor-pointer bg-white rounded-[12px] overflow-hidden border border-[#F1E4EE] shadow-[0_2px_14px_rgba(90,20,80,0.08)] hover:shadow-[0_10px_28px_rgba(90,20,80,0.14)] hover:-translate-y-1 transition-all duration-300 text-center flex flex-col h-full"
    >
      {/* Image — square-ish top, rounded via card overflow */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF0F6]">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* White label block — matches reference */}
      <div className="px-2 py-3 sm:py-3.5 bg-white flex-1 flex flex-col items-center justify-start">
        <h3 className="text-[13px] sm:text-sm font-bold text-[#2E1348] leading-snug">
          {service.title}
        </h3>
        <p className="mt-1 text-[11px] sm:text-xs text-[#7B7280] leading-snug">
          {service.tagline}
        </p>
      </div>
    </article>
  );
};

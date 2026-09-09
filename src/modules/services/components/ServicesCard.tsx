import React from 'react';
import type { SalonService } from '@/data/servicesData';

interface ServicesCardProps {
  service: SalonService;
  onOpenBooking: (serviceName?: string) => void;
}

export const ServicesCard: React.FC<ServicesCardProps> = ({
  service,
  onOpenBooking,
}) => {
  const renderIcon = (type: SalonService['iconName']) => {
    const strokeProps = {
      className: 'w-8 h-8 text-[#EC008C] shrink-0',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      strokeWidth: 1.5,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
    };

    switch (type) {
      case 'threading':
        // Face outline with defined arched brow
        return (
          <svg {...strokeProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M8 9.5c1-1 3-1 4 0M12 9.5c1-1 3-1 4 0" />
            <circle cx="9.5" cy="12.5" r=".75" fill="currentColor" />
            <circle cx="14.5" cy="12.5" r=".75" fill="currentColor" />
            <path d="M10 16c1 .8 3 .8 4 0" />
          </svg>
        );
      case 'facial':
        // Heart with sparkles / glowing skin
        return (
          <svg {...strokeProps}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M12 8v3m-1.5-1.5h3" />
          </svg>
        );
      case 'waxing':
        // Droplet / smooth contour
        return (
          <svg {...strokeProps}>
            <path d="m12 3-1.9 2.5a6 6 0 1 0 7.8 0Z" />
            <path d="M10 14c.5 1 1.5 1.5 2.5 1.5" />
          </svg>
        );
      case 'bridal':
        // Bride / crown / tiara
        return (
          <svg {...strokeProps}>
            <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
          </svg>
        );
      case 'hairStyling':
        // Styling trophy / ribbon / shears
        return (
          <svg {...strokeProps}>
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
            <path d="M6 4h12v6a6 6 0 0 1-12 0V4Z" />
          </svg>
        );
      case 'handFeet':
        // Lotus / manicure petal
        return (
          <svg {...strokeProps}>
            <path d="M12 4c-3 3.5-3 8 0 14 3-6 3-10.5 0-14Z" />
            <path d="M12 18c-3-2-6.5-3.5-8-2 0 4 4.5 5 8 5" />
            <path d="M12 18c3-2 6.5-3.5 8-2 0 4-4.5 5-8 5" />
          </svg>
        );
      case 'hairTreatment':
        // Hair nourish / flowing strands
        return (
          <svg {...strokeProps}>
            <path d="M12 2C7 2 4 6 4 11c0 6 3 11 8 11s8-5 8-11c0-5-3-9-8-9Z" />
            <path d="M8 12c1 3 2.5 4 4 4s3-1 4-4" />
            <path d="M12 7v5" />
          </svg>
        );
      case 'hairColor':
        // Hair color swatch / radiant highlights
        return (
          <svg {...strokeProps}>
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.5-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6H17c2.8 0 5-2.2 5-5 0-5.5-4.5-9.6-10-9.6Z" />
          </svg>
        );
      case 'scalp':
        // Head / hair massage
        return (
          <svg {...strokeProps}>
            <path d="M16 16v1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1" />
            <path d="M6 14a6 6 0 0 1 12 0" />
            <path d="M8 8V6a4 4 0 0 1 8 0v2" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </svg>
        );
      case 'makeover':
        // Butterfly / makeover blossom
        return (
          <svg {...strokeProps}>
            <path d="M12 12c-2-3-5-4-8-3 0 4 2 8 8 9" />
            <path d="M12 12c2-3 5-4 8-3 0 4-2 8-8 9" />
            <path d="M12 12c-2 2-4 4-4 7 3 0 4-3 4-7Z" />
            <path d="M12 12c2 2 4 4 4 7-3 0-4-3-4-7Z" />
            <path d="M12 6v6" />
          </svg>
        );
      case 'packages':
        // Heart outline with ribbon
        return (
          <svg {...strokeProps}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        );
      case 'products':
        // Cosmetic bottle / luxury cream jar
        return (
          <svg {...strokeProps}>
            <rect width="10" height="14" x="7" y="7" rx="2" />
            <path d="M10 7V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3" />
            <line x1="7" x2="17" y1="12" y2="12" />
          </svg>
        );
      default:
        return (
          <svg {...strokeProps}>
            <circle cx="12" cy="12" r="9" />
          </svg>
        );
    }
  };

  return (
    <div
      onClick={() => onOpenBooking(service.title)}
      className="group bg-white rounded-xl border border-[#F1F1F4] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_34px_rgba(80,0,70,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Card Image */}
      <div className="relative w-full h-[140px] sm:h-[150px] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-600 ease-out"
        />
      </div>

      {/* Card Content - icon left, text right like reference */}
      <div className="p-4 sm:p-5 flex gap-3.5 flex-1">
        <div className="shrink-0 pt-0.5">{renderIcon(service.iconName)}</div>
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="text-[15px] sm:text-base font-bold text-[#2E1B4E] tracking-tight leading-snug">
            {service.title}
          </h3>

          <p className="text-[13px] text-[#6F6B7B] mt-1 leading-[1.55] flex-1">
            {service.description}
          </p>

          {/* View Services Action */}
          <div className="pt-3 mt-2">
            <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#EC008C] group-hover:gap-2.5 transition-all">
              <span>View Services</span>
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

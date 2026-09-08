import React from 'react';
import { Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SpecialOffersProps {
  onOpenBooking: () => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersProps> = ({ onOpenBooking }) => {
  const offerTags = [
    'Bridal Packages',
    'Facial Combos',
    'Hair Makeover',
    'Seasonal Offers',
  ];

  return (
    <section className="relative bg-gradient-to-r from-[#2B002B] via-[#3D003D] to-[#68005F] text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Decorative ambient radial light */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 50%, rgba(217, 26, 138, 0.45) 0%, transparent 60%),
                            radial-gradient(circle at 10% 30%, rgba(168, 0, 134, 0.35) 0%, transparent 50%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Offer Details */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <Gift className="w-4 h-4 text-[#F06AB9]" />
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#F8C1DE]">
                SPECIAL OFFERS
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight leading-[1.15] mb-4">
              Beauty Packages for Every You
            </h2>

            {/* Tags / Subcategories from Screenshot */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#F8C1DE] font-medium mb-6">
              {offerTags.map((tag, index) => (
                <React.Fragment key={tag}>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    {tag}
                  </span>
                  {index < offerTags.length - 1 && (
                    <span className="text-white/40">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="text-sm sm:text-base text-white/80 max-w-xl font-light leading-relaxed mb-8">
              Indulge in our curated packages that combine our most requested salon treatments at exceptional festive rates. Includes complimentary skin consultations.
            </p>

            <div>
              <Button
                variant="primary"
                size="lg"
                withArrow
                onClick={onOpenBooking}
                className="shadow-[0_10px_25px_rgba(217,26,138,0.4)]"
              >
                Discover Offers
              </Button>
            </div>
          </div>

          {/* Right Column: Model & Floating Script */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
              <img
                src="https://images.unsplash.com/photo-1512290900672-1a613f9c65ee?auto=format&fit=crop&w=800&q=85"
                alt="Special beauty offers at VV Studio"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B002B]/80 via-transparent to-transparent pointer-events-none" />

              {/* Decorative Flower */}
              <div className="absolute bottom-4 right-4 pointer-events-none">
                <Sparkles className="w-8 h-8 text-[#F06AB9] drop-shadow-md animate-pulse" />
              </div>
            </div>

            {/* Script Text: "Because You Deserve More" */}
            <div
              className="absolute -top-4 -right-2 sm:right-2 lg:-right-4 z-20 transform rotate-[-6deg] pointer-events-none select-none text-right"
              aria-hidden="true"
            >
              <p className="font-script text-3xl sm:text-4xl text-white/95 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                Because <br />
                <span className="text-[#F8C1DE]">You Deserve</span> <br />
                More
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

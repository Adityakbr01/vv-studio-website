import React, { useState } from 'react';
import { Play, X, Flower2, Gem, Users, Heart } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface ExperienceDifferenceSectionProps {
  onOpenBooking: () => void;
}

export const ExperienceDifferenceSection: React.FC<ExperienceDifferenceSectionProps> = ({
  onOpenBooking,
}) => {
  const [isTourOpen, setIsTourOpen] = useState(false);

  const features = [
    {
      id: 'ambience',
      label: 'Relaxing Ambience',
      icon: <Flower2 className="w-6 h-6 text-[#D91A8A] stroke-[1.6]" />,
    },
    {
      id: 'hygiene',
      label: 'Hygienic & Safe Environment',
      icon: <Gem className="w-6 h-6 text-[#D91A8A] stroke-[1.6]" />,
    },
    {
      id: 'professionals',
      label: 'Trained Professionals',
      icon: <Users className="w-6 h-6 text-[#D91A8A] stroke-[1.6]" />,
    },
    {
      id: 'care',
      label: 'Personalized Care',
      icon: <Heart className="w-6 h-6 text-[#D91A8A] stroke-[1.6]" />,
    },
  ];

  return (
    <section className="py-14 lg:py-20 bg-white border-t border-[#F5EAF2]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Salon Interior with Virtual Tour Play Trigger */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(80,0,70,0.12)] group border border-[#F2E1ED]">
              <img
                src="/images/contact/salon_virtual_tour.jpg"
                alt="V V Studio Luxury Salon Interior & Reception"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim for Contrast */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Interactive Virtual Tour Play Button Overlay */}
              <button
                type="button"
                onClick={() => setIsTourOpen(true)}
                className="absolute bottom-6 left-6 flex items-center gap-3.5 bg-black/40 hover:bg-black/60 backdrop-blur-md py-2 px-4 rounded-full border border-white/20 transition-all duration-300 group/btn cursor-pointer"
                aria-label="Take a Virtual Tour of VV Studio"
              >
                <div className="relative w-11 h-11 rounded-full bg-[#E8329D] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(232,50,157,0.6)] group-hover/btn:scale-110 group-hover/btn:bg-[#D91A8A] transition-all">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                  <span className="absolute inset-0 rounded-full bg-[#E8329D] animate-ping opacity-35 pointer-events-none" />
                </div>
                <span className="text-white! font-medium text-sm tracking-wide drop-shadow-sm pr-1">
                  Take a Virtual Tour
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Experience Details & Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#D91A8A] mb-2">
              VISIT OUR STUDIO
            </p>

            <h2 className="font-display italic text-3xl sm:text-4xl lg:text-[42px] text-[#2D0A2E] font-semibold tracking-tight leading-[1.15] mb-3">
              Experience the Difference
            </h2>

            <p className="text-[#6D5D6A] text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              A modern, comfortable and welcoming space designed to make you feel relaxed,
              confident and beautiful.
            </p>

            {/* 4 Feature Points in responsive row / grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 mb-9">
              {features.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center text-center p-3 sm:p-2.5 rounded-2xl bg-[#FFFDFE] hover:bg-[#FFF5F9] border border-[#F5E6F0] transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF0F7] border border-[#FCD6E8] flex items-center justify-center mb-2.5 shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-xs font-semibold text-[#3D1E3A] leading-tight max-w-[120px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Book Appointment CTA */}
            <div>
              <Button
                variant="primary"
                size="md"
                withArrow
                onClick={onOpenBooking}
                className="bg-[#E8329D] hover:bg-[#D91A8A] shadow-[0_8px_25px_rgba(232,50,157,0.45)] px-7 py-3 text-sm"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Virtual Tour Modal */}
      {isTourOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-4xl bg-[#2B002B] rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#F8C1DE]" />
                <h3 className="text-white font-medium text-sm">
                  V V Studio — Virtual Walkthrough & Ambience
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTourOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <img
                src="/images/contact/salon_virtual_tour.jpg"
                alt="Virtual tour view"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#E8329D]/90 flex items-center justify-center text-white mb-3 shadow-lg">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <h4 className="font-display italic text-2xl sm:text-3xl text-white font-semibold mb-2">
                  Welcome to V V Studio
                </h4>
                <p className="text-white/80 text-xs sm:text-sm max-w-md mb-4">
                  #8, 1st Floor, 24th Main, 5th Phase, JP Nagar, Bangalore
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsTourOpen(false);
                    onOpenBooking();
                  }}
                  className="bg-[#E8329D] hover:bg-[#D91A8A]"
                >
                  Schedule Your Visit Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

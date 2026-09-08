import React from 'react';
import { Trophy, Users, Gem } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-12  bg-[#FAF7F9] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Story & Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#A80086] mb-3">
              ABOUT <span className="text-[#D91A8A] font-bold">VV</span> STUDIO
            </p>

            {/* Serif Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#2C182A] leading-[1.18] tracking-tight mb-6">
              More Than Just a Salon, <br />
              <span className="font-serif italic font-normal text-[#85006F]">A Place for You</span>
            </h2>

            {/* Editorial Copy */}
            <div className="space-y-4 text-sm sm:text-base text-[#40363F] leading-relaxed mb-8">
              <p>
                At <strong className="font-semibold text-[#2C182A]">VV Studio</strong>, we believe beauty is more than just appearance — it's about self-care, confidence and feeling your absolute best.
              </p>
              <p>
                Our master artisans and licensed aestheticians offer a comprehensive sanctuary of hair, skin, and bridal rituals using the world’s finest dermatological formulations and tailored attention.
              </p>

            </div>

            {/* CTA Button */}
            <div className="mb-10">
              <Button
                variant="primary"
                size="md"
                withArrow
                onClick={onOpenBooking}
              >
                Know More About Us
              </Button>
            </div>

            {/* Trust Statistics Row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#E8DCE5]">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-[#D91A8A]" />
                  <span className="text-xl sm:text-2xl font-bold font-display text-[#2C182A]">
                    10+
                  </span>
                </div>
                <span className="text-xs text-[#766A73] font-medium leading-tight">
                  Years of Expertise
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-[#D91A8A]" />
                  <span className="text-xl sm:text-2xl font-bold font-display text-[#2C182A]">
                    Thousands
                  </span>
                </div>
                <span className="text-xs text-[#766A73] font-medium leading-tight">
                  Happy Clients
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Gem className="w-4 h-4 text-[#D91A8A]" />
                  <span className="text-xl sm:text-2xl font-bold font-display text-[#2C182A]">
                    Premium
                  </span>
                </div>
                <span className="text-xs text-[#766A73] font-medium leading-tight">
                  Beauty Experience
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3-Image Collage */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-3 sm:gap-4">
            {/* Main Salon Reception with Real Neon Glow Sign ("Beauty Self Care Happiness") */}
            <div className="col-span-7 relative rounded-2xl overflow-hidden shadow-card border border-[#E8DCE5] group aspect-[4/5] sm:aspect-auto sm:h-full">
              <img
                src="/images/home/about_salon_reception.webp"
                alt="VV Studio modern salon reception and lounge"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-medium text-[#3D003D] shadow-xs">
                VV Studio Lounge
              </div>
            </div>

            {/* Two Stacked Images on Right */}
            <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
              {/* Top: Facial Treatment */}
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-[#E8DCE5] aspect-square group">
                <img
                  src="/images/home/about_facial_treatment.webp"
                  alt="Dermatological facial renewal at VV Studio"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-medium">Hydra Facial</span>
                </div>
              </div>

              {/* Bottom: Dimensional Hair Styling */}
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-[#E8DCE5] aspect-square group">
                <img
                  src="/images/home/about_hair_styling.webp"
                  alt="Glossy balayage waves hairstyle at VV Studio"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-medium">Balayage Artistry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

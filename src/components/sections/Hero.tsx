import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  return (
    <section
      id="home"
      className="relative min-h-[660px] sm:min-h-[720px] lg:min-h-[820px] xl:h-[90vh] max-h-[920px] bg-[#3D003D] text-white pt-24 sm:pt-28 pb-12 lg:py-0 flex items-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at 72% 42%, rgba(217, 26, 138, 0.45) 0%, rgba(104, 0, 95, 0.3) 35%, transparent 68%),
                     radial-gradient(circle at 18% 65%, rgba(133, 0, 111, 0.35) 0%, transparent 55%),
                     linear-gradient(118deg, #240024 0%, #350035 24%, #490043 52%, #620055 76%, #330030 100%)`,
      }}
    >
      {/* Background Diamond Geometry Shapes from Reference Screenshot */}
      <div
        className="absolute left-[45%] lg:left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[480px] lg:w-[560px] aspect-square rotate-45 border border-white/10 bg-gradient-to-br from-white/[0.07] via-[#D91A8A]/[0.09] to-transparent pointer-events-none rounded-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute left-[45%] lg:left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[350px] lg:w-[420px] aspect-square rotate-45 border border-[#F06AB9]/15 bg-white/[0.02] pointer-events-none rounded-2xl"
        aria-hidden="true"
      />

      {/* Side Carousel Navigation Chevrons from Screenshot */}
      <button
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center text-white/80 hover:text-white transition-all backdrop-blur-xs cursor-pointer shadow-md"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        aria-label="Next Slide"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center text-white/80 hover:text-white transition-all backdrop-blur-xs cursor-pointer shadow-md"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Main Grid Content */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full h-full flex flex-col lg:flex-row items-center justify-between z-20">
        {/* Left Editorial Content */}
        <div className="w-full lg:w-[55%] pt-4 lg:pt-14 text-left">
          {/* Eyebrow */}
          <p className="text-xs sm:text-[13px] font-semibold tracking-[0.3em] uppercase text-[#F8C1DE] mb-3 sm:mb-4 drop-shadow-xs">
            BEAUTY &nbsp;•&nbsp; CARE &nbsp;•&nbsp; CONFIDENCE
          </p>

          {/* Main Headline */}
          <h1 className="text-white tracking-tight leading-[1.02] mb-5 sm:mb-6">
            <span className="block font-serif italic text-3xl sm:text-4xl lg:text-[44px] font-light text-white/95 tracking-wide">
              Adding care to your
            </span>
            <span className="block font-serif italic text-6xl sm:text-8xl lg:text-[105px] xl:text-[118px] text-white font-normal tracking-wide drop-shadow-sm -mt-1 sm:-mt-2">
              Beauty
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed mb-7 sm:mb-9 max-w-md">
            Expert care. Personalized treatments. <br className="hidden sm:inline" />
            A more confident you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10 sm:mb-12">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 rounded-full bg-[#E8329D] hover:bg-[#D91A8A] text-white font-medium px-7 py-3 text-sm transition-all duration-300 shadow-[0_8px_25px_rgba(232,50,157,0.45)] hover:shadow-[0_12px_32px_rgba(232,50,157,0.6)] hover:-translate-y-0.5 cursor-pointer active:scale-95"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreServices}
              className="inline-flex items-center rounded-full border border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-3 text-sm transition-all duration-300 backdrop-blur-xs hover:-translate-y-0.5 cursor-pointer active:scale-95"
            >
              View Our Services
            </button>
          </div>

          {/* 3 Trust Badges from Reference Screenshot */}
          <div className="flex items-center gap-5 sm:gap-8 pt-6 border-t border-white/15 max-w-lg">
            {/* Badge 1: Professional Experts */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="text-[#F8C1DE] shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z" />
                  <path d="M7 12c2.5 0 4-1.5 5-4 1 2.5 2.5 4 5 4" />
                  <path d="M12 12v6" />
                </svg>
              </div>
              <div className="text-[11px] sm:text-xs text-white/90 leading-tight">
                <span className="font-light block text-white/70">Professional</span>
                <span className="font-medium block text-white">Experts</span>
              </div>
            </div>

            {/* Badge 2: Premium Products */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="text-[#F8C1DE] shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3c-1.5 3-4 6.5-7 8.5 3 .5 6 0 7-1.5 1 1.5 4 2 7 1.5-3-2-5.5-5.5-7-8.5Z" />
                  <path d="M12 10c-2 2-4 5-5 7 2.5 0 4.5-.5 5-1.5.5 1 2.5 1.5 5 1.5-1-2-3-5-5-7Z" />
                  <path d="M12 15.5c-1 1.5-2 3-2.5 4.5 1.5 0 2.5-.5 2.5-1.5 0 1 1 1.5 2.5 1.5-.5-1.5-1.5-3-2.5-4.5Z" />
                </svg>
              </div>
              <div className="text-[11px] sm:text-xs text-white/90 leading-tight">
                <span className="font-light block text-white/70">Premium</span>
                <span className="font-medium block text-white">Products</span>
              </div>
            </div>

            {/* Badge 3: Hygienic & Safe */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="text-[#F8C1DE] shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div className="text-[11px] sm:text-xs text-white/90 leading-tight">
                <span className="font-light block text-white/70">Hygienic</span>
                <span className="font-medium block text-white">& Safe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Model Image & Floating Script */}
        <div className="w-full lg:w-[48%] relative flex items-end justify-center lg:justify-end mt-8 lg:mt-0">
          {/* Model Asset with Alpha Cutout */}
          <div className="relative w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[620px] pointer-events-none select-none">
            <img
              src="/images/home/home_top_banner.webp"
              alt="VV Studio Beauty Model with Pink Lilies"
              className="w-full h-auto object-contain object-bottom filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.45)]"
              loading="eager"
            />
          </div>

          {/* Floating Cursive Script Quote ("Look Good Feel Good Be You") exactly positioned beside model */}
          <div
            className="absolute top-[18%] sm:top-[22%] lg:top-[26%] right-0 sm:right-4 lg:-right-4 z-30 transform rotate-[-4deg] pointer-events-none select-none text-right"
            aria-hidden="true"
          >
            <p className="font-script text-3xl sm:text-4xl lg:text-[46px] text-white/95 leading-[1.1] drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)]">
              Look Good <br />
              <span className="text-[#F8C1DE] font-normal">Feel Good</span> <br />
              Be You
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Dots Indicators at Bottom */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        <span className="w-5 h-1.5 rounded-full bg-[#E8329D] shadow-xs" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
      </div>
    </section>
  );
};

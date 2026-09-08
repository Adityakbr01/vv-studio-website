import React from 'react';
import { Award, Sparkles, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen bg-[#3D003D] bg-gradient-to-br from-[#2B002B] via-[#3D003D] to-[#68005F] text-white pt-28 pb-16 lg:py-0 flex items-center overflow-hidden"
    >
      {/* Subtle Luxury Geometric Diamond Lines & Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 75% 35%, rgba(217, 26, 138, 0.45) 0%, transparent 60%),
                            radial-gradient(circle at 20% 70%, rgba(133, 0, 111, 0.35) 0%, transparent 50%)`,
        }}
      />

      {/* Decorative Diamond SVG Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute -right-32 -top-20 w-[650px] h-[650px] text-[#F06AB9]"
          viewBox="0 0 400 400"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        >
          <polygon points="200,10 390,200 200,390 10,200" />
          <polygon points="200,50 350,200 200,350 50,200" />
          <polygon points="200,90 310,200 200,310 90,200" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-6 lg:pt-12">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <span className="h-px w-6 bg-[#F06AB9]/60" />
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#F8C1DE]">
                BEAUTY • CARE • CONFIDENCE
              </p>
            </div>

            {/* Editorial Serif Heading */}
            <h1 className="font-display tracking-tight text-white leading-[1.08] mb-6">
              <span className="block text-3xl sm:text-5xl lg:text-6xl font-normal text-white/95">
                Adding care to your
              </span>
              <span className="block font-serif italic text-6xl sm:text-8xl lg:text-[100px] text-white font-normal tracking-wide drop-shadow-sm">
                Beauty
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/80 max-w-xl font-light leading-relaxed mb-8 sm:mb-10">
              Expert care. Personalized treatments. A more confident you. Step into Bangalore's premier salon sanctuary designed exclusively to rejuvenate your mind, body and soul.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-12 sm:mb-14">
              <Button
                variant="primary"
                size="lg"
                withArrow
                onClick={onOpenBooking}
                className="shadow-[0_12px_30px_rgba(217,26,138,0.45)]"
              >
                Book Appointment
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onExploreServices}
              >
                View Our Services
              </Button>
            </div>

            {/* Trust / Benefit Badges Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/15 max-w-lg">
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 text-center sm:text-left">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F8C1DE] shrink-0 backdrop-blur-xs">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-white/90 leading-tight">
                  Professional Experts
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 text-center sm:text-left">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F8C1DE] shrink-0 backdrop-blur-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-white/90 leading-tight">
                  Premium Products
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 text-center sm:text-left">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#F8C1DE] shrink-0 backdrop-blur-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-white/90 leading-tight">
                  Hygienic & Safe
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Luxury Beauty Model & Romantic Script */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-4 lg:mt-0">
            {/* Ambient Radial Backlight behind Model */}
            <div
              className="absolute -inset-4 bg-gradient-to-tr from-[#D91A8A]/35 via-[#A80086]/20 to-transparent rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Carousel Side Chevrons (Delicate Aesthetic detail from screenshot) */}
            <button
              aria-label="Previous slide"
              className="hidden xl:flex absolute -left-6 z-20 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next slide"
              className="hidden xl:flex absolute -right-6 z-20 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Main Portrait Frame with subtle gradient blend */}
            <div className="relative w-full max-w-[440px] aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/15 group">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85"
                alt="Radiant beauty model at VV Studio"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Bottom and edge vignette to blend model seamlessly into plum */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B002B]/85 via-[#3D003D]/20 to-transparent pointer-events-none" />

              {/* Pink Lily Petals Accent Graphic */}
              <div className="absolute bottom-4 right-4 pointer-events-none">
                <span className="text-4xl filter drop-shadow-md">🌸</span>
              </div>
            </div>

            {/* Floating Cursive Script Quote ("Look Good Feel Good Be You") */}
            <div
              className="absolute -top-4 right-2 sm:right-6 lg:-right-4 z-20 transform rotate-[-4deg] pointer-events-none select-none text-right"
              aria-hidden="true"
            >
              <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-white/95 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                Look Good <br />
                <span className="text-[#F8C1DE]">Feel Good</span> <br />
                Be You
              </p>
            </div>

            {/* Carousel Dots indicator */}
            <div className="absolute -bottom-8 flex items-center gap-2">
              <span className="w-6 h-1.5 rounded-full bg-[#D91A8A] transition-all" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface CTABannerProps {
  onOpenBooking: () => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#3D003D] via-[#85006F] to-[#D91A8A] py-12 sm:py-16 text-white">
      {/* Decorative ambient radial light & floral watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 50%, rgba(255, 255, 255, 0.25) 0%, transparent 40%),
                            radial-gradient(circle at 85% 50%, rgba(253, 234, 244, 0.3) 0%, transparent 50%)`,
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Left: Icon & Headline */}
          <div className="flex flex-col sm:flex-row items-center gap-5 max-w-2xl">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white shrink-0 backdrop-blur-md shadow-inner">
              <Calendar className="w-7 h-7 text-[#F8C1DE]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#F8C1DE] font-semibold mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Instant Online Scheduling</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl  ont-display font-medium text-white tracking-tight leading-tight">
                Ready to Experience the Best in Beauty?
              </h2>
              <p className="mt-1 text-sm sm:text-base text-white/85 font-light">
                Book your appointment today and let our certified specialists take care of you.
              </p>
            </div>
          </div>

          {/* Right: Pill CTA Button */}
          <div className="shrink-0">
            <Button
              variant="light"
              size="lg"
              withArrow
              onClick={onOpenBooking}
              className="shadow-[0_12px_28px_rgba(0,0,0,0.25)] hover:bg-[#FDEAF4]"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

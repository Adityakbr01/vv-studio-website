import React, { useCallback, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '@/data/salonData';
import { getLenisInstance } from '@/lib/lenis';

interface GalleryLightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  index,
  onClose,
  onNavigate,
}) => {
  const touchStartX = useRef<number | null>(null);
  const total = items.length;
  const current = items[((index % total) + total) % total];

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + total) % total);
  }, [index, total, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % total);
  }, [index, total, onNavigate]);

  // Keyboard nav + scroll lock (page + Lenis).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const lenis = getLenisInstance();
    lenis?.stop();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image: ${current.title}`}
      className="fixed inset-0 z-50 flex flex-col bg-[#1A0019]/92 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top bar: counter + close */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 text-white">
        <span className="text-xs sm:text-sm font-medium tracking-widest text-white/70">
          {(((index % total) + total) % total) + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery popup"
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D91A8A] flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Image stage */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-12 sm:px-20 pb-2"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (dx > 48) goPrev();
          else if (dx < -48) goNext();
        }}
      >
        <img
          key={current.id}
          src={current.image}
          alt={current.title}
          className="max-h-full max-w-full w-auto h-auto object-contain rounded-[12px] shadow-2xl animate-in zoom-in-95 duration-200"
          draggable={false}
        />

        {/* Prev / Next */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-[#D91A8A] border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-[#D91A8A] border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 pb-6 pt-1 text-center" onClick={(e) => e.stopPropagation()}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F06AB9]">
          {current.category}
        </p>
        <h3 className="mt-1 text-base sm:text-lg font-display font-medium text-white">
          {current.title}
        </h3>
      </div>
    </div>
  );
};

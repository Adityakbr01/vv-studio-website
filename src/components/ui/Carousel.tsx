import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CarouselHandle {
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollToPage: (page: number) => void;
}

export interface CarouselState {
  canPrev: boolean;
  canNext: boolean;
  page: number;
  pages: number;
}

interface CarouselProps {
  children: React.ReactNode;
  /** Width of each slide, e.g. "basis-[85%] sm:basis-[calc(50%-12px)]" */
  slideClassName?: string;
  trackClassName?: string;
  ariaLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  showDots?: boolean;
  onStateChange?: (state: CarouselState) => void;
  className?: string;
}

const EPS = 4;
const INITIAL_STATE: CarouselState = { canPrev: false, canNext: false, page: 0, pages: 1 };

function statesEqual(a: CarouselState, b: CarouselState) {
  return a.canPrev === b.canPrev && a.canNext === b.canNext && a.page === b.page && a.pages === b.pages;
}

/** Real snap-stop positions: every slide start, clamped to max scroll, deduplicated. */
function getSnapPositions(el: HTMLElement): { positions: number[]; maxScroll: number } {
  const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
  const positions: number[] = [];
  Array.from(el.children).forEach((child) => {
    const p = Math.min((child as HTMLElement).offsetLeft, maxScroll);
    if (positions.length === 0 || p - positions[positions.length - 1] > EPS) {
      positions.push(p);
    }
  });
  if (positions.length === 0) positions.push(0);
  return { positions, maxScroll };
}

export const Carousel = forwardRef<CarouselHandle, CarouselProps>(function Carousel(
  {
    children,
    slideClassName,
    trackClassName,
    ariaLabel = 'Carousel',
    autoplay = false,
    autoplayDelay = 4500,
    showDots = true,
    onStateChange,
    className,
  },
  ref
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [state, setState] = useState<CarouselState>(INITIAL_STATE);
  const slideCount = React.Children.count(children);

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el || el.clientWidth === 0) return;
    const { positions, maxScroll } = getSnapPositions(el);
    const lastChild = el.children[el.children.length - 1] as HTMLElement | undefined;
    const slideW = lastChild ? lastChild.getBoundingClientRect().width : el.clientWidth;
    const threshold = Math.min(slideW * 0.35, el.clientWidth * 0.25);
    let page = 0;
    positions.forEach((p, i) => {
      if (p <= el.scrollLeft + threshold + EPS) page = i;
    });
    const next: CarouselState = {
      canPrev: el.scrollLeft > EPS,
      canNext: el.scrollLeft < maxScroll - EPS,
      page,
      pages: positions.length,
    };
    setState((prev) => (statesEqual(prev, next) ? prev : next));
  }, []);

  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  useEffect(() => {
    measure();
    const el = viewportRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    const t = window.setTimeout(measure, 600);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measure, slideCount]);

  const step = useCallback((dir: 1 | -1) => {
    const el = viewportRef.current;
    if (!el) return;
    const { positions, maxScroll } = getSnapPositions(el);
    const sl = el.scrollLeft;
    let target: number;
    if (dir > 0) {
      target = positions.find((p) => p > sl + EPS) ?? maxScroll;
    } else {
      target = [...positions].reverse().find((p) => p < sl - EPS) ?? 0;
    }
    el.scrollTo({ left: target, behavior: 'smooth' });
  }, []);

  const scrollPrev = useCallback(() => step(-1), [step]);
  const scrollNext = useCallback(() => step(1), [step]);

  const scrollToPage = useCallback((page: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const { positions } = getSnapPositions(el);
    const target = positions[Math.max(0, Math.min(positions.length - 1, page))] ?? 0;
    el.scrollTo({ left: target, behavior: 'smooth' });
  }, []);

  useImperativeHandle(ref, () => ({ scrollPrev, scrollNext, scrollToPage }), [scrollPrev, scrollNext, scrollToPage]);

  // Autoplay with rewind, paused on hover/touch, respects reduced motion
  useEffect(() => {
    if (!autoplay) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      const el = viewportRef.current;
      if (!el || pausedRef.current || document.hidden) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - EPS) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        step(1);
      }
    }, autoplayDelay);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayDelay, step]);

  return (
    <div className={className}>
      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onPointerEnter={() => (pausedRef.current = true)}
        onPointerLeave={() => (pausedRef.current = false)}
        onPointerDown={() => (pausedRef.current = true)}
        onPointerUp={() => (pausedRef.current = false)}
        className={cn(
          'relative flex overflow-x-auto no-scrollbar snap-x snap-mandatory overscroll-x-contain focus:outline-none',
          trackClassName ?? 'gap-3 sm:gap-4'
        )}
      >
        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            className={cn('snap-start shrink-0 min-w-0', slideClassName)}
          >
            {child}
          </div>
        ))}
      </div>

      {showDots && state.pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-1">
          {Array.from({ length: state.pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToPage(i)}
              aria-label={`Go to slide ${i + 1} of ${state.pages}`}
              className="w-5 h-4 flex items-center justify-center cursor-pointer"
            >
              <span
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  i === state.page ? 'w-4 bg-[#D91A8A]' : 'w-2 bg-[#E8DCE5] hover:bg-[#F06AB9]'
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  className?: string;
}

export const CarouselControls: React.FC<CarouselControlsProps> = ({
  onPrev,
  onNext,
  canPrev,
  canNext,
  className,
}) => {
  const btn =
    'w-9 h-9 rounded-full border border-[#E8DCE5] bg-white text-[#A80086] flex items-center justify-center shadow-sm transition-all duration-200 hover:bg-[#FDEAF4] hover:border-[#F06AB9] disabled:opacity-30 disabled:cursor-default disabled:hover:bg-white disabled:hover:border-[#E8DCE5] cursor-pointer';
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button type="button" onClick={onPrev} disabled={!canPrev} aria-label="Previous slides" className={btn}>
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button type="button" onClick={onNext} disabled={!canNext} aria-label="Next slides" className={btn}>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

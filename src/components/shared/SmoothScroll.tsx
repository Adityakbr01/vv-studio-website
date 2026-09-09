import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { setLenisInstance, getLenisInstance } from '@/lib/lenis';

export function SmoothScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Initialize Lenis with tuned inertia and easing for premium, lag-free feel
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  // Handle smooth route & hash scrolling with header offset
  useEffect(() => {
    const lenis = getLenisInstance();
    if (!lenis) return;

    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        // Slight timeout allows layout to settle
        const timer = setTimeout(() => {
          lenis.scrollTo(element, {
            offset: -75, // offset for sticky luxury header
            duration: 1.2,
            immediate: false,
          });
        }, 60);
        return () => clearTimeout(timer);
      }
    } else {
      lenis.scrollTo(0, {
        duration: 1.0,
        immediate: false,
      });
    }
  }, [pathname, hash]);

  return null;
}

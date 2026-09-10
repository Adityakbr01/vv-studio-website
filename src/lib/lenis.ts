/**
 * Lenis singleton with a structural type — consumers import ZERO lenis code.
 *
 * The real `lenis` package is only ever loaded via dynamic `import('lenis')`
 * inside the deferred SmoothScroll component, so it stays out of the
 * critical-path bundle. Readers (modals, lightboxes, scroll helpers) talk to
 * the `LenisLike` interface through this module instead.
 */

export interface LenisScrollOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
}

/** Minimal structural surface of Lenis used across the app. */
export interface LenisLike {
  scrollTo(
    target: string | number | HTMLElement,
    options?: LenisScrollOptions,
  ): void;
  stop(): void;
  start(): void;
  destroy(): void;
  raf(time: number): void;
}

let lenisInstance: LenisLike | null = null;

export function setLenisInstance(instance: LenisLike | null) {
  lenisInstance = instance;
}

export function getLenisInstance(): LenisLike | null {
  return lenisInstance;
}

export function scrollToElement(
  target: string | HTMLElement,
  options?: { offset?: number; duration?: number; immediate?: boolean },
) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options);
  } else if (typeof target === 'string') {
    const el = document.getElementById(target.replace('#', ''));
    el?.scrollIntoView({ behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

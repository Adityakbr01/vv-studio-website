import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

export function scrollToElement(
  target: string | HTMLElement,
  options?: { offset?: number; duration?: number; immediate?: boolean }
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

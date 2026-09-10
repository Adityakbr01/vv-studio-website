/**
 * Idle + network-aware helpers for deferring non-critical work.
 *
 * requestIdleCallback with a timeout fallback (Safari), plus
 * Save-Data / slow-network detection so we never prefetch on
 * constrained connections.
 */

type IdleCallbackFn = () => void;

interface WindowWithIdle {
  requestIdleCallback?: (
    cb: IdleCallbackFn,
    opts?: { timeout?: number },
  ) => number;
  cancelIdleCallback?: (id: number) => void;
}

interface NavigatorWithConnection {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
}

/** Run `cb` when the main thread is idle (fallback: timed out). Returns a cancel fn. */
export function onIdle(cb: IdleCallbackFn, timeout = 2500): () => void {
  const w = window as unknown as WindowWithIdle;
  if (typeof w.requestIdleCallback === 'function') {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = window.setTimeout(cb, Math.min(timeout, 1500));
  return () => window.clearTimeout(t);
}

/** False on Save-Data or 2g/slow-2g — skip all speculative preloading there. */
export function connectionAllowsPreload(): boolean {
  const conn = (navigator as unknown as NavigatorWithConnection).connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  const et = conn.effectiveType;
  return et !== 'slow-2g' && et !== '2g';
}

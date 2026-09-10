import React, { Suspense } from 'react';

const SmoothScroll = React.lazy(() =>
  import('./SmoothScroll').then((m) => ({ default: m.SmoothScroll })),
);

/**
 * Deferred smooth-scroll shell for the critical path: renders nothing until
 * the SmoothScroll runtime (and its `lenis` chunk) loads after idle.
 */
export function DeferredSmoothScroll() {
  return (
    <Suspense fallback={null}>
      <SmoothScroll />
    </Suspense>
  );
}

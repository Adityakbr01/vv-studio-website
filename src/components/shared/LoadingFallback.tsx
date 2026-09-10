/**
 * Lightweight route-change fallback: brand-tinted spinner on the page
 * background. Pure CSS, zero JS deps — safe for the critical path.
 */
export function LoadingFallback() {
  return (
    <div
      className="min-h-screen bg-[#FCFCFC] flex items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <div className="w-10 h-10 rounded-full border-2 border-[#F1E4EE] border-t-[#D91A8A] animate-spin" />
    </div>
  );
}

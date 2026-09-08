/**
 * Reads UTM attribution from the current URL, with sensible defaults
 * for the website enquiry API.
 */
export interface UtmParams {
  utm_medium: string;
  utm_source: string;
  utm_campaign: string;
}

export function getUtmParams(): UtmParams {
  if (typeof window === 'undefined') {
    return { utm_medium: 'website', utm_source: 'direct', utm_campaign: 'none' };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_medium: params.get('utm_medium') ?? 'website',
    utm_source: params.get('utm_source') ?? 'google',
    utm_campaign: params.get('utm_campaign') ?? 'organic',
  };
}

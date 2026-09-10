import { useEffect } from 'react';

/**
 * Central on-page SEO source of truth.
 * Values taken from `VV Studio Onpage SEO Audits.pdf`, with P0 corrections:
 * - Homepage canonical fixed to `/` (PDF incorrectly listed `/contact`).
 * - Gallery canonical fixed to its own `/gallery` (PDF incorrectly listed `/services`).
 * - Blog canonical fixed to `/blog` (PDF listed `/#blog` fragment, which is
 *   stripped by crawlers and cannot serve as a canonical).
 */

export const SITE_URL = 'https://vvs.agsdemo.in';
export const SITE_NAME = 'VV Studio';

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  robots: string;
  author: string;
  publisher: string;
  ogType: string;
  ogImage: string;
}

const base = {
  robots: 'index, follow',
  author: 'VV Studio',
  publisher: 'VV Studio',
  ogType: 'website',
  ogImage: `${SITE_URL}/images/home/home_top_banner.webp`,
};

export const SEO_CONFIG: Record<string, PageSEO> = {
  home: {
    title: 'VV Studio | Luxury Salon & Spa in JP Nagar, Bangalore',
    description:
      "VV Studio is Bangalore's premier luxury beauty salon offering personalized skin treatments, expert hair care, bridal makeup, and rejuvenating spa therapies.",
    keywords:
      'luxury salon in JP Nagar, salon in JP Nagar Bangalore, spa in JP Nagar, beauty salon Bangalore, bridal makeup Bangalore, hair salon JP Nagar',
    canonical: `${SITE_URL}/`,
    ...base,
  },
  about: {
    title: 'About VV Studio | Luxury Salon & Spa in JP Nagar',
    description:
      'Discover VV Studio, a luxury salon and spa in JP Nagar, Bangalore, offering expert hair, skin, bridal makeup, and beauty services.',
    keywords:
      'luxury salon in JP Nagar, salon in JP Nagar Bangalore, beauty salon Bangalore, luxury spa Bangalore, bridal makeup Bangalore',
    canonical: `${SITE_URL}/about`,
    ...base,
  },
  services: {
    title: 'VV Studio Services | Luxury Salon & Spa in JP Nagar',
    description:
      'Explore VV Studio services in JP Nagar, Bangalore, including hair care, skin treatments, facials, bridal makeup, waxing, and spa therapies.',
    keywords:
      'luxury salon in JP Nagar, salon services in JP Nagar, beauty salon Bangalore, spa in JP Nagar, hair care Bangalore, bridal makeup Bangalore',
    canonical: `${SITE_URL}/services`,
    ...base,
  },
  gallery: {
    title: 'VV Studio Gallery | Salon, Hair, Skin & Bridal Work in JP Nagar',
    description:
      'Browse the VV Studio gallery — luxury salon ambience, hair styling, facials, bridal makeup, nail art and spa moments in JP Nagar, Bangalore.',
    keywords:
      'luxury salon in JP Nagar, salon gallery JP Nagar, beauty salon Bangalore, bridal makeup Bangalore, spa in JP Nagar',
    canonical: `${SITE_URL}/gallery`,
    ...base,
  },
  blog: {
    title: 'VV Studio Blog | Beauty & Wellness Tips in JP Nagar',
    description:
      'Explore the VV Studio blog for expert beauty, hair care, skincare, bridal makeup, spa, and wellness tips from our salon experts in JP Nagar, Bangalore.',
    keywords:
      'VV Studio blog, beauty blog Bangalore, skincare tips, hair care tips, bridal makeup tips, beauty tips JP Nagar, wellness tips Bangalore',
    canonical: `${SITE_URL}/blog`,
    ...base,
  },
  contact: {
    title: 'VV Studio | Luxury Salon & Spa in JP Nagar Bangalore',
    description:
      'Visit VV Studio in JP Nagar, Bangalore, for luxury salon, hair, skin, bridal makeup, and spa services. Find our location, contact details, and booking options.',
    keywords:
      'VV Studio JP Nagar, luxury salon in JP Nagar, salon in JP Nagar Bangalore, beauty salon Bangalore, spa in JP Nagar, bridal makeup Bangalore',
    canonical: `${SITE_URL}/contact`,
    ...base,
  },
};

function upsertMetaByName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el =
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Apply per-page on-page SEO (title, description, keywords, canonical, OG). */
export function applyPageSEO(key: keyof typeof SEO_CONFIG) {
  const seo = SEO_CONFIG[key];
  if (!seo || typeof document === 'undefined') return;

  document.title = seo.title;
  upsertMetaByName('description', seo.description);
  upsertMetaByName('keywords', seo.keywords);
  upsertMetaByName('robots', seo.robots);
  upsertMetaByName('author', seo.author);
  upsertMetaByName('publisher', seo.publisher);
  upsertCanonical(seo.canonical);

  // Open Graph / Twitter — keeps social + rich-result signals consistent.
  upsertMetaByProperty('og:title', seo.title);
  upsertMetaByProperty('og:description', seo.description);
  upsertMetaByProperty('og:type', seo.ogType);
  upsertMetaByProperty('og:url', seo.canonical);
  upsertMetaByProperty('og:image', seo.ogImage);
  upsertMetaByName('twitter:card', 'summary_large_image');
  upsertMetaByName('twitter:title', seo.title);
  upsertMetaByName('twitter:description', seo.description);
}

/** React hook wrapper — call once per page component. */
export function useSEO(key: keyof typeof SEO_CONFIG) {
  useEffect(() => {
    applyPageSEO(key);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [key]);
}

/** LocalBusiness JSON-LD — inject once (BeautySalon entity for JP Nagar). */
export function injectLocalBusinessSchema() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('vv-studio-ld')) return;
  const script = document.createElement('script');
  script.id = 'vv-studio-ld';
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': `${SITE_URL}/#business`,
    name: 'VV Studio',
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/images/home/home_top_banner.webp`,
    telephone: '+91-80-48531999',
    email: 'info@varvadhustudio.com',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '#5, 1st Floor, 24th Main, 5th Phase, JP Nagar',
      addressLocality: 'Bangalore',
      postalCode: '560078',
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 12.9057, longitude: 77.5858 },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '10:00',
      closes: '20:00',
    },
    sameAs: [
      'https://facebook.com',
      'https://instagram.com',
      'https://x.com',
      'https://youtube.com',
    ],
  });
  document.head.appendChild(script);
}

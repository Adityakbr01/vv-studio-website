import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Navigation,
} from 'lucide-react';
import { Logo } from './Logo';
import { Container } from '@/components/ui/Container';
import { CONTACT_INFO } from '@/data/salonData';

interface FooterProps {
  variant?: 'light' | 'dark';
  showTaglineCallout?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  variant = 'dark',
  showTaglineCallout = true,
}) => {
  const isDark = variant === 'dark';

  const quickLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/#about' },
    { name: 'Services', to: '/#services' },
    { name: 'Gallery', to: '/#gallery' },
    { name: 'Blog', to: '/#blog' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <footer
      id="contact"
      className={`relative overflow-hidden ${isDark ? 'bg-[#350033] text-white/80' : 'bg-white text-[#40363F]'
        }`}
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-12 sm:pt-14 pb-10">
          {/* Column 1: Logo, script tagline & socials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <Logo theme={isDark ? 'dark' : 'light'} size="lg" />
              <p
                className={`font-script text-3xl sm:text-4xl leading-snug mt-4 ${isDark ? 'text-white/95' : 'text-[#3D003D]'
                  }`}
              >
                Adding care to your Beauty
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 pb-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="VV Studio on Facebook"
                className={`transition-colors duration-300 ${isDark ? 'text-white/80 hover:text-[#F8C1DE]' : 'text-[#3D003D] hover:text-[#D91A8A]'
                  }`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="VV Studio on Instagram"
                className={`transition-colors duration-300 ${isDark ? 'text-white/80 hover:text-[#F8C1DE]' : 'text-[#3D003D] hover:text-[#D91A8A]'
                  }`}
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="VV Studio on YouTube"
                className={`transition-colors duration-300 ${isDark ? 'text-white/80 hover:text-[#F8C1DE]' : 'text-[#3D003D] hover:text-[#D91A8A]'
                  }`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3
              className={`text-[15px] font-bold mb-4 ${isDark ? 'text-white' : 'text-[#2D0A2E]'
                }`}
            >
              Quick Links
            </h3>
            <ul className={`space-y-2.5 text-sm ${isDark ? 'text-white/75' : 'text-[#5E525C]'}`}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    onClick={() => {
                      if (link.to.includes('#')) {
                        const id = link.to.split('#')[1];
                        const el = document.getElementById(id);
                        el?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`transition-colors inline-block ${isDark ? 'hover:text-[#F8C1DE]' : 'hover:text-[#D91A8A]'
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us (3 cols) */}
          <div className="lg:col-span-3">
            <h3
              className={`text-[15px] font-bold mb-4 ${isDark ? 'text-white' : 'text-[#2D0A2E]'
                }`}
            >
              Contact Us
            </h3>
            <ul className={`space-y-3 text-[13px] sm:text-sm ${isDark ? 'text-white/75' : 'text-[#5E525C]'}`}>
              <li className="flex items-start gap-2.5">
                <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#F8C1DE]' : 'text-[#3D003D]'}`} />
                <span className="leading-relaxed">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#F8C1DE]' : 'text-[#3D003D]'}`} />
                <a
                  href={`tel:${CONTACT_INFO.phones[1]}`}
                  className={`transition-colors ${isDark ? 'hover:text-[#F8C1DE]' : 'hover:text-[#D91A8A]'}`}
                >
                  {CONTACT_INFO.phones[1]}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#F8C1DE]' : 'text-[#3D003D]'}`} />
                <a
                  href={`tel:${CONTACT_INFO.phones[0]}`}
                  className={`transition-colors ${isDark ? 'hover:text-[#F8C1DE]' : 'hover:text-[#D91A8A]'}`}
                >
                  {CONTACT_INFO.phones[0]}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#F8C1DE]' : 'text-[#3D003D]'}`} />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className={`break-all transition-colors ${isDark ? 'hover:text-[#F8C1DE]' : 'hover:text-[#D91A8A]'}`}
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#F8C1DE]' : 'text-[#3D003D]'}`} />
                <a
                  href={`https://${CONTACT_INFO.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`transition-colors ${isDark ? 'hover:text-[#F8C1DE]' : 'hover:text-[#D91A8A]'}`}
                >
                  {CONTACT_INFO.website}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Either Tagline callout with flower watermark OR Map & Directions card */}
          <div className="lg:col-span-3 relative flex items-center justify-center min-h-[160px]">
            {showTaglineCallout ? (
              <div className="relative w-full h-full flex flex-col justify-center items-center lg:items-end text-center lg:text-right overflow-hidden pr-2">
                <div className="relative z-10 py-4">
                  <p className="font-script text-4xl sm:text-5xl lg:text-[48px] text-white/90 leading-[1.15] drop-shadow-md">
                    Because <br />
                    <span className="text-[#F8C1DE] font-normal">You Deserve</span> <br />
                    More
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full rounded-2xl border border-[#F1E4EE] bg-[#FCFCFC] p-3 shadow-[0_2px_14px_rgba(90,20,80,0.08)]">
                {/* Map */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#F4EDF2] mb-3">
                  <iframe
                    title="V V Studio location map - JP Nagar, Bangalore"
                    src="https://www.google.com/maps?q=V%20V%20Studio%2C%20%238%2C%201st%20Floor%2C%2024th%20Main%2C%205th%20Phase%2C%20JP%20Nagar%2C%20Bangalore%20560078&output=embed"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Get Directions Button */}
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=V%20V%20Studio%2C%20%238%2C%201st%20Floor%2C%2024th%20Main%2C%205th%20Phase%2C%20JP%20Nagar%2C%20Bangalore%20560078"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#E8329D] hover:bg-[#D91A8A] text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </Container>
      {/* Translucent floral background watermark */}
      <div
        className="absolute -right-4 bottom-20 w-[34rem] h-[32rem] opacity-25 pointer-events-none mix-blend-screen bg-contain bg-no-repeat bg-right-bottom"
        style={{ backgroundImage: `url('/images/common/footer_flower_bg.png')` }}
        aria-hidden="true"
      />
      {/* Bottom copyright bar */}
      <div className="bg-[#3D003D] text-white/70">
        <Container className="py-4 flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
          <p>© 2024 V V Studio. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/30">|</span>
            <Link to="/#terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
};

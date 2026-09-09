import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
} from 'lucide-react';
import { Logo } from './Logo';
import { Container } from '@/components/ui/Container';
import { CONTACT_INFO } from '@/data/salonData';

export const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/#about' },
    { name: 'Services', to: '/services' },
    { name: 'Gallery', to: '/#gallery' },
    { name: 'Blog', to: '/#blog' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <footer id="contact" className="bg-[#f4f4f4] border-t text-[#40363F] relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-12 sm:pt-14 pb-10">
          {/* Column 1: Logo, script tagline & socials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <Logo theme="light" size="lg" />
              <p className="font-script text-3xl sm:text-4xl leading-snug text-[#3D003D] mt-4">
                Adding care to your Beauty
              </p>
            </div>

            {/* Social Links — plain plum glyphs like reference */}
            <div className="flex items-center gap-6 pb-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="VV Studio on Facebook"
                className="text-[#3D003D] hover:text-[#D91A8A] transition-colors duration-300"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="VV Studio on Instagram"
                className="text-[#3D003D] hover:text-[#D91A8A] transition-colors duration-300"
              >
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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
                className="text-[#3D003D] hover:text-[#D91A8A] transition-colors duration-300"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-[15px] font-bold text-[#2D0A2E] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-[#5E525C]">
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
                    className="hover:text-[#D91A8A] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-[15px] font-bold text-[#2D0A2E] mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-[13px] sm:text-sm text-[#5E525C]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#3D003D] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#3D003D] shrink-0" />
                <a href={`tel:${CONTACT_INFO.phones[1]}`} className="hover:text-[#D91A8A] transition-colors">
                  {CONTACT_INFO.phones[1]}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#3D003D] shrink-0" />
                <a href={`tel:${CONTACT_INFO.phones[0]}`} className="hover:text-[#D91A8A] transition-colors">
                  {CONTACT_INFO.phones[0]}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#3D003D] shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#D91A8A] transition-colors break-all">
                  {CONTACT_INFO.email}
                </a>
              </li>
           
            </ul>
          </div>

          {/* Column 4: Map & Directions card (3 cols) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-[#F1E4EE] bg-[#FCFCFC] p-3 shadow-[0_2px_14px_rgba(90,20,80,0.08)]">
              {/* Map */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#F4EDF2] mb-3">
                <iframe
                  title="V V Studio location map - JP Nagar, Bangalore"
                  src="https://www.google.com/maps?q=V%20V%20Studio%2C%20%235%2C%201st%20Floor%2C%2024th%20Main%2C%205th%20Phase%2C%20JP%20Nagar%2C%20Bangalore%20560078&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Get Directions Button */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=V%20V%20Studio%2C%20%235%2C%201st%20Floor%2C%2024th%20Main%2C%205th%20Phase%2C%20JP%20Nagar%2C%20Bangalore%20560078"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#E8329D] hover:bg-[#D91A8A] text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </Container>

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
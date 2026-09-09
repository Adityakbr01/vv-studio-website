import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Render-phase state adjustment to close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Services', to: '/services' },
    { name: 'Gallery', to: '/#gallery' },
    { name: 'Blog', to: '/#blog' },
    { name: 'Contact', to: '/contact' },
  ];

  const handleNavClick = (to: string) => {
    if (to === '/contact' || to === '/about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (to.includes('#')) {
      const id = to.split('#')[1];
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLinkActive = (link: { name: string; to: string }) => {
    if (link.to === '/contact') {
      return location.pathname === '/contact';
    }
    if (link.to === '/about') {
      return location.pathname === '/about';
    }
    if (link.to === '/services') {
      return location.pathname === '/services';
    }
    if (link.name === 'Home') {
      return location.pathname === '/' && !location.hash;
    }
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 py-3 sm:py-5 right-0 z-40 transition-all duration-300 ${isScrolled || mobileMenuOpen
            ? 'bg-[#3D003D]/95 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.3)]'
            : 'bg-gradient-to-b from-black/35 to-transparent'
          }`}
      >
        <Container>
          <div className="flex items-center justify-between min-h-[48px]">
            {/* Brand Logo */}
            <Logo theme="dark" size="md" />

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide text-white/90"
            >
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => handleNavClick(link.to)}
                    className={`relative py-1 transition-colors duration-200 hover:text-white ${active ? 'text-white font-semibold' : 'text-white/85'
                      }`}
                  >
                    <span>{link.name}</span>
                    {/* Pink underline active indicator matching reference */}
                    <span
                      className={`absolute bottom-[-2px] left-0 right-0 h-[2px] bg-[#E8329D] rounded-full transition-all duration-300 ${active ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                        }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Contact Numbers, Socials & Book Appointment CTA on Right */}
            <div className="hidden lg:flex items-center gap-5">
              {/* Phone & WhatsApp Contacts */}
              <div className="flex items-center gap-2 text-[12px] font-medium text-white/90">
                <Phone className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <a
                  href="tel:08048531999"
                  className="hover:text-white transition-colors duration-200 tracking-wider"
                >
                  080-48531999
                </a>

                <span className="text-white/30 mx-1">|</span>

                {/* WhatsApp Icon */}
                <WhatsAppIcon className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <a
                  href="https://wa.me/918310782820"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors duration-200 tracking-wider"
                >
                  8310782820
                </a>
              </div>

              {/* Book Appointment CTA Button */}
              <Button
                variant="primary"
                size="sm"
                withArrow
                onClick={onOpenBooking}
                className="!px-5 !py-2.5 !text-[13px] bg-[#E8329D] hover:bg-[#D91A8A] shadow-[0_8px_20px_-5px_rgba(232,50,157,0.55)] cursor-pointer"
              >
                Book Appointment
              </Button>
            </div>

            {/* Mobile Menu & Quick Book Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1 text-[13px] bg-[#E8329D] hover:bg-[#D91A8A] text-white pl-4 pr-3.5 py-2 rounded-full font-semibold active:scale-95 transition-all shadow-[0_4px_14px_rgba(232,50,157,0.5)] min-h-[38px]"
              >
                Book
                <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 text-white hover:text-[#F8C1DE] hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl cursor-pointer transition-colors"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Sidebar — slides in from the right */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="lg:hidden fixed inset-0 z-50"
        >
          {/* Scrim — tap to close */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default animate-in fade-in duration-300"
          />
          <aside className="absolute top-0 right-0 h-full w-[85%] max-w-[340px] flex flex-col bg-[#2B002B] border-l border-white/10 shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Sidebar header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
              <Logo theme="dark" size="sm" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 text-white hover:text-[#F8C1DE] hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl cursor-pointer transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-3 sm:p-4">
              {navLinks.map((link, i) => {
                const active = isLinkActive(link);
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleNavClick(link.to);
                    }}
                    style={{ transitionDelay: `${i * 30}ms` }}
                    className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl text-[17px] font-medium transition-all animate-in fade-in slide-in-from-right-4 duration-300 ${active
                        ? 'bg-[#E8329D]/15 text-white'
                        : 'text-white/85 hover:bg-white/5 hover:text-white active:bg-white/10'
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      {link.name}
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E8329D]" aria-hidden="true" />
                      )}
                    </span>
                    <span aria-hidden="true" className="text-white/30">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className="shrink-0 p-4 sm:p-5 border-t border-white/10 bg-white/[0.02] flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:08048531999"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 text-white/90 text-xs font-semibold px-2 py-3 min-h-[48px] whitespace-nowrap hover:bg-white/5 active:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F06AB9] shrink-0" />
                  080-48531999
                </a>
                <a
                  href="https://wa.me/918310782820"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 text-white/90 text-xs font-semibold px-2 py-3 min-h-[48px] whitespace-nowrap hover:bg-white/5 active:bg-white/10 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#F06AB9] shrink-0" />
                  WhatsApp
                </a>
              </div>

              <Button
                variant="primary"
                size="lg"
                withArrow
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full justify-center bg-[#E8329D] hover:bg-[#D91A8A] min-h-[52px] text-[15px]"
              >
                Book Appointment Now
              </Button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

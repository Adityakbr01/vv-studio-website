import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/#about' },
    { name: 'Services', to: '/#services' },
    { name: 'Gallery', to: '/#gallery' },
    { name: 'Blog', to: '/#blog' },
    { name: 'Contact', to: '/#contact' },
  ];

  const handleNavClick = (to: string) => {
    if (to.includes('#')) {
      const id = to.split('#')[1];
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 py-5 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#3D003D]/95 backdrop-blur-md  shadow-[0_4px_25px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Logo theme="dark" size="md" />

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide text-white/90"
          >
            {navLinks.map((link) => {
              const isHomeActive = link.name === 'Home' && location.pathname === '/' && !location.hash;
              return (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className={`relative py-1 transition-colors duration-200 hover:text-white ${
                    isHomeActive ? 'text-white font-semibold' : 'text-white/85'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Pink underline active indicator matching reference */}
                  <span
                    className={`absolute bottom-[-2px] left-0 right-0 h-[2px] bg-[#E8329D] rounded-full transition-all duration-300 ${
                      isHomeActive ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Contact Numbers & Book Appointment CTA on Right */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Phone & WhatsApp Contacts */}
            <div className="flex items-center gap-2 text-[12px] font-medium text-white/90">
              <Phone className="w-3.5 h-3.5 text-white/90 shrink-0" />
              <a
                href="tel:08046531999"
                className="hover:text-white transition-colors duration-200 tracking-wider"
              >
                080-46531999
              </a>

              <span className="text-white/30 mx-1.5">|</span>

              {/* WhatsApp Icon */}
              <svg className="w-3.5 h-3.5 fill-current text-white/90 shrink-0" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.586 1.83.899 2.796.899 3.183 0 5.769-2.586 5.77-5.766.001-3.18-2.585-5.766-5.77-5.766zm3.385 8.163c-.143.402-.832.748-1.161.797-.306.046-.693.076-2.18-.541-1.897-.788-3.116-2.73-3.21-2.857-.095-.127-.768-1.021-.768-1.947 0-.927.487-1.381.66-1.571.173-.19.378-.238.504-.238.127 0 .254.002.365.007.117.006.273-.044.427.327.159.381.54 1.317.587 1.412.048.096.079.207.016.334-.064.127-.096.206-.191.317-.095.111-.2.248-.286.334-.095.095-.195.198-.083.39.111.191.494.814 1.059 1.318.729.649 1.343.85 1.534.945.191.095.302.079.413-.048.111-.127.476-.556.603-.746.127-.19.254-.159.428-.095.175.063 1.111.524 1.302.619.19.095.317.143.365.222.048.079.048.46-.095.862z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.965-1.397A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.637 0-3.167-.47-4.464-1.282l-.32-.2-3.272.921.936-3.2-.213-.339A8.212 8.212 0 0 1 3.75 12c0-4.549 3.701-8.25 8.25-8.25 4.549 0 8.25 3.701 8.25 8.25 0 4.549-3.701 8.25-8.25 8.25z" />
              </svg>
              <a
                href="tel:8310782820"
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
          <div className="flex lg:hidden items-center gap-3">
            <button
              type="button"
              onClick={onOpenBooking}
              className="text-xs bg-[#E8329D] hover:bg-[#D91A8A] text-white px-3.5 py-1.5 rounded-full font-medium active:scale-95 transition-transform"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#F8C1DE] focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 top-[65px] bg-[#2B002B]/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col justify-between z-50 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="flex flex-col gap-5 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick(link.to);
                }}
                className="text-xl font-display text-white/90 hover:text-[#F06AB9] border-b border-white/5 pb-3 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-white/80">
              <Phone className="w-4 h-4 text-[#F06AB9]" />
              <div className="flex flex-col">
                <a href="tel:08046531999">080-46531999</a>
                <a href="tel:8310782820">8310782820</a>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              withArrow
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full justify-center bg-[#E8329D]"
            >
              Book Appointment Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

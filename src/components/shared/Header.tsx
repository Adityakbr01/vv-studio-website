import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      className={`fixed py-5 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#3D003D]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Logo theme="dark" size="md" />

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide text-white/90"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => handleNavClick(link.to)}
                className="relative py-1 hover:text-[#F8C1DE] transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D91A8A] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact Numbers & Book Appointment CTA */}
          <div className="hidden sm:flex items-center gap-5">
            <div className="hidden xl:flex items-center gap-2 text-xs font-medium text-white/80">
              <Phone className="w-3.5 h-3.5 text-[#F06AB9]" />
              <a
                href="tel:08048531909"
                className="hover:text-white transition-colors duration-200"
              >
                080-48531909
              </a>
              <span className="text-white/40">|</span>
              <a
                href="tel:8310782820"
                className="hover:text-white transition-colors duration-200"
              >
                8310782820
              </a>
            </div>

            <Button
              variant="primary"
              size="sm"
              withArrow
              onClick={onOpenBooking}
              className="shadow-sm"
            >
              Book Appointment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              type="button"
              onClick={onOpenBooking}
              className="text-xs bg-[#D91A8A] text-white px-3.5 py-1.5 rounded-full font-medium active:scale-95 transition-transform"
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
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

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
                <a href="tel:08048531909">080-48531909</a>
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
              className="w-full justify-center"
            >
              Book Appointment Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
